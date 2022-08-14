import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Login from "./Login";
import SignUp from "./SignUp";

export default function LogModal() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div onClick={e => e.stopPropagation()}>
      <div variant="primary" onClick={handleShow}>
        Login/SignUp
      </div>
      <Modal show={show} onHide={handleClose} centered >
      <Modal.Header className="border-0" closeButton/>
          
            <Tabs
              id="controlled-tab-example"
              className="mb-3 d-flex flex-row ps-3 pt-3"
            >
              <Tab eventKey="login" title="Login" className="">
                <Login/>
              </Tab>
              <Tab eventKey="signup" title="Sign Up">
                <SignUp/>
              </Tab>
      
              
            </Tabs>
      </Modal>
    </div>
  );
}
