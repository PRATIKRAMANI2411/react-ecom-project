import React, { useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import { Store } from '../Store';
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';


const ShippingAddressScreen = () => {
    const navigate = useNavigate();
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo, cart: { shippingAddress } } = state;

    const [fullname, setFullname] = useState(shippingAddress.fullname || "");
    const [address, setAddress] = useState(shippingAddress.address || "");
    const [city, setCity] = useState(shippingAddress.city || "");
    const [postalcode, setPostalccode] = useState(shippingAddress.postalcode || "");
    const [country, setCountry] = useState(shippingAddress.country || "");
    useEffect(() => {
        if (!userInfo) {
            navigate('/signin?redirect=/shipping')
        }
    })

    const submitHendler = (e) => {
        e.preventDefault();

        ctxDispatch({
            type: 'SAVE_SHOPPING_ADDRESS',
            payload: { fullname, address, city, postalcode, country }
        })
        localStorage.setItem('ahippingAddress', JSON.stringify({ fullname, address, city, postalcode, country }));
        navigate('/payment');
    }
    return (
        <div>
            <Helmet>
                <title>Shipping Address</title>
            </Helmet>
            <CheckoutSteps step1 step2></CheckoutSteps>
            <Row className="justify-content-md-center">
                <Col sm={6}>
                    <h1 className="my-3">Shipping Address</h1>
                    <Form onSubmit={submitHendler}>
                        <Form.Group className="mb-3" controlId="fullName" >
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control value={fullname} onChange={(e) => setFullname(e.target.value)} required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="address" >
                            <Form.Label>Address</Form.Label>
                            <Form.Control value={address} onChange={(e) => setAddress(e.target.value)} required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="city" >
                            <Form.Label>City</Form.Label>
                            <Form.Control value={city} onChange={(e) => setCity(e.target.value)} required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="postalCode" >
                            <Form.Label>Postal Code</Form.Label>
                            <Form.Control value={postalcode} onChange={(e) => setPostalccode(e.target.value)} required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="country" >
                            <Form.Label>Country</Form.Label>
                            <Form.Control value={country} onChange={(e) => setCountry(e.target.value)} required />
                        </Form.Group>
                        <div className="mb-3">
                            <Button variant="primary" type="submit" >Continue</Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </div>
    )
}

export default ShippingAddressScreen
