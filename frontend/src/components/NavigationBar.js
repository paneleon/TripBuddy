import React from 'react';
import { Navbar, NavbarBrand, Container, Image, Nav, NavDropdown } from 'react-bootstrap';
import styles from '../styles/NavBar.module.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const NavigationBar = () => {
  const navigate = useNavigate();
  const {getToken, removeToken, user} = useAuth();

  const isLoggedIn = () => {
    return !!getToken();
  };

  const isLoggedInStaff = () => {
    return user.status === "IT" || user.status === "Security";
  };

  const logout = () => {
    removeToken();
    navigate('/home');
    alert('Logged out successfully');
  };

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
          {!isLoggedIn() && (
            <Nav className={styles.navbar}>
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/browse">Browse Destinations</Nav.Link>
            <Nav.Link className={styles.login} href="/login">Login</Nav.Link>
            </Nav>
          )}

          {isLoggedIn() && (
            <Nav className={styles.navbar}>
              <Nav className="me-auto">
                <Nav.Link href="/home">Home</Nav.Link>
                <Nav.Link href="/browse">Browse</Nav.Link>
                <Nav.Link href="/my-posts">My Posts</Nav.Link>
                <Nav.Link href="/saved">Saved Posts</Nav.Link>
                <Nav.Link href="/new-post"> + Add New Post</Nav.Link>
              </Nav>
              <Nav>
                <Nav.Link href="#"></Nav.Link>
                <NavDropdown className={styles.setting} title="Settings" id="collasible-nav-dropdown">
                  <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                  <NavDropdown.Item href="/emergency">Emergency Contact</NavDropdown.Item>
                  <NavDropdown.Item href="/subscription">Subscriptions</NavDropdown.Item>
                  <NavDropdown.Item href="/payment">Payment Methods</NavDropdown.Item>
                  {isLoggedIn() && isLoggedInStaff() && (
                    <>
                    <NavDropdown.Item href="/status">Status</NavDropdown.Item>
                    <NavDropdown.Item href="/manage">Management</NavDropdown.Item>
                    <NavDropdown.Item href="/security">Security</NavDropdown.Item>
                    </>
                  )}
                </NavDropdown>
                <Nav.Link className={styles.logout} onClick={logout} to="/logout">Logout</Nav.Link>
              </Nav>
            </Nav>
          )}
        </Container>
      </Navbar>
  )
}

export default NavigationBar