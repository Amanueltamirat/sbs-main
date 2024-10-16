import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { Store } from '../Store';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function SignupScreen() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectURL = new URLSearchParams(search).get('redirect');
  const redirect = redirectURL ? redirectURL : '/';

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Password do not match');
    }
    try {
      const { data } = await axios.post(
        `/api/users/signup`,
        { name, email, password }
      );
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate(redirect || '/');
    } catch (err) {
      toast.error(getError(err));
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  return (
    <div className="small-container sign-up">
      <Helmet>
        <title>Sign Up</title>
      </Helmet>
      <h1 className="signup-header">Sign Up</h1>
      <Form onSubmit={submitHandler} className='singup-form'>
        <Form.Group className="mb-3" controld="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            required
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controld="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controld="passsword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controld="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        <div className="mb-3">
          <Button style={{color:'black'}} type="submit">Sign Up</Button>
        </div>
        <div className="mb-3">
          Already have an account?{' '}
          <Link className='singup-link' to={`/signin?redirect=${redirect}`}>Sign-In</Link>
        </div>
        {/* <div className="mb-3">
          Forget password? <Link to={`/forget-password`}>Reset password</Link>
        </div> */}
      </Form>
    </div>
  );
}

export default SignupScreen;
