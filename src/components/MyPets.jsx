import React, { useContext, useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import AdOrFostered from "../AdOrFostered";
import GeneralContext from "../contexts/CreateContext";
import FavPets from "./FavPets";
import axios from "axios";

export default function MyPets() {
  const { fetchFavPetsList, fetchFosteredAdoptedPets } = useContext(GeneralContext);

  

  useEffect(
    () => {
      fetchFosteredAdoptedPets()
      fetchFavPetsList();
    }, // eslint-disable-next-line
    []
  );

  return (
    <div className="mypets">
      <Tabs className="" justify>
        <Tab eventKey="mypets" title="My adopted/fostered pets">
          <AdOrFostered/>
        </Tab>
        <Tab eventKey="myfavpets" title="My favourites pets">
          <FavPets />
        </Tab>
      </Tabs>
    </div>
  );
}
