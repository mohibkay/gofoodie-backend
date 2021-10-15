const express = require("express");
const cors = require("cors");
const checkoutRoutes = require("./routes/checkoutRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
require("./db");

const app = express();
const PORT = process.env.PORT || 3030;

app.use(cors());
app.use(checkoutRoutes);
app.use(express.json());
app.use(paymentRoutes);

app.get("/", (req, res) => {
  res.send(`Working! at ${PORT}`);
});

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
