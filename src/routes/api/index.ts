import { Router } from "express";
import auth from "./auth";
import user from "./user";
import staff from "./staff";
import Log from "../../middlewares/Log";
import Staff from "../../controllers/Api/Subscription";
import ContactCtr from "../../controllers/Api/ContactUs";
import Passport from "../../providers/Passport";
import ContactMdw from "../../middlewares/Routes/Contact";

const router = Router();

router.get("/", (req, res) => {
	Log.info("464646464664");
	return res.status(200).json({ message: "success" });
});

router.use("/auth", auth);
router.use("/user", user);
router.use("/staff", staff);
router.post(
	"/contactUs",
	ContactMdw.onSuccessfulContactUsMessage,
	ContactCtr.send
);

export default router;
