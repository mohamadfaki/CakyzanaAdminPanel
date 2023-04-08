import React, { useState, useEffect } from 'react';
import { Table, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { db } from "../../firebase";
import ReactPaginate from 'react-paginate';
import './styling/ClassManagement.css';
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { useNavigate } from 'react-router-dom';

function UtensilsManagement() {
    const [data, setData] = useState([]);
    const [id, setId] = useState('');
    const [Dimensions, setDimensions] = useState('');
    const [Packaging, setPackaging] = useState('');
    const [Category, setCategory] = useState('');
    const [Material, setMaterial] = useState('');
    const [Name, setName] = useState('');
    const [Price, setPrice] = useState('');
    const [Shape, setShape] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [numChanges, setNumChanges] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        db.collection("utensils").get()
            .then(querySnapshot => {
                const data = querySnapshot.docs.map(doc => doc.data());
                setData(data);
            });
    }, [numChanges]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const classCategoriesRef = firebase.firestore().collection('utensils');
        // Add a new class category
        classCategoriesRef.add({
            id: id,
            Dimensions,
            Packaging,
            Category,
            Material,
            Name,
            Price,
            Shape
        })
            .then(() => {
                setId('');
                setDimensions('');
                setPackaging('');
                setCategory('');
                setMaterial('');
                setName('');
                setPrice('');
                setShape('');
                setNumChanges(numChanges + 1);
                window.scrollTo({ top: 0, behavior: 'smooth' });
                alert("Utensil successfully added!");
            })
            .catch((error) => {
                console.error("Error adding utensil: ", error);
            });
    }


    async function handleDelete(id) {
        const utensilsRef = firebase.firestore().collection('utensils');
        const querySnapshot = await utensilsRef.where('id', '==', id).get();
        if (querySnapshot.empty) {
          alert(`No utensil found with ID '${id}'`);
          return;
        }
        const utensilDoc = querySnapshot.docs[0];
        await utensilsRef.doc(utensilDoc.id).delete();
        alert(`Utensil with ID '${id}' deleted successfully`);
      }
      

    const EditClass = (item, title) => {
        // const data = {
        //   id: item.id,
        //   classCategory: item.classCategory,
        //   title: title
        // };

        // navigate(`/editClass?data=${encodeURIComponent(JSON.stringify(data))}`)
    }


    return (
        <div style={{ margin: '20px' }}>
            <Table key={numChanges} bordered style={{ borderCollapse: 'collapse', width: '100%' }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid black', padding: '10px', textAlign: 'center' }}>ID</th>
                        <th style={{ border: '1px solid black', padding: '10px', textAlign: 'center' }}>Dimensions</th>
                        <th style={{ border: '1px solid black', padding: '10px', textAlign: 'center' }}>Packaging</th>
                        <th style={{ border: '1px solid black', padding: '10px', textAlign: 'center' }}>Category</th>
                        <th style={{ border: '1px solid black', padding: '10px', textAlign: 'center' }}>Material</th>
                        <th style={{ border: '1px solid black', padding: '10px', textAlign: 'center' }}>Name</th>
                        <th style={{ border: '1px solid black', padding: '10px', textAlign: 'center' }}>Price</th>
                        <th style={{ border: '1px solid black', padding: '10px', textAlign: 'center' }}>Shape</th>
                        <th style={{ border: '1px solid black', padding: '10px', textAlign: 'center' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((product) => (
                        <tr key={product.id}>
                            <td style={{ border: '1px solid black', padding: '10px', textAlign: 'center', verticalAlign: 'middle' }}>{product.id}</td>
                            <td style={{ border: '1px solid black', padding: '10px', textAlign: 'center', verticalAlign: 'middle' }}>
                                {product.Dimensions ? product.Dimensions.map((dimension, index) => <div key={index}>{dimension}</div>) : 'N/A'}
                            </td>
                            <td style={{ border: '1px solid black', padding: '10px', textAlign: 'center', verticalAlign: 'middle' }}>{product.Packaging}</td>
                            <td style={{ border: '1px solid black', padding: '10px', textAlign: 'center', verticalAlign: 'middle' }}>{product.category}</td>
                            <td style={{ border: '1px solid black', padding: '10px', textAlign: 'center', verticalAlign: 'middle' }}>{product.material}</td>
                            <td style={{ border: '1px solid black', padding: '10px', textAlign: 'center', verticalAlign: 'middle' }}>{product.name}</td>
                            <td style={{ border: '1px solid black', padding: '10px', textAlign: 'center', verticalAlign: 'middle' }}>{product.price}</td>
                            <td style={{ border: '1px solid black', padding: '10px', textAlign: 'center', verticalAlign: 'middle' }}>{product.shape}</td>
                            <td style={{ border: '1px solid black', padding: '10px', textAlign: 'center', verticalAlign: 'middle' }}><span id="boot-icon" class="bi bi-trash-fill" style={{ fontSize: '1rem', color: 'rgb(255, 0, 0)', cursor: 'pointer' }} onClick={() => handleDelete(product.id)}></span><span id="boot-icon" class="bi bi-pencil-square" style={{ fontSize: '1rem', color: 'rgb(0, 0, 255)', cursor: 'pointer' }} onClick={() => EditClass(product)}></span></td>
                        </tr>
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

            <h2>Add New Utensil</h2>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="id">Utensil ID</Label>
                    <Input type="text" name="id" id="id" placeholder="Enter Utensil ID" value={id} onChange={(e) => setId(e.target.value)} required />
                </FormGroup>
                <FormGroup>
                    <Label for="Dimensions">Dimensions</Label>
                    <Input type="textarea" name="Dimensions" id="Dimensions" placeholder="Enter Dimensions" value={Dimensions} onChange={(e) => setDimensions(e.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Label for="Packaging">Packaging</Label>
                    <Input type="text" name="Packaging" id="Packaging" placeholder="Enter your Packaging" value={Packaging} onChange={(e) => setPackaging(e.target.value)} required />
                </FormGroup>
                <FormGroup>
                    <Label for="Category">Category</Label>
                    <Input type="text" name="Category" id="Category" placeholder="Enter Category" value={Category} onChange={(e) => setCategory(e.target.value)} required />
                </FormGroup>
                <FormGroup>
                    <Label for="Material">Material</Label>
                    <Input type="text" name="Material" id="Material" placeholder="Enter Material" value={Material} onChange={(e) => setMaterial(e.target.value)} required />
                </FormGroup>
                <FormGroup>
                    <Label for="Name">Name</Label>
                    <Input type="text" name="Name" id="Name" placeholder="Enter Name" value={Name} onChange={(e) => setName(e.target.value)} required />
                </FormGroup>
                <FormGroup>
                    <Label for="Price">Price</Label>
                    <Input type="text" name="Price" id="Price" placeholder="Enter Price" value={Price} onChange={(e) => setPrice(e.target.value)} required />
                </FormGroup>
                <FormGroup>
                    <Label for="Shape">Shape</Label>
                    <Input type="text" name="Shape" id="Shape" placeholder="Enter Shape" value={Shape} onChange={(e) => setShape(e.target.value)} required />
                </FormGroup>
                <Button type="submit" color="primary">Submit</Button>
            </Form>

        </div>

    );
}

export default UtensilsManagement;
