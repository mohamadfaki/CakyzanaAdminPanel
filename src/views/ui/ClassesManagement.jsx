import React, { useState, useEffect } from "react";
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
import ReactPaginate from "react-paginate";
import "./styling/ClassManagement.css";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { useNavigate } from "react-router-dom";

let classesArr = [];

function ClassesManagement() {
  const [data, setData] = useState([]);
  const [Category, setCategory] = useState("");
  const [classSection, setClassSection] = useState("");
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");
  const [prerequisites, setPrerequisites] = useState("");
  const [price, setPrice] = useState("");
  const [tools, setTools] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [numChanges, setNumChanges] = useState(0);
  const navigate = useNavigate();

  const storageRef = storage.ref();
  const [itemImageUrl, setItemImageUrl] = useState("");
  const [accessTokenItemImage, setAccessTokenItemImage] = useState("");
  const [itemVideoUrl, setItemVideoUrl] = useState("");
  const [accessTokenItemVideo, setAccessTokenItemVideo] = useState("");
  const [videoDescription, setVideoDescription] = useState("");
  const [videoDuration, setVideoDuration] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [videoWaiter, setVideoWaiter] = useState(true);

  const [classes, setClasses] = useState([]);

  //todo: make the cat dropdown
  //todo: make add video to firebase and storage (wait to return the access token)

  useEffect(() => {
    db.collection("Classes")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          classesArr.push({ ...doc.data(), id: doc.id });
        });
      })
      .then(() => {
        setClasses(classesArr);
      });
  }, []);

  const deleteDocument = (id) => {
    db.collection("Classes")
      .doc(id)
      .delete()
      .then(() => {
        console.log(`Class with id ${id} successfully deleted`);
        window.location.reload();
      })
      .catch((error) => {
        console.error(`Error deleting document with id ${id}:`, error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // db.collection("Classes")
    //   .add({
    //     category: Category,
    //     classSection: classSection,
    //     title: title,
    //     duration: duration,
    //     description: description,
    //     prerequisites: prerequisites,
    //     price: price,
    //     tools: tools,
    //     videos: [],
    //     numberSold: 0,
    //     type: "class",
    //     image: itemImageUrl,
    //   })
    //   .then(() => {
    //     alert("Class added successfully");
    //     window.location.reload();
    //   })
    //   .catch((error) => {
    //     console.error("Error adding document: ", error);
    //   });

    db.collection("Video")
      .add({
        Description: videoDescription,
        Duration: videoDuration,
        Order: 1,
        Title: videoTitle,
        URL: itemVideoUrl,
      })
      .then((docRef) => {
        // docRef contains the ID of the newly added video document
        const videoId = docRef.id; // save the ID to a variable
        return db.collection("Classes").add({
          category: Category,
          classSection: classSection,
          title: title,
          duration: duration,
          description: description,
          prerequisites: prerequisites,
          price: price,
          tools: tools,
          videos: [videoId], // add the video ID to the videos array
          numberSold: 0,
          type: "class",
          image: itemImageUrl,
        });
      })
      .then(() => {
        alert("Class added successfully");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };

  const handlePickItemImage = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    const fileRef = storageRef.child(`classesImages/${file.name}`);
    const uploadTask = fileRef.put(file);

    uploadTask.on("state_changed", null, null, () => {
      fileRef.getDownloadURL().then((downloadUrl) => {
        setItemImageUrl(downloadUrl);
        fileRef.getMetadata().then((metadata) => {
          if (metadata && metadata.metadata) {
            setAccessTokenItemImage(
              metadata.metadata.firebaseStorageDownloadTokens
            );
          }
        });
      });
    });
  };

  const handlePickItemVideo = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    const fileRef = storageRef.child(`videos/${file.name}`);
    const uploadTask = fileRef.put(file);

    uploadTask.on("state_changed", null, null, () => {
      fileRef
        .getDownloadURL()
        .then((downloadUrl) => {
          setItemVideoUrl(downloadUrl);
          fileRef.getMetadata().then((metadata) => {
            if (metadata && metadata.metadata) {
              setAccessTokenItemVideo(
                metadata.metadata.firebaseStorageDownloadTokens
              );
            }
          });
        })
        .then(() => {
          setVideoWaiter(false);
        });
    });
  };

  return (
    <div style={{ margin: "20px" }}>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Class Title, Id</th>
            <th>Category</th>
            <th>Section</th>
            <th>Duration</th>
            <th>Price</th>
            <th>Tools</th>
            <th style={{ width: "10%" }}>Video IDs</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {classesArr.map((item) => (
            <tr>
              <th scope="row">
                <tr>{item.title}</tr> <tr>{item.id}</tr>
              </th>
              <td>{item.category}</td>
              <td>{item.classSection}</td>
              <td>{item.duration}</td>
              <td>{item.price}</td>
              <td>{item.tools}</td>
              <td>
                {item.videos.map((video) => {
                  return <td>{video},</td>;
                })}
              </td>
              <td>{item.description}</td>
              <td
                style={{
                  textAlign: "center",
                  verticalAlign: "middle",
                }}
              >
                <span
                  id="boot-icon"
                  className="bi bi-trash-fill"
                  style={{
                    fontSize: "1rem",
                    color: "rgb(255, 0, 0)",
                    cursor: "pointer",
                    marginRight: "10px",
                  }}
                  onClick={() => deleteDocument(item.id)}
                ></span>
                <span
                  id="boot-icon"
                  className="bi bi-pencil-square"
                  style={{
                    fontSize: "1rem",
                    color: "rgb(0, 0, 255)",
                    cursor: "pointer",
                  }}
                ></span>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <h2>Add New Class</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="Category">Class Category</Label>
          <Input
            type="text"
            name="Category"
            id="Category"
            placeholder="Enter class category"
            value={Category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="classSection">Class Section</Label>
          <Input
            type="text"
            name="classSection"
            id="classSection"
            placeholder="Enter class section"
            value={classSection}
            onChange={(e) => setClassSection(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="title">Title</Label>
          <Input
            type="text"
            name="title"
            id="title"
            placeholder="Enter title "
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="Prerequisites">Prerequisites</Label>
          <Input
            type="text"
            name="Prerequisites"
            id="Prerequisites"
            placeholder="Enter prerequisites"
            value={prerequisites}
            onChange={(e) => setPrerequisites(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="duration">Duration</Label>
          <Input
            type="text"
            name="duration"
            id="duration"
            placeholder="Enter duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="price">Price</Label>
          <Input
            type="text"
            name="price"
            id="price"
            placeholder="Enter price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label for="tools">Tools</Label>
          <Input
            type="text"
            name="tools"
            id="tools"
            placeholder="Enter tools"
            value={tools}
            onChange={(e) => setTools(e.target.value)}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label for="description">Description</Label>
          <Input
            type="textarea"
            name="description"
            id="description"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="exampleFile">Image</Label>
          <Input
            id="exampleFile"
            name="file"
            type="file"
            onChange={(e) => {
              handlePickItemImage(e);
            }}
          />
          <FormText>
            When selecting an image it may take some time to upload, please be
            patient.
          </FormText>
        </FormGroup>
        <FormGroup>
          <Label for="exampleFile">Video</Label>
          <Input
            id="exampleFile"
            name="file"
            type="file"
            onChange={(e) => {
              handlePickItemVideo(e);
            }}
          />
          <FormText>
            When selecting a video it may take some time to upload, please be
            patient.
          </FormText>
        </FormGroup>
        <FormGroup>
          <Label for="videodescription">Video Description</Label>
          <Input
            type="textarea"
            name="videodescription"
            id="videodescription"
            placeholder="Enter video description"
            value={videoDescription}
            onChange={(e) => setVideoDescription(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="videoduration">Video Duration</Label>
          <Input
            type="textarea"
            name="videoduration"
            id="videoduration"
            placeholder="Enter video duration"
            value={videoDuration}
            onChange={(e) => setVideoDuration(e.target.value)}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label for="videotitle">Video Title</Label>
          <Input
            type="textarea"
            name="videotitle"
            id="videotitle"
            placeholder="Enter video title"
            value={videoTitle}
            onChange={(e) => setVideoTitle(e.target.value)}
            required
          />
        </FormGroup>

        {itemImageUrl && !videoWaiter && (
          <Button type="submit" color="primary">
            Submit
          </Button>
        )}
      </Form>
    </div>
  );
}

export default ClassesManagement;
