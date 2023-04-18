import React, { useState } from "react";
import {
  Table,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
} from "reactstrap";
import { db, storage } from "../../firebase";
import ReactPaginate from "react-paginate";
import "./styling/ClassManagement.css";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { useNavigate } from "react-router-dom";
const [data, setData] = useState([]);
const [Dimensions, setDimensions] = useState([""]);
const [Packaging, setPackaging] = useState("");
const [Category, setCategory] = useState("");
const [Material, setMaterial] = useState("");
const [Name, setName] = useState("");
const [Price, setPrice] = useState("");
const [Shape, setShape] = useState("");
const [currentPage, setCurrentPage] = useState(1);
const [itemsPerPage, setItemsPerPage] = useState(5);
const navigate = useNavigate();
const storageRef = storage.ref();
const [itemImageUrl, setItemImageUrl] = useState("");
const [accessTokenItemImage, setAccessTokenItemImage] = useState("");
const [Description, setDescription] = useState("");

function UtensilEdit() {
  return (
    <>
      <h2>Add New Utensil</h2>
      <Form>
        <FormGroup>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Label for="Dimensions" style={{ marginRight: "10px" }}>
              Dimensions
            </Label>
            <Button className="btn" color="primary">
              Add Dimensions
            </Button>
          </div>

          {[...Dimensions]?.map((dimension, index) => (
            <div key={index} style={{ display: "flex", marginTop: "10px" }}>
              <Input
                type="text"
                placeholder="Enter Dimensions Name"
                value={Dimensions[index]}
                onChange={(e) => editDimensions(index, e)}
                style={{ marginRight: "10px" }}
                required
              />
              <Button
                onClick={() => handleRemoveDimensions(index)}
                className="btn"
                color="danger"
              >
                Remove
              </Button>
            </div>
          ))}
        </FormGroup>

        <FormGroup>
          <Label for="Packaging">Packaging</Label>
          <Input
            type="text"
            name="Packaging"
            id="Packaging"
            placeholder="Enter your Packaging"
            value={Packaging}
            onChange={(e) => setPackaging(e.target.value)}
            required
          />
        </FormGroup>

        <FormGroup tag="fieldset">
          <Label for="Category">Category</Label>
          <FormGroup check>
            <Input
              name="category"
              type="radio"
              value="ForCakes"
              checked={Category === "ForCakes"}
              onChange={handleRadioChange}
            />{" "}
            <Label check>For Cakes</Label>
          </FormGroup>
          <FormGroup check>
            <Input
              name="category"
              type="radio"
              value="ForCoverage"
              checked={Category === "ForCoverage"}
              onChange={handleRadioChange}
            />{" "}
            <Label check>For Coverage</Label>
          </FormGroup>

          <FormGroup check disabled>
            <Input
              name="category"
              type="radio"
              value="ForFondants"
              checked={Category === "ForFondants"}
              onChange={handleRadioChange}
            />{" "}
            <Label check>For Fondants</Label>
          </FormGroup>
          <FormGroup check disabled>
            <Input
              name="category"
              type="radio"
              value="ForMeasuring"
              checked={Category === "ForMeasuring"}
              onChange={handleRadioChange}
            />{" "}
            <Label check>For Measuring</Label>
          </FormGroup>
          <FormGroup check disabled>
            <Input
              name="category"
              type="radio"
              value="ForPiping"
              checked={Category === "ForPiping"}
              onChange={handleRadioChange}
            />{" "}
            <Label check>For Piping</Label>
          </FormGroup>
        </FormGroup>

        <FormGroup>
          <Label for="Material">Material</Label>
          <Input
            type="text"
            name="Material"
            id="Material"
            placeholder="Enter Material"
            value={Material}
            onChange={(e) => setMaterial(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="Description">Description</Label>
          <Input
            type="text"
            name="Description"
            id="Description"
            placeholder="Enter Description"
            value={Description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="Name">Name</Label>
          <Input
            type="text"
            name="Name"
            id="Name"
            placeholder="Enter Name"
            value={Name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="price">Price</Label>
          <Input
            type="text"
            name="Price"
            id="Price"
            placeholder="Enter Price"
            value={Price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="Shape">Shape</Label>
          <Input
            type="text"
            name="Shape"
            id="Shape"
            placeholder="Enter Shape"
            value={Shape}
            onChange={(e) => setShape(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="exampleFile">Image</Label>
          <Input
            id="exampleFile"
            name="file"
            type="file"
            onChange={(e) => {
              handlePickItemImage(e);
            }}
          />
          <FormText>
            When selecting an image it may take some time to upload, please be
            patient.
          </FormText>
        </FormGroup>
        {itemImageUrl !== "" && (
          <Button type="button" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        )}
      </Form>
    </>
  );
}

export default UtensilEdit;
