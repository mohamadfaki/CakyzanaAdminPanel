import { useState } from "react";
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

const NewInvoice = () => {
  const [invoiceItems, setInvoiceItems] = useState([
    {
      sku_name: "",
      sku_quantity: "",
      sku_cost: "",
    },
  ]);

  const [temp, setTemp] = useState("");

  const addInvoiceItem = () => {
    setInvoiceItems([
      ...invoiceItems,
      {
        sku_name: "",
        sku_quantity: "",
        sku_cost: "",
      },
    ]);
  };

  const removeInvoiceItem = (index) => {
    const newInvoiceItems = [...invoiceItems];
    newInvoiceItems.splice(index, 1);
    setInvoiceItems(newInvoiceItems);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Invoice Items", invoiceItems);
  };

  const handleChangeInput = (index, event) => {
    const values = [...invoiceItems];
    values[index][event.target.name] = event.target.value;
    setInvoiceItems(values);
  };

  return (
    <Row>
      <Col>
        {/* --------------------------------------------------------------------------------*/}
        {/* Card-1*/}
        {/* --------------------------------------------------------------------------------*/}
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-bell me-2"> </i>
            New Invoice
          </CardTitle>
          <CardBody>
            <Form inline>
              {invoiceItems.map((invoiceItem, index) => (
                <div key={index}>
                  <div className="row" key={index}>
                    <div className="col">
                      <FormGroup>
                        <Label for="sku_name">Name</Label>
                        <Input
                          id="sku_name"
                          name="sku_name"
                          placeholder="SKU Name"
                          type="text"
                          value={invoiceItem.sku_name}
                          onChange={(e) => {
                            handleChangeInput(index, e);
                          }}
                        />
                      </FormGroup>
                    </div>

                    <div className="col">
                      <FormGroup>
                        <Label for="sku_quantity">Quantity</Label>
                        <Input
                          id="sku_quantity"
                          name="sku_quantity"
                          placeholder="SKU Quantity"
                          type="text"
                          value={invoiceItem.sku_quantity}
                          onChange={(e) => {
                            handleChangeInput(index, e);
                          }}
                        />
                      </FormGroup>
                    </div>

                    <div className="col">
                      <FormGroup>
                        <Label for="sku_cost">Cost</Label>
                        <Input
                          id="sku_cost"
                          name="sku_cost"
                          placeholder="SKU Cost"
                          type="text"
                          inputMode="numeric"
                          value={invoiceItem.sku_cost}
                          onChange={(e) => {
                            handleChangeInput(index, e);
                          }}
                          pattern="[0-9]+"
                        />
                      </FormGroup>
                    </div>

                    <div
                      className="col"
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                        alignItems: "center",
                      }}
                    >
                      {/* add and remove buttons with different colors than black and each other*/}
                      <Button
                        type="button"
                        color="primary"
                        onClick={addInvoiceItem}
                      >
                        Add
                      </Button>
                      <Button
                        type="button"
                        color="danger"
                        disabled={invoiceItems.length === 1}
                        onClick={() => removeInvoiceItem(index)}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              <FormGroup>
                <Label for="receipt-reference-number">Reference Number</Label>
                <Input
                  id="receipt-reference-number"
                  name="receipt-reference-number"
                  placeholder="Receipt Reference Number"
                  type="text"
                />
              </FormGroup>
              <Button onClick={handleSubmit}>Submit</Button>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default NewInvoice;
