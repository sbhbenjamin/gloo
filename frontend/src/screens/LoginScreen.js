import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { login } from '../actions/userActions'

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  return (
    <FormContainer>
      <div className='mb-3'>
        <h1 data-testid='login-title'>Sign In</h1>
      </div>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            data-testid='login-email'
            type='email'
            placeholder='Enter Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            data-testid='login-password'
            type='password'
            placeholder='Enter Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        {/* <Button
          data-testid='login-btn'
          className='mt-2'
          type='submit'
          variant='primary'
        >
          Sign In
        </Button> */}
        <button data-testid='login-btn' className='mt-2' type='submit'>
          Sign In
        </button>
      </Form>

      <Row className='py-3'>
        <Col>
          New Customer?{' '}
          <Link
            data-testid='register-redirect'
            to={redirect ? `/register?redirect=${redirect}` : '/register'}
            className='text-blue-600'
          >
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>

    // <div
    //   className='flex flex-col justify-center items-center static'
    //   style={{ height: '70vh' }}
    // >
    //   <div className='absolute top-40'>
    //     {error && <Message variant='danger'>{error}</Message>}
    //     {loading && <Loader />}
    //   </div>
    //   <form id='login' onSubmit={submitHandler}>
    //     <h3>Log in</h3>
    //     <div className='flex flex-col gap-2'>
    //       <label htmlFor='emailAddress'>Email Address</label>
    //       <input
    //         type='email'
    //         value={email}
    //         onChange={(e) => setEmail(e.target.value)}
    //       />
    //     </div>
    //     <div className='flex flex-col gap-2'>
    //       <label htmlFor='password'>Password</label>
    //     </div>
    //     <input
    //       type='password'
    //       value={password}
    //       onChange={(e) => setPassword(e.target.value)}
    //     />
    //     <span>
    //       New Customer?{' '}
    //       <Link
    //         data-testid='register-redirect'
    //         to={redirect ? `/register?redirect=${redirect}` : '/register'}
    //         className='text-blue-600'
    //       >
    //         Register
    //       </Link>
    //     </span>
    //     <button type='submit' className='btn'>
    //       Log in
    //     </button>
    //   </form>
    // </div>
  )
}

export default LoginScreen
