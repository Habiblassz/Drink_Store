import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarComponent from "./components/Navbar-page";
import Store from "./pages/Store";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";
import Cart from "./pages/Cart";
import CartProvider from "./Cart-context";

import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
	return (
		<CartProvider>
			<BrowserRouter>
				<NavbarComponent />
				<Routes>
					<Route index element={<Store />}></Route>
					<Route path="cart" element={<Cart />}></Route>
					<Route path="success" element={<Success />}></Route>
					<Route path="cancel" element={<Cancel />}></Route>
				</Routes>
			</BrowserRouter>
		</CartProvider>
	);
}

export default App;
