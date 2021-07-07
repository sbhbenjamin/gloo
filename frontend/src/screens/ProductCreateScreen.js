import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { createProduct } from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'

const ProductCreateScreen = ({ match, history }) => {
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const productCreate = useSelector((state) => state.productCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = productCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET })

    if (!userInfo) {
      history.push('/login')
    }

    if (successCreate) {
      history.push('/')
    }
  }, [dispatch, history, successCreate, userInfo])

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/upload', formData, config)

      setImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  const createProductHandler = (e) => {
    e.preventDefault()
    dispatch(
      createProduct({
        name,
        price,
        image,
        category,
        description,
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
        <div>
          <h1 className='text-4xl font-semibold mb-4'>Create Product</h1>
        </div>
        {loadingCreate && <Loader />}
        {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
        <Form onSubmit={createProductHandler}>
          <Form.Group controlId='name'>
            <p className='mb-1'>Name</p>
            <Form.Control
              data-testid='product-name'
              type='name'
              placeholder='Enter name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='mb-3'
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='price'>
            <p className='mb-1'>Price</p>
            <Form.Control
              data-testid='product-price'
              type='number'
              placeholder='Enter price'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className='mb-3'
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='image'>
            <p className='mb-1'>Image</p>
            <Form.Control
              data-testid='product-image'
              type='text'
              placeholder='Enter image url'
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className='mb-1'
            ></Form.Control>
            <Form.File
              id='image-file'
              custom
              onChange={uploadFileHandler}
            ></Form.File>
            {uploading && <Loader />}
          </Form.Group>

          {/* <Form.Group controlId='brand'>
            <Form.Label>Brand</Form.Label>
            <Form.Control
            
              type='text'
              placeholder='Enter brand'
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            ></Form.Control>
          </Form.Group> */}

          {/* <Form.Group controlId='countInStock'>
            <Form.Label>Count in Stock</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter count in stock'
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
            ></Form.Control>
          </Form.Group> */}

          <Form.Group controlId='category'>
            <p className='mb-1 mt-3'>Category</p>
            <Form.Control
              data-testid='product-category'
              type='text'
              placeholder='Enter category'
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className='mb-3'
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='description'>
            <p className='mb-1'>Description</p>
            <Form.Control
              data-testid='product-description'
              type='text'
              placeholder='Enter description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button
            data-testid='product-submit'
            className='mt-3'
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

export default ProductCreateScreen
