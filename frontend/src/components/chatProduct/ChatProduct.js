import './chatproduct.css'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  Card,
  Row,
  Col,
  Button,
  InputGroup,
  FormControl,
} from 'react-bootstrap'
import Rating from '../Rating'

const ChatProduct = ({ currentChat }) => {
  const [offerActive, setOfferActive] = useState(false)
  const [offerPrice, setOfferPrice] = useState(null)
  const dispatch = useDispatch()

  const handleOfferBtn = () => {
    setOfferActive(true)
  }

  const handleOfferCancel = () => {
    setOfferActive(false)
  }

  const handleOfferSubmit = () => {
    // dispatch offer
    console.log(offerPrice)
  }

  return (
    <>
      <Card className='chatBoxProduct'>
        <Card.Body>
          <Row>
            <Col xs={1}>
              <img
                className='chatBoxProductImage'
                src={currentChat.product.image}
                alt={currentChat.product.name}
              />
            </Col>
            <Col className='flex-grow-1'>
              <p className='chatBoxProductName'>{currentChat.product.name}</p>
              <Rating
                data-testid='product-rating'
                value={currentChat.product.rating}
                text={`${currentChat.product.numReviews} reviews`}
              />
            </Col>
            <Col xs={5} className='d-flex chatBoxProductBtnWrapper'>
              {!offerActive ? (
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
