import './chatproduct.css'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Card,
  Row,
  Col,
  Button,
  InputGroup,
  FormControl,
} from 'react-bootstrap'
import Rating from '../Rating'
import { createOffer } from '../../actions/offerActions'

const ChatProduct = ({ currentChat }) => {
  const [offerActive, setOfferActive] = useState(false)
  const [offerPrice, setOfferPrice] = useState(null)
  const [offerMade, setOfferMade] = useState(false)
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const { name, image, rating, numReviews } = currentChat.product

  const offerCreate = useSelector((state) => state.offerCreate)
  const {
    // loading: loadingofferCreate,
    // error: errorofferCreate,
    offer: createdOffer,
  } = offerCreate

  const handleOfferBtn = () => {
    setOfferActive(true)
  }

  const handleOfferCancel = () => {
    setOfferActive(false)
  }

  const handleOfferSubmit = () => {
    const offer = {
      conversation: currentChat._id,
      buyer: userInfo._id,
      seller: currentChat.product._id,
      orderItem: {
        name,
        image,
        product: currentChat.product,
      },
      offerPrice: offerPrice,
      offerStatus: 'pending',
    }
    dispatch(createOffer(offer))
  }

  useState(() => {
    if (createdOffer?.conversation === currentChat._id) {
      setOfferMade(true)
    }
  }, [dispatch, createdOffer])

  return (
    <>
      <Card className='chatBoxProduct'>
        <Card.Body>
          <Row>
            <Col xs={1}>
              <img className='chatBoxProductImage' src={image} alt={name} />
            </Col>
            <Col className='flex-grow-1'>
              <p className='chatBoxProductName'>{name}</p>
              <Rating
                data-testid='product-rating'
                value={rating}
                text={`${numReviews} reviews`}
              />
            </Col>
            <Col xs={5} className='d-flex chatBoxProductBtnWrapper'>
              {offerMade ? (
                <Button disabled variant='secondary'>
                  Offer made
                </Button>
              ) : !offerActive ? (
                <Button className='chatBoxProductBtn' onClick={handleOfferBtn}>
                  Make offer
                </Button>
              ) : (
                <div className='chatBoxProductBtnExpand'>
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text>$</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      type='number'
                      placeholder='0.00'
                      onChange={(e) => setOfferPrice(e.target.value)}
                    />
                    <InputGroup.Append>
                      <Button
                        variant='outline-success'
                        onClick={handleOfferSubmit}
                      >
                        Offer
                      </Button>
                    </InputGroup.Append>
                  </InputGroup>
                  <a
                    href='#'
                    className='chatBoxProductCancel'
                    onClick={handleOfferCancel}
                  >
                    cancel
                  </a>
                </div>
              )}
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  )
}

export default ChatProduct
