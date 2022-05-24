import { Router } from "express";
import auth from "./auth";
import Log from "../../middlewares/Log";

const router = Router();

router.get("/", (req, res) => {
	Log.info("464646464664");
	return res.status(200).json({ message: "success" });
});

router.use("/auth", auth);

export default router;
