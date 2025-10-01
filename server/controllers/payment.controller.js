import Order from "../models/order.model.js";
import Payment from "../models/payment.model.js";
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
      userAddress: customer_details.customer_address || "Not Provided",
      userPhone: customer_details.customer_phone || "Not Provided",
      userMessage: customer_details.customer_message || "",
      userPincode: customer_details.customer_pincode || "000000",
    });
    await orderSchema.save();
  }

  await paymentSchema.save();
  res.status(200).json({ message: "Payment response received." });
};
