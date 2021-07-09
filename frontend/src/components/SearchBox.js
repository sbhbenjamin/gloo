import React, { useState } from 'react'
import { Form, Button, InputGroup } from 'react-bootstrap'

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      history.push(`/search/${keyword}`)
    } else {
      history.push('/')
    }
  }

  return (
    <Form onSubmit={submitHandler} className='d-flex'>
      <InputGroup>
        <Form.Control
          data-testid='search-input'
          type='text'
          name='q'
          onChange={(e) => setKeyword(e.target.value)}
          placeholder='Search Products...'
        ></Form.Control>
        <InputGroup.Append>
          <Button
            variant='outline-primary'
            data-testid='search-submit'
            type='submit'
          >
            Search
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </Form>
  )
}

export default SearchBox
