const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
    "sk_test_51KsOEdSGrxszazGjDOgXpYPJu3038XMx4xfGIkOfN3OGz1c4Wz5BGg3Yeotlr9zpK17VqkL3BVlTcplj5FSgZm1k00R8uEVuK6"
);

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (request, response) => response.status(200).send("hello word."));

app.post("/payment/create", async (request, response) => {
    const total = request.query.total;
    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "usd",
    });

    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    });
});

exports.api = functions.https.onRequest(app);
