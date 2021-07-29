import React, {useState, useEffect} from "react";
import "../css/Post.css";
import { firebase } from "../firebase/config.js";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import moment, { unix } from "moment";
import parse from 'html-react-parser';
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";


const Post = (props) => {
    const [post, setPost] = useState({
        date : "",
        image: "",
        body: "",
        timeStamp: 0,
        title: "",
        description: ""
    });
    const location = useLocation();
    // const [post, setPost] = useState({
    //     date : date,
    //     image: image,
    //     body: "",
    //     timeStamp: 0,
    //     title: title
    // });
    useEffect(() => {
        var date = "";
        var image = "";
        var title = "";
        var body = "";
        var description = "";
        var keywords = [];
        if(location.state) {
            if(location.state.date) {
                date = location.state.date;
            }
            if(location.state.image) {
                image = location.state.image;
            }
            if(location.state.title) { 
                title = location.state.title;
            }
            if(location.state.body) { 
                body = location.state.body;
            }
            if(location.state.preview) { 
                description = location.state.preview;
            }
            if(location.state.keywords) { 
                keywords = location.state.keywords;
            }
        }
        setPost({
            date : date,
            image: image,
            body: body,
            timeStamp: 0,
            title: title,
            preview: description
        })
        console.log(window);
        if(!location.state || !location.state.body || !location.state.date ||
           !location.state.image || !location.state.title || !location.state.keywords) {
            getPost(setPost, props.url.post);
        }
    }, []);
    return (
        <div class="backgroundWhite">
            <Helmet>
                <title>{post.title} </title>
                <meta name="description" content={post.preview} />
                {/* <meta name="keywords" content={post.keywords} /> */}
            </Helmet>
            <div class="postContainer">
                <h1>{post.title}</h1>
                <p class="date">{post.date}</p>
                <p>
                    <img src={post.image} alt="Lamp" width="100%" />
                </p>
                <p>
                    {parse(post.body)}
                </p>
            </div>
        </div>
    );
};

const getPost = async (setPost, url) => {
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
}

export default Post;