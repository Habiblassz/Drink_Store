import { useState, useContext } from "react";
import { Button, Navbar, Modal, Spinner, Toast } from "react-bootstrap";
import { CartContext } from "../Cart-context";
import CartProduct from "./Cart-product";

function NavbarComponent() {
	const cart = useContext(CartContext);
	const [show, setShow] = useState(false);
	const [isCheckingOut, setIsCheckingOut] = useState(false);
	const [showToast, setShowToast] = useState(false);
	const [toastMessage, setToastMessage] = useState("");

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const productCount = cart.items.reduce(
		(sum, product) => sum + product.quantity,
		0
	);

	const showNotification = (message) => {
		setToastMessage(message);
		setShowToast(true);
		setTimeout(() => setShowToast(false), 3000);
	};

	const SERVER_URL = `${window.location.protocol}//${window.location.hostname}`;

	const checkout = async () => {
		setIsCheckingOut(true);
		try {
			const response = await fetch(`${SERVER_URL}:4000/checkout`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ items: cart.items }),
			});

			const data = await response.json();

			if (data.url) {
				window.location.assign(data.url);
			} else {
				throw new Error("Checkout failed");
			}
		} catch (error) {
			setIsCheckingOut(false);
			showNotification("Checkout failed. Please try again.");
			console.error("Checkout error:", error);
		} finally {
			setIsCheckingOut(false);
		}
	};

	return (
		<div
			style={{
				position: "fixed",
				top: 0,
				right: 0,
				left: 0,
				zIndex: 1000,
				padding: "0 25px",
			}}>
			<Navbar expand="sm" bg="light" variant="light" className="shadow-sm">
				<Navbar.Brand href="/" className="fw-bold">
					<span className="text-primary">Beverage</span> Boutique
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse className="justify-content-end">
					<Button
						onClick={handleShow}
						variant="outline-primary"
						className="position-relative"
						aria-label="View shopping cart">
						<i className="bi bi-cart-fill me-2"></i>
						Cart
						{productCount > 0 && (
							<span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
								{productCount}
								<span className="visually-hidden">items in cart</span>
							</span>
						)}
					</Button>
				</Navbar.Collapse>
			</Navbar>

			{/* Cart Modal */}
			<Modal show={show} onHide={handleClose} centered>
				<Modal.Header closeButton className="border-0 pb-0">
					<Modal.Title className="fw-bold">Your Shopping Cart</Modal.Title>
				</Modal.Header>
				<Modal.Body className="pt-0">
					{productCount > 0 ? (
						<>
							<div
								style={{
									height: "auto",
									maxHeight: "400px",
									overflowY: "scroll",
									padding: "10px 15px",
								}}>
								<div className="mb-4">
									{cart.items.map((currentProduct, index) => {
										return (
											<CartProduct
												key={index}
												id={currentProduct.id}
												quantity={currentProduct.quantity}
											/>
										);
									})}
								</div>
							</div>
							<div className="d-flex justify-content-between align-items-center mb-4">
								<h4 className="mb-0">Total:</h4>
								<h4 className="mb-0 text-primary">
									${cart.getTotalCost().toFixed(2)}
								</h4>
							</div>
							<Button
								variant="primary"
								onClick={checkout}
								size="lg"
								className="w-100 py-2 fw-bold"
								disabled={isCheckingOut}>
								{isCheckingOut ? (
									<>
										<Spinner
											as="span"
											animation="border"
											size="sm"
											role="status"
											aria-hidden="true"
											className="me-2"
										/>
										Processing...
									</>
								) : (
									"Proceed to Checkout"
								)}
							</Button>
						</>
					) : (
						<div className="text-center py-4">
							<i
								className="bi bi-cart-x"
								style={{ fontSize: "3rem", color: "#6c757d" }}></i>
							<h4 className="mt-3">Your cart is empty</h4>
							<p className="text-muted">
								Start shopping to add items to your cart
							</p>
							<Button variant="outline-primary" onClick={handleClose}>
								Continue Shopping
							</Button>
						</div>
					)}
					{/* Notification Toast */}
					<Toast
						show={showToast}
						onClose={() => setShowToast(false)}
						delay={3000}
						autohide
						className="position-fixed bottom-0 end-0 m-3"
						bg="danger">
						<Toast.Header closeButton={false}>
							<strong className="me-auto">Notification</strong>
						</Toast.Header>
						<Toast.Body className="text-white">{toastMessage}</Toast.Body>
					</Toast>
				</Modal.Body>
			</Modal>
		</div>
	);
}

export default NavbarComponent;
