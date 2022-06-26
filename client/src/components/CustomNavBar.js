import React from "react";
import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const CustomNavbar = () => {
  // redux - userLoggedIn
  const userLoggedIn = useSelector((state) => state.user.userLoggedIn);
  return (
    <div>
      <Navbar bg="light" expand="lg" variant="light">
        <Navbar.Brand>
          <Link to="/home">
            <img
              src="https://img.icons8.com/color/75/undefined/book-and-pencil.png"
              style={{ margin: "10px" }}
            />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          style={{ margin: "15px" }}
        />
        {userLoggedIn === false ? (
          <Navbar.Collapse
            className="justify-content-end"
            style={{ textAlign: "center" }}
          >
            <Link
              to="/signup"
              style={{ color: "black", margin: "10px", textDecoration: "none" }}
            >
              Sign Up
            </Link>
            <br />
            <Link
              to="/signin"
              style={{ color: "black", margin: "10px", textDecoration: "none" }}
            >
              Sign In
            </Link>
            <br />
          </Navbar.Collapse>
        ) : (
          <Navbar.Collapse
            className="justify-content-end"
            style={{ textAlign: "center" }}
          >
            <Link
              to="/home"
              style={{ color: "black", margin: "10px", textDecoration: "none" }}
            >
              Home
            </Link>
            <br />
            <Link
              to="/profile"
              style={{ color: "black", margin: "10px", textDecoration: "none" }}
            >
              Profile
            </Link>
            <br />
          </Navbar.Collapse>
        )}
      </Navbar>
    </div>
  );
};

export default CustomNavbar;
