import React from "react";
import { useEffect, useState } from "react";
import { db } from "../../firebase";

function ClassesManagement() {
    const [individualItems, setIndividualItems] = useState([]);
    const [classesList, setClassesList] = useState([]);

    useEffect(() => {
        getClasses();
    }, []);

    const getClasses = () => {
        const AllClasses = [];
        setClassesList(AllClasses);

        db.collection("Course")
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const classes = doc.data();
                    AllClasses.push(classes);
                });

                setClassesList(AllClasses);
                setIndividualItems(
                    AllClasses.map((item) => {
                        return <InventoryItem item={item} key={item.id} />;
                    })
                );
            });
    };

    const InventoryItem = ({ item }) => {
        console.log(item);

        return (
            <tr>
                <td>hello</td>
                {/* <th scope="row">{item.id}</th>
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
        <td>{item.quantity}</td> */}
            </tr>
        );
    };

    return (
        <div>
            <h1>Classes</h1>
        </div>
    );
}

export default ClassesManagement;
