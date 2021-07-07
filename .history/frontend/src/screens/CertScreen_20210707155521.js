import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Row, Col, Image, ListGroup, Button } from "react-bootstrap"
import Message from "../components/Message"
import Loader from "../components/Loader"
import Meta from "../components/Meta"
import {
  CERT_DETAILS_REQUEST,
  CERT_DETAILS_RESET,
} from "../constants/certConstants"
import { listCertDetails } from "../actions/certActions"

const CertScreen = ({ history, match }) => {
  const dispatch = useDispatch()

  const certDetails = useSelector((state) => state.certDetails)
  const { loading, error, cert } = certDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (
      history.location &&
      history.location.pathname !== `/certificates/${cert._id}`
    ) {
      dispatch({ type: CERT_DETAILS_RESET })
    }

    dispatch(listCertDetails(match.params.id))
  }, [dispatch, match, history, cert._id])

  const editHandler = () => {
    history.push(`/certificates/${cert._id}/edit`)
  }

  return userInfo && cert.user ? (
    userInfo._id === cert.user._id || userInfo.isAdmin ? (
      <>
        <Link
          data-testid='back-btn'
          className='btn btn-outline-secondary my-3'
          to='/'
        >
          Go Back
        </Link>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <>
            <Meta title={cert.name} />
            {/* <Row>
              <Col md={6}>
                <Image
                  data-testid='cert-image'
                  src={cert.image}
                  alt={cert.name}
                  fluid
                />
              </Col>
              <Col md={3}>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <p data-testid='cert-issuer'>{cert.issuer}</p>
                    <h3 data-testid='cert-name'>{cert.name}</h3>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <p data-testid='cert-date'>{cert.date}</p>
                  </ListGroup.Item>
                  <ListGroup.Item data-testid='cert-status'>
                    Status: {cert.status}
                  </ListGroup.Item>

                  <ListGroup.Item className='d-grid gap-2'>
                    <div className='d-grid gap-2'>
                      <Button
                        data-testid='listing-edit-btn'
                        onClick={editHandler}
                        className='btn btn-success'
                        type='button'
                      >
                        Edit Certificate
                      </Button>
                    </div>
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row> */}

            <div class='min-w-screen min-h-screen bg-green-300 flex items-center p-30 lg:p-10 overflow-hidden relative'>
              <div class='w-full max-w-6xl rounded bg-white shadow-xl p-10 lg:p-20 mx-auto text-gray-800 relative md:text-left'>
                <div class='md:flex items-center -mx-10'>
                  <div class='w-full md:w-1/2 px-10 mb-10 md:mb-0'>
                    <div class='relative'>
                      <Image
                        data-testid='cert-image'
                        src={cert.image}
                        alt={cert.name}
                        fluid
                      />
                    </div>
                  </div>
                  <div class='w-full md:w-1/2 px-10'>
                    <div class='mb-10'>
                      <h1
                        class='font-bold uppercase text-2xl mb-5'
                        data-testid='cert-name'
                      >
                        {cert.name}
                      </h1>
                      <ListGroup variant='flush'>
                        <ListGroup.Item>
                          <p data-testid='cert-issuer'>{cert.issuer}</p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <p data-testid='cert-date'>{cert.date}</p>
                        </ListGroup.Item>
                        <ListGroup.Item data-testid='cert-status'>
                          Status: {cert.status}
                        </ListGroup.Item>

                        <ListGroup.Item className='d-grid gap-2'>
                          <div className='d-grid gap-2'>
                            <Button
                              data-testid='listing-edit-btn'
                              onClick={editHandler}
                              className='btn btn-success'
                              type='button'
                            >
                              Edit Certificate
                            </Button>
                          </div>
                        </ListGroup.Item>
                      </ListGroup>
                    </div>
                    <div>
                      <div class='inline-block align-bottom mr-5'>
                        <span class='text-2xl leading-none align-baseline'>
                          $
                        </span>
                        <span class='font-bold text-5xl leading-none align-baseline'>
                          59
                        </span>
                        <span class='text-2xl leading-none align-baseline'>
                          .99
                        </span>
                      </div>
                      <div class='inline-block align-bottom'>
                        <button class='bg-yellow-300 opacity-75 hover:opacity-100 text-yellow-900 hover:text-gray-900 rounded-full px-10 py-2 font-semibold'>
                          <i class='mdi mdi-cart -ml-2 mr-2'></i> BUY NOW
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </>
    ) : (
      <Message variant='danger'>
        Unauthorised Access of Certificate Page
      </Message>
    )
  ) : (
    ""
  )
}

export default CertScreen
