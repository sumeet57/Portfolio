import Product from "../models/product.model.js";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";
export const createProduct = async (req, res) => {
  const {
    name,
    projectContext,
    description,
    price,
    stock,
    category,
    features,
    includes,
  } = req.body;
  const image = req.file ? req.file.path : null;

  if (!image) {
    return res.status(400).json({ message: "Image upload failed." });
  }
  try {
    const featuresArray = JSON.parse(features);
    const includesArray = JSON.parse(includes);

    const newProduct = new Product({
      user: req.userId,
      name,
      projectContext,
      description,
      price,
      imageUrl: image,
      stock,
      category,
      features: featuresArray,
      includes: includesArray,
    });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while creating product." });
  }
};

export const updateProduct = async (req, res, next) => {
  const { id } = req.params;
  const {
    name,
    projectContext,
    description,
    price,
    stock,
    category,
    features,
    includes,
  } = req.body;

  try {
    const featuresArray = features ? JSON.parse(features) : undefined;
    const includesArray = includes ? JSON.parse(includes) : undefined;
    const productToUpdate = await Product.findById(id);

    if (!productToUpdate) {
      return res.status(404).json({ message: "Product not found." });
    }

    const oldImagePath = productToUpdate.imageUrl;
    const updateData = {};

    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (price !== undefined) updateData.price = price;
    if (stock !== undefined) updateData.stock = stock;
    if (category !== undefined) updateData.category = category;
    if (projectContext !== undefined)
      updateData.projectContext = projectContext;
    if (featuresArray !== undefined) updateData.features = featuresArray;
    if (includesArray !== undefined) updateData.includes = includesArray;

    if (req.file) {
      updateData.imageUrl = path.join("uploads", req.file.filename);
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (req.file && oldImagePath) {
      const fullOldPath = path.join(process.cwd(), oldImagePath);
      try {
        await fs.unlink(fullOldPath);
      } catch (err) {
        console.error("Cleanup error: Failed to delete old image:", err);
      }
    }

    res.status(200).json({
      message: "Product updated successfully.",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Product update failed:", error);
    res.status(500).json({
      message: error.message || "Server error while updating product.",
    });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }
    res.status(200).json({ message: "Product deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while deleting product." });
  }
};

export const getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while fetching product." });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while fetching products." });
  }
};
