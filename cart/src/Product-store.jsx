const productsArray = [
	{
		id: "price_1PniJgJzOyFsXLGFSfsmzlcy",
		title: "Premium Coffee",
		price: 4.99,
		category: "hot",
		image:
			"https://images.unsplash.com/photo-1511920170033-f8396924c348?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80",
		description:
			"Our signature blend of Arabica beans, roasted to perfection for a rich and smooth flavor with notes of chocolate and caramel.",
	},
	{
		id: "price_1RatcOJzOyFsXLGFyUOZvjAL",
		title: "Herbal Tea",
		price: 5.99,
		category: "hot",
		image:
			"https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80",
		description:
			"A soothing blend of chamomile, peppermint, and lemongrass to help you relax and unwind.",
	},
	{
		id: "price_1RatfQJzOyFsXLGFI32o872X",
		title: "Berry Smoothie",
		price: 6.99,
		category: "cold",
		image:
			"https://images.unsplash.com/photo-1505576399279-565b52d4ac71?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80",
		description:
			"A refreshing mix of strawberries, blueberries, and raspberries blended with Greek yogurt and honey.",
	},
	{
		id: "price_1PniTeJzOyFsXLGF7BbMC9Lg",
		title: "Hot Chocolate",
		price: 9.99,
		category: "hot",
		image:
			"https://images.unsplash.com/photo-1572490122747-3968b75cc699?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80",
		description:
			"Creamy Belgian chocolate melted into steamed milk, topped with whipped cream and chocolate shavings.",
	},
	{
		id: "price_1PniX5JzOyFsXLGFLMtdB0dS",
		title: "Lemon Punch",
		price: 5.99,
		category: "cold",
		image:
			"https://images.unsplash.com/photo-1551751299-1b51cab2694c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80",
		description:
			"A tangy and refreshing blend of fresh lemon juice, mint leaves, and sparkling water.",
	},
	{
		id: "price_1PniYEJzOyFsXLGFJ9dYb6Zb",
		title: "Margarita",
		price: 7.99,
		category: "cold",
		image:
			"https://images.unsplash.com/photo-1470337458703-46ad1756a187?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80",
		description:
			"Classic margarita with premium tequila, triple sec, and fresh lime juice, served with a salted rim.",
	},
	{
		id: "price_1RatijJzOyFsXLGFqhGwP0JW",
		title: "Iced Latte",
		price: 5.49,
		category: "cold",
		image:
			"https://images.unsplash.com/photo-1598880940080-ff9a29891b85?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80",
		description:
			"Espresso chilled and poured over ice with cold milk, customizable with flavored syrups.",
	},
	{
		id: "price_1RatjbJzOyFsXLGFDQRF6Fdf",
		title: "Chai Latte",
		price: 6.49,
		category: "hot",
		image:
			"https://images.unsplash.com/photo-1511920170033-f8396924c348?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80",
		description:
			"Spiced black tea steamed with milk, combining cinnamon, cardamom, and ginger for a warming drink.",
	},
	{
		id: "price_1RatkkJzOyFsXLGFXAgxEWuS",
		title: "Matcha Green Tea",
		price: 7.99,
		category: "hot",
		image:
			"https://images.unsplash.com/photo-1505576399279-565b52d4ac71?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80",
		description:
			"Premium ceremonial-grade matcha whisked to perfection with hot water or milk.",
	},
	{
		id: "price_1Ratm6JzOyFsXLGFhjT6Iehw",
		title: "Cold Brew",
		price: 5.99,
		category: "cold",
		image:
			"https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80",
		description:
			"Smooth cold-brewed coffee concentrate served over ice, less acidic than traditional iced coffee.",
	},
	{
		id: "price_1RatmaJzOyFsXLGFn2fSQidx",
		title: "Mango Smoothie",
		price: 6.99,
		category: "cold",
		image:
			"https://images.unsplash.com/photo-1603569283847-aa295f0d016a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80",
		description:
			"Tropical mango blended with yogurt and orange juice for a vitamin C boost.",
	},
	{
		id: "price_1RatmsJzOyFsXLGFFvV5tMQ6",
		title: "Espresso",
		price: 3.99,
		category: "hot",
		image:
			"https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80",
		description:
			"A concentrated shot of our finest coffee beans, extracted under high pressure for maximum flavor.",
	},
];

function getProductData(id) {
	let productData = productsArray.find((product) => product.id === id);
	if (productData == undefined) {
		console.log("Product data does not exist for ID: " + id);
		return undefined;
	}
	return productData;
}

export { productsArray, getProductData };
