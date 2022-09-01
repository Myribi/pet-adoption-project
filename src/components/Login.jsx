import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import axios from "axios";
import GeneralContext from "../contexts/CreateContext";
import { useNavigate } from "react-router-dom";
import { CgDanger } from "react-icons/cg";

export default function Login(props) {
  const { setShow } = props;
  const { setToken, error, setError } = useContext(GeneralContext);
  const [logEmail, setLogEmail] = useState("");
  const [logPassword, setLogPassword] = useState("");
  let navigate = useNavigate();

  async function handleLogin(e) {
    try {
      e.preventDefault();

      const res = await axios.post(`http://localhost:8000/users/login`, {
        logEmail,
        logPassword,
      });
      localStorage.setItem("user", JSON.stringify(res.data));

      if (res.data.token) {
        localStorage.setItem("token", JSON.stringify(res.data.token));
        setToken(res.data.token);
        navigate("/");
        setShow(false);
      }
    } catch (err) {
      setError(err.response.data);
    }
  }

  return (
    <Form className="p-3" onSubmit={handleLogin}>
      <div
        className={error ? "errorMsg mb-2 d-flex align-items-center" : "d-none"}
      >
        {<CgDanger className="dangerlogo" />}
        {error}
      </div>
      <Form.Group className="mb-3" controlId="formBasicEmailLog">
        <Form.Label>Email address:</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          onChange={(e) => setLogEmail(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPasswordLog">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          onChange={(e) => setLogPassword(e.target.value)}
        />
      </Form.Group>
      <div className="d-flex flex-row-reverse">
        <Button variant="primary" type="submit">
          Login
        </Button>
      </div>
    </Form>
  );
}
