import React, {useState, useEffect} from "react";
import "../css/PostList.css";
import { firebase } from "../firebase/config.js";
import PostCard from "./PostCard";

const PostList = () => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        getPosts(setPosts);
    }, []);
    return (
        <div class="contain flex-container">
            {posts.map(post => (
                // <div class="postCard">
                //     <a href={"/post/" + post.id}>
                //         <div class="title">{post.title}</div>
                //         <p>{post.date}</p>
                //         <p>
                //             {post.preview} 
                //             <span class="read" href={"/post/" + post.id}>Read More</span>
                //         </p>
                //     </a>
                // </div>
                <PostCard
                    url={"/post/" + post.id}
                    title={post.title}
                    preview={post.preview}
                    date={post.date}
                    image={post.image}
                    body={post.body}
                />
            ))}
        </div>
    );
};

const getPosts = async (setPosts) => {
    console.log("test");
    const postsRef = firebase.firestore().collection("posts");
    let postList = [];
    
    postsRef
      .orderBy("timestamp", "desc")
      .get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let data_ = doc.data();
          data_["id"] = doc.id;
          console.log("exp doc id " + doc.id);
          postList.push(data_);
        });
        setPosts(postList);
    });
}

export default PostList;