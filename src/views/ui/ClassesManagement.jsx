import React from "react";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import inventoryItems from "../../data/InventoryItems";
import { Col, Table, Card, CardTitle, CardBody } from "reactstrap";

function ClassesManagement() {
  const [classesList, setClassesList] = useState([]);
  const [individualItems, setIndividualItems] = useState([]);

  useEffect(() => {
    getClasses();
  }, []);

  const getClasses = () => {
    const AllClasses = [];

    db.collection("classCategories")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const classes = doc.data();
          AllClasses.push(classes);
        });
        setClassesList(AllClasses);

        let individualItems = AllClasses.map((item) => {
          return <InventoryItem item={item} key={item.id} />;
        });
        setIndividualItems(individualItems);
      });
  };

  const InventoryItem = ({ item }) => {
    console.log(item);
    return (
      <tr>
        <th scope="row">{item.id}</th>
        <td>{item.classCategory}</td>
        <td>
          {item.items.map((item) => (
            <div key={item.id} style={{ borderBottom: '1px solid #ccc', padding: '7px'}}>
              {item.title}
            </div>
          ))}
        </td>
        <td>
          {item.items.map((item) => (
            <div key={item.id} style={{ borderBottom: '1px solid #ccc', padding: '7px'}}>
              {item.duration}
            </div>
          ))}
        </td>
        <td>
          {item.items.map((item) => (
            <div key={item.id} style={{ borderBottom: '1px solid #ccc', padding: '7px'}}>
              {item.description}
            </div>
          ))}
        </td>
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
            Manage Classes
          </CardTitle>
          <CardBody className="">
            <Table style={{ width: '100%', margin: '0 auto', textAlign: 'center', justifyContent: 'center', verticalAlign: 'middle', borderCollapse: 'collapse' }} bordered striped>

              <thead style={{ borderCollapse: 'collapse' }}>
                <tr>
                  <th>#ID</th>
                  <th>Class Category</th>
                  <th>Title</th>
                  <th>Duration</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody style={{ borderCollapse: 'collapse' }}>
                {individualItems}
              </tbody>
            </Table>

          </CardBody>
        </Card>
      </Col>
    </>
  );
}

export default ClassesManagement;
