import { Button } from "react-bootstrap";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function Cancel() {
	useEffect(() => {
		document.title = "Order Cancelled | Beverage Boutique";
	}, []);

	return (
		<div
			className="d-flex flex-column align-items-center justify-content-center"
			style={{ minHeight: "70vh" }}
			aria-live="polite"
			aria-atomic="true">
			<div className="text-center">
				<div className="mb-4">
					<i
						className="bi bi-x-circle-fill"
						style={{ fontSize: "5rem", color: "red" }}></i>
				</div>
				<h1 className="mb-3">Order Cancelled</h1>
				<p className="lead mb-4">Your payment was not completed.</p>
				<div className="d-flex justify-content-center gap-3">
					<Link to="/">
						<Button variant="primary" className="px-4">
							Back to Store
						</Button>
					</Link>
					<Link to="/cart">
						<Button variant="outline-success" className="px-4">
							View Cart
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Cancel;
