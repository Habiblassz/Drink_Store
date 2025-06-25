import { createContext, useState } from "react";
import { getProductData } from "./Product-store";
import { useEffect } from "react";

export const CartContext = createContext({
	items: [],
	getProductQuantity: () => {},
	addOneToCart: () => {},
	removeOneFromCart: () => {},
	deleteFromCart: () => {},
	getTotalCost: () => {},
});

export function CartProvider({ children }) {
	const [cartProducts, setCartProducts] = useState([]);

	function getProductQuantity(id) {
		const quantity = cartProducts.find(
			(product) => product.id === id
		)?.quantity;
		return quantity === undefined ? 0 : quantity;
	}

	function addOneToCart(id) {
		const quantity = getProductQuantity(id);

		if (quantity === 0) {
			setCartProducts([...cartProducts, { id: id, quantity: 1 }]);
		} else {
			setCartProducts(
				cartProducts.map((product) =>
					product.id === id
						? { ...product, quantity: product.quantity + 1 }
						: product
				)
			);
		}
	}

	function removeOneFromCart(id) {
		const quantity = getProductQuantity(id);

		if (quantity == 1) {
			deleteFromCart(id);
		} else {
			setCartProducts(
				cartProducts.map((product) =>
					product.id === id
						? { ...product, quantity: product.quantity - 1 }
						: product
				)
			);
		}
	}

	function deleteFromCart(id) {
		setCartProducts((cartProducts) =>
			cartProducts.filter((currentProduct) => {
				return currentProduct.id !== id;
			})
		);
	}

	function getTotalCost() {
		let totalcost = 0;
		cartProducts.forEach((cartItem) => {
			const productData = getProductData(cartItem.id);
			totalcost += productData.price * cartItem.quantity;
		});
		return totalcost;
	}

	const contextValue = {
		items: cartProducts,
		getProductQuantity,
		addOneToCart,
		removeOneFromCart,
		deleteFromCart,
		getTotalCost,
	};

	// useEffect(() => {
	// 	console.log("Cart updated:", cartProducts);
	// }, [cartProducts]);

	return (
		<CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
	);
}

export default CartProvider;
