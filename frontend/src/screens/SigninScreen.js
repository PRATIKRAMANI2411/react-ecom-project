import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/esm/Button'
import Form from 'react-bootstrap/esm/Form'
import Container from 'react-bootstrap/esm/Container'
import { Helmet } from 'react-helmet-async'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import { Store } from '../Store'
import { getError } from '../Utils'

const SigninScreen = () => {
    const navigate = useNavigate()
    const { search } = useLocation();
    const redirectUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectUrl ? redirectUrl : '/';

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const {userInfo} = state;

    const submitHendler = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("/api/users/signin", { email, password });
            ctxDispatch({ type: 'USER_SIGNIN', payload: data })
            localStorage.setItem('userInfo', JSON.stringify(data))
            navigate(redirect || '/');
        } catch (error) {
            console.log("error...", error);
            toast.error(getError(error));
        }
    }

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    },[userInfo, navigate, redirect])

    return (
        <Container className="samll-container">
            <Helmet>
                <title>Sing In</title>
            </Helmet>
            <h1 className='my-3'>Sign In</h1>
            <Form onSubmit={submitHendler}>
                <Form.Group className="bm-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" required onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>
                <Form.Group className="bm-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" required onChange={(e) => setPassword(e.target.value)} />
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
