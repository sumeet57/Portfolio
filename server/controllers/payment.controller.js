export const paymentResponse = (req, res) => {
  console.log("\n\n================ Payment Response ================\n");
  console.log("Payment response received:", req.body);
  console.log("\n==================================================\n");
  res.status(200).json({ message: "Payment response received." });
};
