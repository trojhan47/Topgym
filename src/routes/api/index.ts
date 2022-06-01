import { Router } from "express";
import auth from "./auth";
import Log from "../../middlewares/Log";
import SubCtr from "../../controllers/Api/Auth/Subscription";
import ContactCtr from "../../controllers/Api/Auth/ContactUs";
import Passport from "../../providers/Passport";
import ContactMdw from "../../middlewares/Routes/Contact";

const router = Router();

router.get("/", (req, res) => {
	Log.info("464646464664");
	return res.status(200).json({ message: "success" });
});

router.use("/auth", auth);
router.get("/sub", Passport.isAuthenticated, SubCtr.price);
router.post(
	"/contactUs",
	[Passport.isAuthenticated, ContactMdw.onSuccessfulContactUsMessage],
	ContactCtr.send
);

export default router;
