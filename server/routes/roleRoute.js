import { Router } from "express";
import indexController from "../controllers/indexController.js";
import { verifyAdmin } from "../middlewares/verifyToken.js";

const router = Router();
// Middleware
router.use(verifyAdmin);

router.get("/", indexController.roleController.getAllRole);
router.get("/:id", indexController.roleController.getOneRole);
router.post("/", indexController.roleController.createRole);
router.delete("/:id", indexController.roleController.deleteRole);

export default router;
