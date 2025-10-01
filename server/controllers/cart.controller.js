import Cart from "../models/cart.model.js";
import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";

// cashfree integration
import { Cashfree, CFEnvironment } from "cashfree-pg";
const clientId = process.env.CASHFREE_CLIENT_ID;
const clientSecret = process.env.CASHFREE_SECRET_ID;
const cashfree = new Cashfree(CFEnvironment.SANDBOX, clientId, clientSecret);

export const getCart = async (req, res) => {
  const userId = req.userId;
  try {
    const cart = await Cart.find({ user: userId }).populate("products");
    if (!cart) {
      return res.status(404).json({ message: "Cart not found." });
    }

    res.status(200).json({ data: cart });
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ message: "Server error while fetching cart." });
  }
};

export const addToCart = async (req, res) => {
  const userId = req.userId;
  const { productId } = req.params;

  try {
    let cart = await Cart.findOne({ user: userId });

    if (cart) {
      const productExists = cart.products.includes(productId);

      if (productExists) {
        return res
          .status(409)
          .json({ message: "Product is already in the cart." });
      }

      cart.products.push(productId);
      await cart.save();
      return res
        .status(200)
        .json({ message: "Product added to existing cart.", cart });
    } else {
      const newCart = await Cart.create({
        user: userId,
        products: [productId],
      });
      return res
        .status(200)
        .json({ message: "Cart created and product added.", cart: newCart });
    }
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Server error while adding to cart." });
  }
};

export const checkout = async (req, res) => {
  const userId = req.userId;
  const { productId, userAddress, userPhone, userMessage, userPincode } =
    req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const productIsAvailable = product.stock > 0;
    if (!productIsAvailable) {
      return res.status(400).json({ message: "Product is out of stock." });
    }
    product.stock -= 1;
    await product.save();

    const order = await Order.create({
      user: req.userId,
      product: productId,
      amount: product.price,
      userAddress,
      userPhone,
      userMessage,
      userPincode,
    });

    await order.save();

    const order_data = {
      order_amount: product.price,
      order_currency: "INR",
      order_id: order._id.toString(),
      customer_details: {
        customer_id: userId,
        customer_phone: userPhone,
        customer_email: user.email,
        customer_name: user.name,
      },
      order_meta: {
        return_url: `${process.env.CLIENT_URL}/shop/${productId}/success/${order._id}`,
        notify_url: `${process.env.SERVER_URL}/api/payments/webhook`,
        payment_methods: "upi",
      },
      cart_details: {
        cart_items: [
          {
            item_id: product._id,
            item_name: product.name,
            item_description: product.projectContext,
            item_price: product.price,
            item_quantity: 1,
            item_currency: "INR",
            item_category: product.category,
          },
        ],
      },
      order_expiry_time: new Date(
        Date.now() + 1 * 60 * 60 * 1000
      ).toISOString(), // 2 minutes from now
      order_note: `Order for ${product.name}`,
    };
    const response = await cashfree.PGCreateOrder(order_data);
    console.log("Cashfree create order response:", response);
    if (response.data.payment_session_id) {
      res.status(200).json({
        order,
        paymentLink: response.data.payment_link,
        paymentSessionId: response.data.payment_session_id,
      });
    } else {
      res.status(500).json({ message: "Failed to create payment session." });
    }
  } catch (error) {
    console.error("Error during checkout:", error);
    res.status(500).json({ message: "Server error during checkout." });
  }
};
