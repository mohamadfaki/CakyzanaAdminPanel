import React from "react";
import { Table, Row, Col, Button, FormGroup, Label, Input } from "reactstrap";

function OrderManagement() {
  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User Email</th>
            <th style={{ width: "30%" }}>Classes</th>
            <th>Utensils</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>user1@example.com</td>
            <td>
              <Row>
                <Col>Class A</Col>
                <Col>
                  <Row>
                    <Col>Class B</Col>
                    <Col>Class C</Col>
                  </Row>
                </Col>
              </Row>
            </td>
            <td>
              <Row>
                <Col>Utensil A</Col>
                <Col>Utensil B</Col>
              </Row>
            </td>
            <td>2023-04-17</td>
            <td>
              <FormGroup check inline>
                <Label check>
                  <Input type="radio" name="status" id="status-pending" />{" "}
                  Pending
                </Label>
              </FormGroup>
              <FormGroup check inline>
                <Label check>
                  <Input type="radio" name="status" id="status-confirm" />{" "}
                  Confirm
                </Label>
              </FormGroup>
              <FormGroup check inline>
                <Label check>
                  <Input
                    type="radio"
                    name="status"
                    id="status-being-delivered"
                  />{" "}
                  Being Delivered
                </Label>
              </FormGroup>
            </td>
            <td>
              <Button color="success">Delivered</Button>
              <Button color="danger">Rejected</Button>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>user2@example.com</td>
            <td>
              <Row>
                <Col>Class D</Col>
                <Col>
                  <Row>
                    <Col>Class E</Col>
                    <Col>Class F</Col>
                  </Row>
                </Col>
              </Row>
            </td>
            <td>
              <Row>
                <Col>Utensil C</Col>
                <Col>Utensil D</Col>
              </Row>
            </td>
            <td>2023-04-18</td>
            <td>
              <FormGroup check inline>
                <Label check>
                  <Input type="radio" name="status" id="status-pending-2" />{" "}
                  Pending
                </Label>
              </FormGroup>
              <FormGroup check inline>
                <Label check>
                  <Input type="radio" name="status" id="status-confirm-2" />{" "}
                  Confirm
                </Label>
              </FormGroup>
              <FormGroup check inline>
                <Label check>
                  <Input
                    type="radio"
                    name="status"
                    id="status-being-delivered-2"
                  />{" "}
                  Being Delivered
                </Label>
              </FormGroup>
            </td>
            <td>
              <Button color="success">Delivered</Button>
              <Button color="danger">Rejected</Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default OrderManagement;
