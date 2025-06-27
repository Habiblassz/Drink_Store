const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
	if (req.method !== "POST") return res.status(405).end();

	try {
		const { items } = req.body;
		const session = await stripe.checkout.sessions.create({
			line_items: items.map((item) => ({
				price: item.id,
				quantity: item.quantity,
			})),
			mode: "payment",
			success_url: `${process.env.NEXT_PUBLIC_URL}/success`,
			cancel_url: `${process.env.NEXT_PUBLIC_URL}/cancel`,
		});
		res.json({ url: session.url });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: err.message });
	}
};
