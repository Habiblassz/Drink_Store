import { useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Success() {
	const location = useLocation();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	// useEffect(() => {
	// 	const fetchOrder = async () => {
	// 		try {
	// 			const queryParams = new URLSearchParams(location.search);
	// 			const sessionId = queryParams.get("session_id");

	// 			if (!sessionId) {
	// 				throw new Error("No session ID found");
	// 			}

	// 			// Fetch order details from your backend
	// 			const response = await fetch(
	// 				`http://localhost:4000/order/${sessionId}`
	// 			);
	// 			if (!response.ok) {
	// 				throw new Error("Failed to fetch order details");
	// 			}

	// 			const order = await response.json();

	// 			// Store the order in localStorage
	// 			const existingOrders = JSON.parse(localStorage.getItem("orders") || []);
	// 			localStorage.setItem(
	// 				"orders",
	// 				JSON.stringify([...existingOrders, order])
	// 			);

	// 			// Clear the cart
	// 			localStorage.removeItem("cartItems");
	// 		} catch (err) {
	// 			console.error("Error processing order:", err);
	// 			setError(err.message);
	// 		} finally {
	// 			setLoading(false);
	// 		}
	// 	};

	// 	fetchOrder();
	// }, [location]);

	if (loading) {
		return (
			<div
				className="d-flex flex-column align-items-center justify-content-center"
				style={{ minHeight: "70vh" }}>
				<Spinner animation="border" role="status">
					<span className="visually-hidden">Loading...</span>
				</Spinner>
				<p className="mt-3">Processing your order...</p>
			</div>
		);
	}

	if (error) {
		return (
			<div
				className="d-flex flex-column align-items-center justify-content-center"
				style={{ minHeight: "70vh" }}>
				<div className="text-center">
					<i
						className="bi bi-exclamation-triangle-fill"
						style={{ fontSize: "3rem", color: "red" }}></i>
					<h4 className="mt-3">Order Processing Error</h4>
					<p className="text-danger mb-4">{error}</p>
					<Button variant="primary" onClick={() => navigate("/orders")}>
						View Orders
					</Button>
				</div>
			</div>
		);
	}

	return (
		<div
			className="d-flex flex-column align-items-center justify-content-center"
			style={{ minHeight: "70vh" }}>
			<div className="text-center">
				<div className="mb-4">
					<i
						className="bi bi-check-circle-fill"
						style={{ fontSize: "5rem", color: "green" }}></i>
				</div>
				<h1 className="mb-3">Thank you for your purchase!</h1>
				<p className="lead mb-4">Your order has been processed successfully.</p>
				<div className="d-flex justify-content-center gap-3">
					<Link to="/">
						<Button variant="primary" className="px-4">
							Back to Store
						</Button>
					</Link>
					<Link to="/success">
						<Button variant="success" className="px-4">
							View Your Orders
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
}
