import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signIn } from "../features/userSlice";
import { submitReset } from "../features/entrySlice";

import "../App.css";
import Spinner from "../img/spinner.gif";

const SignIn = () => {
  // redux - loading
  const loading = useSelector((state) => state.user.loading);

  // redux - error
  const error = useSelector((state) => state.user.error);

  // redux - userLoggedIn
  const userLoggedIn = useSelector((state) => state.user.userLoggedIn);

  // use - dispatch
  const dispatch = useDispatch();

  // use - navigate
  const navigate = useNavigate();

  // useState - email
  const [signInEmail, setSignInEmail] = useState("");

  // useState - password
  const [signInPassWord, setSignInPassWord] = useState("");

  // handler - email
  const emailHandler = (e) => {
    setSignInEmail(e.target.value);
  };

  // handler - password
  const passWordHandler = (e) => {
    setSignInPassWord(e.target.value);
  };

  // handler = form submit
  const formSubmitHandler = (e) => {
    e.preventDefault();
    let formData = {};
    formData.signInEmail = signInEmail;
    formData.signInPassword = signInPassWord;
    dispatch(signIn(formData));
    dispatch(submitReset());
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

export default SignIn;
