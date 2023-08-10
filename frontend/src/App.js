import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from "react-router-bootstrap";

function App() {
    return (
        <BrowserRouter>
            <div className="d-flex flex-column site-container">
                <Navbar bg="dark" data-bs-theme="dark">
                    <Container>
                        <LinkContainer to="/">
                            <Navbar.Brand>LUXE FASHION</Navbar.Brand>
                        </LinkContainer>
                    </Container>
                </Navbar>
                <main>
                    <Container className="mt-4">
                        <Routes>
                            <Route path="/product/:slug" element={<ProductScreen />} />
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
