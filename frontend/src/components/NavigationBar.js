import React from 'react'
import { Navbar, NavbarBrand, Container, Image, Nav, NavDropdown } from 'react-bootstrap'

const NavigationBar = () => {
  return (
    <Navbar bg="dark" variant="dark" className='mb-5' sticky='top'>
        <Container>
          <NavbarBrand href="/home" className='row align-items-center justify-content-start'>
            <Image
              alt=""
              src='/tripbuddy_icon_lg.png'
              width="50"
              height="50"
              className="col d-inline-block align-top"
            />{' '}
            <span className='col my-auto'>TripBuddy</span>
          </NavbarBrand>

          <Nav className="me-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/browse">Browse Destinations</Nav.Link>
            <Nav.Link href="/post">Add New Post</Nav.Link>
            

          </Nav>
          <Nav>
            <Nav.Link href="#"></Nav.Link>
            <NavDropdown title="Settings" id="collasible-nav-dropdown">
              <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
              <NavDropdown.Item href="/subscription">Subscriptions</NavDropdown.Item>
              <NavDropdown.Item href="/payment">Payment Methods</NavDropdown.Item>
            </NavDropdown>

            <Nav.Link href="/login">Login/Register</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
  )
}

export default NavigationBar