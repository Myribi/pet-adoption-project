import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import axios from "axios";

export default function SignUp() {
  const [fullName,setFullName] = useState("")
  const [phone,setPhone] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [repassword,setRePassword] = useState("")

    const handleSignup = async(e) => {
      try {
        e.preventDefault();  
        const newUser = {
          name : fullName,
          phone : phone,
          email : email,
          password : password,
          repassword : repassword
        }
        const res = await axios.post('http://localhost:8080/users/signup', newUser)
        console.log(res.data)
        
      } catch (err) {
         console.log(err)
      }
        
       
      }
 
  return (
    <Form className="p-3" onSubmit={handleSignup}>
      <Form.Group className="mb-3">
        <Form.Label>Full Name:</Form.Label>
        <Form.Control onChange={(e)=>setFullName(e.target.value)} type="text" placeholder="Enter full name" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicNumber">
        <Form.Label>Phone Number:</Form.Label>
        <Form.Control onChange={(e)=>setPhone(e.target.value)}  type="tel" placeholder="Phone number" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address:</Form.Label>
        <Form.Control onChange={(e)=>setEmail(e.target.value)}  type="email" placeholder="Enter email" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control onChange={(e)=>setPassword(e.target.value)}  type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPasswordValidation">
        <Form.Label>Verify your password:</Form.Label>
        <Form.Control onChange={(e)=>setRePassword(e.target.value)}  type="password" placeholder="Password" />
      </Form.Group>
      <div className="d-flex flex-row-reverse">
        <Button variant="primary" type="submit">
          Sign Up
        </Button>
      </div>
    </Form>
  );
}
