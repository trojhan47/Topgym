import { Router } from "express";

import Passport from "../../providers/Passport";
import Staff from "../../controllers/Api/Subscription";

const router = Router();

router.get("/sub", Passport.isAuthenticated, Staff.listSubscriptions);
router.post("/addSub", Passport.isAuthenticated, Staff.createSubscription);

export default router;
