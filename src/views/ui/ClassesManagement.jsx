import React, { useState, useEffect } from 'react';
import { Table, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { db } from "../../firebase";
import ReactPaginate from 'react-paginate';
import './styling/ClassManagement.css';
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

function ClassesManagement() {
  const [data, setData] = useState([]);
  const [id, setId] = useState('');
  const [classCategory, setClassCategory] = useState('');
  const [titleId, setTitleId] = useState('');
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState('');
  const [description, setDescription] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [numChanges, setNumChanges] = useState(0);

  useEffect(() => {
    db.collection("classCategories").get()
      .then(querySnapshot => {
        const data = querySnapshot.docs.map(doc => doc.data());
        setData(data);
      });
  }, [numChanges]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const classCategoriesRef = firebase.firestore().collection('classCategories');
    const querySnapshot = await classCategoriesRef.where('id', '==', id).get();
    if (querySnapshot.empty) {
      // Add a new class category
      classCategoriesRef.add({
        id: id,
        classCategory,
        items: [{
          id: titleId,
          image: '',
          title,
          duration,
          description
        }]
      })
      .then(() => {
        setId('');
        setClassCategory('');
        setTitleId('');
        setTitle('');
        setDuration('');
        setDescription('');
        setNumChanges(numChanges + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        alert("Class data successfully added!");
      })
      .catch((error) => {
        console.error("Error adding class data: ", error);
      });
    } else {
      // Update the existing class category's items array
      const classCategoryDoc = querySnapshot.docs[0];
      const items = classCategoryDoc.data().items;
      items.push({
        id: titleId,
        image: '',
        title,
        duration,
        description
      });
      await classCategoriesRef.doc(classCategoryDoc.id).update({ items });
      setId('');
      setTitleId('');
      setTitle('');
      setDuration('');
      setDescription('');
      setNumChanges(numChanges + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      alert(`Class data successfully added to existing class category with ID '${id}'`);
    }
  }
  

  async function handleDelete(classCategoryId, titleId) {
    const classCategoriesRef = firebase.firestore().collection('classCategories');
    const querySnapshot = await classCategoriesRef.where('id', '==', classCategoryId).get();
    if (querySnapshot.empty) {
      alert(`No class category found with ID '${classCategoryId}'`);
      return;
    }
    const classCategoryDoc = querySnapshot.docs[0];
    const items = classCategoryDoc.data().items;
    const updatedItems = items.filter(item => item.id !== titleId);
    await classCategoriesRef.doc(classCategoryDoc.id).update({ items: updatedItems });
    setNumChanges(numChanges + 1);
    alert(`Item with ID '${titleId}' removed from class category with ID '${classCategoryId}'`);
  }
  
  return (
    <div style={{ margin: '20px' }}>
      <Table key={numChanges} bordered style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid black', padding: '10px', textAlign: 'center' }}>ID</th>
            <th style={{ border: '1px solid black', padding: '10px', textAlign: 'center' }}>Class Category</th>
            <th style={{ border: '1px solid black', padding: '10px', textAlign: 'center' }}>Title ID</th>
            <th style={{ border: '1px solid black', padding: '10px', textAlign: 'center' }}>Title</th>
            <th style={{ border: '1px solid black', padding: '10px', textAlign: 'center' }}>Duration</th>
            <th style={{ border: '1px solid black', padding: '10px', textAlign: 'center' }}>Description</th>
            <th style={{ border: '1px solid black', padding: '10px', textAlign: 'center' }}></th>
          </tr>
        </thead>
        <tbody>
          {data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map(item => (
            item.items.map((title, index) => (
              <tr key={title.id}>
                {index === 0 && <td rowSpan={item.items.length} style={{ border: '1px solid black', padding: '10px', textAlign: 'center', verticalAlign: 'middle' }}>{item.id}</td>}
                {index === 0 && <td rowSpan={item.items.length} style={{ border: '1px solid black', padding: '10px', textAlign: 'center', verticalAlign: 'middle' }}>{item.classCategory}</td>}
                <td style={{ border: '1px solid black', padding: '10px', textAlign: 'center', verticalAlign: 'middle' }}>{title.id}</td>
                <td style={{ border: '1px solid black', padding: '10px', textAlign: 'center', verticalAlign: 'middle' }}>{title.title}</td>
                <td style={{ border: '1px solid black', padding: '10px', textAlign: 'center', verticalAlign: 'middle' }}>{title.duration}</td>
                <td style={{ border: '1px solid black', padding: '10px', textAlign: 'center', verticalAlign: 'middle' }}>{title.description}</td>
                <td style={{ border: '1px solid black', padding: '10px', textAlign: 'center', verticalAlign: 'middle' }}><span id="boot-icon" class="bi bi-trash-fill" style={{ fontSize: '1rem', color: 'rgb(255, 0, 0)', cursor: 'pointer' }} onClick={() => handleDelete(item.id, title.id)}></span><span id="boot-icon" class="bi bi-pencil-square" style={{fontSize: '1rem', color: 'rgb(0, 0, 255)', cursor:'pointer' }}></span></td>
              </tr>
            ))
          ))}
        </tbody>
      </Table>

      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "20px" }}>
        <ReactPaginate
          pageCount={Math.ceil(data.length / itemsPerPage)}
          pageRangeDisplayed={2}
          marginPagesDisplayed={2}
          onPageChange={({ selected }) => {
            setCurrentPage(selected + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          containerClassName={"pagination"}
          activeClassName={"active"}
          previousLabel={<button style={{ backgroundColor: "#1668E3", color: "white", border: "none", padding: "5px 10px", marginRight: "35px", borderRadius: '18px', height: '40px' }}>Previous</button>}
          nextLabel={<button style={{ backgroundColor: "#1668E3", color: "white", border: "none", padding: "5px 10px", marginLeft: "35px", borderRadius: '18px', height: '40px' }}>Next</button>}
          breakLabel={<button style={{ backgroundColor: "white", color: "blue", border: "none", padding: "5px 10px" }}>...</button>}
          pageLinkClassName={"page-link"}
          activeLinkClassName={"active-link"}
          pageClassName={"page-item"}
          previousClassName={"previous-item"}
          nextClassName={"next-item"}
          pageLinkStyle={{ margin: "0 5px", display: "inline-block", height: "38px", lineHeight: "38px" }}
          pageClassStyle={{ display: "inline-block", height: "38px", lineHeight: "38px" }}
        />
      </div>

      <h2>Add New Class</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="id">Class Category ID</Label>
          <Input type="text" name="id" id="id" placeholder="Enter class category ID" value={id} onChange={(e) => setId(e.target.value)} required />
        </FormGroup>
        <FormGroup>
          <Label for="classCategory">Class Category</Label>
          <Input type="text" name="classCategory" id="classCategory" placeholder="Enter class category" value={classCategory} onChange={(e) => setClassCategory(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="titleId">Title ID</Label>
          <Input type="text" name="titleId" id="titleId" placeholder="Enter title ID" value={titleId} onChange={(e) => setTitleId(e.target.value)} required />
        </FormGroup>
        <FormGroup>
          <Label for="title">Title</Label>
          <Input type="text" name="title" id="title" placeholder="Enter title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </FormGroup>
        <FormGroup>
          <Label for="duration">Duration</Label>
          <Input type="text" name="duration" id="duration" placeholder="Enter duration" value={duration} onChange={(e) => setDuration(e.target.value)} required />
        </FormGroup>
        <FormGroup>
          <Label for="description">Description</Label>
          <Input type="textarea" name="description" id="description" placeholder="Enter description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        </FormGroup>
        <Button type="submit" color="primary">Submit</Button>
      </Form>

    </div>

  );
}

export default ClassesManagement;
