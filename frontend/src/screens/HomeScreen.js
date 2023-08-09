import React, { useEffect, useReducer } from 'react';
import axios from "axios";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Product from '../components/Product';

const reduser = (state, action) => {
    // console.log(action.payload)
    // console.log(state, action)
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, logging: true };
        case 'FETCH_SUCCESS':
            return { ...state, products: action.payload, loading: false };
        case 'FETCH_FAIL':
            return { ...state, error: action.payload, loading: false }
        default:
            return state;
    }
}

export default function HomeScreen() {

    const [{ loading, error, products }, dispatch] = useReducer(reduser, {
        product: [],
        loading: true,
        error: '',
    });
    // console.log(products)

    // const [products, Setproducts] = useState([]);
    useEffect(() => {
        const fatchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const results = await axios.get('/api/products');
                dispatch({ type: 'FETCH_SUCCESS', payload: results.data });
            } catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: err.message });
            }
            // Setproducts(results.data)
        }
        fatchData()
    }, []);
    return (
        <div>
            <h1>Featured Product</h1>
            <div className="products">
                {
                    loading ? <div>loading....</div>
                        : error ? <div>{error}</div>
                            :
                            <Row>
                                {products.map((product) => (
                                    <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
                                        <Product product={product}></Product>
                                    </Col>
                                ))
                                }
                            </Row>
                }
            </div>
        </div>
    )
}
