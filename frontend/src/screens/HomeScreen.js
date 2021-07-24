import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import Meta from '../components/Meta'
import { listProducts } from '../actions/productActions'
import { getFavourites } from '../actions/userActions'
import NavbarCategory from './NavbarCategory'

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword
  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { loading, error, products, pages, page } = productList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
    dispatch(getFavourites())
  }, [dispatch, keyword, pageNumber, userInfo])

  return (
    <>
      <NavbarCategory />
      <Container>
        <Meta />
        <Row className='mt-5 mb-2'>
          <Col>
            {match.params.keyword ? (
              <h2>{match.params.keyword}</h2>
            ) : (
              <h2>Latest Products</h2>
            )}
          </Col>
        </Row>
        {/* {errorFavourite && <Message variant='danger'>{errorFavourite}</Message>} */}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <>
            <Row>
              {products.map((product) => (
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
              ))}
            </Row>
            <Paginate
              pages={pages}
              page={page}
              keyword={keyword ? keyword : ''}
            />
          </>
        )}
      </Container>
    </>
  )
}

export default HomeScreen
