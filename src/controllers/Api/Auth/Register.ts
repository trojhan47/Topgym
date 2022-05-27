/**
 * @author Oyetunji Atilade <atiladeoyetunji@gmail.com>
 * @desc Register new User
   @access Public
 */

import { from } from "form-data";
import validator from "validator";
import { Request, Response } from "express";
import moment from "moment";

import User from "../../../models//User";
import Gen from "../../../utils/Gen";
import UserRole from "../../../models/Role";
import Customer from "../../../models/Customer";
import Token from "../../../models/Token";
import Log from "../../../middlewares/Log";

class Register {
	/**
   * Register new users
   * @route POST /api/auth/signup-customer
   */

	/**
   * customer
   */
	public async customer(req: Request, res: Response) {
		const type = "Customer";
		const { name, email, password, confirmPassword, telephone } = req.body;

		// check for empty name field
		if (validator.isEmpty(name, { ignore_whitespace: true })) {
			return res.status(400).json({
				message: " Name field cannot be blank",
			});
		}

		// check for bad  name type
		if (typeof name !== "string") {
			return res.status(400).json({
				message: "Name should be a string",
			});
		}

		// check for empty email field
		if (validator.isEmpty(email, { ignore_whitespace: true })) {
			return res.status(400).json({
				message: "E-mail field cannot be blank",
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

		// check for empty password field
		if (validator.isEmpty(password, { ignore_whitespace: true })) {
			return res.status(400).json({
				message: "Password field cannot be blank",
			});
		}

		// check for bad  password type
		if (!["string"].includes(typeof password)) {
			return res.status(400).json({
				message: " password should be a string",
			});
		}

		// check for empty confirm password field
		if (validator.isEmpty(confirmPassword, { ignore_whitespace: true })) {
			return res.status(400).json({
				message: " Confirm Password field cannot be blank",
			});
		}
		// check for bad confirm password type
		if (!["string"].includes(typeof confirmPassword)) {
			return res.status(400).json({
				message: "confirm password should be a string",
			});
		}

		// check for inequality between confirm password and password
		if (!validator.equals(password, confirmPassword)) {
			return res.status(400).json({
				message: "Confirm password does not match Password",
			});
		}

		// check for empty telephone field
		if (validator.isEmpty(telephone, { ignore_whitespace: true })) {
			return res.status(400).json({
				message: "Telephone cannot be blank",
			});
		}

		// check for bad telephone type
		if (!["string"].includes(typeof telephone)) {
			return res.status(400).json({
				message: "Telephone should be a string",
			});
		}
		// Check for invalid telephone number

		if (!validator.isMobilePhone(telephone, ["en-NG"], { strictMode: true })) {
			return res.status(400).json({
				message: "Invalid telephone",
			});
		}

		// Check if user exists
		const userExists = await User.findOne({ email });
		if (userExists) {
			res.status(400).json({
				message: "user already exists",
			});
		}

		// Create role for Users
		const userRole = await UserRole.create({
			name: type,
			type,
		});

		// Create User

		/*  const user = await User.create({
      name,
      email,
      type,
      telephone,
      password, // hashedPassword,
    });

		*/

		const userDoc = new User({
			name,
			email,
			type,
			telephone,
			// username:email,
		});

		const user = await User.register(userDoc, password);

		if (user) {
			Log.info("created");
			/**	res.status(201).json({
				_id: user.id,
				name: user.name,
				email: user.email,
				accountType: user.type,
				telephone: user.telephone,
				subscriptionStatus: user.subscriptionStatus,
			});
       */
		} else {
			res.status(400);
			throw new Error("Invalid user data");
		}

		// Generate customerRef

		const customRef = await Gen.generateCustomerRef;

		// Create Customer

		const customer = await Customer.create({
			user: user._id,
			name: userRole.name,
			ref: customRef,
			role: userRole._id,
		});
		if (!customer) {
			return res.status(500).json({
				message: "Unable to create customer",
			});
		}

		// Verification
		const tokenCode = await Gen.generateVerificationToken();

		const token = await Token.create({
			user: user._id,
			kind: "local",
			code: tokenCode,
			expiresAt: moment().add(10, "minutes").valueOf(),
		});

		// Save to local variables

		res.locals.mwData = {
			user,
			token,
		};

		res.status(200).json({
			message: "Please verify your phone email",
		});
	}

	/**
   * @desc Verify user account
   * customerAccountVerification
   */
	public async customerAccountVerification(req: Request, res: Response) {
		const { code = "" } = req.body;
		let tokenDoc;
		let userDoc;
		let updatedUserDoc;

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

		try {
			updatedUserDoc = await User.updateOne(
				{ _id: tokenDoc?.user },
				{ $set: { isEmailVerified: true, active: true } },
				{ runValidators: true }
			);
		} catch (error: any) {
			return res.status(500).json({ message: error.message });
		}
		if (!updatedUserDoc) {
			res.status(400).json({
				message: "Unable to verify User",
			});
		}
		return res.status(200).json({
			message: "Account verified",
		});
	}
}

export default new Register();
