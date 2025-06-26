require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const express = require("express");
var cors = require("cors");

const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, "../cart/dist")));

// Handle requests by serving index.html for all routes
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "../cart/dist", "index.html"));
});

const port = process.env.PORT || 4000;

app.post("/checkout", async (req, res) => {
	console.log(req.body);
	const client = process.env.CLIENT_URL || "http://localhost:5173";
	console.log("Client URL:", client);

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
