import { Router } from "express";
import indexController from "../controllers/indexController.js";

const router = Router();

router.post("/register", indexController.authController.registration);
router.post("/login", indexController.authController.login);
router.get("/logout", indexController.authController.logout);

export default router;
