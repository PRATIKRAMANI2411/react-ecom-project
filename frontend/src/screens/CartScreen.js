import React, { useContext } from 'react'
import { Store } from '../Store';
import { Helmet } from 'react-helmet-async';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import { Link, useNavigate } from 'react-router-dom';
import MessageBox from '../components/MessageBox';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/esm/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';

export default function CartScreen() {
    const navigate = useNavigate();
    const { state, dispatch: ctxDisptch } = useContext(Store);
    const { cart: { cartItems }, } = state;

    const updateCartHendler = async (item, quantity) => {
        const { data } = await axios.get(`api/products/${item._id}`)
        if (data.countInStock < quantity) {
            window.alert('Sorry, Product is out of stock');
            return;
        }
        ctxDisptch({
            type: 'CART_ADD_ITEM',
            payload: { ...item, quantity },
        })
    }

    const removeItemHendler = (item) => {
        ctxDisptch({ type: 'CART_REMOVE_ITEM', payload: item })
    }

    const chekoutHrndler = () => {
        navigate('/signin?redirect=/shipping')
    };

    return (
        <div>
            <Helmet>
                <title>Shopping Cart</title>
            </Helmet>
            <h1>Shopping Cart</h1>
            <Row>
                <Col md={8} >
                    {
                        cartItems.length === 0 ? <MessageBox>Cart is empty. <Link to="/" >Go Shopping</Link></MessageBox>
                            :
                            cartItems.map((item) => (
                                <ListGroup>
                                    <ListGroup.Item key={item._id}>
                                        <Row className="align-items-center">
                                            <Col md={4}>
                                                <img src={item.image} alt={item.name} className="img-fluid rounded img-thumbnail"></img>{' '}
                                                <Link to={`/product/${item.slug}`}>{item.name}</Link>
                                            </Col>
                                            <Col md={3}>
                                                <Button variant='light' onClick={() => updateCartHendler(item, item.quantity - 1)} disabled={item.quantity === 1} >
                                                    <i className='fas fa-minus-circle'></i>
                                                </Button>{' '}
                                                <span>{item.quantity}</span>
                                                <Button variant='light' onClick={() => updateCartHendler(item, item.quantity + 1)} disabled={item.quantity === item.countInStock} >
                                                    <i className='fas fa-plus-circle'></i>
                                                </Button>
                                            </Col>
                                            <Col md={3}>${item.price}</Col>
                                            <Col md={2}>
                                                <Button variant='light' onClick={() => removeItemHendler(item)} >
                                                    <i className='fas fa-trash'></i>
                                                </Button>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                </ListGroup>
                            ))
                    }
                </Col>
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h3>
                                        Subtotal ( {cartItems.reduce((a, c) => a + c.quantity, 0)} {' '} item )
                                        : ${cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                                    </h3>
                                </ListGroup.Item>
                            </ListGroup>
                            <ListGroup>
                                <div className='d-grid'>
                                    <Button type="button" onClick={chekoutHrndler} variant="primary" disabled={cartItems.lenght === 0}>
                                        Proceed to Checkout
                                    </Button>
                                </div>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}
