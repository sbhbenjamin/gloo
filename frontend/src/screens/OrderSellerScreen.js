import React, { useState, useEffect } from "react"
import { Table, Form, Button, Row, Col } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import { getUserDetails, updateUserProfile } from "../actions/userActions"
import { listMyOrders, listMySellerOrders } from "../actions/orderActions"

const OrderSellerScreen = ({ location, history }) => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const orderSellerListMy = useSelector((state) => state.orderSellerListMy)
  const {
    loading: loadingOrders,
    error: errorOrders,
    orders,
  } = orderSellerListMy

  useEffect(() => {
    if (!userInfo) {
      history.push("/login")
    } else {
      dispatch(listMySellerOrders())
    }
  }, [dispatch, history, userInfo])

  return (
    <>
      {" "}
      <div className='mb-4'>
        <h2 className='text-2xl font-bold'>My Seller Orders</h2>
      </div>
      {loadingOrders ? (
        <Loader />
      ) : errorOrders ? (
        <Message variant='danger'>{errorOrders}</Message>
      ) : (
        <Table striped bordered hover responsive className='align-middle'>
          <thead>
            <tr>
              <th>ID</th>
              <th>BUYER NAME</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.buyer.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <i className='fas fa-times' style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <i className='fas fa-times' style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button
                      data-testid='order-details'
                      variant='outline-secondary'
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
      )}
    </>
  )
}

export default OrderSellerScreen
