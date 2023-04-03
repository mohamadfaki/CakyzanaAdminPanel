import React, { useEffect, useRef, useState } from "react";
import { Col, Table, Card, CardTitle, CardBody } from "reactstrap";
import inventoryItems from "../../data/InventoryItems";
import "../../index.css";

function Inventory() {
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [individualItems, setIndividualItems] = useState([]);

  let finalQuantity = useRef(0);

  useEffect(() => {
    // console.log(inventoryItems);
    let total = 0;
    let individualItems = inventoryItems.map((item) => {
      total += item.quantity>=0 ? item.quantity : 0;
      finalQuantity.current = total;
      return <InventoryItem item={item} key={item.id} />;
    });
    setTotalQuantity(total);
    setIndividualItems(individualItems);
  }, []);

  // let totalQuantity = 0;

  const InventoryItem = ({ item }) => {
    // console.log(item.costHistory);

    return (
      <tr>
        <td></td>
        <th scope="row">{item.id}</th>
        <td>
          <img
            src="https://beverages2u.com/wp-content/uploads/2019/05/nestlebottle-2.png"
            alt="nestle water bottle"
            style={{ width: "150px", objectFit: "contain" }}
          />
        </td>
        <td>{item.name}</td>
        <td>{item.description}</td>
        <td>{item.price}</td>
        <td>{item.quantity}</td>
        <td>
        {console.log(finalQuantity.current)}
          {item.quantity >= 0 &&            
            <span>{item.quantity / finalQuantity.current}</span>}
        </td>
        {item.costHistory && item.costHistory.length > 0 && (
          <>
            <td>{item.costHistory.join(", ")}</td>
            <td>
              {item.costHistory.reduce((a, b) => a + b, 0) /
                item.costHistory.length}
            </td>
          </>
        )}
      </tr>
    );
  };

  return (
    <>
      <Col lg="12">
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            {/* <i className="bi bi-card-text me-2"> </i> */}
            <i className="bi bi-card-checklist me-2"> </i>
            Warehouse Inventory
          </CardTitle>
          <CardBody className="">
            <Table bordered striped>
              <thead>
                <tr>
                  <th>Total: {totalQuantity}</th>
                  <th>#</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Selling Price</th>
                  <th>Quantity</th>
                  <th>Quantity / Total</th>
                  <th>Cost History</th>
                  <th>Average Cost</th>
                </tr>
              </thead>
              <tbody>
                {/* {inventoryItems.map((item) => {
                  totalQuantity += item.quantity;
                  return (
                    <InventoryItem
                      item={item}
                      key={item.id}
                      total={totalQuantity}
                    />
                  );
                })} */}
                {individualItems}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Col>
    </>
  );
}

export default Inventory;
