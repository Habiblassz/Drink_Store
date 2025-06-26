require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const express = require("express");
var cors = require("cors");

const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

const port = process.env.PORT || 4000;
const clientUrl = process.env.CLIENT_URL || `http://localhost:${port}`;

app.post("/checkout", async (req, res) => {
	console.log(req.body);
	const client = `${req.protocol}://${req.get("host")}`;

	const items = req.body.items;
	let lineItems = [];
	items.forEach((item) => {
		lineItems.push({
			price: item.id,
			quantity: item.quantity,
		});
	});

	const session = await stripe.checkout.sessions.create({
		line_items: lineItems,
		mode: "payment",
		success_url: `${client}/success`,
		cancel_url: `${client}/cancel`,
	});

	res.send(
		JSON.stringify({
			url: session.url,
		})
	);
});

app.listen(port, () => console.log(`Server running on port ${port}`));
