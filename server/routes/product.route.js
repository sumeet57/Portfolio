import { Router } from "express";
import { authenticate } from "../middlewares/Authentication.js";
import { authorize } from "../middlewares/Authorization.js";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../controllers/product.controller.js";
import { upload } from "../services/multer.service.js";

const productRouter = Router();

productRouter.post(
  "/create",
  authenticate,
  authorize(["admin"]),
  upload.single("file"),
  createProduct
);
productRouter.post(
  "/update/:id",
  authenticate,
  authorize(["admin"]),
  updateProduct
);
productRouter.delete(
  "/delete/:id",
  authenticate,
  authorize(["admin"]),
  deleteProduct
);
productRouter.get("/:id", authenticate, getProduct);
productRouter.get("/", authenticate, getProducts);

export default productRouter;
