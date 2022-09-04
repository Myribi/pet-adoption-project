import { Card, Col } from "react-bootstrap";
import React, { useContext, useEffect, useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import GeneralContext from "../contexts/CreateContext";
import Button from "react-bootstrap/Button";
import axios from "axios";

export default function PetsCard({ pet }) {
  const token = JSON.parse(localStorage.getItem("token"));
  const { favPetsList, addFavouritePet, removeFavouritePet} =
    useContext(GeneralContext);
  const [heart, setHeart] = useState(false);

  async function addToFav(e) {
    setHeart(true);
    try {
      const favPet = {
        petId: pet._id,
      };
      await axios.post("http://localhost:8000/users/favpets", favPet, {
        headers: { authorization: "Bearer " + token },
      });
      addFavouritePet(pet);
    } catch (err) {
      console.log(err);
    }
  }

  async function removeFromFav() {
    setHeart(false);
    try {
      const favPet = {
        petId: pet._id,
      };
      await axios.post("http://localhost:8000/users/removefavpets", favPet, {
        headers: { authorization: "Bearer " + token },
      });
      removeFavouritePet(pet);
    } catch (err) {
      console.log(err);
    }
  }

  async function getLikes() {
    favPetsList.filter((favPet) => favPet._id === pet._id).length > 0
      ? setHeart(true)
      : setHeart(false);
  }

  useEffect(
    () => {
      getLikes();
    }, // eslint-disable-next-line
    [favPetsList]
  );

  return (
    <Col className="">
      <Card className="card" key={pet._id}>
        <div className="card-to-heart">
          <div
            onClick={!heart ? addToFav : removeFromFav}
            className={
              heart
                ? "heart-container m-3 bg-white cursor"
                : "heart-container m-3 cursor "
            }
          >
            {!heart ? (
              <>
                <FaRegHeart className="heart" />
                <FaHeart className="heart2" />
              </>
            ) : (
              <>
                <FaRegHeart className="heart d-none" />
                <FaHeart className="heart2clicked" />
              </>
            )}
          </div>
          <Card.Img variant="top" src={pet.picture} className="pet-image" />
        </div>
        <Card.Body className="titles">
          <div className="d-flex justify-content-between">
            <div>
              <Card.Title className="title">{pet.name}</Card.Title>
              <Card.Text className="title">{pet.adoptionStatus}</Card.Text>
            </div>

            <Link
              to={`/petprofile/${pet._id}`}
              className="text-decoration-none nav-link"
            >
              <Button className="title" variant="light">
                About me!
              </Button>
            </Link>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}
