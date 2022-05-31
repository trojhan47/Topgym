/**
 * Define the Resetemail logic
 *
 * @author Oyetunji Atilade <atiladeoyetunji@gmail.com>
 */

import { Request, Response } from "express";
import validator from "validator";

import moment from "moment";
import User from "../../../models/User";

import Gen from "../../../utils/Gen";
import Log from "../../../middlewares/Log";
import Token from "../../../models/Token";
import Locals from "../../../providers/Locals";

class ChangeEmail {
	/**
   *  Request a Resetemail Link.
   *  @Route POST /api/auth/request-change-email-link
   */

	public static async requestLink(req: Request, res: Response) {
		const user = res.locals.user.userRef;

		let tokenDoc;
		let userDoc;

		userDoc = await User.findOne({
			_id: user,
		});
		if (!userDoc) {
			return res.status(400).json({
				message: " we were unable to find a user with that email",
			});
		}

		// Generate slug Token
		const tokenCode = await Gen.generateSlugToken();

		try {
			tokenDoc = new Token({
				user: userDoc._id,
				kind: "local",
				code: tokenCode,
				expiresAt: moment().add(10, "minutes").valueOf(),
			});

			await tokenDoc.save();
		} catch (error: any) {
			Log.error(`${error.message}`);
		}

		// Create change email link
		const link = `${
			Locals.config().url
		}/api/auth/verify-change-email-token/${tokenCode}`;

		// Prepare res.locals variables
		res.locals.mwData = {
			userDoc,
			tokenDoc,
			link,
		};
		// res.send(res.locals.user);
		return res.status(200).json({
			message: "Your change email link has been sent to your registered email",
		});
	}

	/**
   * Verify a User token from the request reset link.
   * @route GET/api/auth/verify-request-password-token/:code
   * verifyToken
   */
	public static async verifyToken(req: Request, res: Response) {
		const { code = "" } = req.params;
		let tokenDoc;
		let userDoc;

		if (!code) {
			return res.redirect("/error/bad-token");
		}

		try {
			tokenDoc = await Token.findOne({
				code,
				expiresAt: { $gt: new Date() },
			});

			userDoc = await User.findOne({
				_id: tokenDoc?.user,
			});
		} catch (error: any) {
			return res.redirect("/error/500");
		}

		if (!tokenDoc) {
			return res.redirect("/error/bad-token");
		}

		if (!userDoc) {
			return res.redirect("/error/user-not-found");
		}

		res.cookie("tokenRef", code, {
			httpOnly: true,
		});
		return res.redirect("/auth/change-email"); // email reset page
	}

	/**
   * Resets the email after verifying token
   * reset
   * @route POST /api/auth/change-email
   */
	public static async reset(req: Request, res: Response) {
		const { tokenRef = "" } = req.cookies;
		const { email = "", confirmEmail = "" } = req.body;
		let tokenDoc;
		let userDoc;
		let sanitizedEmail;
		let updatedUserDoc;

		if (!tokenRef) {
			return res.status(400).json({ message: "Bad token " });
		}

		// check for empty email field
		if (validator.isEmpty(email, { ignore_whitespace: true })) {
			return res.status(400).json({
				message: "E-mail cannot be blank",
			});
		}
		// check for bad  email type
		if (typeof email !== "string") {
			return res.status(400).json({
				message: "email should be a string",
			});
		}

		// check for invalid email
		if (!validator.isEmail(email)) {
			return res.status(400).json({
				message: "E-mail is not valid",
			});
		}
		// Check for empty confirmEmail
		if (validator.isEmpty(confirmEmail, { ignore_whitespace: true })) {
			return res.status(400).json({
				message: "confirmEmail field cannot be empty",
			});
		}

		if (!["string"].includes(typeof confirmEmail)) {
			return res.status(400).json({
				message: "confirmEmail should be a string",
			});
		}

		// Check for inequality between email and confirmEmail
		if (!validator.equals(email, confirmEmail)) {
			return res.status(400).json({
				message: "confirmEmail does not match email",
			});
		}

		// define verifiedEmail

		sanitizedEmail = validator.normalizeEmail(email, {
			gmail_remove_dots: false,
		});

		try {
			tokenDoc = await Token.findOne({
				code: tokenRef,
				expiresAt: { $gt: new Date() },
			});

			userDoc = await User.findOne({
				_id: tokenDoc?.user,
			});
		} catch (error: any) {
			return res.status(500).json({
				message: error.message,
			});
		}

		if (!tokenDoc) {
			return res.status(400).json({ message: "Bad token" });
		}

		if (!userDoc) {
			return res.status(400).json({ message: " could not find account" });
		}

		try {
			updatedUserDoc = await User.updateOne(
				{ _id: tokenDoc?.user },
				{ $set: { email: `${sanitizedEmail}` } },
				{ runValidators: true }
			);
		} catch (error: any) {
			return res.status(500).json({ message: error.message });
		}
		if (!updatedUserDoc) {
			res.status(400).json({
				message: "Unable to  User email",
			});
		}

		/* delete token used to reset email from cookie and database */
		tokenDoc.remove();
		res.cookie("tokenRef", null);

		// Prepare res.local variables
		res.locals.mwData = {
			userDoc,
		};

		return res.status(200).json({
			message: "Email successfully changed",
		});
	}
}

export default ChangeEmail;
