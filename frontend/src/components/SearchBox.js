import './searchbox.css'
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
    <Form onSubmit={submitHandler} autocomplete='off' className='d-flex'>
      {/* <InputGroup>
        <Form.Control
          data-testid='search-input'
          type='text'
          onChange={(e) => setKeyword(e.target.value)}
          placeholder='Search Products...'
        ></Form.Control>
        <InputGroup.Append>
          <Button
            variant='outline-info'
            data-testid='search-submit'
            type='submit'
            className='search-button'
          >
            Search
          </Button>
        </InputGroup.Append>
      </InputGroup> */}
      <label>
        <input
          type='text'
          id='search-bar'
          className='search-input'
          placeholder='Search by name or category...'
          onChange={(e) => setKeyword(e.target.value)}
        ></input>
        <i class='fas fa-search search-icon'></i>
      </label>
    </Form>
  )
}

export default SearchBox
