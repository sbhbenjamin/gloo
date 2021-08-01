import './navbarcategory.css'
import { Row, Col } from 'react-bootstrap'

import React from 'react'

const NavbarCategory = () => {
  return (
    <Row className='mt-0 navbar-categories py-3 d-none d-sm-flex justify-content-center gap-4'>
      <Col xs='auto'>
        <a href='/search/Electrical'>Electrical</a>
      </Col>
      <Col xs='auto'>
        <a href='/search/Plumbing'>Plumbing</a>
      </Col>
      <Col xs='auto'>
        <a href='/search/Computer'>Computer</a>
      </Col>
      <Col xs='auto'>
        <a href='/search/Renovation'>Renovation</a>
      </Col>
      <Col xs='auto'>
        <a href='/search/Air-Conditioning'>Air-Conditioning</a>
      </Col>
    </Row>
  )
}

export default NavbarCategory
