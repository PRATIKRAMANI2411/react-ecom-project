import './App.css';
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { LinkContainer } from "react-router-bootstrap";
import { Store } from './Store';
import { useContext } from 'react';
import Badge from 'react-bootstrap/esm/Badge';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import SignupScreen from './screens/SignupScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrderHistroyScreen from './screens/OrderHistroyScreen';
import ProfileScreen from './screens/ProfileScreen';

function App() {
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart, userInfo } = state;

    const signoutHendler = () => {
        ctxDispatch({ type: 'USER_SIGNOUT' })
        localStorage.removeItem('userInfo')
        localStorage.removeItem('ahippingAddress')
        localStorage.removeItem('paymentMeyhod')
        window.location.href = '/signin'
    }

    return (
        <BrowserRouter>
            <div className="d-flex flex-column site-container">
                <ToastContainer position='bottom-center' limit={1} />
                <Navbar bg="dark" data-bs-theme="dark" expand="lg">
                    <Container>
                        <LinkContainer to="/">
                            <Navbar.Brand>LUXE FASHION</Navbar.Brand>
                        </LinkContainer>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id='basic-navbar-nav'>
                            <Nav className="me-auto  w-100  justify-content-end">
                                <Link to="/cart" className="nav-link">
                                    cart
                                    {cart.cartItems.length > 0 && (<Badge pill bg="danger">{cart.cartItems.reduce((a, c) => a + c.quantity, 0)}</Badge>)}
                                </Link>
                                {userInfo ?
                                    <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                                        <LinkContainer to="/profile">
                                            <NavDropdown.Item>User profile</NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to="/orderhistroy">
                                            <NavDropdown.Item>Order History</NavDropdown.Item>
                                        </LinkContainer>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item>
                                            <Link className="dropdwon-item" to="#signout" onClick={signoutHendler} >Sign Out</Link>
                                        </NavDropdown.Item>
                                    </NavDropdown>

                                    :
                                    <Link className="nav-link" to="/signin">Sign In</Link>
                                }
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <main>
                    <Container className="mt-4">
                        <Routes>
                            <Route path="/product/:slug" element={<ProductScreen />} />
                            <Route path="/cart" element={<CartScreen />} />
                            <Route path="/signin" element={<SigninScreen />} />
                            <Route path="/signup" element={<SignupScreen />} />
                            <Route path="/shipping" element={<ShippingAddressScreen />} />
                            <Route path="/payment" element={<PaymentMethodScreen />} />
                            <Route path="/placeorder" element={<PlaceOrderScreen />} />
                            <Route path="/order/:id" element={<OrderScreen />} />
                            <Route path="/orderhistroy" element={<OrderHistroyScreen />} />
                            <Route path="/profile" element={<ProfileScreen />} />
                            <Route path="/" element={<HomeScreen />} />
                        </Routes>
                    </Container>
                </main>
                <footer className="text-center">
                    <div>All rights reserved</div>
                </footer>
            </div>
        </BrowserRouter >
    );
}

export default App;
