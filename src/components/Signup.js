import { firebase } from "../firebase/config.js";
import React, {useState, useEffect} from "react";
import Banner from "./Banner";
import Spacer from "react-spacer";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Signup = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target),
            formDataObj = Object.fromEntries(formData.entries());
        signup(formDataObj.name, formDataObj.email, formDataObj.password);
        console.log("test");
    };  
    return (
        <div>
            <Banner heading="Signup"/>
            <div class="container">
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="postTitle">
                        <Form.Label>Name</Form.Label>
                        <Form.Control  name="name" placeholder="name" required/>
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="postDate">
                        <Form.Label>Email</Form.Label>
                        <Form.Control name="email" placeholder="email" required/>
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="postUrl">
                        <Form.Label>Password</Form.Label>
                        <Form.Control name="password" type="password" placeholder="password" required/>
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>
                    {/* <Form.Group controlId="imageURL">
                        <Form.Label>Image URL</Form.Label>
                        <Form.Control name="image" placeholder="Image URL" required/>
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="postBody">
                        <Form.Label>Body</Form.Label>
                        <Form.Control name="body" as="textarea" required rows={10} />
                    </Form.Group>
                    <Form.Group controlId="postPreview">
                        <Form.Label>Preview</Form.Label>
                        <Form.Control name="preview" as="textarea" maxLength="100" required rows={5} />
                    </Form.Group> */}

                    <Button variant="primary" type="submit">
                        Signup
                    </Button>
                </Form>
            </div>
        </div>
    );
};

const signup = async(name, email, password) => {
    firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((response) => {
        const uid = response.user.uid;
        const data = {
          id: uid,
          email: email,
          name: name
        };
        const usersRef = firebase.firestore().collection("users");
        usersRef
          .doc(uid)
          .set(data);
        //   .then(() => {
        //     AsyncStorage.setItem("token", uid);
        //     dispatch({ type: "signin", payload: data });
        //     navigate("Today");
        //   })
        //   .catch((error) => {
        //     dispatch({
        //       type: "add_error",
        //       payload: error.message,
        //     });
        // });
    })
    .catch((error) => {
        console.log(error.message);
        // dispatch({
        //   type: "add_error",
        //   payload: error.message,
        // });
    });
};

export default Signup;