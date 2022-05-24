import { Router } from "express";
import AuthMw from "../../middlewares/Routes/Auth";
import RegisterCtr from "../../controllers/Api/Auth/Register";
import ResetCtr from "../../controllers/Api/Auth/resetPassword";

const router = Router();

router.post(
	"/signup-customer",
	AuthMw.onSuccessfulCustomerRegistration,
	RegisterCtr.customer
);
router.post("signin-customer");
router.post(
	"/request-reset-password-link",
	AuthMw.onRequestLink,
	ResetCtr.requestLink
);

router.get("/verify-request-password-token/:code", ResetCtr.verifyToken);
router.post("/reset-password", ResetCtr.reset);
// router.post("signup-staff");
router.post("signin-staff");

export default router;
