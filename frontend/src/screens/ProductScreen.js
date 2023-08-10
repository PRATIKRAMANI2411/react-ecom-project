import axios from 'axios';
import React, { useEffect, useReducer } from 'react'
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import { useParams } from 'react-router-dom'
import Rating from '../components/Rating';
import Button from 'react-bootstrap/esm/Button';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { getError } from '../Utils';

const reduser = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, logging: true };
        case 'FETCH_SUCCESS':
            return { ...state, product: action.payload, loading: false };
        case 'FETCH_FAIL':
            return { ...state, error: action.payload, loading: false }
        default:
            return state;
    }
}

export default function ProductScreen() {
    const params = useParams();
    const { slug } = params;

    const [{ loading, error, product }, dispatch] = useReducer(reduser, {
        product: [],
        loading: true,
        error: '',
    });

    useEffect(() => {
        const fatchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const results = await axios.get(`/api/products/slug/${slug}`);
                dispatch({ type: 'FETCH_SUCCESS', payload: results.data });
            } catch (err) {
                // console.log(err.response.data.message);
                dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
            }
        }
        fatchData()
    }, [slug]);

    return (
        loading ? <LoadingBox/>
                        : error ? <MessageBox variant="danger">{error}</MessageBox>
                            :
                <div>
                    <Row>
                        <Col md={6}>
                            <img className="img-largr" src={product.image} alt={product.name} />
                        </Col>
                        <Col md={3}>
                            <ListGroup>
                                <ListGroup.Item><Helmet><title>{product.name}</title></Helmet></ListGroup.Item>
                                <ListGroup.Item><Rating rating={product.rating} namReview={product.numReviews} ></Rating></ListGroup.Item>
                                <ListGroup.Item> Price : ${product.price}</ListGroup.Item>
                                <ListGroup.Item> Description :
                                    <p>{product.description}</p>
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col md={3}>
                            <Row>
                                <Card>
                                    <Card.Body>
                                        <ListGroup variant="flush">
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Price:</Col>
                                                    <Col>${product.price}</Col>
                                                </Row>
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Status:</Col>
                                                    <Col>
                                                        {product.countInStock > 0 ?
                                                            <Badge bg="success">In Stock</Badge>
                                                            : <Badge bg="danger">Out 0f Stock</Badge>
                                                        }
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                            {product.countInStock > 0 && (
                                                <ListGroup.Item>
                                                    <div className="d-grid">
                                                        <Button variant="primary" >Add to Cart </Button>
                                                    </div>
                                                </ListGroup.Item>
                                            )}
                                        </ListGroup>
                                    </Card.Body>
                                </Card>
                            </Row>
                        </Col>
                    </Row>
                </div>
    )
}
