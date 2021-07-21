import React from 'react'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'
import Product from '../../components/Product'
import configureStore from 'redux-mock-store'
import { render, screen } from '../test-utils'

const mockStore = configureStore([])

describe('Product loads correctly', () => {
  const store = mockStore({})

  const product = {
    rating: 4.5,
    numReviews: 12,
    price: 89.99,
    available: true,
    _id: '60d55c4cd97a74d6bd80cb22',
    name: '1st Solution Electrical',
    image: '/images/electrical.jpg',
    description:
      'At 1st Solution, we specialize in electrical repair services and troubleshooting for power trips and power failures. Our professional 24/7 electrical contractors are always at your beck and call to maintain, repair & install your electrical appliances & fix all power issues.',
    category: 'Electrical',
    user: {
      _id: '60d55c4cd97a74d6bd80cb1f',
      name: 'Admin user',
    },
    reviews: [],
    __v: 0,
    createdAt: '2021-06-25T04:32:12.368Z',
    updatedAt: '2021-06-25T04:32:12.368Z',
  }

  // render(
  //   <Provider store={store}>
  //     <Router>
  //       <Product product={product} />
  //     </Router>
  //   </Provider>
  // )

  render(<Product product={product} />)

  it('should render with given state from Redux store', () => {
    expect(screen.getByTestId('product-name')).toHaveTextContent(
      '1st Solution Electrical'
    )
    expect(screen.getByTestId('product-image')).toHaveAttribute(
      'src',
      '/images/electrical.jpg'
    )
    expect(screen.getByText('12 reviews')).toBeInTheDocument()
  })
})
