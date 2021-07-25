import React, { useEffect, useState } from 'react'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listMyOrders, listMySellerOrders } from '../actions/orderActions'

const UserOrdersScreen = ({ history }) => {
  const dispatch = useDispatch()

  const [isBuyerOrdersView, setBuyerOrdersView] = useState(true)

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const orderListMy = useSelector((state) => state.orderListMy)
  const {
    loading: loadingBuyerOrders,
    error: errorBuyerOrders,
    orders: buyerOrders,
  } = orderListMy

  const orderSellerListMy = useSelector((state) => state.orderSellerListMy)
  const {
    loading: loadingSellerOrders,
    error: errorSellerOrders,
    orders: sellerOrders,
  } = orderSellerListMy

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      dispatch(listMyOrders())
      dispatch(listMySellerOrders())
    }
  }, [dispatch, history, userInfo])

  const getBuyerOrdersHandler = () => {
    dispatch(listMyOrders())
    setBuyerOrdersView(true)
  }

  const getSellerOrdersHandler = () => {
    dispatch(listMySellerOrders())
    setBuyerOrdersView(false)
  }

  return (
    <>
      <div className='mb-4'>
        <h2 className='text-2xl font-bold'>Transactions</h2>
      </div>
      {isBuyerOrdersView ? (
        loadingBuyerOrders ? (
          <Loader />
        ) : errorBuyerOrders ? (
          <Message variant='danger'>{errorBuyerOrders}</Message>
        ) : (
          <>
            <Row>
              <Col className='d-flex justify-content-start'>
                <Button
                  data-testid='purchases-btn'
                  className='block me-2'
                  onClick={getBuyerOrdersHandler}
                >
                  Purchases
                </Button>
                <Button
                  data-testid='sales-btn'
                  className='block hollow'
                  onClick={getSellerOrdersHandler}
                >
                  Sales
                </Button>
              </Col>
            </Row>
            <Table striped bordered hover responsive className='align-middle'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>LISTING</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>COMPLETED</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {buyerOrders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.orderItem && order.orderItem.name}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>${order.totalPrice.toFixed(2)}</td>
                    <td>
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <i
                          className='fas fa-times'
                          style={{ color: 'red' }}
                        ></i>
                      )}
                    </td>
                    <td>
                      {order.isDelivered ? (
                        order.deliveredAt.substring(0, 10)
                      ) : (
                        <i
                          className='fas fa-times'
                          style={{ color: 'red' }}
                        ></i>
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/order/${order._id}`}>
                        <Button
                          data-testid='order-details'
                          variant='outline-success'
                          className='btn-sm'
                        >
                          Details
                        </Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        )
      ) : loadingSellerOrders ? (
        <Loader />
      ) : errorSellerOrders ? (
        <Message variant='danger'>{errorSellerOrders}</Message>
      ) : (
        <>
          <Row>
            <Col className='d-flex justify-content-start'>
              <Button
                data-testid='purchases-btn'
                className='block hollow me-2'
                onClick={getBuyerOrdersHandler}
              >
                Purchases
              </Button>
              <Button
                data-testid='sales-btn'
                className='block'
                onClick={getSellerOrdersHandler}
              >
                Sales
              </Button>
            </Col>
          </Row>
          <Table striped bordered hover responsive className='align-middle'>
            <thead>
              <tr>
                <th>ID</th>
                <th>BUYER NAME</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>COMPLETED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {sellerOrders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.buyer.name}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>${order.totalPrice.toFixed(2)}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button
                        data-testid='order-details'
                        variant='outline-success'
                        className='btn-sm'
                      >
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  )
}

export default UserOrdersScreen
