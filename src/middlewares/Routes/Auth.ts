/**
 * @author Oyetunji Atilade <atiladeoyetunji@gmail.com>
 * @desc Middleware to handle on successful customer registration
   @desc  Endpoint /api/Auth/Signup-customer
   @access Public
 */

import { Request, Response, NextFunction } from "express";
import sendMail from "../../services/mail";

class Auth {
	/**
   * onSuccessfulCustomerRegistration
   */
	public static onSuccessfulCustomerRegistration(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		res.on("finish", async () => {
			// called only on 200 statusCode

			if (res.statusCode === 200) {
				const { user, token } = res.locals.mwData;

				await sendMail.send(user.email, "verify email", {
					token: token.code,
					name: user.name,
				});
			}
		});
		next();
	}

	/**
   * onResetPassword
   */
	public static onRequestLink(req: Request, res: Response, next: NextFunction) {
		res.on("finish", async () => {
			// called only on 200 statusCode

			if (res.statusCode === 200) {
				const { userDoc, tokenDoc, link } = res.locals.mwData;

				await sendMail.send(userDoc.email, "reset password", {
					token: tokenDoc.code,
					name: userDoc.name,
					link,
				});
			}
		});
		next();
	}
}

export default Auth;
