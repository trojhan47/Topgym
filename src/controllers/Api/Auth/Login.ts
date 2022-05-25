/**
 * @author Oyetunji Atilade <atiladeoyetunji@gmail.com>
 * @desc User login
   @access Public
 */

import validator from "validator";
import { NextFunction, Request, Response } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import moment from "moment";

import mongoose from "../../../providers/Database";

import User from "../../../models/User";
import Log from "../../../middlewares/Log";
import Token from "../../../models/Token";
import Customer from "../../../models/Customer";
import Role from "../../../models/Role";

import Locals from "../../../providers/Locals";

import RedisService from "../../../services/Redis";
import Gen from "../../../utils/Gen";
import Check from "../../../utils/Check";

const ObjectId = mongoose.Types.ObjectId;
class Login {
	// public
	private static redisClient = RedisService.getInstance()
		.getBullOptions()
		.createClient();

	/**
   * Signin a Customer
   * @route POST /api/auth/signin-customer
   * customer
   */
	public static async customer(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		passport.authenticate("local", (err: any, user: any, info: any) => {
			if (err) {
				Log.error(err.message);
				return next(err);
			}
			if (!user) {
				return res.status(400).json({
					status: "Unauthorized",
					message: "Email or Password incorrect",
				});
			}

			req.login(user, async (err: any) => {
				let accessToken;
				let refreshToken;
				let customerDoc;
				let jwtPayload;
				let ipAddress;
				let device;
				let redisUser;
				let tokenDoc;
				let otpCode;

				if (err) {
					return res.status(400).json({
						message: err.message,
					});
				}

				try {
					customerDoc = await Customer.aggregate([
						{ $match: { user: new ObjectId(user._id) } },
						{
							$lookup: {
								from: "roles",
								localField: "role",
								foreignField: "_id",
								as: "role",
							},
						},
						{ $unwind: "$role" },
						{ $addFields: { role: "$role.name" } },
					]).exec();

					customerDoc = customerDoc[0];
				} catch (error: any) {
					return res.status(500).json({
						message: error.message,
					});
				}

				if (!customerDoc) {
					return res.status(400).json({
						message: "No such Customer",
					});
				}

				jwtPayload = {
					userRef: user._id,
					userType: user.type,
					role: customerDoc.role,
					customerRef: customerDoc._id,
				};

				refreshToken = jwt.sign(jwtPayload, Locals.config().jwtRefreshSecret, {
					expiresIn: Locals.config().refreshJwtExpiresIn,
				});

				accessToken = jwt.sign(
					Object.assign(jwtPayload, { refreshToken }),
					Locals.config().jwtAccessSecret,
					{
						expiresIn: Locals.config().accessJwtExpiresIn,
					}
				);

				ipAddress =
					((req.headers["x-forwarded-for"] as string) || "").split(",").pop() ||
					req.socket.remoteAddress ||
					"";

				device = req.headers["user-agent"] || "";

				try {
					redisUser = await Login.redisClient.get(user._id);

					if (redisUser && validator.isJSON(redisUser)) {
						redisUser = JSON.parse(redisUser);
					}
				} catch (error: any) {
					Log.error(`${error.message}`);

					return res.status(500).json({ message: error.message });
				}

				if (!Check.isNewLoginDevice(device, ipAddress, redisUser)) {
					try {
						await Login.redisClient.set(
							jwtPayload.userRef,
							JSON.stringify({
								refreshToken,
								knownClients: redisUser.knownClients,
								expiresAt: moment().add(30, "days").valueOf(),
							})
						);
					} catch (error: any) {
						Log.error(`${error.message}`);

						return res.status(500).json({ message: error.message });
					}

					return res.status(200).json({
						message: "successfully logged in",
						accessToken,
					});
				}

				//  start new device login verification
				otpCode = await Gen.generateOtpToken();

				try {
					tokenDoc = new Token({
						user: user._id,
						kind: "local",
						code: otpCode,
						expiresAt: moment().add(10, "minutes").valueOf(),
					});

					await tokenDoc.save();
				} catch (error: any) {
					Log.error(`${error.message}`);

					return res.status(500).json({ message: error.message });
				}

				// Prepare res.local variables
				res.locals.mwData = {
					userDoc: user,
					tokenDoc,
				};

				return res.status(200).json({
					message: "Please verify this device",
					status: "new_device_login_verification",
				});
			});
		})(req, res, next);
	}
}
