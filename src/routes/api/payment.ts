import { Router } from "express";

import PaymentCtr from "../../controllers/Api/Payment";
import AccessControlMw from "../../middlewares/Routes/AccessControl";
import PaymentMw from "../../middlewares/Routes/Payment";
import PaymentSrv from "../../services/Payment";

const router = Router();

router.post("/verify", (req, res) => {
	res.status(200).json({ message: "successful" });
});
router.post(
	"/verify/:paymentRef",
	AccessControlMw.canCreate(["payment"]),
	PaymentMw.onSuccessfulPayment,
	PaymentCtr.verify
);

router.post("/handleWebhook/url", PaymentSrv.handleWebhook);

/*
router.post(
  "/repeat-credit",
  	AccessControlMw.canCreate(["payment"]),
	PaymentMw.onSuccessfulPayment,
	PaymentCtr.repeatCredit
)


router.get("/",  AccessControlMw.canRead(["payment"]), payment.getMany )
*/

export default router;
