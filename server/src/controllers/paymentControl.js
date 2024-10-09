const dotenv = require("dotenv");
const { v4: uuidv4 } = require("uuid");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); 
const createPayment = async (req, res) => {
  const { cart, paymentMethodId, email } = req.body;
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const idempotencyKey = uuidv4();
  try {
    const customer = await stripe.customers.create({
      email: email,
      payment_method: paymentMethodId,
    });

    const paymentIntent = await stripe.paymentIntents.create(
      {
        amount: total * 100,
        currency: "usd",
        customer: customer.id,

        description: `purchase of items`,
        payment_method: paymentMethodId,
        off_session: true,
        confirm: true,
      },
      { idempotencyKey }
    );

    res.status(200).json(paymentIntent);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};
module.exports = createPayment;
