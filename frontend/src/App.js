import './App.css';
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from "react-router-bootstrap";
import { Store } from './Store';
import { useContext } from 'react';
import Badge from 'react-bootstrap/esm/Badge';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';

function App() {
    const { state } = useContext(Store);
    const { cart } = state;
    return (
        <BrowserRouter>
            <div className="d-flex flex-column site-container">
                <Navbar bg="dark" data-bs-theme="dark">
                    <Container>
                        <LinkContainer to="/">
                            <Navbar.Brand>LUXE FASHION</Navbar.Brand>
                        </LinkContainer>
                        <Nav className="me-auto" >
                            <Link to="/cart" className="nav-link">
                                cart
                                {cart.cartItems.length > 0 && (<Badge pill bg="danger">{cart.cartItems.reduce((a,c) => c.quantity, 0)}</Badge>)}
                            </Link>
                        </Nav>
                    </Container>
                </Navbar>
                <main>
                    <Container className="mt-4">
                        <Routes>
                            <Route path="/product/:slug" element={<ProductScreen />} />
                            <Route path="/cart" element={<CartScreen />} />
                            <Route path="/signin" element={<SigninScreen />} />
                            <Route path="/" element={<HomeScreen />} />
                        </Routes>
                    </Container>
                </main>
                <footer className="text-center">
                    <div>All rights reserved</div>
                </footer>
            </div>
        </BrowserRouter>
    );
}

export default App;
