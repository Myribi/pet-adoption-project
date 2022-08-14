import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function Search() {
  const [switched, setswitched] = useState(false)

  return (
    <div className="d-flex flex-column align-items-center">
      <h1 className="mt-5">Find your futur furry best friend!</h1>
      <Form className="type mt-5">
        <Form.Select aria-label="Default select example" className="mb-2">
          <option>Type of animal</option>
          <option value="1">Dog</option>
          <option value="2">Cat</option>
        </Form.Select>

        <Form.Check type="switch"  onChange={() => setswitched(!switched)} id="custom-switch" label="Advanced search" />
      
        <div className= {!switched ? "d-none" : ""}>
        <Form.Select aria-label="Default select example" className="mb-2">
          <option>Adoption status</option>
          <option value="1">Available</option>
          <option value="2">Adopted</option>
        </Form.Select>
        <Form.Control
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          placeholder="Name..."
          className="mb-2"
        />

        <Form.Select aria-label="Default select example" className="mb-2">
          <option>Height</option>
          <option value="1"> {`<`}20cm </option>
          <option value="2">20-50cm</option>
          <option value="2">50-70cm</option>
          <option value="2">70-100cm</option>
        </Form.Select>
        <Form.Select aria-label="Default select example" className="mb-2">
          <option>Weight</option>
          <option value="1"> {`<`}20kg </option>
          <option value="2">20-50kg</option>
          <option value="2">50-70kg</option>
          <option value="2">70-100kg</option>
        </Form.Select>
        </div>
        <div className="d-flex flex-row-reverse">
          <Button
            variant="outline-secondary"
            id="button-addon2"
            className="mt-5"
          >
            Search
          </Button>
        </div>
      </Form>
    </div>
  );
}
