import './searchbox.css'
import React, { useState } from 'react'
import { Form } from 'react-bootstrap'

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      history.push(`/search/${keyword}`)
      setKeyword('')
    } else {
      history.push('/')
    }
  }

  return (
    <Form onSubmit={submitHandler} autoComplete='off' className='d-flex'>
      <label>
        <input
          type='text'
          data-testid='search-input'
          className='search-input'
          placeholder='Search by name or category...'
          onChange={(e) => setKeyword(e.target.value)}
          value={keyword}
        ></input>
        <i
          data-testid='search-submit'
          className='fas fa-search search-icon'
          onClick={submitHandler}
        ></i>
      </label>
    </Form>
  )
}

export default SearchBox
