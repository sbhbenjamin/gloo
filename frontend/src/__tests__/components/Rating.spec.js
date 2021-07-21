import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'
import Rating from '../../components/Rating'

describe('Product loads correctly', () => {
  let component

  beforeEach(() => {
    const value = 3.5
    const text = '12'

    component = render(<Rating value={value} text={text} />)
  })

  it('should render correctly with given prop', () => {
    expect(component.getByTestId('star-1')).toHaveClass('fas fa-star')
    expect(component.getByTestId('star-2')).toHaveClass('fas fa-star')
    expect(component.getByTestId('star-3')).toHaveClass('fas fa-star')
    expect(component.getByTestId('star-4')).toHaveClass('fas fa-star-half-alt')
    expect(component.getByTestId('star-5')).toHaveClass('far fa-star')
  })
})
