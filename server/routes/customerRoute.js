import { Router } from "express";
import indexController from "../controllers/indexController.js";
import { verifyCustomer } from "../middlewares/verifyToken.js";

const router = Router();

router.get(
  "/",
  verifyCustomer,
  indexController.customerController.getAllStoreLocUser
);

export default router;
