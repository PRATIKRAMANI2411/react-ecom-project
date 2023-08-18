import React from 'react'
import Button from 'react-bootstrap/esm/Button'
import Form from 'react-bootstrap/esm/Form'
import Container from 'react-bootstrap/esm/Container'
import { Helmet } from 'react-helmet-async'
import { Link, useLocation } from 'react-router-dom'

const SigninScreen = () => {
    const { search } = useLocation();
    const redirectUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectUrl ? redirectUrl : '/';

    return (
        <Container className="samll-container">
            <Helmet>
                <title>Sing In</title>
            </Helmet>
            <h1 className='my-3'>sign In</h1>
            <Form>
                <Form.Group className="bm-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" required />
                </Form.Group>
                <Form.Group className="bm-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" required />
                </Form.Group>
                <div className='my-3'>
                    <Button type="submit">Sign In</Button>
                </div>
                <div className="mb-3">
                    New Costomer?{' '}
                    <Link to={`/signup?redirect=${redirect}`} >Create your account</Link>
                </div>
            </Form>
        </Container>
    )
}

export default SigninScreen
