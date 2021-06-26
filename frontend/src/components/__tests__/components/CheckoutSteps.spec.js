import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'
import CheckoutSteps from '../../CheckoutSteps'

afterEach(cleanup)

describe('CheckoutSteps loads correctly', () => {
  it('should disable steps 3 and 4 if only steps 1 and 2 are provided', () => {
    // needs work
    // const component = render(
    //   <Router>
    //     <CheckoutSteps step1={true} />
    //   </Router>
    // )
    // const step = component.getByTestId('step-signin').querySelector('a')
    // expect(step).toHaveClass('enabled')
  })
})
