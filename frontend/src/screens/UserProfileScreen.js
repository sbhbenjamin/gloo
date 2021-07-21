import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'
import { listUserProducts } from '../actions/productActions'
import { getUserDetailsPublic } from '../actions/userActions'
import { listUserCerts } from '../actions/certActions'

const UserProfileScreen = ({ match }) => {
  const userId = match.params.id

  const dispatch = useDispatch()

  const userDetailsPublic = useSelector((state) => state.userDetailsPublic)
  const {
    loading: loadingUserDetails,
    error: errorUserDetails,
    user,
  } = userDetailsPublic

  const productListUser = useSelector((state) => state.productListUser)
  const {
    loading: loadingProducts,
    error: errorProducts,
    products,
  } = productListUser

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const certListUser = useSelector((state) => state.certListUser)
  const { certs } = certListUser

  useEffect(() => {
    dispatch(listUserProducts(userId))
    dispatch(getUserDetailsPublic(userId))
    dispatch(listUserCerts(userId))
  }, [dispatch, userId])

  return (
    <>
      <Meta title={userId} />
      {(loadingUserDetails || loadingProducts) && <Loader />}
      {loadingUserDetails ? (
        '' // <Loader />
      ) : errorUserDetails ? (
        <Message variant='danger'>{errorUserDetails}</Message>
      ) : (
        <>
          <Row>
            <span style={{ display: 'inline-flex', alignItems: 'center' }}>
              <h1 className='mr-4'>{user.name}</h1>
              {certs &&
                certs.filter((cert) => cert.status === 'Approved').length >
                  0 && (
                  <h3 style={{ paddingLeft: '15px' }}>
                    <i
                      className='fas fa-check-circle'
                      data-testid='verified-icon'
                    ></i>
                  </h3>
                )}
            </span>
          </Row>
          <Row>
            {certs &&
              certs.filter((cert) => cert.status === 'Approved').length > 0 && (
                <>
                  <h5>Verified Certificates</h5>
                  {certs
                    .filter((cert) => cert.status === 'Approved')
                    .map((cert) => (
                      <li key={cert._id}>{cert.name}</li>
                    ))}
                </>
              )}
          </Row>
        </>
      )}
      {loadingProducts ? (
        '' //<Loader />
      ) : errorProducts ? (
        <Message variant='danger'>{errorProducts}</Message>
      ) : (
        <Row>
          {products.length === 0 ? (
            <p>
              {userInfo
                ? userInfo._id === user._id
                  ? 'You do not have any listings'
                  : 'This user does not currently have any listings'
                : 'This user does not currently have any listings'}
            </p>
          ) : (
            products.map((product) => (
              <Col
                key={product._id}
                sm={12}
                md={6}
                lg={4}
                xl={3}
                className='d-flex align-items-stretch'
              >
                <Product product={product} />
              </Col>
            ))
          )}
        </Row>
      )}
    </>
  )
}

export default UserProfileScreen
