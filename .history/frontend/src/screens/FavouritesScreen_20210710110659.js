import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Row, Col } from "react-bootstrap"
import Product from "../components/Product"
import Message from "../components/Message"
import Loader from "../components/Loader"
import Meta from "../components/Meta"
import { getFavourites } from "../actions/userActions"

const FavouritesScreen = () => {
  const dispatch = useDispatch()

  const userFavourites = useSelector((state) => state.userFavourites)
  const {
    loading: loadingFavourites,
    error: errorFavourites,
    products: productsFavourites,
  } = userFavourites

  // const favouriteRemove = useSelector((state) => state.favouriteRemove)
  // const { success: successRemove } = favouriteRemove

  // const favouriteAdd = useSelector((state) => state.favouriteAdd)
  // const { success: successAdd } = favouriteAdd

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
          </Row>
        </>
      )}
    </>
  )
}

export default FavouritesScreen
