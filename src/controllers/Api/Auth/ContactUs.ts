/**
 * @author Oyetunji Atilade <atiladeoyetunji@gmail.com>
 * @desc subscription pricing
 * @access Private
 *
 */

import { Request, Response } from "express";
import validator from "validator";

class ContactUs {
	/**
   * send
   */
	public static async send(req: Request, res: Response) {
		const { name, email, telephone, message } = req.body;

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
		// check for empty message field
		if (validator.isEmpty(message, { ignore_whitespace: true })) {
			return res.status(400).json({
				message: "message field cannot be blank",
			});
		}

		// check for bad  message type
		if (typeof message !== "string") {
			return res.status(400).json({
				message: "message should be a string",
			});
		}

		res.locals.mwData = {
			name,
			email,
			telephone,
			message,
		};

		return res.status(200).json({
			message: "Your message has been sent successfully",
		});
	}
}

export default ContactUs;
