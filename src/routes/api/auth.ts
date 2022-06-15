import { Router } from "express";
import AuthMw from "../../middlewares/Routes/Auth";
import RegisterCtr from "../../controllers/Api/Auth/Register";
import LoginCtr from "../../controllers/Api/Auth/Login";
import ResetCtr from "../../controllers/Api/Auth/ResetPassword";
import ChangeEmailCtr from "../../controllers/Api/Auth/ChangeEmail";
import Passport from "../../providers/Passport";

const router = Router();

router.post(
	"/signup-customer",
	AuthMw.onSuccessfulCustomerRegistration,
	RegisterCtr.customer
);

router.post("/verify-email", RegisterCtr.customerAccountVerification);
router.post(
	"/signin-customer",
	AuthMw.onSuccessfulCustomerLoginFromNewDevice,
	LoginCtr.customer
);
router.post(
	"/signin-customer/verify-newdevice-login",
	LoginCtr.verifyNewDeviceLogin
);

router.post(
	"/request-reset-password-link",
	AuthMw.onRequestLink,
	ResetCtr.requestLink
);

router.get("/verify-request-password-token/:code", ResetCtr.verifyToken);
router.post("/reset-password", ResetCtr.reset);

// Change email routes
router.post(
	"/request-change-email-link",
	[Passport.isAuthenticated, AuthMw.onRequestChangeEmailLink],
	ChangeEmailCtr.requestLink
);
router.get("/verify-change-email-token/:code", ChangeEmailCtr.verifyToken);
router.post("/change-email", ChangeEmailCtr.reset);

// router.post("signup-staff");
router.post("signin-staff");

export default router;
