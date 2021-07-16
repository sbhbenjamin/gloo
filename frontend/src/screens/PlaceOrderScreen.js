import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import { createOrder } from '../actions/orderActions'

const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)

  // calculate prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  cart.offer.offerPrice = addDecimals(cart.offer.offerPrice)

  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 15)
  cart.taxPrice = addDecimals(Number((0.07 * cart.offer.offerPrice).toFixed(2)))
  cart.totalPrice = (
    Number(cart.offer.offerPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2)
  // cart.paymentMethod = true

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const orderCreate = useSelector((state) => state.orderCreate)
  const { order, success, error } = orderCreate

  const orderSeller = useSelector((state) => state.orderSeller)
  let { seller } = orderSeller

  useEffect(() => {
    console.log('(placeorder) current state = ', cart)
    if (!userInfo) {
      history.push('/login')
    } else if (success) {
      history.push(`order/${order._id}`)
    }
  }, [history, success, cart, order, userInfo])

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        offer: cart.offer,
        buyer: cart.offer.buyer,
        seller: cart.offer.seller,
        orderItem: cart.offer.orderItem,
        shippingAddress: cart.shippingAddress,
        shippingPrice: cart.shippingPrice,
        itemPrice: cart.offer.offerPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
        paymentMethod: cart.paymentMethod,
      })
    )
  }

  return (
    <>
      {!cart.offer || !cart.paymentMethod || !cart.shippingAddress ? (
        <Message variant='danger'>
          Order does not exist. <a href='/'>Go back.</a>
        </Message>
      ) : (
        <>
          <CheckoutSteps step1 step2 step3 step4 />
          <Row>
            <Col md={8}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <div className='mb-3'>
                    <h3>Shipping</h3>
                  </div>
                  <p>
                    <strong>Address:</strong>{' '}
                    <span data-testid='order-address'>
                      {cart.shippingAddress.address},{' '}
                      {cart.shippingAddress.city},{' '}
                      {cart.shippingAddress.postalCode},{' '}
                      {cart.shippingAddress.country}
                    </span>
                  </p>
                </ListGroup.Item>

                <ListGroup.Item>
                  <div className='mb-3'>
                    <h3>Payment Method</h3>
                  </div>
                  <strong>Method: </strong>
                  <span data-testid='order-paymentmethod'>
                    {cart.paymentMethod}
                  </span>
                </ListGroup.Item>

                <ListGroup.Item>
                  <div className='mb-3'>
                    <h3>Order Items</h3>
                  </div>
                  {!cart.offer ? (
                    <Message data-testid='order-message'>
                      Your cart is empty
                    </Message>
                  ) : (
                    <ListGroup variant='flush'>
                      <ListGroup.Item>
                        <Row>
                          <Col md={1}>
                            <Image
                              data-testid='order-image'
                              src={cart.offer.orderItem.image}
                              alt={cart.offer.orderItem.name}
                              fluid
                              rounded
                            />
                          </Col>
                          <Col>
                            <Link
                              data-testid='order-name'
                              to={`/product/${cart.offer.orderItem.product}`}
                            >
                              {cart.offer.orderItem.name}
                            </Link>
                          </Col>
                          <Col md={2}></Col>
                          <Col md={2}>
                            $
                            <span data-testid='order-price'>
                              {cart.offer.offerPrice}
                            </span>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    </ListGroup>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>

            <Col md={4}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <h2>Order Summary</h2>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Items</Col>
                      <Col>
                        $
                        <span data-testid='order-products-price'>
                          {cart.offer.offerPrice}
                        </span>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Shipping</Col>
                      <Col>
                        $
                        <span data-testid='order-shipping-price'>
                          {cart.shippingPrice}
                        </span>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Tax</Col>
                      <Col>
                        $
                        <span data-testid='order-tax-price'>
                          {cart.taxPrice}
                        </span>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Total</Col>
                      <Col>
                        $
                        <span data-testid='order-total-price'>
                          {cart.totalPrice}
                        </span>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {error && (
                    <ListGroup.Item>
                      <Message data-testid='order-message' variant='danger'>
                        {error}
                      </Message>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      data-testid='order-submit-btn'
                      type='button'
                      size='lg'
                      disabled={!cart.offer}
                      onClick={placeOrderHandler}
                      block
                    >
                      Place Order
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default PlaceOrderScreen
