import React, { useContext, useReducer, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import Button from 'react-bootstrap/esm/Button'
import Form from 'react-bootstrap/esm/Form'
import Container from 'react-bootstrap/esm/Container'
import { Store } from '../Store';
import { toast } from 'react-toastify'
import { getError } from '../Utils'
import axios from 'axios'

const reducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_REQUEST':
            return { ...state, loadingUpdate: true };
        case 'UPDATE_SUCCESS':
            return { ...state, loadingUpdate: false };
        case 'UPDATE_FAIL':
            return { ...state, loadingUpdate: false };
        default:
            return state;
    }
};

const ProfileScreen = () => {
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo } = state;

    const [name, setName] = useState(userInfo.name)
    const [email, setEmail] = useState(userInfo.email)
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirpassword] = useState("");

    const [{ loadingUpdate }, dispatch] = useReducer(reducer, {
        loadingUpdate: false,
    });

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(
                '/api/users/profile',
                {
                    name,
                    email,
                    password,
                },
                {
                    headers: { authorization: `Bearer ${userInfo.token}` },
                }
            );
            dispatch({
                type: 'UPDATE_SUCCESS',
            });
            ctxDispatch({ type: 'USER_SIGNIN', payload: data });
            localStorage.setItem('userInfo', JSON.stringify(data));
            toast.success('User updated successfully');
        } catch (err) {
            dispatch({
                type: 'FETCH_FAIL',
            });
            toast.error(getError(err));
        }
    };


    return (
        <div>
            <Helmet>
                <title>User Profile</title>
            </Helmet>
            <Container className="samll-container">
                <h1 className='my-3' >User Profile</h1>
                <Form onSubmit={submitHandler}>
                    <Form.Group className="bm-3" controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" value={name} required onChange={(e) => setName(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="bm-3" controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" value={email} required onChange={(e) => setEmail(e.target.value)} />
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
                        <Button type="submit">Update</Button>
                    </div>
                    <div className="mb-3">
                        Already have an account?{' '}
                        {/* <Link to={`/signin?redirect=${redirect}`} >Sign-In</Link> */}
                    </div>
                </Form>
            </Container>
        </div>
    )
}

export default ProfileScreen
