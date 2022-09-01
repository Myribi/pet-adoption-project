import React, { useContext } from "react";
import { Row } from "react-bootstrap";
import PetsCard from "./components/PetsCard";
import GeneralContext from "./contexts/CreateContext";

export default function AdOrFostered() {
  const { adoptedFosteredList} =
    useContext(GeneralContext);

    

  return (
    <div className="list mb-5 w-100 mt-5">
      <Row xs={1} md={3} className="g-4">
        {adoptedFosteredList.map((pet) => {
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
