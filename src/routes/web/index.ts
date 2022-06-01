import { Router } from "express";

import Statics from "../../middlewares/Statics";
import ClientAppCtr from "../../controllers/Web";

const router = Router();
router.use(Statics.clientStatic);

router.get(
	[
		"/",
		"/dashboard",
		"/auth/signup",
		"/auth/login",
		"/about",
		"/contact",
		"/subscription",
		"/auth/passwordRequest",
		"/auth/passwordReset",
		"/error404",
		"/error500",
		"/profile",
		"/settings",
		"/paymentHistory",
		"/terms",
	],
	ClientAppCtr.sendClient
);

export default router;
