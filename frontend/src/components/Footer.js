import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row className='justify-content-between'>
          <Col xs='auto' data-testid='footer-copy'>
            A project by{' '}
            <a href='https://github.com/sbhbenjamin'>@sbhbenjamin</a> and{' '}
            <a href='https://github.com/chrus-chong'>@chrus-chong</a>
          </Col>
          <Col xs='auto'>
            <a href='https://github.com/sbhbenjamin/gloo'>
              <i class='fab fa-lg fa-github'></i>
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
