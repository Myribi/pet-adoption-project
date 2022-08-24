import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";


export default function AddPet() {
  const [type, setType] = useState("")
  const [name, setname] = useState("")
  const [adoptionStatus, setAdoptionStatus] = useState("")
  const [picture, setPicture] = useState("")
  const [height, setHeight] = useState("")
  const [weight, setWeight] = useState("")
  const [color, setColor] = useState("")
  const [bio, setBio] = useState("")
  const [hypoallergnic, setHypoallergnic] = useState("")
  const [dietery, setDietery] = useState("")
  const [breed, setBreed] = useState("")


  const handleAddPet = async (e) => {
    try {
      
      e.preventDefault();

      const petInfo = new FormData()
      
      petInfo.append('type', type)
      petInfo.append('name', name)
      petInfo.append('adoptionStatus', adoptionStatus)
      petInfo.append('picture', picture)
      petInfo.append('height', height)
      petInfo.append('weight', weight)
      petInfo.append('color',color)
      petInfo.append('bio', bio)
      petInfo.append('hypoallergnic', hypoallergnic)
      petInfo.append('dietery', dietery)
      petInfo.append('breed', breed)
      

      const res = await axios.post(
        "http://localhost:8000/pets/addpet",
        petInfo
      );
      console.log(petInfo)
      console.log(res)
    } catch (err) {
      console.log(err);
    }
  };

  const handleImage = async (e) => {
    setPicture(e.target.files[0]);
  }

  return (
    <div className="w-50 m-auto">
      <Form className="p-3" onSubmit={handleAddPet}>
        <Form.Group className="mb-3">
          <Form.Label>Type of pet:</Form.Label>
          <Form.Select className="mb-2" name="type"  onChange={(e) => setType(e.target.value)}>
            <option value="all">Type</option>
            <option value="Cat">Cat</option>
            <option value="Dog">Dog</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Breed:</Form.Label>
          <Form.Control as="input" name="breed" placeholder="Enter breed..."  onChange={(e) => setBreed(e.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Pet name:</Form.Label>
          <Form.Control
            as="input"
            name="pet-name"
            placeholder="Enter pet name..."
            onChange={(e) => setname(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Adoption status:</Form.Label>
          <Form.Select className="mb-2" name="adoptionStatus"  onChange={(e) => setAdoptionStatus(e.target.value)}>
            <option value="all">Adoption status</option>
            <option value="Available">Available</option>
            <option value="Fostered">Fostered</option>
            <option value="Adopted">Adopted</option>
          </Form.Select>
        </Form.Group>

           <Form.Group className="mb-3">
          <Form.Label>Upload picture:</Form.Label>
          <Form.Control type="file" accept="image/*" name="pic" placeholder="upload..."  onChange={handleImage}/>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Height (in cm):</Form.Label>
          <Form.Control placeholder="Pet height..." type="number" min={0}  onChange={(e) => setHeight(e.target.valueAsNumber)} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Weight (in lbs):</Form.Label>
          <Form.Control placeholder="Pet weight..." type="number" min={0}  onChange={(e) => setWeight(e.target.valueAsNumber)}/>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Color:</Form.Label>
          <Form.Control placeholder="Pet color..." type="text"  onChange={(e) => setColor(e.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>About the pet:</Form.Label>
          <Form.Control placeholder="Add short bio..." type="text"  onChange={(e) => setBio(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Is it hypoallergenic:</Form.Label>
          <Form.Select className="mb-2" name="hypoallergenic"  onChange={(e) => setHypoallergnic(e.target.value)}>
            <option value="all">Hypoallergenic</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3"  >
          <Form.Label>Dietary restriction:</Form.Label>
          <Form.Control placeholder="add dietary restrictions" type="text" onChange={(e) => setDietery(e.target.value)}/>
        </Form.Group>

        <div className="d-flex flex-row-reverse">
          <Button variant="primary" type="submit">
            Add new pet!
          </Button>
        </div>
      </Form>
    </div>
  );
}
