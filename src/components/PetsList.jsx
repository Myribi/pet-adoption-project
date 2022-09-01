import { Row } from "react-bootstrap";
import React, { useContext } from "react";

import GeneralContext from "../contexts/CreateContext";
import PetsCard from "./PetsCard";

export default function PetsList() {
  const { petsList } = useContext(GeneralContext);

  return (
    <div className="list mb-5 w-100">
      <Row xs={1} md={3} className="g-4">
        {petsList.map((pet) => (
          <div key={pet._id}>
            <PetsCard pet={pet} />
          </div>
        ))}
      </Row>
    </div>
  );
}
