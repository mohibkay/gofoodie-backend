const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const mail = require("@sendgrid/mail");
const Order = require("../models/order");
const User = require("../models/user");
const { getHTMLText, getShippingAddress } = require("../utils/common");
const Router = express.Router();

mail.setApiKey(process.env.SENDGRID_API_KEY);

Router.post(
  "/checkout-success",
  bodyParser.raw({ type: "application/json" }),
  async (req, res) => {
    try {
      const signature = req.headers["stripe-signature"];
      const event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET_KEY
      );

      if (event.type === "checkout.session.completed") {
        const { metadata: user, client_reference_id } = event.data.object;

        const [orderDetails] = await Order.find({
          order_id: client_reference_id,
        });

        const { email, order } = orderDetails;

        const customer = new User(user);
        await customer.save();

        const message = getHTMLText(
          user.first_name,
          order,
          client_reference_id,
          getShippingAddress(user)
        );

        const mailOptions = {
          from: process.env.EMAIL, // sender email address
          to: email, // receiver email address
          subject: "gofoodie - Your order is placed successfully.",
          html: message,
        };

        mail.send(mailOptions);
      }

      return res.status(200).send({ success: true });
    } catch (error) {
      return res.status(400).send("Something went wrong. Try again later.");
    }
  }
);

module.exports = Router;
