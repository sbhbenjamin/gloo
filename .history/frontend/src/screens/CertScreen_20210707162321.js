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
            <div className='flex justify-end'>
              <div md={9}>
                <Image
                  data-testid='cert-image'
                  src={cert.image}
                  alt={cert.name}
                  fluid
                />
              </div>
              <div md={3}>
                <ListGroup variant='flush'>
                  <h1
                    class='font-bold uppercase text-2xl mb-5'
                    data-testid='cert-name'
                  >
                    {cert.name}
                  </h1>
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
