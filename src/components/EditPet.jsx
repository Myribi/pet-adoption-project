import React, { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useParams } from "react-router-dom";
import GeneralContext from "../contexts/CreateContext";

export default function EditPet() {
  const token = JSON.parse(localStorage.getItem("token"));
  const { currentPet } = useContext(GeneralContext);
  const [editType, setEditType] = useState(currentPet.type);
  const [editName, setEditName] = useState(currentPet.name);
  const [editAdoptionStatus, setEditAdoptionStatus] = useState(currentPet.adoptionStatus);
  const [editPicture, setEditPicture] = useState(currentPet.picture);
  const [editHeight, setEditHeight] = useState(currentPet.height);
  const [editWeight, setEditWeight] = useState(currentPet.weight);
  const [editColor, setEditColor] = useState(currentPet.color);
  const [editBio, setEditBio] = useState(currentPet.bio);
  const [editHypoallergnic, setEditHypoallergnic] = useState(currentPet.hypoallergnic);
  const [editDietery, setEditDietery] = useState(currentPet.dietery);
  const [editBreed, setEditBreed] = useState(currentPet.breed);
  const [editAddPetError, setEditAddPetError] = useState("");
  const { id } = useParams();

  async function handlePetEdit(e) {
    try {
      e.preventDefault();
      const newPetData = new FormData();

      newPetData.append("type", editType);
      newPetData.append("name", editName);
      newPetData.append("adoptionStatus", editAdoptionStatus);
      newPetData.append("editPicture", editPicture);
      newPetData.append("height", editHeight);
      newPetData.append("weight", editWeight);
      newPetData.append("color", editColor);
      newPetData.append("bio", editBio);
      newPetData.append("hypoallergnic", editHypoallergnic);
      newPetData.append("dietery", editDietery);
      newPetData.append("breed", editBreed);

      const res = await axios.put(
        `http://localhost:8000/pets/editpet/${id}`,
        newPetData,
        { headers: { authorization: "Bearer " + token } }
      );
     if(res.data) {
        window.alert(
            `You successfully edited ${editName? editName : currentPet.name}!`
          );
     }
    } catch (err) {
      setEditAddPetError(err.response);
    }
  }

  const handleEditImage = async (e) => {
   
    e.target.files
      ? setEditPicture(e.target.files[0])
      : setEditPicture(currentPet.picture);
  };

  return (
    <div className="w-50 m-auto">
        {editAddPetError ? <div>{editAddPetError}</div> : ""}
      <h1 className="text-center">Make changes on Pet's Profile</h1>
      <Form className="p-3" onSubmit={handlePetEdit}>
        <Form.Group className="mb-3">
          <Form.Label>Type of pet:</Form.Label>
          <Form.Select
            className="mb-2"
            name="type"
            onChange={(e) =>
              e.target.value
                ? setEditType(e.target.value)
                : setEditType(editType)
            }
          >
            <option value="all">Type</option>
            <option value="Cat">Cat</option>
            <option value="Dog">Dog</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Breed:</Form.Label>
          <Form.Control
            as="input"
            name="breed"
            placeholder="Enter breed..."
            onChange={(e) =>
              e.target.value
                ? setEditBreed(e.target.value)
                : setEditBreed(editBreed)
            }
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Pet name:</Form.Label>
          <Form.Control
            as="input"
            name="pet-name"
            placeholder="Enter pet name..."
            onChange={(e) =>
              e.target.value
                ? setEditName(e.target.value)
                : setEditName(editName)
            }
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Adoption status:</Form.Label>
          <Form.Select
            className="mb-2"
            name="adoptionStatus"
            onChange={(e) =>
              e.target.value
                ? setEditAdoptionStatus(e.target.value)
                : setEditAdoptionStatus(editAdoptionStatus)
            }
          >
            <option value="all">Adoption status</option>
            <option value="Available">Available</option>
            <option value="Fostered">Fostered</option>
            <option value="Adopted">Adopted</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Upload picture:</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            name="pic"
            placeholder="upload..."
            onChange={handleEditImage}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Height (in cm):</Form.Label>
          <Form.Control
            placeholder="Pet height..."
            type="number"
            min={0}
            onChange={(e) => e.target.value
                ? setEditHeight(Number(e.target.value))
                : setEditHeight(editHeight)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Weight (in lbs):</Form.Label>
          <Form.Control
            placeholder="Pet weight..."
            type="number"
            min={0}
            onChange={(e) =>
              e.target.value
                ? setEditWeight(Number(e.target.value))
                : setEditWeight(editWeight)
            }
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Color:</Form.Label>
          <Form.Control
            placeholder="Pet color..."
            type="text"
            onChange={(e) =>
              e.target.value
                ? setEditColor(e.target.value)
                : setEditColor(editColor)
            }
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>About the pet:</Form.Label>
          <Form.Control
            placeholder="Add short bio..."
            type="text"
            onChange={(e) =>
              e.target.value
                ? setEditBio(e.target.value)
                : setEditBio(editBio)
            }
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Is it hypoallergenic:</Form.Label>
          <Form.Select
            className="mb-2"
            name="hypoallergenic"
            onChange={(e) =>
              e.target.value
                ? setEditHypoallergnic(e.target.value)
                : setEditHypoallergnic(editHypoallergnic)
            }
          >
            <option value="all">Hypoallergenic</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Dietary restriction:</Form.Label>
          <Form.Control
            placeholder="add dietary restrictions"
            type="text"
            onChange={(e) =>
              e.target.value
                ? setEditDietery(e.target.value)
                : setEditDietery(editDietery)
            }
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
