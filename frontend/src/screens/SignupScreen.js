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

const SignupScreen = () => {
    const navigate = useNavigate()
    const { search } = useLocation();
    const redirectUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectUrl ? redirectUrl : '/';

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirpassword] = useState("");

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo } = state;

    const submitHendler = async (e) => {
        e.preventDefault();

        if (password !== confirmpassword) {
            toast.error("Password do not match");
            return;
        }

        try {
            const { data } = await axios.post("/api/users/signup", { name, email, password });
            ctxDispatch({ type: 'USER_SIGNUP', payload: data })
            localStorage.setItem('userInfo', JSON.stringify(data))
            navigate(redirect || '/');
        } catch (error) {
            toast.error(getError(error));
        }
    }

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [userInfo, navigate, redirect])

    return (
        <Container className="samll-container">
            <Helmet>
                <title>Sing In</title>
            </Helmet>
            <h1 className='my-3'>Sign Up</h1>
            <Form onSubmit={submitHendler}>
                <Form.Group className="bm-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" required onChange={(e) => setName(e.target.value)} />
                </Form.Group>
                <Form.Group className="bm-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" required onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>
                <Form.Group className="bm-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" required onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                <Form.Group className="bm-3" controlId="confirmpassword">
                    <Form.Label>Confrim Password</Form.Label>
                    <Form.Control type="password" required onChange={(e) => setConfirpassword(e.target.value)} />
                </Form.Group>
                <div className='my-3'>
                    <Button type="submit">Sign Up</Button>
                </div>
                <div className="mb-3">
                    Already have an account?{' '}
                    <Link to={`/signin?redirect=${redirect}`} >Sign-In</Link>
                </div>
            </Form>
        </Container>
    )
}

export default SignupScreen
