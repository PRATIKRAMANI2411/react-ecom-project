import React, { useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import CheckoutSteps from '../components/CheckoutSteps'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button'
import { Store } from '../Store'
import { useNavigate } from 'react-router-dom'

const PaymentMethodScreen = () => {
    const navigate = useNavigate();


    const { state, dispatch: ctxDispatch } = useContext(Store);

    const { cart: { shippingAddress, paymentMethod } } = state;

    const [paymentMethodName, setPaymentmethod] = useState(paymentMethod || "PayPal");

    useEffect(() => {
        if (!shippingAddress.address) {
            navigate("/shipping")
        }
    }, [shippingAddress, navigate])

    const submitHendler = (e) => {
        e.preventDefault();

        ctxDispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethodName })
        localStorage.setItem('paymentMethod', paymentMethodName)
        navigate('/placeorder')
    }
    return (
        <div>
            <Helmet>
                <title>Payment Methos</title>
            </Helmet>
            <CheckoutSteps step1 step2 step3></CheckoutSteps>
            <Row className="justify-content-md-center">
                <Col sm={6}>
                    <h1 className="my-3">Payment Methos</h1>
                    <Form onSubmit={submitHendler}>
                        <div className="mb-3">
                            <Form.Check type="radio" id="PayPal" label="PayPal" value="PayPal" onChange={(e) => setPaymentmethod(e.target.value)} checked={paymentMethodName === "PayPal"} />
                        </div>
                        <div className="mb-3">
                            <Form.Check type="radio" id="Stripe" label="Stripe" value="Stripe" onChange={(e) => setPaymentmethod(e.target.value)} checked={paymentMethodName === "Stripe"} />
                        </div>
                        <div className="mb-3">
                            <Button type="submit">Continue</Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </div>
    )
}

export default PaymentMethodScreen
