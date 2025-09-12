import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  amount: { type: Number, required: true, min: 1 },
  status: {
    type: String,
    enum: ["processing", "shipped", "delivered", "cancelled", "refunded"],
    default: "processing",
  },
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
