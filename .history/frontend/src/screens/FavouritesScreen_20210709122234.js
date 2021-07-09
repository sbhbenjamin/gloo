import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Row, Col } from "react-bootstrap"
import Product from "../components/Product"
import Message from "../components/Message"
import Loader from "../components/Loader"
import Meta from "../components/Meta"
import { getFavourites } from "../actions/userActions"
// import { USER_LIST_FAVOURITES_RESET } from '../constants/userConstants'

const FavouritesScreen = () => {
  const dispatch = useDispatch()

  const userFavourites = useSelector((state) => state.userFavourites)
  const {
    loading: loadingFavourites,
    error: errorFavourites,
    // success: successFavourites,
    products: productsFavourites,
  } = userFavourites

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo) {
      dispatch(getFavourites())
    }
  }, [dispatch, userInfo])

  return (
    <>
      <Meta />
      <h1>Favourites</h1>
      {loadingFavourites ? (
        <Loader />
      ) : errorFavourites ? (
        <Message variant='danger'>{errorFavourites}</Message>
      ) : (
        <>
          <Row>
            {!productsFavourites ? (
              <Message variant='danger'>
                You do not have any favourite products.
              </Message>
            ) : (
              productsFavourites.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))
            )}
            {productsFavourites.map((p) => (
              <Col>
                <Product product={p} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  )
}

export default FavouritesScreen
