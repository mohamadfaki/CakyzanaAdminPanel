import { useState } from "react";
import inventoryItems from "../../data/InventoryItems";
import {
  Card,
  Row,
  Col,
  CardTitle,
  CardBody,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
} from "reactstrap";

function NewItem() {

  const [itemDetails, setItemDetails] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    barcode: "",
    imageSrc: "",
    category: "",
    sub_category: "",
  });

  const handleSubmit = () => {
    itemDetails.id = inventoryItems.at(-1).id + 1;
    inventoryItems.push(itemDetails);
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setItemDetails({ ...itemDetails, [name]: value });
  };

  return (
    <>
      <Row>
        <Col>
          {/* --------------------------------------------------------------------------------*/}
          {/* Card-1*/}
          {/* --------------------------------------------------------------------------------*/}
          <Card>
            <CardTitle tag="h6" className="border-bottom p-3 mb-0">
              <i className="bi bi-bell me-2"> </i>
              New Item
            </CardTitle>
            <CardBody>
              <Form inline>
                <div className="row">
                  {/* <div className="col">
                    <FormGroup>
                      <Label for="image_src">Image</Label>
                      <Input
                        id="image_src"
                        name="image_src"
                        placeholder="SKU Image Path"
                        type="text"
                      />
                    </FormGroup>
                  </div> */}

                  <div className="col">
                    <FormGroup>
                      <Label for="name">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="SKU Name"
                        type="text"
                        value={itemDetails.name}
                        onChange={(e) => {
                          handleChangeInput(e);
                        }}
                      />
                    </FormGroup>
                  </div>

                  <div className="col">
                    <FormGroup>
                      <Label for="barcode">Barcode</Label>
                      <Input
                        id="barcode"
                        name="barcode"
                        placeholder="SKU Barcode"
                        type="text"
                        value={itemDetails.barcode}
                        onChange={(e) => {
                          handleChangeInput(e);
                        }}
                      />
                    </FormGroup>
                  </div>

                  <div className="col">
                    <FormGroup>
                      <Label for="price">Selling Price</Label>
                      <Input
                        id="price"
                        name="price"
                        placeholder="SKU Selling Price"
                        type="text"
                        value={itemDetails.price}
                        onChange={(e) => {
                          handleChangeInput(e);
                        }}
                      />
                    </FormGroup>
                  </div>

                  <div className="col">
                    <FormGroup>
                      <Label for="description">Description</Label>
                      <Input
                        id="description"
                        name="description"
                        placeholder="SKU Description"
                        type="textarea"
                        value={itemDetails.description}
                        onChange={(e) => {
                          handleChangeInput(e);
                        }}
                      />
                    </FormGroup>
                  </div>

                  <div className="col">
                    <FormGroup>
                      <Label for="category">Category</Label>
                      <Input
                        id="category"
                        name="category"
                        placeholder="SKU Category"
                        type="text"
                        value={itemDetails.category}
                        onChange={(e) => {
                          handleChangeInput(e);
                        }}
                      />
                    </FormGroup>
                  </div>

                  <div className="col">
                    <FormGroup>
                      <Label for="sub_category">Sub Category</Label>
                      <Input
                        id="sub_category"
                        name="sub_category"
                        placeholder="SKU Sub Category"
                        type="text"
                        value={itemDetails.sub_category}
                        onChange={(e) => {
                          handleChangeInput(e);
                        }}
                      />
                    </FormGroup>
                  </div>
                </div>
                <FormGroup>
                  <Label for="exampleFile">Product Image</Label>
                  <Input id="exampleFile" name="file" type="file" />
                  <FormText>Upload product image</FormText>
                </FormGroup>
              </Form>
              <Button onClick={handleSubmit}>Submit</Button>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default NewItem;
