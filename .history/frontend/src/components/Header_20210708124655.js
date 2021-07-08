import React from "react"
import { Route } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { LinkContainer } from "react-router-bootstrap"
import { Button, Navbar, Nav, Container, NavDropdown } from "react-bootstrap"
import SearchBox from "./SearchBox"
import { logout } from "../actions/userActions"

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
        bg='light'
        variant='light'
        expand='lg'
        collapseOnSelect
      >
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand className='navbar-brand' data-testid='navbar-brand'>
              <h2>Gloo</h2>
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Route render={({ history }) => <SearchBox history={history} />} />
            <Nav className='ms-auto'>
              {/* {userInfo && (
                <LinkContainer
                  disabled
                  to='/favourites'
                  data-testid='navbar-favourites'
                >
                  <Nav.Link>
                    <i className='fas fa-heart'></i>
                    Favourites
                  </Nav.Link>
                </LinkContainer>
              )} */}
              {userInfo && (
                <LinkContainer to='/conversations' data-testid='navbar-chat'>
                  <Nav.Link>
                    <i className='fas fa-comment-alt mx-1'></i>
                    Chats
                  </Nav.Link>
                </LinkContainer>
              )}

              <LinkContainer to='/cart' data-testid='navbar-cart'>
                <Nav.Link>
                  <i className='fas fa-shopping-cart mx-1'></i>
                  Cart
                </Nav.Link>
              </LinkContainer>
              {/* {userInfo && (
                <LinkContainer to={`/favourites`}>
                  <Nav.Link>
                    <i className='fas fa-heart'></i>
                    Favourites
                  </Nav.Link>
                </LinkContainer>
              )} */}
              {userInfo ? (
                <NavDropdown
                  title={userInfo.name}
                  id='username'
                  data-testid='navbar-username'
                >
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item data-testid='navbar-profile'>
                      Profile
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to={`/user/${userInfo._id}/listings`}>
                    <NavDropdown.Item data-testid='navbar-listings'>
                      My Listings
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to={`/certificates`}>
                    <NavDropdown.Item data-testid='navbar-listings'>
                      My Certificates
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
                    <i className='fas fa-user'></i>
                    Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminmenu'>
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
                    <NavDropdown.Item data-testid='admin-orders'>
                      Certificates
                    </NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>

          {userInfo && (
            <LinkContainer to='/new'>
              <Nav.Link>
                <Button variant='primary' data-testid='navbar-addproduct'>
                  Add Product
                </Button>
              </Nav.Link>
            </LinkContainer>
          )}
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
