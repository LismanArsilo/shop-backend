import { Router } from "express";
import indexController from "../controllers/indexController.js";
import { verifyAdmin, verifySeller } from "../middlewares/verifyToken.js";

const router = Router();

router.get("/", verifyAdmin, indexController.storeController.getAllStore);
router.get(
  "/:userId",
  verifySeller,
  indexController.storeController.getAllSellerStore
);
router.post("/", indexController.storeController.createStore);

export default router;
