import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Col, Row, Image } from "react-bootstrap";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import GeneralContext from "../contexts/CreateContext";

export default function PetProfile({ pet }) {
 
  let navigate = useNavigate();
  const [heart2, setHeart2] = useState(false);
  const token = JSON.parse(localStorage.getItem("token"));
  const { user, adoptedFosteredList,currentPet, setCurrentPet,fetchFosteredAdoptedPets } = useContext(GeneralContext);

  const goingBack = () => {
    navigate(-1);
  };

  const { id } = useParams();

  useEffect(() => {
    getPet();
  },// eslint-disable-next-line 
   [id]);

  function like() {
    !heart2 ? setHeart2(true) : setHeart2(false);
  }

  async function addToFosterOrAdopt(status) {
    try {
      const adoptedOrFostered = { petId: currentPet._id, statusChange: status };
      const res = await axios.post(
        `http://localhost:8000/pets/${id}/adoptfoster`,
        adoptedOrFostered,
        {
          headers: { authorization: "Bearer " + token },
        }
      );
        getPet();
      
    } catch (err) {
      console.log(err);
    }
  }

  async function getPet() {
    const res = await axios.get(`http://localhost:8000/pets/${id}`);
    setCurrentPet(res.data);
  }




  return (
    <>
      <div className="d-flex justify-content-center align-items-center gap-5">
        <h1>
          Hi! My name is <span className="pet-name">{currentPet.name}</span>
        </h1>

        <div onClick={like} className={heart2 ? "cursor " : "cursor "}>
          {!heart2 ? (
            <>
              <FaRegHeart
                className="heart mb-1"
                style={{ fontSize: "1.5rem" }}
              />
              <FaHeart className="heart2 mb-1" style={{ fontSize: "1.5rem" }} />
            </>
          ) : (
            <>
              <FaRegHeart
                className="heart d-none"
                style={{ fontSize: "1.5rem" }}
              />
              <FaHeart
                className="heart2clicked"
                style={{ fontSize: "1.5rem" }}
              />
            </>
          )}
        </div>
      </div>

      <Row className="mx-5 my-4 align-items-center">
        <Col lg={6}>
          <Image
            src={currentPet.picture}
            alt=""
            className="pet-profile-image"
          />
        </Col>

        <Col lg={6} className="">
          <div className="d-flex flex-column align-items-center mb-3">
            <div className="pt-2 border-bottom w-100">
              {" "}
              Type of pet: {currentPet.type}
            </div>
            <div className="pt-2 border-bottom w-100">
              {" "}
              breed: {currentPet.breed}
            </div>
            <div className="pt-2 border-bottom w-100">
              {" "}
              Status: {currentPet.adoptionStatus}
            </div>
            <div className="pt-2 border-bottom w-100">
              {" "}
              Height: {currentPet.height}cm
            </div>
            <div className="pt-2 border-bottom w-100">
              {" "}
              Weight: {currentPet.weight}lbs
            </div>
            <div className="pt-2 border-bottom w-100">
              {" "}
              Color: {currentPet.color}
            </div>
            <div className="pt-2 border-bottom w-100">
              {" "}
              About Me: {currentPet.bio}
            </div>
            <div className="pt-2 border-bottom w-100">
              {" "}
              Am I hypoallergenic? {String(currentPet.hypoallergnic)}
            </div>
            <div className="pt-2 border-bottom w-100">
              {" "}
              Dietary restrictions: {currentPet.dietery}
            </div>
          </div>

          <div className="buttons d-flex justify-content-center">
            {!user ? (
              <>
                <p className="pet_profile_information_adopt">
                  Please Log in to interact with all of our friends!
                </p>
              </>
            ) : currentPet.adoptionStatus === "Adopted" ? (
              adoptedFosteredList?.find((pet) => pet._id === currentPet._id) ? (
                <button
                  className="pet-btn shadow border-0 px-3 py-1"
                  onClick={() => {
                    addToFosterOrAdopt("Return");
                  }}
                >
                  Return
                </button>
              ) : (
                ""
              )
            ) : currentPet.adoptionStatus === "Available" ? (
              <>
                <button
                  className="pet-btn shadow border-0 px-3 py-1"
                  onClick={() => {
                    addToFosterOrAdopt("Fostered");
                  }}
                >
                  Foster
                </button>
                <button
                  className="pet-btn shadow border-0 px-3 py-1"
                  onClick={() => {
                    addToFosterOrAdopt("Adopted");
                  }}
                >
                  Adopt
                </button>
              </>
            ) : adoptedFosteredList?.find(
                (pet) => pet._id === currentPet._id
              ) ? (
              <>
                <button
                  className="pet-btn shadow border-0 px-3 py-1"
                  onClick={() => {
                    addToFosterOrAdopt("Adopted");
                  }}
                >
                  Adopt
                </button>
                <button
                  className="pet-btn shadow border-0 px-3 py-1"
                  onClick={() => {
                    addToFosterOrAdopt("Return");
                  }}
                >
                  Return
                </button>
              </>
            ) : (
              <>
                <button
                  className="pet-btn shadow border-0 px-3 py-1"
                  onClick={() => {
                    addToFosterOrAdopt("Adopted");
                  }}
                >
                  Adopt
                </button>
              </>
            )}
          </div>
        </Col>
      </Row>
      {user.admin === true ? (
        <>
          {" "}
          <div className="p-5  d-flex justify-content-center">
          <Link to={`/editpet/${currentPet._id}`} className="text-decoration-none nav-link"> 
            <button className="pet-btn shadow border-0 px-3 py-1">
              Edit pet
            </button></Link>
         
            <Link to="/search" className="text-decoration-none nav-link"><button
              className="pet-btn shadow border-0 px-3 py-1"
            >
              Go Back!
            </button></Link>
          </div>
        </>
      ) : (
        <div className="p-5 text-center">
          <button
            className="pet-btn shadow border-0 px-3 py-1"
            onClick={goingBack}
          >
            {" "}
            Go Back!
          </button>
        </div>
      )}
    </>
  );
}



