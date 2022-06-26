import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { homeCheck } from "../features/userSlice";
import { submitReset } from "../features/entrySlice";
import cookieFunction from "../utilities/cookieCheck";
import Spinner from "../img/spinner.gif";
import "../App.css";

const Home = () => {
  // redux - loading
  const loading = useSelector((state) => state.user.loading);

  //redux - error
  const error = useSelector((state) => state.user.error);

  // use - dispatch
  const dispatch = useDispatch();

  // use - navigate
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(submitReset());
    dispatch(homeCheck(cookieFunction()));
    //you may have to redo this one
    if (
      error == "jwt expired" ||
      error == "Request failed with status code 500" ||
      error == "JWT expired or not present"
    ) {
      navigate("/signin");
      dispatch(submitReset());
    }
  }, [error]);

  return (
    <div>
      {loading === "loading" ? (
        <img src={Spinner} style={{ width: "100px" }} />
      ) : (
        "Home"
      )}
    </div>
  );
};

export default Home;
