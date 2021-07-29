import React, {useState, useEffect} from "react";
import Banner from "./Banner"
import Spacer from "react-spacer";
import "../css/AboutUs.css";

const AboutUs = () => {
    return (
        <div class="center">
            <Banner
                heading="About Us"
            />
            <div class="subheading about-align">
                Our Mission
            </div>
            <div class="about ">
                NFTs are an up-and-coming technology that has the potential to change the world. Our goal is to promote NFTs and educate people about them. We want to break down the barriers and skepticism around NFTs to help accelerate their use. Moreover, the layman does not know much about and can be intimidated by the term NON-FUNGIBLE TOKENS. These tokens can be used by all, as collectibles or as secure contracts. We at NFT Educate hope to teach you about NFTs and help you purchase and enjoy them.
            </div>
            <Spacer height='30px' />
            <div class="subheading about-align">
                Who We Are
            </div>
            <div class="about ">
                NFT Educate is run by a group of NFT enthusiasts. We believe in the technology as a pastime and in NFTs’ applications. Our writers' experience with NFTs range from casual to professional. Our technical writers have worked at companies like BirthVenue and PawnBlock. Most articles are written by NFT collectors. Our writers have one thing in common. They are all passionate about NFTs.
            </div>
            <Spacer height='50px' />
        </div>
    );
};

export default AboutUs;