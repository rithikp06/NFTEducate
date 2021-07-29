import React, {useState, useEffect} from "react";
import "../css/CreatePost.css";
import { firebase } from "../firebase/config.js";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import moment, { unix } from "moment";
import Spacer from "react-spacer";


const EditPost = () => {
    const [post, setPost] = useState({
        date : "",
        image: "",
        body: "",
        timeStamp: 0,
        title: "",
        description: ""
    });

    const [url, setUrl] = useState("");

    const [loaded, setLoaded] = useState(false);

    const handleSubmit = (e) => {
            e.preventDefault();
            const formData = new FormData(e.target),
             formDataObj = Object.fromEntries(formData.entries());
            createPost(formDataObj.title, formDataObj.body, 
                formDataObj.date, url, formDataObj.preview, formDataObj.image, formDataObj.keywords);
    };

    const get = (e) => {
        setLoaded(false);
        e.preventDefault();
        const formData = new FormData(e.target),
             formDataObj = Object.fromEntries(formData.entries());
        getPost(setPost, setLoaded, formDataObj.url);
        setUrl(formDataObj.url);
    }
    return (

        <div class="container">
            <Spacer height='100px' />
            <Form onSubmit={get}>
                <Form.Group controlId="postUrl">
                    <Form.Label>URL</Form.Label>
                    <Form.Control name="url" placeholder="URL" required/>
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Load Post Data
                </Button>
            </Form>
            <Spacer height='40px' />
            {loaded &&(
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="postTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control  name="title" placeholder="Title" defaultValue={post.title} required/>
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="postDate">
                    <Form.Label>Date</Form.Label>
                    <Form.Control name="date" placeholder="Date" defaultValue={post.date} required/>
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>
                
                <Form.Group controlId="imageURL">
                    <Form.Label>Image URL</Form.Label>
                    <Form.Control name="image" placeholder="Image URL" defaultValue={post.image} required/>
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="keywords">
                    <Form.Label>Keywords</Form.Label>
                    <Form.Control name="keywords" placeholder="Keywords (comma separated)" defaultValue={post.keywords}/>
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="postBody">
                    <Form.Label>Body</Form.Label>
                    <Form.Control name="body" as="textarea" required rows={10}  defaultValue={post.body}/>
                </Form.Group>
                <Form.Group controlId="postPreview">
                    <Form.Label>Preview</Form.Label>
                    <Form.Control name="preview" as="textarea" maxLength="100" required rows={5}  defaultValue={post.preview}/>
                </Form.Group>

                {/* <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group> */}
                {/* <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group> */}
                <Button variant="primary" type="submit">
                    Edit
                </Button>
            </Form>)}
        </div>
    );
};

const createPost = async (title, body, date, url, preview, image, keywords) => {
    console.log("test");
    const keywordArray = keywords.split(',');
    const postsRef = firebase.firestore().collection("posts");
    postsRef.doc(url).set({
        image: image,
        date: date,
        timestamp: moment().unix().valueOf(),
        title: title,
        body: body,
        preview: preview,
        keywords: keywordArray
    }).then(() => {
        window.location.reload();
    })
    .catch((error) => {
        console.error("Error fetching document: ", error);
    });
}

const getPost = async (setPost, setLoaded, url) => {
    console.log("test");
    const postsRef = firebase.firestore().collection("posts");
    
    postsRef.doc(url)
      .get().then((doc) => {
        if (doc.exists) {
            let data_ = doc.data();
            data_["id"] = doc.id;
            console.log("exp doc id " + doc.id);
            setPost(data_);
            console.log(data_);
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
    setLoaded(true);
}

export default EditPost;