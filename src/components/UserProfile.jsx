import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useContext } from "react";
import GeneralContext from "../contexts/CreateContext";

export default function UserProfile() {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = JSON.parse(localStorage.getItem("token"));
  const { userName, setUserName } = useContext(GeneralContext);
  const [userPhone, setUserPhone] = useState(user?.phone);
  const [userEmail, setUserEmail] = useState(user?.email);
  const [userBio, setUserBio] = useState("");
  const [profileError, setProfileError] = useState("");
  const [prevPwd, setPrevPwd] = useState("");
  const [updatedPwd, setUpdatedPwd] = useState("");
  const [verifiedUpdatedPwd, setVerifiedUpdatedPwd] = useState("");

  async function newUserData(e) {
    try {
      e.preventDefault();
      const newUserData = {
        name: userName,
        phone: userPhone,
        email: userEmail,
        bio: userBio,
      };

      const res = await axios.put(
        `http://localhost:8000/users/profile`,
        newUserData,
        { headers: { authorization: "Bearer " + token } }
      );

      localStorage.setItem("user", JSON.stringify(res.data));
    } catch (err) {
      setProfileError(err.response.data);
    }
  }

  async function newUserPwd(e) {
    try {
      e.preventDefault();
      const newUserPwd = {
        updatedPwd: updatedPwd,
        verifiedUpdatedPwd: verifiedUpdatedPwd,
        prevPwd: prevPwd,
      };

      await axios.put(
        `http://localhost:8000/users/profile/changePwd`,
        newUserPwd,
        { headers: { authorization: "Bearer " + token } }
      );
    } catch (err) {
      setProfileError(err.response.data);
    }
  }

  return (
    <div className="w-50 m-auto">
      <div className={profileError ? " mb-2 text-center" : "d-none"}>
        {profileError}
      </div>
      <Form className="p-3" onSubmit={newUserData}>
        <Form.Group className="mb-3">
          <Form.Label>New Full Name:</Form.Label>
          <Form.Control
            onChange={(e) =>
              e.target.value
                ? setUserName(e.target.value)
                : setUserName(userName)
            }
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
            onChange={(e) =>
              e.target.value
                ? setUserEmail(e.target.value)
                : setUserEmail(userEmail)
            }
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Phone number:</Form.Label>
          <Form.Control
            type="tel"
            name="tel"
            placeholder="Change your phone number"
            onChange={(e) =>
              e.target.value
                ? setUserPhone(e.target.value)
                : setUserPhone(userPhone)
            }
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Add something about yourself:</Form.Label>
          <Form.Control
            type="text"
            name="bio"
            placeholder="what would you like us to know?"
            onChange={(e) =>
              e.target.value ? setUserBio(e.target.value) : setUserBio(userBio)
            }
          />
        </Form.Group>
        <div className="d-flex flex-row-reverse">
          <Button variant="primary" type="submit">
            Save changes!
          </Button>
        </div>
      </Form>

      <Form className="p-3" onSubmit={newUserPwd}>
        <Form.Group className="mb-3">
          <Form.Label>Previous Password:</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Type your previous password..."
            onChange={(e) => setPrevPwd(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>New password:</Form.Label>
          <Form.Control
            type="password"
            name="pwd"
            placeholder="Change your password..."
            onChange={(e) => setUpdatedPwd(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Verify new password:</Form.Label>
          <Form.Control
            type="password"
            name="newPwd"
            placeholder="Verify you password"
            onChange={(e) => setVerifiedUpdatedPwd(e.target.value)}
          />
        </Form.Group>
        <div className="d-flex flex-row-reverse">
          <Button variant="primary" type="submit">
            Change password!
          </Button>
        </div>
      </Form>
    </div>
  );
}
