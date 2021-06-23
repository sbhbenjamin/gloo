import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className='text-center py-3' data-testid='footer-copy'>
            Copyright &copy; Gloo
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
