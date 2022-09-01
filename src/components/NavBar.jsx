import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import LogModal from "../components/LogModal";
import GeneralContext from "../contexts/CreateContext";

export default function NavBar() {
  const { token, setToken, setProfileId } = useContext(GeneralContext);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate= useNavigate()

  function profileId() {
    setProfileId(user);
  }

  function logout() {
    setToken("");
    localStorage.clear();
    navigate("/")
    navigate(0)
  }

  return (
    <>
      <Navbar className="opacity-100" variant="light">
        <Container>
          {!token ? (
            <>
              <Link to="/" className="text-decoration-none nav-link">
                Home
              </Link>
              <Link to="/search" className="text-decoration-none nav-link">
                Search
              </Link>{" "}
              <Nav.Link className="ms-auto">
                <LogModal />
              </Nav.Link>
            </>
          ) : (
            <>
              <Link to="/" className="text-decoration-none nav-link">
                Home
              </Link>
              <Link
                to={`/profile/`}
                className="text-decoration-none nav-link"
                onClick={profileId}
              >
                Profile
              </Link>{" "}
              <Link to="/search" className="text-decoration-none nav-link">
                Search
              </Link>{" "}
              <Link to="/mypets" className="text-decoration-none nav-link">
                My pets
              </Link>
              {user.admin === true ? (
                <Link to="/addpet" className="text-decoration-none nav-link">
                  Add pet
                </Link>
              ) : (
                ""
              )}
              <Button className=" logout nav-link ms-auto" onClick={logout}>
                Log out
              </Button>
            </>
          )}
        </Container>
      </Navbar>
    </>
  );
}
