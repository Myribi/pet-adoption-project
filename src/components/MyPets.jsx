import React, { useContext, useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import AdOrFostered from "../AdOrFostered";
import GeneralContext from "../contexts/CreateContext";
import FavPets from "./FavPets";


export default function MyPets() {
  const { fetchFavPetsList, fetchFosteredAdoptedPets,adoptedFosteredList,favPetsList } = useContext(GeneralContext);

  

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
          {adoptedFosteredList.length>0?  <AdOrFostered/> : <div className="text-center mt-5">You currently don't own or foster any pets...</div>}
         
        </Tab>
        <Tab eventKey="myfavpets" title="My favourites pets">
        {favPetsList.length>0?   <FavPets /> : <div className="text-center mt-5">You currently don't have any favourites...</div>}
         
        </Tab>
      </Tabs>
    </div>
  );
}
