import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import Message from '../components/Message'
import { saveShippingAddress } from '../actions/cartActions'

const ShippingScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  const [address, setAddress] = useState(shippingAddress.address)
  const [city, setCity] = useState(shippingAddress.city)
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
  const [country, setCountry] = useState(shippingAddress.country)

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({ address, city, postalCode, country }))
    history.push('/payment')
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
      {cart.cartItems.length === 0 ? (
        <Message variant='danger'>
          Order does not exist. <a href='/'>Go back.</a>
        </Message>
      ) : (
        <FormContainer>
          <CheckoutSteps step1 step2 />
          <h1>Shipping</h1>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='address' className='mt-3 mb-2'>
              <Form.Label>Address</Form.Label>
              <Form.Control
                data-testid='shipping-address'
                type='text'
                placeholder='Enter Address'
                value={address}
                required
                onChange={(e) => setAddress(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='city' className='mb-2'>
              <Form.Label>City</Form.Label>
              <Form.Control
                data-testid='shipping-city'
                type='text'
                placeholder='Enter City'
                value={city}
                required
                onChange={(e) => setCity(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='postalCode' className='mb-2'>
              <Form.Label>Postal Code</Form.Label>
              <Form.Control
                data-testid='shipping-postalcode'
                type='text'
                placeholder='Enter Postal Code'
                value={postalCode}
                required
                onChange={(e) => setPostalCode(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='country' className='mb-3'>
              <Form.Label>Country</Form.Label>
              <Form.Control
                data-testid='shipping-country'
                type='text'
                placeholder='Enter Country'
                value={country}
                required
                onChange={(e) => setCountry(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button
              data-testid='shipping-continue-btn'
              type='submit'
              variant='primary'
            >
              Continue
            </Button>
          </Form>
        </FormContainer>
      )}
    </>
  )
}

export default ShippingScreen
