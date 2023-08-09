import React from 'react';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Rating from './Rating';

export default function Product(props) {
    const { product } = props;
    return (
        <Card >
            <Link to={`/product/${product.slug}`}>
                <img src={product.image} className="card-img-top" alt={product.name} />
            </Link>
            <Card.Body>
                <Link to={`/product/${product.slug}`}>
                    <Card.Title>{product.name}</Card.Title>
                </Link>
                <Rating rating={ product.rating } namReview={ product.numReviews } ></Rating>
                <Card.Text>${product.price}</Card.Text>
                <Button>Add to Cart</Button>
            </Card.Body>
        </Card>
    )
}
