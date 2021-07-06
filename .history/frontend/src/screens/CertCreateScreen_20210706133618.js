import axios from "axios"
import React, { useState, useEffect } from "react"
import { Form, Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import FormContainer from "../components/FormContainer"
import { CERT_CREATE_RESET } from "../constants/certConstants"
import { createCert } from "../actions/certActions"

const CertCreateScreen = ({ match, history }) => {
  const [name, setName] = useState("")
  const [issuer, setIssuer] = useState("")
  const [date, setDate] = useState("")
  const [image, setImage] = useState("")
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const certCreate = useSelector((state) => state.certCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = certCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch({ type: CERT_CREATE_RESET })

    if (!userInfo) {
      history.push("/login")
    }

    if (successCreate) {
      history.push("/user/certs")
    }
  }, [dispatch, history, successCreate, userInfo])

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

      const { data } = await axios.post("/api/certUploads", formData, config)

      setImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  const createCertHandler = (e) => {
    e.preventDefault()
    dispatch(
      createCert({
        name,
        issuer,
        date,
        image,
      })
    )
  }

  return (
    <>
      <Button
        data-testid='navigate-back-btn'
        onClick={history.goBack}
        variant='outline-secondary'
      >
        Go Back
      </Button>
      <FormContainer>
        <h1>Apply for Certificate</h1>
        {loadingCreate && <Loader />}
        {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
        <Form onSubmit={createCertHandler}>
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

          <Button
            data-testid='product-submit'
            className='mt-2'
            type='submit'
            variant='primary'
          >
            Create
          </Button>
        </Form>
      </FormContainer>
    </>
  )
}

export default CertCreateScreen
