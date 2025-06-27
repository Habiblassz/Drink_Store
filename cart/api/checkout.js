// require("dotenv").config();
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
// const express = require("express");
// var cors = require("cors");
// const path = require("path");

// const app = express();
// app.use(cors());
// app.use(express.static("public"));
// app.use(express.json());

// const port = process.env.PORT || 4000;

// app.post("/checkout", async (req, res) => {
// 	console.log(req.body);
// 	const client = process.env.CLIENT_URL || "http://localhost:5173";
// 	console.log("Client URL:", client);

// 	const items = req.body.items;
// 	let lineItems = [];
// 	items.forEach((item) => {
// 		lineItems.push({
// 			price: item.id,
// 			quantity: item.quantity,
// 		});
// 	});

// 	const session = await stripe.checkout.sessions.create({
// 		line_items: lineItems,
// 		mode: "payment",
// 		success_url: `${client}/success`,
// 		cancel_url: `${client}/cancel`,
// 	});

// 	res.send(
// 		JSON.stringify({
// 			url: session.url,
// 		})
// 	);
// });

// app.listen(port, () => console.log(`Server running on port ${port}`));

require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
	if (req.method !== "POST") {
		return res.status(405).json({ error: "Method not allowed" });
	}

	try {
		const { items } = req.body;

		const session = await stripe.checkout.sessions.create({
			line_items: items.map((item) => ({
				price: item.id,
				quantity: item.quantity,
			})),
			mode: "payment",
			success_url: `${process.env.CLIENT_URL}/success`,
			cancel_url: `${process.env.CLIENT_URL}/cancel`,
		});

		return res.status(200).json({ url: session.url });
	} catch (err) {
		console.error("Stripe error:", err);
		return res.status(500).json({ error: "Checkout failed" });
	}
};
