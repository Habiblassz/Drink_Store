import { Card, Button } from "react-bootstrap";
import { CartContext } from "../Cart-context";
import { useContext, useState } from "react";

function ProductCard({ product, onHandleProductClick }) {
	const cart = useContext(CartContext);
	const productQuantity = cart.getProductQuantity(product.id);
	const [isAdding, setIsAdding] = useState(false);

	const handleAddToCart = (e) => {
		e.stopPropagation();
		setIsAdding(true);
		cart.addOneToCart(product.id);
		setTimeout(() => setIsAdding(false), 500);
	};

	const handleRemoveOne = (e) => {
		e.stopPropagation();
		cart.removeOneFromCart(product.id);
	};

	const handleAddOne = (e) => {
		e.stopPropagation();
		cart.addOneToCart(product.id);
	};

	const handleRemoveFromCart = (e) => {
		e.stopPropagation();
		cart.deleteFromCart(product.id);
	};

	return (
		<div style={{ width: "100%" }}>
			<Card
				className="h-100 shadow-sm border-0 product-card"
				style={{ cursor: "pointer" }}
				onClick={onHandleProductClick}>
				<div
					className="product-image"
					style={{
						height: "200px",
						width: "100%",
						backgroundColor: "#f8f9fa",
						borderRadius: "8px",
						margin: "1rem",
						backgroundImage: product.image ? `url(${product.image})` : "none",
						backgroundSize: "cover",
						backgroundPosition: "center",
						position: "relative",
					}}>
					{!product.image && (
						<div className="w-100 h-100 d-flex align-items-center justify-content-center text-muted">
							<i className="bi bi-image" style={{ fontSize: "2rem" }}></i>
						</div>
					)}
					{productQuantity > 0 && (
						<span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
							{productQuantity}
							<span className="visually-hidden">items in cart</span>
						</span>
					)}
				</div>
				<Card.Body className="d-flex flex-column">
					<Card.Title className="fw-bold mb-2">{product.title}</Card.Title>
					<Card.Text className="text-primary fw-bold mb-3">
						${product.price}
					</Card.Text>

					{productQuantity > 0 ? (
						<div className="mt-auto">
							<div className="d-flex justify-content-between align-items-center mb-2">
								<span className="text-muted">Quantity:</span>
								<div className="d-flex align-items-center">
									<Button
										variant="outline-secondary"
										size="sm"
										onClick={handleRemoveOne}
										className="px-3"
										aria-label={`Reduce quantity of ${product.title}`}>
										-
									</Button>
									<span className="mx-2 fw-bold">{productQuantity}</span>
									<Button
										variant="outline-secondary"
										size="sm"
										onClick={handleAddOne}
										className="px-3"
										aria-label={`Increase quantity of ${product.title}`}>
										+
									</Button>
								</div>
							</div>
							<Button
								variant="danger"
								onClick={handleRemoveFromCart}
								size="sm"
								className="w-100"
								aria-label={`Remove ${product.title} from cart`}>
								Remove
							</Button>
						</div>
					) : (
						<Button
							variant="primary"
							onClick={handleAddToCart}
							className="mt-auto"
							disabled={isAdding}
							aria-label={`Add ${product.title} to cart`}>
							{isAdding ? (
								<>
									<span
										className="spinner-border spinner-border-sm me-2"
										role="status"
										aria-hidden="true"></span>
									Adding...
								</>
							) : (
								"Add to Cart"
							)}
						</Button>
					)}
				</Card.Body>
			</Card>
		</div>
	);
}

export default ProductCard;
