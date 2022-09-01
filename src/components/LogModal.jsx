import React, { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import GeneralContext from "../contexts/CreateContext";
import Login from "./Login";
import SignUp from "./SignUp";

export default function LogModal() {
  const { setError } = useContext(GeneralContext);
  const [activeTab, setActiveTab] = useState("login");
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setError("");
  };
  const handleShow = () => {
    setShow(true);
    setError("");
  };

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <div variant="primary" onClick={handleShow}>
        Login/SignUp
      </div>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header className="border-0" closeButton />

        <Tabs
          id="controlled-tab-example"
          className="mb-3 d-flex flex-row ps-3 pt-3"
          activeKey={activeTab}
          onSelect={(e) => setActiveTab(e)}
        >
          <Tab eventKey="login" title="Login" className="">
            <Login setShow={setShow} />
          </Tab>
          <Tab eventKey="signup" title="Sign Up">
            <SignUp activeTab={activeTab} setActiveTab={setActiveTab} />
          </Tab>
        </Tabs>
      </Modal>
    </div>
  );
}
