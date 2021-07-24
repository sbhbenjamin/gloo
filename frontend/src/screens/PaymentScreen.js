import React, { useState, useEffect } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../actions/cartActions'

const PaymentScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  if (!shippingAddress) {
    history.push('/shipping')
  }

  const [paymentMethod, setPaymentMethod] = useState('PayPal')

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    history.push('/placeorder')
  }

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }
  }, [history, userInfo])

  return (
    <>
      {!cart.offer ? (
        <Message variant='danger'>
          Order does not exist. <a href='/'>Go back.</a>
        </Message>
      ) : (
        <FormContainer>
          <CheckoutSteps step1 step2 step3 />
          <h1>Payment Method</h1>
          <Form onSubmit={submitHandler}>
            <Form.Group className='mt-3 mb-3'>
              <Form.Label as='legend'>Select Method</Form.Label>
              <Col>
                <Form.Check
                  data-testid='payment-radio'
                  type='radio'
                  label='PayPal or Credit Card'
                  id='PayPal'
                  name='paymentMethod'
                  value='PayPal'
                  checked
                  onChange={(e) => setPaymentMethod('PayPal')}
                />
              </Col>
            </Form.Group>

            <Button
              data-testid='payment-continue-btn'
              type='submit'
              variant='success'
            >
              Continue
            </Button>
          </Form>
        </FormContainer>
      )}
    </>
  )
}

export default PaymentScreen
