import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function Login() {

  const handleLogin = (e) => {
    e.preventDefault()
    console.log("Logged")
  }
    return (
    <Form className="p-3" onSubmit={handleLogin}>
      <Form.Group className="mb-3" controlId="formBasicEmailLog">
        <Form.Label>Email address:</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPasswordLog">
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <div className="d-flex flex-row-reverse">
        <Button variant="primary" type="submit" >
          Login
        </Button>
      </div>
    </Form>
  );
}
