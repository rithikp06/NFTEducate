import React from "react";
// import "../css/Navbar.css"
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Button from 'react-bootstrap/Button'
import logo from "../assets/nfteducatelogo.png"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


const NavigationBar = () => {
  
    return (
      <Navbar bg="dark" expand="lg" fixed="top" variant="dark">
        <Navbar.Brand href="/">
          {/* <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/NFT_Icon.png/480px-NFT_Icon.png" alt="Lamp" width="40" />   */}
            <img  src={logo}  className="d-inline-block align-top" alt="logo" height="40" /> 
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/posts">Posts</Nav.Link>
            {/* <Nav.Link href="#link">About Us</Nav.Link> */}
            {/* <Nav.Link href="#link">Contact Us</Nav.Link> */}
            {/* <Nav.Link href="#link">About Us</Nav.Link> */}
            <NavDropdown title="More" id="basic-nav-dropdown">
              <NavDropdown.Item href="/about">About Us</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Contact Us</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Resources</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          {/* <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" id="search"/>
            <Button >Search</Button>
          </Form> */}
        </Navbar.Collapse>
      </Navbar>
    );
};

export default NavigationBar;