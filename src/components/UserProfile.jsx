import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";

export default function UserProfile() {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = JSON.parse(localStorage.getItem('token'));

    const [userName, setUserName] = useState(user.user)
    const [userPhone, setUserPhone] = useState(user.phone)
    const [userEmail, setUserEmail] = useState(user.email)
    const [userPassword, setUserPassword] = useState("")
    const [userBio, setUserBio] = useState("")
    
    async function newUserData(e){
        try{
          e.preventDefault()
          const newUserData= {
            name: userName,
            phone: userPhone,
            email: userEmail,
            password: userPassword,
            bio: userBio,
          }
         
          const res = await axios.put(`http://localhost:8000/users/profile`, newUserData, { headers: {"authorization": "Bearer " + token}})
          console.log(res.data)
        }catch(err){
          console.log(err)
        }
      }

  return (
    <div className="w-50 m-auto">
      <Form className="p-3" onSubmit={newUserData}>
        <Form.Group className="mb-3">
          <Form.Label>New Full Name:</Form.Label>
          <Form.Control
            onChange={(e)=> setUserName(e.target.value)}
            as="input"
            name="fullName"
            placeholder="Change your name..."
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>New email:</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Change your email..."
            onChange={(e)=> setUserEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>New password:</Form.Label>
          <Form.Control
            type="password"
            name="pwd"
            placeholder="Change your name..."
            onChange={(e)=> setUserPassword(e.target.value)}
          />
        </Form.Group>
        {/* <Form.Group className="mb-3">
          <Form.Label>Verify new password:</Form.Label>
          <Form.Control
            type="password"
            name="newPwd"
            placeholder="Verify you password"
          />
        </Form.Group> */}
        <Form.Group className="mb-3">
          <Form.Label>Phone number:</Form.Label>
          <Form.Control
            type="tel"
            name="tel"
            placeholder="Change your phone number"
            onChange={(e)=> setUserPhone(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Add something about yourself:</Form.Label>
          <Form.Control
            type="text"
            name="bio"
            placeholder="what would you like us to know?"
            onChange={(e)=> setUserBio(e.target.value)}
          />
        </Form.Group>
        <div className="d-flex flex-row-reverse">
          <Button variant="primary" type="submit">
            Save Changes!
          </Button>
        </div>
      </Form>
    </div>
  );
}
