import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signUp } from "../features/userSlice";
import { submitReset } from "../features/entrySlice";

import "../App.css";
import Spinner from "../img/spinner.gif";

const SignUp = () => {
  // redux - loading
  const loading = useSelector((state) => state.user.loading);

  //redux - error
  const error = useSelector((state) => state.user.error);

  // redux - userLoggedIn
  const userLoggedIn = useSelector((state) => state.user.userLoggedIn);

  // use - dispatch
  const dispatch = useDispatch();

  // use - navigate
  const navigate = useNavigate();

  // useState - username
  const [signUpUserName, setSignUpUserName] = useState("");

  // useState - bio
  const [signUpBio, setSignUpBio] = useState("");

  // useState - email
  const [signUpEmail, setSignUpEmail] = useState("");

  // useState - password
  const [signUpPassWord, setSignUpPassWord] = useState("");

  // useState - profile img
  const [signUpImg, setSignUpImg] = useState("");

  // handler - username
  const userNameHandler = (e) => {
    setSignUpUserName(e.target.value);
  };

  // handler - bio
  const bioHandler = (e) => {
    setSignUpBio(e.target.value);
  };

  // handler - email
  const emailHandler = (e) => {
    setSignUpEmail(e.target.value);
  };

  // handler - password
  const passWordHandler = (e) => {
    setSignUpPassWord(e.target.value);
  };

  // handler - profile img
  const profileImgHandler = (e) => {
    setSignUpImg(e.target.files[0]);
  };

  // handler = form submit
  const formSubmitHandler = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("signUpUserName", signUpUserName);
    formData.append("signUpBio", signUpBio);
    formData.append("signUpEmail", signUpEmail);
    formData.append("signUpPassword", signUpPassWord);
    formData.append("file", signUpImg);
    dispatch(signUp(formData));
    dispatch(submitReset());
    console.log(formData);
  };

  useEffect(() => {
    if (userLoggedIn) {
      navigate("/home");
    }
  }, [userLoggedIn]);

  //component
  return (
    <div id="mainDiv_signIn">
      <div id="formDiv">
        <form onSubmit={formSubmitHandler}>
          {error === "" ? (
            ""
          ) : (
            <div id="errorDiv">
              <div className="text-bg-danger p-3">{error}</div>
            </div>
          )}

          <div id="usernameDiv">
            <div className="input-group">
              <span className="input-group-text" id="inputGroup-sizing-default">
                Username:
              </span>
              <input
                type="text"
                className="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
                onChange={userNameHandler}
              />
            </div>
          </div>
          <div id="bioDiv">
            <div className="input-group">
              <span className="input-group-text" id="inputGroup-sizing-default">
                Bio:
              </span>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                onChange={bioHandler}
              ></textarea>
            </div>
          </div>
          <div id="emailDiv">
            <div className="input-group">
              <span className="input-group-text" id="inputGroup-sizing-default">
                Email:
              </span>
              <input
                type="text"
                className="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
                onChange={emailHandler}
              />
            </div>
          </div>
          <div id="passwordDiv">
            <div className="input-group">
              <span className="input-group-text" id="inputGroup-sizing-default">
                Password:
              </span>
              <input
                type="text"
                className="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
                onChange={passWordHandler}
              />
            </div>
          </div>
          <div id="imgDiv">
            <div className="input-group">
              <span className="input-group-text" id="inputGroup-sizing-default">
                Profile Image:
              </span>
              <input
                type="file"
                className="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
                onChange={profileImgHandler}
              />
            </div>
          </div>
          <div id="submitBtDiv">
            {loading === "loading" ? (
              <img src={Spinner} style={{ width: "100px" }} />
            ) : (
              <button type="submit" className="btn btn-success">
                Sign up!
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
