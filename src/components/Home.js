import React, {useState, useEffect} from "react";
import "../css/Home.css";
import { firebase } from "../firebase/config.js";
import PostCard from "./PostCard";
import Button from "react-bootstrap/Button";
import logo from "../assets/nfteducatelogo.png";
import Banner from "./Banner";
import Spacer from "react-spacer";
import { Helmet } from "react-helmet";


var t = true;

const Home = () => {
   const [post1, setPost1] = useState({
        date : "Jun 7, 2021",
        image: "https://img.etimg.com/thumb/msid-81970886,width-650,imgsize-1042692,,resizemode-4,quality-100/nft-non-fungible-token_istock.jpg",
        preview: "\“NFT\” is a term you have probably been hearing a lot lately, but what is an NFT?",
        timeStamp: 0,
        title: "What is an NFT?",
        id: "what-is-an-nft"
    });
    const [post2, setPost2] = useState({
        date : "Jun 10, 2021",
        image: "https://www.vardhamaninfotech.com/blog/wp-content/uploads/2021/04/5.jpg",
        preview: "This article will tell you everything you need to know to purchase your first NFT.",
        timeStamp: 1623275442,
        title: "How to Purchase an NFT?",
        id: "how-to-purchase-an-nft"
    });
    const [post3, setPost3] = useState({
        date : "Jun 30, 2021",
        image: "https://image.cnbcfm.com/api/v1/image/106857916-Thumbnail-Explains-NFTs-01-CLEAN-jpg?v=1616503168",
        preview: "Read this article to learn about the basic mechanisms behind creating, storing, and owning NFTs,",
        timeStamp: 1625072828,
        title: "How do NFTs work?",
        id: "how-do-nfts-work",
    });
    const [latest, setLatest] = useState([]);
    useEffect(() => {
        getPost(setPost1, "what-is-an-nft");
        getPost(setPost2, "how-to-purchase-an-nft");
        getPost(setPost3, "how-do-nfts-work");
        getLatest(setLatest);
    }, []);
    return (
        <div class="center">
            <Helmet>
                <meta charSet="utf-8" />
                <title>NFT Educate</title>
                <meta name="description" content="NFT Educate is the place for everything related to NFTs. Learn about NFTs through tutorials, articles, and real-world example." />
                <meta name="keywords" content="non fungible tokens, NFT, fungible, cryptocurrency, NFT Education, Learn about NFTs, defi, digital collectibles, crypto collectibles, crypto"/>
                {/* <link rel="canonical" href="http://mysite.com/example" /> */}
            </Helmet>
            <Banner
                heading="NFT Educate"
                subheading="The one place for everything NFT"
            />
            <div class="flex-container"> 
                <a href="/about" class="pageLink">About Us</a>
                <a href="/posts" class="pageLink">All Posts</a>
            </div>
            <Spacer height='20px' />
            <div class="subheading">
                Get Started
            </div>
            <div class="flex-container">
                <PostCard
                    url={"/post/" + post1.id}
                    title={post1.title}
                    preview={post1.preview}
                    date={post1.date}
                    image={post1.image}
                    body={post1.body}
                />
                <PostCard
                    url={"/post/" + post2.id}
                    title={post2.title}
                    preview={post2.preview}
                    date={post2.date}
                    image={post2.image}
                    body={post2.body}
                />
                <PostCard
                    url={"/post/" + post3.id}
                    title={post3.title}
                    preview={post3.preview}
                    date={post3.date}
                    image={post3.image}
                    body={post3.body}
                />
            </div>
            {/* <a href="/posts"> */}
            <div class="subheading">
                Latest Posts
            </div>
            {/* </a> */}
            <div class="flex-container">
                {latest.map(post => (
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

const getLatest = async (setPosts) => {
    console.log("test");
    const postsRef = firebase.firestore().collection("posts");
    let postList = [];
    let n = 0;
    postsRef
      .orderBy("timestamp", "desc")
      .limit(3)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let data_ = doc.data();
          data_["id"] = doc.id;
          console.log("exp doc id " + doc.id);
          postList.push(data_);
          n++;
          if(n >= 3) {
              setPosts(postList);
          }
        });
        setPosts(postList);
    });
}

/*
const getInfo = async (setTest) => {
    console.log("test");
    const testRef = firebase.firestore().collection("Test");
    testRef.doc("29zBY2yMmmTsnDBbFWsC").get().then((doc) => {
        setTest(doc.data().test);
        console.log(doc.data().test);
    })
    .catch((error) => {
        console.error("Error fetching document: ", error);
    });
} 
*/

export default Home;