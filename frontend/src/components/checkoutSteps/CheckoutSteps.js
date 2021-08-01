import './checkoutsteps.css'
import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className='justify-content-center mb-4'>
      <Nav.Item data-testid='step-signin'>
        {step1 ? (
          <LinkContainer to='/login'>
            <Nav.Link className='step'>Sign In</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Sign In</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item data-testid='step-shipping'>
        {step2 ? (
          <LinkContainer to='/shipping'>
            <Nav.Link className='step'>Shipping</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Shipping</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item data-testid='step-payment'>
        {step3 ? (
          <LinkContainer to='/payment'>
            <Nav.Link className='step'>Payment</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Payment</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item data-testid='step-placeorder'>
        {step4 ? (
          <LinkContainer to='/placeorder'>
            <Nav.Link className='step'>Place Order</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Place Order</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  )
}

export default CheckoutSteps
