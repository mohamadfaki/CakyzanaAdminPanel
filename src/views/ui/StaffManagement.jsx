import React, { useEffect, useState } from "react";
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
import moment from "moment";

let codesArr = [];

function StaffManagement() {
  const [codes, setCodes] = useState([]);
  useEffect(() => {
    db.collection("Codes")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          codesArr.push({ ...doc.data(), id: doc.id });
        });
      })
      .then(() => {
        setCodes(codesArr);
      });
  }, []);
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Class ID</th>
            <th>Date of Purchase</th>
            <th>Date of Redeem</th>
            <th>Order Id</th>
            <th>Redeemed</th>
            <th>UserEmail</th>
            <th>UserRedeemedEmail</th>
          </tr>
        </thead>
        <tbody>
          {codes.map((code) => (
            <tr>
              <td>{code.Class}</td>
              <td>
                {moment(code?.DateOfPurchase?.toDate()).format(
                  "DD/MM/YYYY, HH:mm:ss"
                )}
              </td>
              <td>
                {code.DateOfRedeem
                  ? moment(code?.DateOfRedeem?.toDate()).format(
                      "DD/MM/YYYY, HH:mm:ss"
                    )
                  : "Not Redeemed"}
              </td>
              <td>{code.OrderId}</td>
              <td>{code.Redeemed ? "Redeemed" : "Not Redeemd"}</td>
              <td>{code.UserEmail}</td>
              <td>
                {code.UserRedeemedEmail
                  ? code.UserRedeemedEmail
                  : "Not Redeemd"}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default StaffManagement;
