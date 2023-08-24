import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Rating from './Rating';
import axios from 'axios';
import { Store } from '../Store';

export default function Product(props) {
    const { product } = props;

    const { state, dispatch: ctxDisptch } = useContext(Store);
    const { cart: { cartItems }, } = state;

    const addCartHendler = async (item) => {
        const exisItem = cartItems.find((x) => x._id === product._id);
        const quantity = exisItem ? exisItem.quantity + 1 : 1;
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

    return (
        <Card >
            <Link to={`/product/${product.slug}`}>
                <img src={product.image} className="card-img-top" alt={product.name} />
            </Link>
            <Card.Body>
                <Link to={`/product/${product.slug}`}>
                    <Card.Title>{product.name}</Card.Title>
                </Link>
                <Rating rating={product.rating} namReview={product.numReviews} ></Rating>
                <Card.Text>${product.price}</Card.Text>
                {
                    product.countInStock === 0 ? <Button variant='light'>Out of Stock</Button>
                        :
                        <Button onClick={() => addCartHendler(product)} >Add to Cart</Button>
                }
            </Card.Body>
        </Card>
    )
}
