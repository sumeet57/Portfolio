import Order from "../models/order.model.js";
import Payment from "../models/payment.model.js";
import Cart from "../models/cart.model.js";
export const paymentResponse = async (req, res) => {
  const { order, payment, customer_details } = req.body.data;

  console.log("\n\n===================================");
  console.log("payment response webhook called");
  console.log("Order ID:", order.order_id);
  console.log("Payment amount:", payment.payment_amount);
  console.log("Payment Status:", payment.payment_status);
  console.log("Customer Details:", customer_details);
  console.log("===================================\n\n");

  const paymentSchema = await Payment.findById(order.order_id);
  if (!paymentSchema) {
    console.log("Payment record not found for ID:", order.order_id);
    return res.status(404).json({ message: "Payment record not found." });
  } else {
    paymentSchema.status =
      payment.payment_status === "SUCCESS"
        ? "completed"
        : payment.payment_status === "FAILED"
        ? "failed"
        : payment.payment_status === "USER_DROPPED"
        ? "cancelled"
        : "processing";
  }

  if (paymentSchema.status === "completed") {
    const orderSchema = await Order.create({
      user: paymentSchema.user,
      product: paymentSchema.product,
      amount: payment.payment_amount,
    });
    await orderSchema.save();

    try {
      let cart = await Cart.findOne(paymentSchema.user);

      if (cart) {
        const productExists = cart.products.includes(paymentSchema.product);

        if (productExists) {
          return res
            .status(409)
            .json({ message: "Product is already in the cart." });
        }

        cart.products.push(paymentSchema.product);
        await cart.save();
        return res
          .status(200)
          .json({ message: "Product added to existing cart.", cart });
      } else {
        const newCart = await Cart.create({
          user: userId,
          products: [paymentSchema.product],
        });
        return res
          .status(200)
          .json({ message: "Cart created and product added.", cart: newCart });
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      res.status(500).json({ message: "Server error while adding to cart." });
    }
  }

  await paymentSchema.save();
  res.status(200).json({ message: "Payment response received." });
};
