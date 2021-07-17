import React, { useEffect } from "react"
import { Table, Button } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import { getUserDetails } from "../actions/userActions"
import { listMyOrders } from "../actions/orderActions"

const OrderBuyerScreen = ({ location, history }) => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const orderListMy = useSelector((state) => state.orderListMy)
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy

  useEffect(() => {
    if (!userInfo) {
      history.push("/login")
    } else {
      dispatch(listMyOrders())
    }
  }, [dispatch, history, userInfo])

  return (
    // <Row>
    /* <Col md={3}>
        <div className='mb-2'>
          <h2 className='text-2xl font-bold'>Update Profile</h2>
        </div>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {success && <Message variant='success'>Profile Updated</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label className='mb-1'>Name</Form.Label>
            <Form.Control
              data-testid='update-name'
              type='name'
              placeholder='Enter Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='mb-3'
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='email'>
            <Form.Label className='mb-1'>Email Address</Form.Label>
            <Form.Control
              data-testid='update-email'
              type='email'
              placeholder='Enter Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='mb-3'
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='password'>
            <Form.Label className='mb-1'>Password</Form.Label>
            <Form.Control
              data-testid='update-password'
              type='password'
              placeholder='Enter Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='mb-3'
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='confirmPassword'>
            <Form.Label className='mb-1'>Confirm Password</Form.Label>
            <Form.Control
              data-testid='update-confirmpassword'
              type='password'
              placeholder='Confirm Password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className='mb-3'
            ></Form.Control>
          </Form.Group>

          <Button
            data-testid='update-submit'
            type='submit'
            variant='outline-success'
            className='mb-3'
          >
            Update
          </Button>
        </Form>
      </Col> */
    <>
      <div className='mb-4'>
        <h2 className='text-2xl font-bold'>My Orders</h2>
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

export default OrderBuyerScreen
