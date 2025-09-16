import { Router } from "express";
import { Authenticate } from "../middlewares/authentication.js";
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
  Authenticate,
  authorize(["admin"]),
  upload.single("file"),
  createProduct
);
productRouter.post(
  "/update/:id",
  Authenticate,
  authorize(["admin"]),
  updateProduct
);
productRouter.delete(
  "/delete/:id",
  Authenticate,
  authorize(["admin"]),
  deleteProduct
);
productRouter.get("/:id", Authenticate, getProduct);
productRouter.get("/", Authenticate, getProducts);

export default productRouter;
