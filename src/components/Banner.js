import React from "react";

const Banner = ({heading, subheading}) => {
    return (
        <div id="grad">
            <div id="heading">
            {/* <img  src={logo}  className="d-inline-block align-top" alt="logo" height="100" />  */}
            {/* <div> */}
                    {heading}
            {/* </div> */}
            </div>
            {subheading && (
                <div className="subheading">
                    {subheading}
                </div>
            )}
            
        </div>
    );
};

export default Banner;