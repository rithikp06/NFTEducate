import React, {useState, useEffect} from "react";
import "../css/PostList.css";
import { firebase } from "../firebase/config.js";
import { Link } from "react-router-dom";

const PostCard = ({url, title, preview, date, image, body}) => {
    return (
        <div class="postCard">
            {/* <a href={url}>
                <div class="postImage">
                    <img src={image} alt="Lamp" width="100%" />
                </div>
                <div class="title">{title}</div>
                <p>
                    {preview} 
                    <span class="read">Read More</span>
                </p>
            </a> */}
            <Link
                to={{
                    pathname: url,
                    state: {
                        title: title,
                        date: date,
                        image: image,
                        body: body,
                        preview : preview
                    }
                }}
            >
                <div class="postImage">
                    <img src={image} alt="Lamp" width="100%" />
                </div>
                <div class="title">{title}</div>
                <p>
                    {preview} 
                    <span class="read">Read More</span>
                </p>
            </Link>
        </div>
    );
};

export default PostCard;