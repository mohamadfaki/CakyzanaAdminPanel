import React, { useState, useEffect } from 'react';
import { Table, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { db } from "../../firebase";

function ClassesManagement() {
  const [data, setData] = useState([]);
  const [id, setId] = useState('');
  const [classCategory, setClassCategory] = useState('');
  const [titleId, setTitleId] = useState('');
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    db.collection("classCategories").get()
      .then(querySnapshot => {
        const data = querySnapshot.docs.map(doc => doc.data());
        setData(data);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    db.collection("classCategories").add({
      id,
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
        console.log("Class data successfully added!");
        setId('');
        setClassCategory('');
        setTitleId('');
        setTitle('');
        setDuration('');
        setDescription('');
      })
      .catch((error) => {
        console.error("Error adding class data: ", error);
      });
  }

  return (
    <div style={{ margin: '20px' }}>
      <Table bordered style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid black', padding: '10px', textAlign: 'center' }}>ID</th>
            <th style={{ border: '1px solid black', padding: '10px', textAlign: 'center' }}>Class Category</th>
            <th style={{ border: '1px solid black', padding: '10px', textAlign: 'center' }}>Title ID</th>
            <th style={{ border: '1px solid black', padding: '10px', textAlign: 'center' }}>Title</th>
            <th style={{ border: '1px solid black', padding: '10px', textAlign: 'center' }}>Duration</th>
            <th style={{ border: '1px solid black', padding: '10px', textAlign: 'center' }}>Description</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            item.items.map((title, index) => (
              <tr key={title.id}>
                {index === 0 && <td rowSpan={item.items.length} style={{ border: '1px solid black', padding: '10px', textAlign: 'center', verticalAlign: 'middle' }}>{item.id}</td>}
                {index === 0 && <td rowSpan={item.items.length} style={{ border: '1px solid black', padding: '10px', textAlign: 'center', verticalAlign: 'middle' }}>{item.classCategory}</td>}
                <td style={{ border: '1px solid black', padding: '10px', textAlign: 'center' }}>{title.id}</td>
                <td style={{ border: '1px solid black', padding: '10px', textAlign: 'center' }}>{title.title}</td>
                <td style={{ border: '1px solid black', padding: '10px', textAlign: 'center' }}>{title.duration}</td>
                <td style={{ border: '1px solid black', padding: '10px', textAlign: 'center' }}>{title.description}</td>
              </tr>
            ))
          ))}
        </tbody>
      </Table>
      <h2>Add New Class</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="id">Class Category ID</Label>
          <Input type="text" name="id" id="id" placeholder="Enter class category ID" value={id} onChange={(e) => setId(e.target.value)} required />
        </FormGroup>
        <FormGroup>
          <Label for="classCategory">Class Category</Label>
          <Input type="text" name="classCategory" id="classCategory" placeholder="Enter class category" value={classCategory} onChange={(e) => setClassCategory(e.target.value)} required />
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
