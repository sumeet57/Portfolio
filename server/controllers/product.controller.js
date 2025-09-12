import Product from "../models/product.model.js";

export const createProduct = async (req, res) => {
  const { name, description, price, stock, category } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

  if (!imageUrl) {
    return res.status(400).json({ message: "Image upload failed." });
  }
  try {
    const newProduct = new Product({
      user: req.userId,
      name,
      description,
      price,
      imageUrl,
      stock,
      category,
    });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while creating product." });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, stock, category } = req.body;

  const userexist = req.userId;
  if (!userexist) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const exist = await Product.findById(id);
  if (!exist) {
    return res.status(404).json({ message: "Product not found." });
  }

  try {
    const updatedData = {
      name: name || exist.name,
      description: description || exist.description,
      price: price !== undefined ? price : exist.price,
      stock: stock !== undefined ? stock : exist.stock,
      category: category || exist.category,
    };

    await Product.findByIdAndUpdate(id, updatedData, { new: true });
    res.status(200).json({ message: "Product updated successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while updating product." });
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
