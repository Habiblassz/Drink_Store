import { Container, Button, Spinner, Card, Table } from "react-bootstrap";
import { useContext, useState, useEffect } from "react";
import { getProductData } from "../Product-store";
import { CartContext } from "../Cart-context";

export default function Cart() {
	const [loading, setLoading] = useState(false);
	const cart = useContext(CartContext);

	// useEffect(() => {
	// 	console.log("Cart items in Cart component:", cart.items);
	// }, [cart.items]);

	if (loading) {
		return (
			<Container className="py-5 text-center">
				<Spinner animation="border" role="status">
					<span className="visually-hidden">Loading...</span>
				</Spinner>
				<p className="mt-3">Loading your cart...</p>
			</Container>
		);
	}

	if (cart.items.length === 0) {
		return (
			<Container className="py-5 text-center">
				<i
					className="bi bi-box-seam"
					style={{ fontSize: "3rem", color: "#6c757d" }}></i>
				<h4 className="mt-3">Your cart is currently empty</h4>
				<p className="text-muted">
					Your order history will appear here once you make a purchase
				</p>
				<Button href="/" variant="primary" className="mt-3">
					Start Shopping
				</Button>
			</Container>
		);
	}

	return (
		<Container className="py-4">
			<h2 className="mb-4">Your cart</h2>
			<Card className="mb-4 shadow-sm">
				<Card.Body>
					<Table responsive>
						<thead>
							<tr>
								<th>Item</th>
								<th>Price</th>
								<th>Quantity</th>
								<th>Total</th>
							</tr>
						</thead>
						<tbody>
							{cart.items.map((item) => {
								const productData = getProductData(item.id);
								console.log(productData);
								if (!productData) return null;

								return (
									<tr key={item.id}>
										<td>
											<div className="d-flex align-items-center">
												<div
													className="me-3"
													style={{
														width: "50px",
														height: "50px",
														backgroundImage: `url(${productData.image})`,
														backgroundSize: "cover",
														backgroundPosition: "center",
														borderRadius: "4px",
													}}></div>
												<span>{productData.title}</span>
											</div>
										</td>
										<td>${productData.price?.toFixed(2)}</td>
										<td>{item.quantity}</td>
										<td>${(productData.price * item.quantity).toFixed(2)}</td>
									</tr>
								);
							})}
						</tbody>
						<tfoot>
							<tr>
								<td colSpan="3" className="text-end fw-bold">
									Order Total:
								</td>
								<td className="fw-bold">${cart.getTotalCost().toFixed(2)}</td>
							</tr>
						</tfoot>
					</Table>
				</Card.Body>
			</Card>
		</Container>
	);
}
