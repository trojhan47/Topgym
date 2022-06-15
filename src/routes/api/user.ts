import { Router } from "express";
import User from "../../controllers/Api/User";
import Staff from "../../controllers/Api/Subscription";

import Passport from "../../providers/Passport";

const router = Router();

router.get("/account", Passport.isAuthenticated, User.getAccount);
router.get("/getSub", Passport.isAuthenticated, Staff.getSubscriptionByType);

export default router;
