import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import LogModal from "../components/LogModal";

export default function NavBar() {
  return (
    <>
    <Navbar className="opacity-100" variant="light">
        <Container>
          <Nav className="">
            <Link to="/" className='text-decoration-none nav-link'>Home</Link>
            <Nav.Link className='align-self-center'><LogModal/></Nav.Link>
            <Link to="/search" className='text-decoration-none nav-link'>Search</Link>
          </Nav>
        </Container>
      </Navbar>

  
     </>
  )
}
