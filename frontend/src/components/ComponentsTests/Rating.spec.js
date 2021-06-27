import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Rating from '../Rating'
import configureStore from 'redux-mock-store'

const mockStore = configureStore([])

describe('Product loads correctly', () => {
  let store
  let component

  beforeEach(() => {
    store = mockStore({
      // userLogin: {
      //   userInfo: {
      //     _id: '60d55c4cd97a74d6bd80cb1f',
      //     name: 'Admin user',
      //     email: 'admin@example.com',
      //     isAdmin: true,
      //     token:
      //       'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZDU1YzRjZDk3YTc0ZDZiZDgwY2IxZiIsImlhdCI6MTYyNDYwODQxNSwiZXhwIjoxNjI3MjAwNDE1fQ.jLddueQAfN_TjOzXyZmoYF0o2iMqZxxjYforbICAXBI',
      //   },
      // },
    })

    /*
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
            data-testid='product-reviews'
          />
    */

    const value = 3.5
    const text = '12'

    store.dispatch = jest.fn()

    component = render(
      <Provider store={store}>
        <Router>
          <Rating value={value} text={text} />
        </Router>
      </Provider>
    )
  })

  it('should render with given state from Redux store', () => {
    expect(screen.getByTestId('star-1')).toHaveClass('fas fa-star')
    expect(screen.getByTestId('star-2')).toHaveClass('fas fa-star')
    expect(screen.getByTestId('star-3')).toHaveClass('fas fa-star')
    expect(screen.getByTestId('star-4')).toHaveClass('fas fa-star-half-alt')
    expect(screen.getByTestId('star-5')).toHaveClass('far fa-star')
  })
})
