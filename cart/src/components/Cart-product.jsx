import { Button } from "react-bootstrap";
import { CartContext } from "../Cart-context";
import { useContext } from "react";
import { getProductData } from "../Product-store";

function CartProduct({ id, quantity }) {
	const cart = useContext(CartContext);
	const productData = getProductData(id);

	return (
		<div className="d-flex justify-content-between align-items-center mb-3">
			<div className="d-flex align-items-center">
				<div
					className="me-3"
					style={{
						width: "60px",
						height: "60px",
						backgroundColor: "#f8f9fa",
						borderRadius: "8px",
						backgroundImage: productData.image
							? `url(${productData.image})`
							: "none",
						backgroundSize: "cover",
						backgroundPosition: "center",
					}}>
					{!productData.image && (
						<div className="w-100 h-100 d-flex align-items-center justify-content-center text-muted">
							<i className="bi bi-image"></i>
						</div>
					)}
				</div>
				<div>
					<h5 className="mb-1">{productData.title}</h5>
					<p className="text-muted mb-1">
						${productData.price.toFixed(2)} each
					</p>
				</div>
			</div>
			<div className="d-flex align-items-center">
				<div className="me-3 text-center">
					<div className="text-muted small">Qty</div>
					<div className="fw-bold">{quantity}</div>
				</div>
				<div className="me-3 text-center">
					<div className="text-muted small">Total</div>
					<div className="fw-bold">
						${(quantity * productData.price).toFixed(2)}
					</div>
				</div>
				<Button
					size="sm"
					variant="outline-danger"
					onClick={() => cart.deleteFromCart(id)}
					aria-label={`Remove ${productData.title} from cart`}
					className="remove-btn">
					{/* close button */}
					&times;
				</Button>
			</div>
		</div>
	);
}

export default CartProduct;
