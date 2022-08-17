import React from "react";
import { useContext } from "react";
import GeneralContext from "../contexts/CreateContext";
import {useNavigate } from "react-router-dom";


export default function PetProfile() {
  const { currentPet } = useContext(GeneralContext);

  let navigate = useNavigate();

  const goingBack = () => {
    navigate("/search");
  };

  return (
    <>
      <h1 className="text-center">
        Hi! My name is <span className="pet-name">{currentPet.name}</span>
      </h1>
      <div className="d-flex flex-column align-items-center">
        <div className="image-container">
          <img src={currentPet.picture} alt="" className="pet-profile-image" />
        </div>
        <div>{currentPet.type}</div>
        <div>{currentPet.breed}</div>
        <div>{currentPet.adoptionStatus}</div>
        <div>{currentPet.height}cm</div>
        <div>{currentPet.weight}lbs</div>
        <div>{currentPet.color}</div>
        <div className="text-center">
          {currentPet.name} {currentPet.bio}
        </div>
        <div>{String(currentPet.hypoallergnic)}</div>
        <div>{currentPet.dietery}</div>
      </div>

      <div className="buttons d-flex justify-content-center mt-5">
        <button
          className="pet-btn shadow border-0 px-3 py-1" 
        >
         Return 
        </button>
        <button
          className="pet-btn shadow border-0 px-3 py-1"
        >
        Foster
        </button>
        <button
          className="pet-btn shadow border-0 px-3 py-1"
        >
         Adopt
        </button>
        <button
          className="pet-btn shadow border-0 px-3 py-1"
        >
         Add to favourites!
        </button>
      </div>
      <div className="text-center mt-5">
          <button
        className="pet-btn shadow border-0 px-3 py-1"
        onClick={goingBack}
      >
        {" "}
        Go Back!
      </button>
      </div>
    
    </>
  );
}


