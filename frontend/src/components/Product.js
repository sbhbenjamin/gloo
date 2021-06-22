import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Card, Row, Col } from 'react-bootstrap'
import Rating from './Rating'

import {
  addFavourite,
  removeFavourite,
  getFavourites,
} from '../actions/userActions'

import {
  USER_ADD_FAVOURITE_RESET,
  USER_REMOVE_FAVOURITE_RESET,
} from '../constants/userConstants'

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

  useEffect(() => {
    if (userInfo) {
      dispatch(getFavourites(userInfo._id))
    }
  }, [dispatch, userInfo, successAdd, successRemove])

  const checkFavourited = () => {
    if (products) {
      return products.find((p) => p._id.toString() === product._id)
    } else {
      return false
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
    <Card className='my-3 rounded'>
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant='top' />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as='div'>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as='div'>
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>

        <Card.Text as='h3' style={{ paddingBottom: 0 }}>
          <Row>
            <Col>${product.price}</Col>
            <Col className='text-end'>
              {userInfo &&
                (checkFavourited() ? (
                  <a href='/' onClick={(e) => removeFromFavouritesHandler(e)}>
                    <i className='fas fa-heart'></i>
                  </a>
                ) : (
                  <a href='/' onClick={(e) => addToFavouritesHandler(e)}>
                    <i className='far fa-heart'></i>
                  </a>
                ))}
            </Col>
          </Row>
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Product
