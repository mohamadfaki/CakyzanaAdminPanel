import React, { useState, useEffect } from "react";
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

//todo: add image to the utensil to firebase and storage (wait to return the access token)
function UtensilsManagement() {
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

  useEffect(() => {
    db.collection("utensils")
      .get()
      .then((querySnapshot) => {
        const dataArr = querySnapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });
        console.log(dataArr);
        setData(dataArr);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const classCategoriesRef = firebase.firestore().collection("utensils");
    // Add a new class category
    classCategoriesRef
      .add({
        Dimensions,
        Packaging,
        category: Category,
        material: Material,
        name: Name,
        price: Price,
        shape: Shape,
        image: itemImageUrl,
      })
      .then(() => {
        setDimensions("");
        setPackaging("");
        setCategory("");
        setMaterial("");
        setName("");
        setPrice("");
        setShape("");
        window.scrollTo({ top: 0, behavior: "smooth" });
        alert("Utensil successfully added!");
      })
      .catch((error) => {
        console.error("Error adding utensil: ", error);
      });
  };

  const addDimensions = () => {
    // push empty string to the array
    setDimensions([...Dimensions, ""]);
  };

  const handleRemoveDimensions = (index) => {
    const values = [...Dimensions];
    values.splice(index, 1);
    setDimensions(values);
  };

  const editDimensions = (index, event) => {
    const values = [...Dimensions];
    values[index] = event.target.value;
    setDimensions(values);
  };

  const handlePickItemImage = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    const fileRef = storageRef.child(`utensils/${file.name}`);
    const uploadTask = fileRef.put(file);

    uploadTask.on("state_changed", null, null, () => {
      fileRef.getDownloadURL().then((downloadUrl) => {
        setItemImageUrl(downloadUrl);
        fileRef.getMetadata().then((metadata) => {
          if (metadata && metadata.metadata) {
            setAccessTokenItemImage(
              metadata.metadata.firebaseStorageDownloadTokens
            );
          }
        });
      });
    });
  };

  const handleDelete = (id) => {
    const docRef = db.collection("utensils").doc(id);
    console.log("docRef", docRef);
    console.log("id", id);
    docRef
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .then(() => {
        alert("Item deleted successfully!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };

  const EditClass = (item, title) => {
    // const data = {
    //   id: item.id,
    //   classCategory: item.classCategory,
    //   title: title
    // };
    // navigate(`/editClass?data=${encodeURIComponent(JSON.stringify(data))}`)
  };

  const handleRadioChange = (e) => {
    setCategory(e.target.value);
  };

  //   console.log("token", itemImageUrl);
  return (
    <div style={{ margin: "20px" }}>
      <Table bordered style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th
              style={{
                border: "1px solid black",
                padding: "10px",
                textAlign: "center",
              }}
            >
              Name
            </th>

            <th
              style={{
                border: "1px solid black",
                padding: "10px",
                textAlign: "center",
              }}
            >
              Dimensions
            </th>
            <th
              style={{
                border: "1px solid black",
                padding: "10px",
                textAlign: "center",
              }}
            >
              Packaging
            </th>
            <th
              style={{
                border: "1px solid black",
                padding: "10px",
                textAlign: "center",
              }}
            >
              Category
            </th>
            <th
              style={{
                border: "1px solid black",
                padding: "10px",
                textAlign: "center",
              }}
            >
              Material
            </th>
            <th
              style={{
                border: "1px solid black",
                padding: "10px",
                textAlign: "center",
              }}
            >
              Price
            </th>
            <th
              style={{
                border: "1px solid black",
                padding: "10px",
                textAlign: "center",
              }}
            >
              Shape
            </th>
            <th
              style={{
                border: "1px solid black",
                padding: "10px",
                textAlign: "center",
              }}
            ></th>
          </tr>
        </thead>
        <tbody>
          {data
            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            .map((product) => (
              <tr key={product.id}>
                <td
                  style={{
                    border: "1px solid black",
                    padding: "10px",
                    textAlign: "center",
                    verticalAlign: "middle",
                  }}
                >
                  {product.name}
                </td>
                <td
                  style={{
                    border: "1px solid black",
                    padding: "10px",
                    textAlign: "center",
                    verticalAlign: "middle",
                  }}
                >
                  {/* {product?.Dimensions && console.log("dimensions", product?.Dimensions)} */}
                  {product.Dimensions &&
                    product.Dimensions.map((dimension, index) => {
                      return <div key={index}>{product.Dimensions[index]}</div>;
                    })}
                </td>
                <td
                  style={{
                    border: "1px solid black",
                    padding: "10px",
                    textAlign: "center",
                    verticalAlign: "middle",
                  }}
                >
                  {product.Packaging}
                </td>
                <td
                  style={{
                    border: "1px solid black",
                    padding: "10px",
                    textAlign: "center",
                    verticalAlign: "middle",
                  }}
                >
                  {product.category}
                </td>
                <td
                  style={{
                    border: "1px solid black",
                    padding: "10px",
                    textAlign: "center",
                    verticalAlign: "middle",
                  }}
                >
                  {product.material}
                </td>
                <td
                  style={{
                    border: "1px solid black",
                    padding: "10px",
                    textAlign: "center",
                    verticalAlign: "middle",
                  }}
                >
                  {product.price}
                </td>
                <td
                  style={{
                    border: "1px solid black",
                    padding: "10px",
                    textAlign: "center",
                    verticalAlign: "middle",
                  }}
                >
                  {product.shape}
                </td>
                <td
                  style={{
                    border: "1px solid black",
                    padding: "10px",
                    textAlign: "center",
                    verticalAlign: "middle",
                  }}
                >
                  <span
                    id="boot-icon"
                    className="bi bi-trash-fill"
                    style={{
                      fontSize: "1rem",
                      color: "rgb(255, 0, 0)",
                      cursor: "pointer",
                    }}
                    onClick={() => handleDelete(product.id)}
                  ></span>
                  <span
                    id="boot-icon"
                    className="bi bi-pencil-square"
                    style={{
                      fontSize: "1rem",
                      color: "rgb(0, 0, 255)",
                      cursor: "pointer",
                    }}
                    onClick={() => EditClass(product)}
                  ></span>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <ReactPaginate
          pageCount={Math.ceil(data.length / itemsPerPage)}
          pageRangeDisplayed={2}
          marginPagesDisplayed={2}
          onPageChange={({ selected }) => {
            setCurrentPage(selected + 1);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          containerClassName={"pagination"}
          activeClassName={"active"}
          previousLabel={
            <button
              style={{
                backgroundColor: "#1668E3",
                color: "white",
                border: "none",
                padding: "5px 10px",
                marginRight: "35px",
                borderRadius: "18px",
                height: "40px",
              }}
            >
              Previous
            </button>
          }
          nextLabel={
            <button
              style={{
                backgroundColor: "#1668E3",
                color: "white",
                border: "none",
                padding: "5px 10px",
                marginLeft: "35px",
                borderRadius: "18px",
                height: "40px",
              }}
            >
              Next
            </button>
          }
          breakLabel={
            <button
              style={{
                backgroundColor: "white",
                color: "blue",
                border: "none",
                padding: "5px 10px",
              }}
            >
              ...
            </button>
          }
          pageLinkClassName={"page-link"}
          activeLinkClassName={"active-link"}
          pageClassName={"page-item"}
          previousClassName={"previous-item"}
          nextClassName={"next-item"}
          pageLinkStyle={{
            margin: "0 5px",
            display: "inline-block",
            height: "38px",
            lineHeight: "38px",
          }}
          pageClassStyle={{
            display: "inline-block",
            height: "38px",
            lineHeight: "38px",
          }}
        />
      </div>

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
            <Button className="btn" color="primary" onClick={addDimensions}>
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
          <Label for="exampleFile">File</Label>
          <Input
            id="exampleFile"
            name="file"
            type="file"
            onChange={(e) => {
              handlePickItemImage(e);
            }}
          />
          <FormText>
            This is some placeholder block-level help text for the above input.
            It's a bit lighter and easily wraps to a new line.
          </FormText>
        </FormGroup>
        {itemImageUrl !== "" && (
          <Button type="button" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        )}
      </Form>
    </div>
  );
}

export default UtensilsManagement;
