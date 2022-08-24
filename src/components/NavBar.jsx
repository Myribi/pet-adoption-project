import React, { useContext } from 'react'
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import LogModal from "../components/LogModal";
import GeneralContext from '../contexts/CreateContext';


export default function NavBar() {

  const {setToken} = useContext(GeneralContext)

  function logout () {
    setToken("")
    localStorage.clear()
  }

  return (
    <>
    <Navbar className="opacity-100" variant="light">
        <Container>
          <Nav className="">
            <Link to="/" className='text-decoration-none nav-link'>Home</Link>
            <Nav.Link className='align-self-center'><LogModal/></Nav.Link>
            <Link to="/search" className='text-decoration-none nav-link'>Search</Link>
            <Link to="/addpet" className='text-decoration-none nav-link'>Add pet</Link>
            <Link to="/profile" className='text-decoration-none nav-link'>Profile</Link>
            <Button className='text-decoration-none nav-link' onClick={logout}>logout</Button>
          </Nav>
        </Container>
      </Navbar>

  
     </>
  )
}
