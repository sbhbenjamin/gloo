import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { screen, render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'
import CheckoutSteps from '../../components/CheckoutSteps'

afterEach(cleanup)

describe('CheckoutSteps loads correctly', () => {
  it('should disable steps 2, 3, 4 if given step 1', () => {
    // needs work
    render(
      <Router>
        <CheckoutSteps step1={true} />
      </Router>
    )
    expect(screen.getByText('Sign In')).not.toHaveClass('nav-link disabled')
    expect(screen.getByText('Shipping')).toHaveClass('nav-link disabled')
    expect(screen.getByText('Payment')).toHaveClass('nav-link disabled')
    expect(screen.getByText('Place Order')).toHaveClass('nav-link disabled')
  })

  it('should disable steps 3 and 4 if given steps 1 and 2', () => {
    // needs work
    render(
      <Router>
        <CheckoutSteps step1={true} step2={true} />
      </Router>
    )
    expect(screen.getByText('Sign In')).not.toHaveClass('nav-link disabled')
    expect(screen.getByText('Shipping')).not.toHaveClass('nav-link disabled')
    expect(screen.getByText('Payment')).toHaveClass('nav-link disabled')
    expect(screen.getByText('Place Order')).toHaveClass('nav-link disabled')
  })

  it('should disable steps 4 if given steps 1, 2 and 3', () => {
    // needs work
    render(
      <Router>
        <CheckoutSteps step1={true} step2={true} step3={true} />
      </Router>
    )
    expect(screen.getByText('Sign In')).not.toHaveClass('nav-link disabled')
    expect(screen.getByText('Shipping')).not.toHaveClass('nav-link disabled')
    expect(screen.getByText('Payment')).not.toHaveClass('nav-link disabled')
    expect(screen.getByText('Place Order')).toHaveClass('nav-link disabled')
  })

  it('should enable all steps, if all steps are given', () => {
    // needs work
    render(
      <Router>
        <CheckoutSteps step1={true} step2={true} step3={true} step4={true} />
      </Router>
    )
    expect(screen.getByText('Sign In')).not.toHaveClass('nav-link disabled')
    expect(screen.getByText('Shipping')).not.toHaveClass('nav-link disabled')
    expect(screen.getByText('Payment')).not.toHaveClass('nav-link disabled')
    expect(screen.getByText('Place Order')).not.toHaveClass('nav-link disabled')
  })
})
