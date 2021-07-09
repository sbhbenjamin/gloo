import "./product.css"
import { Link } from "react-router-dom"
import { Card, Row, Col } from "react-bootstrap"
import Rating from "./Rating"
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

import {
  addFavourite,
  removeFavourite,
  getFavourites,
} from "../actions/userActions"

import {
  USER_ADD_FAVOURITE_RESET,
  USER_REMOVE_FAVOURITE_RESET,
} from "../constants/userConstants"

const Product = ({ product }) => {
  const dispatch = useDispatch()

  const userFavourites = useSelector((state) => state.userFavourites)
  const { products } = userFavourites

  const favouriteAdd = useSelector((state) => state.favouriteAdd)
  const { success: successAdd } = favouriteAdd

  const favouriteRemove = useSelector((state) => state.favouriteRemove)
  const { success: successRemove } = favouriteRemove

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  // useEffect(() => {
  //   if (userInfo) {
  //     dispatch(getFavourites())
  //   }
  // }, [dispatch, userInfo, successAdd, successRemove])

  const checkFavourited = () => {
    if (products) {
      return products.find((p) => p._id === product._id)
    } else {
      return undefined
    }
  }

  const addToFavouritesHandler = (e) => {
    e.preventDefault()
    dispatch(addFavourite(product))
    dispatch({ type: USER_ADD_FAVOURITE_RESET })
  }

  const removeFromFavouritesHandler = (e) => {
    e.preventDefault()
    dispatch(removeFavourite(product))
    dispatch({ type: USER_REMOVE_FAVOURITE_RESET })
  }

  return (
    <Card className='my-3 rounded d-flex flex-column'>
      <Link to={`/product/${product._id}`}>
        <Card.Img
          data-testid='product-image'
          src={product.image}
          variant='top'
        />
      </Link>

      <Card.Body className='d-flex flex-column'>
        <Link to={`/product/${product._id}`}>
          <Card.Title as='div'>
            <h5 class='card-title' data-testid='product-name'>
              {product.name}
            </h5>
          </Card.Title>
        </Link>

        <Card.Text as='div'>
          <Rating
            data-testid='product-rating'
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
          <Col className='text-end'>
            {userInfo &&
              (checkFavourited.apply() ? (
                <a href='/' onClick={(e) => removeFromFavouritesHandler(e)}>
                  <i className='fas fa-heart'></i>
                </a>
              ) : (
                <a href='/' onClick={(e) => addToFavouritesHandler(e)}>
                  <i className='far fa-heart'></i>
                </a>
              ))}
          </Col>
        </Card.Text>

        <Card.Text as='h5' className='mt-2'>
          <Row>
            <Col className='priceWrapper'>
              <div className='productPrice'>
                $<span data-testid='product-price'>{product.price}</span>
              </div>
            </Col>
          </Row>
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Product
