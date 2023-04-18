import { useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { db } from "../../firebase";
import { useNavigate, useLocation } from "react-router-dom";

const EditClass = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const dataString = searchParams.get("data");
  const data = JSON.parse(decodeURIComponent(dataString));

  const [classCategoryID, setClassCategoryID] = useState(data.id);
  const [classCategory, setClassCategory] = useState(data.classCategory);
  const [titleID, setTitleID] = useState(data.title.id);
  const [title, setTitle] = useState(data.title.title);
  const [duration, setDuration] = useState(data.title.duration);
  const [description, setDescription] = useState(data.title.description);
  const navigate = useNavigate();

  useEffect(() => {
    if (classCategoryID && titleID) {
      db.collection("classCategory")
        .doc(classCategoryID)
        .collection("items")
        .doc(titleID)
        .get()
        .then((doc) => {
          if (doc.exists) {
            const data = doc.data();
            setClassCategory(data.classCategory);
            setTitle(data.title);
            setDuration(data.duration);
            setDescription(data.description);
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    }
  }, [classCategoryID, titleID]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Query for the document that has the matching classCategoryID field
      const classCategoryDoc = await db
        .collection("classCategories")
        .where("id", "==", classCategoryID)
        .get();

      // If no document matches the query, log an error message and return early
      if (classCategoryDoc.empty) {
        console.log("No matching document found.");
        return;
      }

      // Loop through the documents that match the query (there should be only one)
      classCategoryDoc.forEach(async (doc) => {
        // Update the class category document with the new data
        await doc.ref.update({
          classCategory: classCategory,
          // Add any other fields you want to update here
        });

        // Get the items array from the document
        const items = doc.data().items;

        // Find the item with the matching titleID and update its properties
        const updatedItems = items.map((item) => {
          if (item.id === titleID) {
            return {
              ...item,
              title: title,
              duration: duration,
              description: description,
            };
          } else {
            return item;
          }
        });

        // Update the document with the updated items array
        await doc.ref.update({ items: updatedItems });
        alert("Document successfully updated!");
        navigate("/classesManagement");
      });
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  return (
    <div>
      <h2>Edit Class</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="classCategoryID">Class Category ID</Label>
          <Input
            type="text"
            name="classCategoryID"
            id="classCategoryID"
            value={classCategoryID}
            required
            readOnly
          />
        </FormGroup>
        <FormGroup>
          <Label for="classCategory">Class Category</Label>
          <Input
            type="text"
            name="classCategory"
            id="classCategory"
            value={classCategory}
            onChange={(e) => setClassCategory(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="titleID">Title ID</Label>
          <Input
            type="text"
            name="titleID"
            id="titleID"
            value={titleID}
            required
            readOnly
          />
        </FormGroup>
        <FormGroup>
          <Label for="title">Title</Label>
          <Input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="duration">Duration</Label>
          <Input
            type="text"
            name="duration"
            id="duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="description">Description</Label>
          <Input
            type="textarea"
            name="description"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </FormGroup>
        <Button type="submit" color="primary">
          Submit
        </Button>
        <Button
          style={{ float: "right" }}
          color="secondary"
          onClick={() => navigate("/classesManagement")}
        >
          Back
        </Button>
      </Form>
    </div>
  );
};

export default EditClass;
