import './header.css'
import React from 'react'
import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import SearchBox from './SearchBox'
import { logout } from '../actions/userActions'

const Header = () => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }
  return (
    <header>
      <Navbar
        className='p-3 navbar'
        variant='dark'
        expand='lg'
        collapseOnSelect
      >
        <Container className='d-flex'>
          <LinkContainer to='/'>
            <Navbar.Brand className='navbar-brand' data-testid='navbar-brand'>
              Gloo
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <div className='navbar-searchbox mx-auto'>
              <Route
                render={({ history }) => <SearchBox history={history} />}
              />
            </div>
            <Nav xs='auto'>
              {userInfo && (
                <LinkContainer to='/favourites' data-testid='navbar-favourites'>
                  <Nav.Link>
                    <i className='fas fa-heart me-1'></i>
                    <span className='d-md-inline d-lg-none'>Favourites</span>
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && (
                <LinkContainer to='/conversations' data-testid='navbar-chat'>
                  <Nav.Link>
                    <i className='fas fa-comment-alt me-1'></i>
                    <span className='d-md-inline d-lg-none'>Conversations</span>
                  </Nav.Link>
                </LinkContainer>
              )}

              {userInfo ? (
                <NavDropdown
                  title={userInfo.name}
                  id='username'
                  data-testid='navbar-username'
                >
                  <LinkContainer to='/new'>
                    <NavDropdown.Item data-testid='navbar-addproduct'>
                      Create Listing
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to={`/user/${userInfo._id}/listings`}>
                    <NavDropdown.Item data-testid='navbar-listings'>
                      Profile
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to={`/certificates`}>
                    <NavDropdown.Item data-testid='navbar-certs'>
                      Certificates
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/orders'>
                    <NavDropdown.Item data-testid='navbar-orders'>
                      Transactions
                    </NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item
                    onClick={logoutHandler}
                    data-testid='navbar-logout'
                  >
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login' data-testid='navbar-signin'>
                  <Nav.Link>
                    <i className='fas fa-user me-1'></i>
                    Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Menu' data-testid='admin-menu'>
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item data-testid='admin-users'>
                      Users
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item data-testid='admin-products'>
                      Products
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item data-testid='admin-orders'>
                      Orders
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/certificatelist'>
                    <NavDropdown.Item data-testid='admin-certs'>
                      Certificates
                    </NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
