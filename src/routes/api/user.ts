import { Router } from "express";
import User from "../../controllers/Api/User";
import Staff from "../../controllers/Api/Subscription";

import AccessControlMdw from "../../middlewares/Routes/AccessControl";
import MediaMw from "../../middlewares/Routes/Media";

import MediaSrv from "../../services/Media";

import Passport from "../../providers/Passport";

const router = Router();

router.get("/account", Passport.isAuthenticated, User.getAccount);
router.post(
	"/account",
	AccessControlMdw.canUpdate(["user"]),
	MediaSrv.parseRequest,
	MediaMw.checkBadImageType,
	User.updateAccount
);
router.get("/getSub", Passport.isAuthenticated, Staff.getSubscriptionByType);

export default router;
