import './navbarcategory.css'
import { Row, Col } from 'react-bootstrap'

import React from 'react'

const NavbarCategory = () => {
  return (
    <div>
      <Row className='mt-0 navbar-categories py-3 justify-content-center gap-4 font-secondary'>
        <Col xs='auto'>
          <a href='http://localhost:3000/search/Electrical'>Electrical</a>
        </Col>
        <Col xs='auto'>
          <a href='http://localhost:3000/search/Plumbing'>Plumbing</a>
        </Col>
        <Col xs='auto'>
          <a href='http://localhost:3000/search/Computer'>Computer</a>
        </Col>
        <Col xs='auto'>
          <a href='http://localhost:3000/search/Renovation'>Renovation</a>
        </Col>
      </Row>
    </div>
  )
}

export default NavbarCategory
