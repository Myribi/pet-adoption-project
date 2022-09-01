import React from "react";
import { useContext } from "react";
import GeneralContext from "../contexts/CreateContext";
import PetsCard from "./PetsCard";
import { Row } from "react-bootstrap";

export default function FavPets() {
  const { favPetsList } = useContext(GeneralContext);
  return (
    <div className="list mb-5 w-100 mt-5">
      <Row xs={1} md={3} className="g-4">
        {favPetsList.map((pet) => {
          return (
            <div key={pet._id}>
              <PetsCard pet={pet} />
            </div>
          );
        })}
      </Row>
    </div>
  );
}
