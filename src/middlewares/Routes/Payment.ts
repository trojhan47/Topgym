/**
 * Define the Payment Middlewares
 *
 *  @author Kennedy Oseni <kennyose01@gmail.com>
 */

 import { Request, Response, NextFunction } from "express";
 import validator from "validator";

 import TransactionRest from "../../rest/TransactionRest";

 import Log from "../../middlewares/Log";

 class PaymentMw {
		/**
    * Triggered on 200 statusCode.
    * @middleware POST /api/payment/verify/:paymentRef
    */
		public static onSuccessfulPayment(
			req: Request,
			res: Response,
			next: NextFunction
		) {
			res.on("finish", async () => {
				// Handle only on 200 statusCode
				if (res.statusCode === 200 && res.locals.mwData) {
					const { customerRef } = res.locals.user;
					const { paymentData } = res.locals.mwData;

					try {
						// create credit transaction
						await TransactionRest.createCredit({
							account: customerRef,
							accountType: "Customer",
							paystackRef: paymentData.reference,
							amount: paymentData.amount, // value is in kobo
							meta: paymentData,
						});
					} catch (error: any) {
						Log.error(`${error.message}`);
					}
				}
			});

			return next();
		}
 }

 export default PaymentMw;