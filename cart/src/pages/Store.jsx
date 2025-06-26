import { Row, Col, Form, Modal, Button } from "react-bootstrap";
import { productsArray } from "../Product-store";
import ProductCard from "../components/Product-card";
import { useContext, useState } from "react";
import { CartContext } from "../Cart-context";

export default function Store() {
	const cart = useContext(CartContext);
	const [searchTerm, setSearchTerm] = useState("");
	const [categoryFilter, setCategoryFilter] = useState("all");
	const [selectedProduct, setSelectedProduct] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const [isAddingToCart, setIsAddingToCart] = useState(false);
	const [showToast, setShowToast] = useState(false);

	const filteredProducts = productsArray.filter((product) => {
		const matchesSearch = product.title
			.toLowerCase()
			.includes(searchTerm.toLowerCase());
		const matchesCategory =
			categoryFilter === "all" || product.category === categoryFilter;
		return matchesSearch && matchesCategory;
	});

	const categories = [
		...new Set(productsArray.map((product) => product.category)),
	];

	const handleProductClick = (product) => {
		setSelectedProduct(product);
		setShowModal(true);
	};

	const handleCloseModal = () => {
		setShowModal(false);
		setSelectedProduct(null);
	};

	const handleAddToCart = () => {
		if (!selectedProduct) return;

		setIsAddingToCart(true);
		cart.addOneToCart(selectedProduct.id);

		setTimeout(() => {
			setIsAddingToCart(false);
			setShowToast(true);
			setTimeout(() => setShowToast(false), 3000);
		}, 500);
	};
	return (
		<div className="py-5 store-page">
			<div className="text-center mb-5">
				<h1 className="fw-bold">Welcome to our Beverage Boutique</h1>
				<p className="lead text-muted">
					Discover our premium selection of drinks
				</p>
			</div>

			{/* Search and Filter */}
			<div className="mb-4">
				<Row className="g-3">
					<Col md={8}>
						<Form.Control
							type="search"
							placeholder="Search products..."
							aria-label="Search products"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
					</Col>
					<Col md={4}>
						<Form.Select
							aria-label="Filter by category"
							value={categoryFilter}
							onChange={(e) => setCategoryFilter(e.target.value)}>
							<option value="all">All Categories</option>
							{categories.map((category, index) => (
								<option key={index} value={category}>
									{category.charAt(0).toUpperCase() + category.slice(1)}
								</option>
							))}
						</Form.Select>
					</Col>
				</Row>
			</div>

			{/* Products Grid */}
			{filteredProducts.length > 0 ? (
				<Row xs={1} md={2} lg={3} className="g-4">
					{filteredProducts.map((product, index) => (
						<Col key={index}>
							<ProductCard
								product={product}
								onHandleProductClick={() => handleProductClick(product)}
							/>
						</Col>
					))}
				</Row>
			) : (
				<div className="text-center py-5">
					<i
						className="bi bi-search"
						style={{ fontSize: "3rem", color: "#6c757d" }}></i>
					<h4 className="mt-3">No products found</h4>
					<p className="text-muted">
						Try adjusting your search or filter criteria
					</p>
					<Button
						variant="outline-primary"
						onClick={() => {
							setSearchTerm("");
							setCategoryFilter("all");
						}}>
						Reset Filters
					</Button>
				</div>
			)}

			{/* Product Detail Modal */}
			{selectedProduct && (
				<Modal show={showModal} onHide={handleCloseModal} centered size="lg">
					<Modal.Header closeButton>
						<Modal.Title>{selectedProduct.title}</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Row>
							<Col md={6}>
								<div
									className="w-100 h-100"
									style={{
										minHeight: "300px",
										backgroundImage: `url(${selectedProduct.image})`,
										backgroundSize: "cover",
										backgroundPosition: "center",
										borderRadius: "8px",
									}}></div>
							</Col>
							<Col md={6}>
								<h4 className="text-primary">${selectedProduct.price}</h4>
								<p className="text-muted">
									{selectedProduct.category.charAt(0).toUpperCase() +
										selectedProduct.category.slice(1)}{" "}
									Drink
								</p>
								<p>{selectedProduct.description}</p>

								<p className="mb-2">
									In Cart: {cart.getProductQuantity(selectedProduct.id)}
								</p>
								<div className="mt-4">
									<Button
										variant="primary"
										className="me-2"
										onClick={handleAddToCart}
										disabled={isAddingToCart}>
										{isAddingToCart ? (
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
									<Button
										variant="outline-secondary"
										onClick={handleCloseModal}>
										Close
									</Button>
								</div>
							</Col>
						</Row>
						{showToast && (
							<div
								className="position-fixed bottom-0 end-0 p-3"
								style={{ zIndex: 11 }}>
								<div
									className="toast show"
									role="alert"
									aria-live="assertive"
									aria-atomic="true">
									<div className="toast-header bg-success text-white">
										<strong className="me-auto">Success</strong>
										<button
											type="button"
											className="btn-close btn-close-white"
											onClick={() => setShowToast(false)}></button>
									</div>
									<div className="toast-body">
										{selectedProduct.title} added to cart!
									</div>
								</div>
							</div>
						)}
					</Modal.Body>
				</Modal>
			)}
		</div>
	);
}
