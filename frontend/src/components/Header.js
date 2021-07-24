import './header.css'
import React from 'react'
import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import {
  Row,
  Button,
  Navbar,
  Nav,
  Container,
  NavDropdown,
} from 'react-bootstrap'
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
                <>
                  <LinkContainer
                    to='/favourites'
                    data-testid='navbar-favourites'
                  >
                    <Nav.Link>
                      <i className='fas fa-heart me-1'></i>
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/conversations' data-testid='navbar-chat'>
                    <Nav.Link>
                      <i className='fas fa-comment-alt me-1'></i>
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer
                    to='/orders/buyer'
                    data-testid='navbar-buyerorders'
                  >
                    <Nav.Link>
                      <i className='fas fa-clipboard me-1'></i>
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}

              {/* {userInfo && (
                <NavDropdown
                  title={
                    <>
                      <i className='fas fa-clipboard me-1'></i>
                    </>
                  }
                  id='username'
                  data-testid='navbar-orders'
                >
                  <LinkContainer to='/orders/buyer'>
                    <NavDropdown.Item data-testid='navbar-buyerorders'>
                      Buyer
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to={`/orders/seller`}>
                    <NavDropdown.Item data-testid='navbar-sellerorders'>
                      Seller
                    </NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )} */}

              {/* {userInfo ? (
                <NavDropdown
                  // title={userInfo.name}
                  title={<i class='far fa-user-circle'></i>}
                  id='username'
                  data-testid='navbar-username'
                >
                  <LinkContainer to={`/user/${userInfo._id}/listings`}>
                    <NavDropdown.Item data-testid='navbar-listings'>
                      Listings
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to={`/certificates`}>
                    <NavDropdown.Item data-testid='navbar-certs'>
                      Certificates
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
              )} */}

              {userInfo ? (
                <li class='nav-item dropdown' id='myDropdown'>
                  <a
                    href='#'
                    className='nav-link dropdown-toggle btn-toggle'
                    variant='link'
                    data-bs-toggle='dropdown'
                  >
                    {userInfo.name}
                    {/* <i class='far fa-user-circle'></i> */}
                  </a>
                  <ul class='dropdown-menu'>
                    {/* <li>
                    <a class='dropdown-item' href='#'>
                      Buyer &raquo;
                    </a>
                    <ul class='submenu dropdown-menu'>
                      <li>
                        <a class='dropdown-item' href='#'>
                          Orders
                        </a>
                      </li>
                    </ul>
                  </li> */}

                    <li>
                      <a class='dropdown-item' variant='link'>
                        <i class='fas fa-caret-left pe-2'></i> Seller
                      </a>
                      <ul class='submenu dropdown-menu'>
                        <LinkContainer
                          to={`/new`}
                          data-testid='navbar-addproduct'
                        >
                          <li className='dropdown-item'>Create Listing</li>
                        </LinkContainer>
                        <LinkContainer
                          to={`/user/${userInfo._id}/listings`}
                          data-testid='navbar-certs'
                        >
                          <li className='dropdown-item'>My Listings</li>
                        </LinkContainer>

                        <LinkContainer
                          to={`/certificates`}
                          data-testid='navbar-certs'
                        >
                          <li className='dropdown-item'>My Certificates</li>
                        </LinkContainer>
                      </ul>
                    </li>
                    <li>
                      <NavDropdown.Item
                        onClick={logoutHandler}
                        data-testid='navbar-logout'
                      >
                        Logout
                      </NavDropdown.Item>
                    </li>
                  </ul>
                </li>
              ) : (
                <LinkContainer to='/login' data-testid='navbar-signin'>
                  <Nav.Link>
                    <i className='fas fa-user me-1'></i>
                    Sign In
                  </Nav.Link>
                </LinkContainer>
              )}

              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' data-testid='admin-menu'>
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
            {/* {userInfo && (
              <LinkContainer to='/new' className='navbar-addproduct'>
                <Nav.Link>
                  <Button variant='primary' data-testid='navbar-addproduct'>
                    Add Product
                  </Button>
                </Nav.Link>
              </LinkContainer>
            )} */}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
