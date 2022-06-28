import { Router } from "express";

import RoleCtr from "../../controllers/Api/Role";
import AccessControlMw from "../../middlewares/Routes/AccessControl";

const router = Router();

router.post("/create", AccessControlMw.canCreate(["role"]), RoleCtr.createOne);

router.get("/", AccessControlMw.canRead(["role"]), RoleCtr.getMany);

router.get("/:roleRef", AccessControlMw.canRead(["role"]), RoleCtr.getOne);

router.post(
	"/update/:roleRef",
	AccessControlMw.canUpdate(["role"]),
	RoleCtr.updateOne
);

router.post(
	"/edit-permissions/:roleRef",
	AccessControlMw.canUpdate(["role"]),
	RoleCtr.editPermissions
);

router.post(
	"/delete/:roleRef",
	AccessControlMw.canDelete(["role"]),
	RoleCtr.deleteOne
);

export default router;
