import './chatproduct.css'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  Card,
  Row,
  Col,
  Button,
  InputGroup,
  FormControl,
  Spinner,
} from 'react-bootstrap'
import Rating from '../Rating'
import Message from '../Message'
import {
  acceptOffer,
  createOffer,
  getOffers,
  rejectOffer,
} from '../../actions/offerActions'
import { addToCart } from '../../actions/cartActions'
import { getOrderDetails } from '../../actions/orderActions'
import { ORDER_DETAILS_RESET } from '../../constants/orderConstants'

const ChatProduct = ({ history, currentChat, setChildError, setChildInfo }) => {
  const [offerActive, setOfferActive] = useState(false)
  const [offerPrice, setOfferPrice] = useState(null)
  const [currentOffer, setCurrentOffer] = useState(null)
  const [offered, setOffered] = useState(false)
  const [accepted, setAccepted] = useState(false)
  const [rejected, setRejected] = useState(false)
  const [offerer, setOfferer] = useState(false)
  const [orderExists, setOrderExists] = useState(null)

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const { name, image, rating, numReviews } = currentChat.product

  const offerList = useSelector((state) => state.offerList)
  const { offers, loading: loadingOffers, error: errorOffers } = offerList

  const offerCreate = useSelector((state) => state.offerCreate)
  const {
    offer: createdOffer,
    loading: loadingCreate,
    error: errorCreate,
  } = offerCreate

  const offerAccept = useSelector((state) => state.offerAccept)
  const {
    offer: acceptedOffer,
    loading: loadingAccept,
    error: errorAccept,
  } = offerAccept

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading: loadingDetails, error: errorDetails } = orderDetails

  // lift errors to parent
  useEffect(() => {
    if (errorCreate) {
      setChildError(errorCreate)
    }
    if (errorOffers) {
      setChildError(errorOffers)
    }

    if (errorAccept) {
      setChildError(errorAccept)
    }
  }, [setChildError, errorCreate, errorOffers, errorAccept])

  useEffect(() => {
    dispatch(getOffers())
  }, [dispatch, currentChat, createdOffer, acceptedOffer])

  useEffect(() => {
    if (order) {
      setOrderExists(order)
    }
  }, [order, currentChat])

  useEffect(() => {
    dispatch({ type: ORDER_DETAILS_RESET })
    if (offers) {
      const offerExists = offers.filter(
        (offer) =>
          offer.conversation === currentChat._id &&
          offer.offerStatus !== 'rejected'
      )

      if (offerExists.length > 0) {
        const offer = offerExists[0]
        setCurrentOffer(offer)

        if (offer) {
          dispatch(getOrderDetails(offer._id))
        }

        // check if offer is accepted and user is buyer
        if (
          offer?.offerStatus === 'accepted' &&
          currentOffer?.buyer === userInfo._id
        ) {
          setOffered(true)

          // offer is made, user is recepient
        } else if (
          offer?.offerStatus === 'pending' &&
          offer?.sender !== userInfo._id
        ) {
          setOffered(true)
          setOfferer(false)
          // offer is made, user is sender
        } else if (
          offer &&
          offer.offerStatus === 'pending' &&
          offer.sender === userInfo._id
        ) {
          setOffered(true)
          setOfferer(true)
          // offer is accepted, user is seller
        } else if (offer?.offerStatus === 'accepted') {
          setAccepted(true)
        } else {
          setChildError('Order does not exist')
        }
      }
    } else {
      setCurrentOffer(null)
      setOffered(false)
      setOfferer(null)
      setAccepted(false)
    }
  }, [dispatch, offers, userInfo._id, currentChat])

  const handleMakeOffer = () => {
    setOfferActive(true)
  }

  const handleOfferCancel = () => {
    setOfferActive(false)
  }

  const handleOfferSubmit = () => {
    if (offerPrice) {
      const offer = {
        conversation: currentChat._id,
        sender: userInfo._id,
        buyer: currentChat.buyer._id,
        seller: currentChat.seller._id,
        orderItem: {
          name,
          image,
          product: currentChat.product,
        },
        offerPrice: offerPrice,
        offerStatus: 'pending',
      }
      dispatch(createOffer(offer))
      setChildInfo('Offer successfully created')
    } else {
      setChildError('Offer required')
    }
  }

  const handleAcceptOffer = () => {
    dispatch(acceptOffer(currentOffer))
    setAccepted(true)
    setChildInfo('Offer successfully accepted')
  }

  const handleDeclineOffer = () => {
    dispatch(rejectOffer(currentOffer))
    setRejected(true)
    setCurrentOffer(null)
    setChildInfo('Offer successfully rejected')
  }

  const handleCheckout = () => {
    dispatch(addToCart(currentOffer))
    history.push('/shipping')
  }

  return (
    <>
      {loadingOffers || loadingCreate || loadingAccept || loadingDetails ? (
        <Spinner
          animation='border'
          role='status'
          style={{
            width: '25px',
            height: '25px',
            margin: 'auto',
            display: 'block',
          }}
        >
          <span className='sr-only'>Loading...</span>
        </Spinner>
      ) : (
        <Card className='chatBoxProduct'>
          <Card.Body>
            <Row className='gap-4 justify-content-between'>
              {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
              {errorAccept && <Message variant='danger'>{errorAccept}</Message>}
              {errorOffers && <Message variant='danger'>{errorOffers}</Message>}
              <Col xs={12} md='auto'>
                <Row>
                  <Col xs='auto'>
                    <img
                      className='chatBoxProductImage'
                      data-testid='chat-product-img'
                      src={image}
                      alt={name}
                    />
                  </Col>
                  <Col>
                    <p
                      className='chatBoxProductName'
                      data-testid='chat-product-name'
                    >
                      {name}
                    </p>
                    <Rating
                      data-testid='product-rating'
                      value={rating}
                      text={`${numReviews} reviews`}
                    />
                  </Col>
                </Row>
              </Col>
              <Col md='auto' className='d-flex align-items-center'>
                {orderExists ? (
                  <Link
                    className='btn btn-success'
                    data-testid='chat-product-vieworderbtn'
                    to={`/order/${orderExists._id}`}
                  >
                    View Order
                  </Link>
                ) : accepted && userInfo._id === currentOffer.buyer ? (
                  <Button
                    variant='primary'
                    onClick={handleCheckout}
                    data-testid='chat-product-checkoutbtn'
                  >
                    Proceed to Checkout
                  </Button>
                ) : accepted && userInfo._id === currentOffer.seller ? (
                  <Button
                    disabled
                    variant='secondary'
                    data-testid='chat-product-acceptedbtn'
                  >
                    Accepted
                  </Button>
                ) : // if offer is not made by current user and offer status is pending
                !rejected && offered === true && offerer === false ? (
                  <Row>
                    <Col className='pe-0'>
                      <Button
                        variant='success'
                        onClick={handleAcceptOffer}
                        data-testid='chat-product-offerbtn'
                      >
                        ${currentOffer.offerPrice.toFixed(2)}
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        variant='danger'
                        data-testid='chat-product-offerdecline'
                        onClick={handleDeclineOffer}
                      >
                        Decline
                      </Button>
                    </Col>
                  </Row>
                ) : offered && offerer ? (
                  <Button
                    disabled
                    variant='secondary'
                    data-testid='chat-product-offeredbtn'
                  >
                    Offer made
                  </Button>
                ) : // no offer on currently
                rejected || (offered === false && offerActive === false) ? (
                  <Button
                    className='chatBoxProductBtn'
                    onClick={handleMakeOffer}
                    data-testid='chat-product-offertoggle'
                  >
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
                        data-testid='chat-product-offerinput'
                        placeholder='0.00'
                        onChange={(e) => setOfferPrice(e.target.value)}
                      />
                      <InputGroup.Append>
                        <Button
                          variant='outline-success'
                          onClick={handleOfferSubmit}
                          data-testid='chat-product-offersubmit'
                        >
                          Offer
                        </Button>
                      </InputGroup.Append>
                    </InputGroup>
                    <Button
                      variant='link'
                      className='chatBoxProductCancel'
                      onClick={handleOfferCancel}
                      data-testid='chat-product-offercancel'
                    >
                      cancel
                    </Button>
                  </div>
                )}
              </Col>
            </Row>
          </Card.Body>
        </Card>
      )}{' '}
    </>
  )
}

export default ChatProduct
