import React, { useState, useContext} from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import PetsList from "./PetsList";
import GeneralContext from "../contexts/CreateContext";
import { Col, Row } from "react-bootstrap";

export default function Search(pet) {
  const { petsList, setPetsList } = useContext(GeneralContext);
  const [switched, setswitched] = useState(false);
  const [formData, setFormData] = useState({});
  const [searchError, setSearchError] = useState("");
  

  const handleChange = async (e) => {
    setSearchError("");
    const tempFormData = {
      ...formData,
    };
    if (e.target.value === "all") {
      tempFormData[e.target.name] = null;
    } else {
      tempFormData[e.target.name] = e.target.value;
    }
    setFormData(tempFormData);
  };


  async function getList(e) {
    e.preventDefault();
    try {
      if (formData.name === "") delete formData.name;
      const res = await axios.get(`http://localhost:8000/pets`, {
        params: { ...formData },
      });

      if (res.data.length === 0) {
        setSearchError(
          "There doesn't seem to be any friend under those criterias..."
        );
      }
      
      setPetsList(res.data);
    } catch (err) {
      setSearchError(err.response.data);
    }
  }

  return (
    <>
      <h1 className="mt-5 text-center">Find your future furry best friend!</h1>
      <div className="d-flex flex-column align-items-center">
        <Form className="type mt-5 searchList" onSubmit={getList}>
          <Form.Select className="mb-2" name="type" onChange={handleChange}>
            <option value="all">Type of animal</option>
            <option value="Dog">Dog</option>
            <option value="Cat">Cat</option>
          </Form.Select>

          <Form.Check
            type="switch"
            onChange={() => setswitched(!switched)}
            id="custom-switch"
            label="Advanced search"
          />
          <div className={!switched ? "d-none" : ""}>
            <Row>
              <Col md={3}>
                <Form.Select
                  className="mb-2"
                  name="adoptionStatus"
                  onChange={handleChange}
                >
                  <option value="all">Adoption status</option>
                  <option value="Available">Available</option>
                  <option value="Fostered">Fostered</option>
                  <option value="Adopted">Adopted</option>
                </Form.Select>
              </Col>

              <Col md={3}>
                <Form.Control
                  type="text"
                  placeholder="Name..."
                  className="mb-2"
                  name="name"
                  onChange={handleChange}
                />
              </Col>

              <Col md={3}>
                <Form.Select
                  className="mb-2"
                  name="height"
                  onChange={handleChange}
                >
                  <option value="all">Height</option>
                  <option value="<20cm"> {`<`}20cm </option>
                  <option value="20-50cm">20-50cm</option>
                  <option value="50-70cm">50-70cm</option>
                  <option value=">80cm">{`>`}80cm</option>
                </Form.Select>
              </Col>
              <Col md={3}>
                <Form.Select
                  className="mb-2"
                  name="weight"
                  onChange={handleChange}
                >
                  <option value="all">Weight</option>
                  <option value="<20lbs"> {`<`}20lbs </option>
                  <option value="20-50lbs">20-50lbs</option>
                  <option value="50-70lbs">50-80lbs</option>
                  <option value=">80lbs">{`>`}80lbs</option>
                </Form.Select>
              </Col>
            </Row>
          </div>
          <div className="d-flex flex-row-reverse">
            <Button
              variant="outline-secondary"
              id="button-addon2"
              className="mt-2 mb-5"
              type="submit"
            >
              Search
            </Button>
          </div>
        </Form>
        <PetsList petsList={petsList} />
        <div
          className={searchError ? " mb-2 d-flex align-items-center" : "d-none"}
        >
          {searchError}
        </div>
      </div>
    </>
  );
}
