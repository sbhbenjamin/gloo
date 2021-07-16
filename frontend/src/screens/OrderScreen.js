import React, { useState, useEffect } from "react"
import axios from "axios"
import { PayPalButton } from "react-paypal-button-v2"
import { Link } from "react-router-dom"
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from "../actions/orderActions"
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
  ORDER_CREATE_RESET,
} from "../constants/orderConstants"

const OrderScreen = ({ match, history }) => {
  const orderId = match.params.id

  const [sdkReady, setSdkReady] = useState(false)

  const dispatch = useDispatch()

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails

  const orderPay = useSelector((state) => state.orderPay)
  const { loading: loadingPay, success: successPay } = orderPay

  const orderDeliver = useSelector((state) => state.orderDeliver)
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  useEffect(() => {
    console.log(order)
    dispatch({ type: ORDER_CREATE_RESET })

    if (!userInfo) {
      history.push("/login")
    }

    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal")
      const script = document.createElement("script")
      script.type = "text/javascript"
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
      script.async = true
      script.onload = () => {
        setSdkReady(true)
      }
      document.body.appendChild(script)
    }

    if (!order || successPay || successDeliver || order._id !== orderId) {
      dispatch({ type: ORDER_PAY_RESET })
      dispatch({ type: ORDER_DELIVER_RESET })
      dispatch(getOrderDetails(orderId))
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript()
      } else {
        setSdkReady(true)
      }
    }
  }, [dispatch, orderId, successPay, order, history, userInfo, successDeliver])

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult)
    dispatch(payOrder(orderId, paymentResult))
  }
  const deliverHandler = () => {
    dispatch(deliverOrder(order))
  }

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : !userInfo ||
    (userInfo._id !== order.buyer._id &&
      userInfo._id !== order.seller._id &&
      !userInfo.isAdmin) ? (
    <Message variant='danger'>
      You are unauthorised to access this page. <a href='/'>Go back.</a>
    </Message>
  ) : (
    <>
      <Button
        data-testid='navigate-back-btn'
        onClick={history.goBack}
        variant='outline-secondary'
        className='mb-4'
      >
        Go Back
      </Button>
      <Row>
        <h2>
          Order <span data-testid='order-id'>{order._id}</span>
        </h2>

        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item className='ps-0'>
              <h3>Shipping</h3>
              <p>
                <strong>Name: </strong>
                <span data-testid='order-username'>{order.buyer.name}</span>
              </p>
              <p>
                <strong>Email: </strong>{" "}
                <a href={`mailto:${order.buyer.email}`}>
                  <span data-testid='order-email'>{order.buyer.email}</span>
                </a>
              </p>
              <p>
                <strong>Address:</strong>{" "}
                <span data-testid='order-address'>
                  {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
                  {order.shippingAddress.postalCode},{" "}
                  {order.shippingAddress.country}
                </span>
              </p>
              {order.isDelivered ? (
                <Message
                  data-testid='order-delivermessage-success'
                  variant='success'
                >
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message
                  data-testid='order-delivermessage-fail'
                  variant='danger'
                >
                  Not Delivered
                </Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item className='ps-0'>
              <h3>Payment Method</h3>
              <p>
                <strong>Method: </strong>
                <span data-testid='order-paymentmethod'>
                  {order.paymentMethod}
                </span>
              </p>
              {order.isPaid ? (
                <Message
                  data-testid='order-paymentmessage-success'
                  variant='success'
                >
                  Paid on {order.paidAt}
                </Message>
              ) : (
                <Message
                  data-testid='order-paymentmessage-fail'
                  variant='danger'
                >
                  Not Paid
                </Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item className='ps-0'>
              <h3>Order Items</h3>
              {!order.orderItem ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col md={1}>
                        <Image
                          src={order.orderItem.image}
                          alt={order.orderItem.name}
                          fluid
                          rounded
                        />
                      </Col>
                      <Col>
                        <Link to={`/product/${order.orderItem.product}`}>
                          <span data-testid='order-product-name'>
                            {order.orderItem.name}
                          </span>
                        </Link>
                      </Col>
                      <Col md={4}>
                        $
                        <span data-testid='order-product-price'>
                          {addDecimals(order.itemPrice)}
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
                    <span data-testid='order-summary-price'>
                      {addDecimals(order.itemPrice)}
                    </span>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>
                    $
                    <span data-testid='order-summary-shipping'>
                      {addDecimals(order.shippingPrice)}
                    </span>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>
                    $
                    <span data-testid='order-summary-tax'>
                      {addDecimals(order.taxPrice)}
                    </span>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>
                    $
                    <span data-testid='order-summary-total'>
                      {addDecimals(order.totalPrice)}
                    </span>
                  </Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </ListGroup.Item>
              )}

              {loadingDeliver && <Loader />}

              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type='button'
                      className='btn btn-block'
                      onClick={deliverHandler}
                    >
                      Mark As Delivered
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default OrderScreen
