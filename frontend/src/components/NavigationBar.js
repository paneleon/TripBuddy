import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, NavbarBrand, Container, Image, Nav, NavDropdown } from 'react-bootstrap';
import styles from '../styles/Login.module.css';

const NavigationBar = () => {
  const navigate = useNavigate();
  const isLoggedIn = () => {
    return !!localStorage.getItem('token');
  };
  const logout = () => {
    localStorage.removeItem('token');
    navigate('/home');
    alert('Logged out successfully');
  };
  return (
    <Navbar bg="dark" variant="dark" className='mb-5' sticky='top'>
        <Container>
          <NavbarBrand href="/home" className='row align-items-center justify-content-start'>
            <Image
              alt="logo"
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
          <Nav>
            <Nav className={styles.navbar}>
              <Nav.Link href="/home">Home</Nav.Link>
              <Nav.Link href="/browse">Browse Destinations</Nav.Link>
              <Nav.Link href="/post">Add New Post</Nav.Link>
            </Nav>
            <Nav className={styles.login}>
              <Nav.Link href="#"></Nav.Link>
              <NavDropdown  title="Settings" id="collasible-nav-dropdown" >
                <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                <NavDropdown.Item href="/subscription">Subscriptions</NavDropdown.Item>
                <NavDropdown.Item href="/payment">Payment Methods</NavDropdown.Item>
              </NavDropdown>

              <Nav.Link onClick={logout} to="/logout">Logout</Nav.Link>

            </Nav>
          </Nav>  
          )}

          </Container>
      </Navbar>
      
  );
};

export default NavigationBar;