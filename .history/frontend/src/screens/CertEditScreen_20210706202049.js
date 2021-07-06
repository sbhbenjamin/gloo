import axios from "axios"
import React, { useState, useEffect } from "react"
import { Form, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import FormContainer from "../components/FormContainer"
import {
  CERT_DELETE_RESET,
  CERT_UPDATE_RESET,
} from "../constants/certConstants"
import { deleteCert, listCertDetails, updateCert } from "../actions/certActions"

const CertEditScreen = ({ match, history }) => {
  const certId = match.params.id

  const [name, setName] = useState("")
  const [status, setStatus] = useState("")
  const [issuer, setIssuer] = useState("")
  const [date, setDate] = useState("")
  const [image, setImage] = useState("")
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const certDetails = useSelector((state) => state.certDetails)
  const { loading, error, cert } = certDetails

  const certUpdate = useSelector((state) => state.certUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = certUpdate

  const certDelete = useSelector((state) => state.certDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = certDelete

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo) {
      history.push("/")
    } else if (successUpdate) {
      dispatch({ type: CERT_UPDATE_RESET })
      history.push("/certs")
    } else if (successDelete) {
      dispatch({ type: CERT_DELETE_RESET })
      history.push("/")
    } else {
      if (!cert.name || cert._id !== certId) {
        dispatch(listCertDetails(certId))
      } else {
        setName(cert.name)
        setStatus(cert.status)
        setIssuer(cert.issuer)
        setDate(cert.date)
        setImage(cert.image)
      }
    }
  }, [dispatch, history, certId, cert, successUpdate, successDelete, userInfo])

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append("image", file)
    setUploading(true)

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }

      const { data } = await axios.post("/api/certUpload", formData, config)

      setImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  const approveStatusHandler = () => {
    setStatus("Approved")
  }

  const rejectStatusHandler = () => {
    setStatus("Rejected")
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateCert({
        _id: certId,
        name,
        status,
        issuer,
        date,
        image,
      })
    )
  }

  const deleteHandler = () => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteCert(certId))
    }
  }

  return userInfo && cert.user ? (
    userInfo._id === cert.user._id || userInfo.isAdmin ? (
      <>
        <Link to='/' className='btn btn-outline-secondary'>
          Go Back
        </Link>
        <FormContainer>
          <h1>Edit Certificate</h1>
          {loadingUpdate && <Loader />}
          {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
          {loadingDelete && <Loader />}
          {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{error}</Message>
          ) : (
            <Form onSubmit={submitHandler}>
              <Form.Group controlId='name'>
                <Form.Label>Name of Certificate</Form.Label>
                <Form.Control
                  data-testid='cert-name'
                  type='name'
                  placeholder='Enter certificate name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId='issuer'>
                <Form.Label>Issuer</Form.Label>
                <Form.Control
                  data-testid='cert-issuer'
                  type='text'
                  placeholder='Enter issueing organisation'
                  value={issuer}
                  onChange={(e) => setIssuer(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='date'>
                <Form.Label>Date of Attainment</Form.Label>
                <Form.Control
                  data-testid='cert-date'
                  type='text'
                  placeholder='Enter date'
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='image'>
                <Form.Label>Image</Form.Label>
                <Form.Control
                  data-testid='cert-image'
                  type='text'
                  placeholder='Upload an image'
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                ></Form.Control>
                <Form.File
                  id='image-file'
                  custom
                  onChange={uploadFileHandler}
                  className='mt-2'
                ></Form.File>
                {uploading && <Loader />}
              </Form.Group>
              <Form.Group>
                <label className='mt-1'>
                  Approve
                  <input
                    name='status'
                    type='radio'
                    checked={status === "Approved"}
                    onChange={approveStatusHandler}
                    className='mt-3 me-3 mx-1'
                    style={{ marginLeft: "2" }}
                  />
                </label>
                <label>
                  Reject
                  <input
                    name='status'
                    type='radio'
                    checked={status === "Rejected"}
                    onChange={rejectStatusHandler}
                    className='mx-1'
                  />
                </label>
              </Form.Group>
              <Button
                data-testid='edit-submit'
                type='submit'
                variant='primary'
                className='mt-2 me-2'
              >
                Update Certificate
              </Button>
              <Button
                data-testid='edit-delete'
                type='button'
                variant='danger'
                className='mt-2'
                onClick={deleteHandler}
              >
                Delete
              </Button>
            </Form>
          )}
        </FormContainer>
      </>
    ) : (
      <Message variant='danger'>Unauthorised Access of Cert Edit Page</Message>
    )
  ) : (
    ""
  )
}

export default CertEditScreen
