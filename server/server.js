require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const express = require("express");
var cors = require("cors");

// const __dirname = import.meta.dirname;

const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

const port = process.env.PORT || 4000;

app.post("/checkout", async (req, res) => {
	console.log(req.body);

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
		success_url: `${process.env.SERVER_URL}/success`,
		cancel_url: `${process.env.SERVER_URL}/cancel`,
	});

	res.send(
		JSON.stringify({
			url: session.url,
		})
	);
});

// const ordersDB = new Map();
// const sessionToOrderMap = new Map();

// app.post("/checkout", async (req, res) => {
// 	try {
// 		const items = req.body.items;
// 		const lineItems = items.map((item) => ({
// 			price: item.id,
// 			quantity: item.quantity,
// 		}));

// 		const session = await stripe.checkout.sessions.create({
// 			line_items: lineItems,
// 			mode: "payment",
// 			success_url:
// 				"http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}",
// 			cancel_url: "http://localhost:5173/cancel",
// 		});

// 		// Store the order data with session ID
// 		const order = {
// 			id: `ord_${Date.now()}`,
// 			sessionId: session.id,
// 			items: items,
// 			amount_total: session.amount_total / 100, // Convert from cents to dollars
// 			status: "pending",
// 			created: new Date(),
// 		};

// 		ordersDB.set(order.id, order);
// 		sessionToOrderMap.set(session.id, order.id);

// 		res.json({
// 			url: session.url,
// 			sessionId: session.id,
// 		});
// 	} catch (error) {
// 		console.error("Checkout error:", error);
// 		res.status(500).json({ error: error.message });
// 	}
// });

// // Endpoint to fetch order by session ID
// app.get("/order/:sessionId", (req, res) => {
// 	try {
// 		const orderId = sessionToOrderMap.get(req.params.sessionId);
// 		if (!orderId) {
// 			return res.status(404).json({ error: "Order not found" });
// 		}

// 		const order = ordersDB.get(orderId);
// 		if (!order) {
// 			return res.status(404).json({ error: "Order not found" });
// 		}

// 		res.json(order);
// 	} catch (error) {
// 		console.error("Error fetching order:", error);
// 		res.status(500).json({ error: error.message });
// 	}
// });

app.listen(port, () => console.log(`Server running on port ${port}`));
