import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { CgDanger } from "react-icons/cg";
import GeneralContext from "../contexts/CreateContext";

export default function SignUp(props) {
  const { setActiveTab } = props;
  const { fullName, setFullName } = useContext(GeneralContext);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");
  const [signBio] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    try {
      setError("");

      e.preventDefault();
      const newUser = {
        name: fullName,
        phone: phone,
        email: email,
        password: password,
        repassword: repassword,
        bio: signBio,
      };
      const res = await axios.post(
        "http://localhost:8000/users/signup",
        newUser
      );

      if (res.data._id) {
        window.alert(
          `You Are Successfully Signed Up! Welcome ${res.data.name}. Please Log In!`
        );
        setError("");
        setActiveTab("login");
      }
    } catch (err) {
      console.log(err);
      setError(err.response.data);
    }
  };

  return (
    <Form className="p-3" onSubmit={handleSignup}>
      <div
        className={error ? "errorMsg mb-2 d-flex align-items-center" : "d-none"}
      >
        {<CgDanger className="dangerlogo" />}
        {error}
      </div>
      <Form.Group className="mb-3">
        <Form.Label>Full Name:</Form.Label>
        <Form.Control
          as="input"
          name="fullName"
          onChange={(e) => setFullName(e.target.value)}
          onKeyDown={(e) => e.stopPropagation()}
          placeholder="Enter full name"
        />
      </Form.Group>
      <Form.Group className="mb-3 w-100" controlId="formBasicNumber">
        <Form.Label>Phone Number:</Form.Label>
        <Form.Control
          onChange={(e) => setPhone(e.target.value)}
          type="number"
          placeholder="Phone number"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address:</Form.Label>
        <Form.Control
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Enter email"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPasswordValidation">
        <Form.Label>Verify your password:</Form.Label>
        <Form.Control
          onChange={(e) => setRePassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
      </Form.Group>
      <div className="d-flex flex-row-reverse">
        <Button variant="primary" type="submit">
          Sign Up
        </Button>
      </div>
    </Form>
  );
}
