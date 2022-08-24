import React from "react";
import { NavLink } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

function NavBar() {
  return (
    <div className="navigation">
      <Navbar bg="light" variant="light" className="navBar">
        <div className="navContainer">
         <div className="title">Don't Sweat It</div>
          <Nav className="navLinks">
          <Nav.Link as={NavLink} to="/exerciselist">Exercises</Nav.Link>
          <Nav.Link as={NavLink} to="/workoutlist">Workouts</Nav.Link>
         </Nav>
        </div>
      </Navbar>
    </div>
  )
}

export default NavBar;