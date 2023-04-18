import React, { useEffect, useState } from "react";
import {
  Table,
  Row,
  Col,
  Button,
  FormGroup,
  Label,
  Input,
  Badge,
} from "reactstrap";
import { db } from "../../firebase";
import moment from "moment";

let ordersArr = [];
let codesArr = [];

function OrderManagement() {
  const [order, setOrder] = useState([]);
  const [code, setCode] = useState([]);

  const handleStatusChange = (orderId, newStatus) => {
    // Update the status attribute in Firebase
    db.collection("Order")
      .doc(orderId)
      .update({
        status: newStatus,
      })
      .then(() => {
        alert("Status of order " + orderId + " is updated successfully");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error updating status: ", error);
      });
  };

  const deleteDocument = (id) => {
    db.collection("Order")
      .doc(id)
      .delete()
      .then(() => {
        console.log(`Order with id ${id} successfully deleted`);
        window.location.reload();
      })
      .catch((error) => {
        console.error(`Error deleting document with id ${id}:`, error);
      });
  };

  useEffect(() => {
    // let ordersArr = [];

    db.collection("Order")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          ordersArr.push({ ...doc.data(), id: doc.id });
        });
      })
      .then(() => {
        setOrder(ordersArr);
      })
      .then(() => {
        db.collection("Codes")
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              codesArr.push({ ...doc.data(), id: doc.id });
            });
          })
          .then(() => {
            setCode(codesArr);
          });
      });
  }, []);

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User Email</th>
            <th style={{ width: "35%" }}>Classes, Code</th>
            <th style={{ width: "10%" }}>Utensils</th>
            <th>Date, Time</th>
            <th style={{ width: "5%" }}>Total</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {ordersArr.map((item) => (
            <tr key={item.id} data={item}>
              <td style={{ width: "10%" }}>{item.id}</td>
              <td>{item.UserEmail}</td>
              <td>
                {item.classes.map((SingleClass) => {
                  return (
                    <Row>
                      <Col
                        style={{ borderRight: "1px solid black", width: "10%" }}
                      >
                        {SingleClass.Item.title}
                      </Col>
                      <Col>
                        {codesArr.map((code) => {
                          if (
                            code.Class === SingleClass.Item.id &&
                            code.OrderId === item.id
                          ) {
                            return <Row>{code.id}</Row>;
                          }
                        })}
                      </Col>
                    </Row>
                  );
                })}
              </td>
              <td>
                {item.utensils.map((SingleUtensil) => {
                  return (
                    <Row>
                      <Col
                        style={{
                          borderRight: "1px solid black",
                          width: "10%",
                        }}
                      >
                        {SingleUtensil.Item.name}
                      </Col>
                      <Col>
                        <Row>{SingleUtensil.Item.qty} pcs</Row>
                      </Col>
                    </Row>
                  );
                })}
                {/* <Row>
                  <Col>Utensil A</Col>
                  <Col>Utensil B</Col>
                </Row> */}
              </td>
              <td>
                {moment(item.date.toDate()).format("DD/MM/YYYY, HH:mm:ss")}
              </td>
              <td>${item?.total}</td>

              {item.status === "Pending" ||
              item.status === "Confirm" ||
              item.status === "Being Delivered" ? (
                <td>
                  <FormGroup check inline>
                    <Label check>
                      <Input
                        type="radio"
                        name={item.id}
                        id="status-pending"
                        checked={item.status === "Pending" ? true : false}
                        onClick={() => handleStatusChange(item.id, "Pending")}
                      />{" "}
                      Pending
                    </Label>
                  </FormGroup>
                  <FormGroup check inline>
                    <Label check>
                      <Input
                        type="radio"
                        name={item.id}
                        id="status-confirm"
                        checked={item.status === "Confirm" ? true : false}
                        onClick={() => handleStatusChange(item.id, "Confirm")}
                      />{" "}
                      Confirm
                    </Label>
                  </FormGroup>
                  <FormGroup check inline>
                    <Label check>
                      <Input
                        type="radio"
                        name={item.id}
                        id="status-being-delivered"
                        checked={
                          item.status === "Being Delivered" ? true : false
                        }
                        onClick={() =>
                          handleStatusChange(item.id, "Being Delivered")
                        }
                      />{" "}
                      Being Delivered
                    </Label>
                  </FormGroup>
                </td>
              ) : (
                <td style={{ alignItems: "center" }}>
                  <Button
                    color={item.status === "Rejected" ? "danger" : "info"}
                    className="ms-3"
                    outline
                  >
                    {item.status}
                  </Button>
                </td>
              )}

              {item.status === "Pending" ||
              item.status === "Confirm" ||
              item.status === "Being Delivered" ? (
                <td>
                  <Button
                    color="success"
                    onClick={() => handleStatusChange(item.id, "Delivered")}
                    style={{ marginBottom: "10px" }}
                  >
                    Delivered
                  </Button>
                  <Button
                    color="danger"
                    onClick={() => handleStatusChange(item.id, "Rejected")}
                  >
                    Rejected
                  </Button>
                </td>
              ) : (
                <td>
                  <Button
                    color="danger"
                    onClick={() => deleteDocument(item.id)}
                  >
                    Delete
                  </Button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default OrderManagement;
