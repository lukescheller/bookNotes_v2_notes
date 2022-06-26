import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { profileCheck, deleteComment } from "../features/userSlice";
import { submitEntry, submitReset } from "../features/entrySlice";
import { editComment, editReset } from "../features/editSlice";
import cookieFunction from "../utilities/cookieCheck";
import Cookies from "universal-cookie";

import Spinner from "../img/spinner.gif";
import "../App.css";

const Profile = () => {
  // access_token - issue - when you delete the token from application it'll get hung up - solve that shit
  const cookies = new Cookies();
  const access_token = cookies.get("access_token");

  // redux - loading
  const loading = useSelector((state) => state.user.loading);

  // redux - userLoggedIn
  const userLoggedIn = useSelector((state) => state.user.data.userLoggedIn);

  // redux - error
  const error = useSelector((state) => state.user.error);

  // redux - your _id
  const your_id = useSelector((state) => state.user.data._id);

  // redux - your username
  const your_userName = useSelector((state) => state.user.data.username);

  // redux - your bio
  const your_bio = useSelector((state) => state.user.data.bio);

  // redux - your profile_img
  const your_profileImg = useSelector((state) => state.user.data.profile_img);

  // redux - your comments
  const your_comments = useSelector((state) => state.user.data.comments);

  // redux - submit error
  const submitError = useSelector((state) => state.entry.error);

  // redux - edit error
  const editError = useSelector((state) => state.edit.error);

  // redux - submit loading
  const submitLoading = useSelector((state) => state.entry.loading);

  // use - dispatch
  const dispatch = useDispatch();

  // use - navigate
  const navigate = useNavigate();

  // useState - entry book title
  const [entryBookTitle, setEntryBookTitle] = useState("");

  // useState - entry author
  const [entryAuthor, setEntryAuthor] = useState("");

  // useState - entry comment
  const [entryComment, setEntryComment] = useState("");

  // useState - entry page
  const [entryPage, setEntryPage] = useState("");

  // entry handler - book title
  const bookTitleHandler_entry = (e) => {
    setEntryBookTitle(e.target.value);
  };

  // entry handler - author
  const authorHandler_entry = (e) => {
    setEntryAuthor(e.target.value);
  };

  // entry handler - comment
  const commentHandler_entry = (e) => {
    setEntryComment(e.target.value);
  };

  // entry handler - page
  const pageHandler_entry = (e) => {
    setEntryPage(e.target.value);
  };

  // useState - edit book title
  const [editBookTitle, setEditBookTitle] = useState("");

  // useState - edit author
  const [editAuthor, setEditAuthor] = useState("");

  // useState - edit comment
  const [editCommentS, setEditCommentS] = useState("");

  // useState - edit page
  const [editPage, setEditPage] = useState("");

  //edit handler - book title
  const bookTitleHandler_edit = (e) => {
    setEditBookTitle(e.target.value);
  };

  //edit handler - author
  const authorHandler_edit = (e) => {
    setEditAuthor(e.target.value);
  };

  //edit handler - comment
  const commentHandler_edit = (e) => {
    setEditCommentS(e.target.value);
  };

  //edit handler - page
  const pageHandler_edit = (e) => {
    setEditPage(e.target.value);
  };

  useEffect(() => {
    dispatch(profileCheck(cookieFunction()));
    //you may have to redo this one
    if (
      submitError == "jwt expired" ||
      submitError == "Request failed with status code 500" ||
      submitError == "JWT expired or not present" ||
      error == "jwt expired" ||
      error == "Request failed with status code 500" ||
      error == "JWT expired or not present"
    ) {
      navigate("/signin");
    }
    //[error] - this is making it reload twice...
  }, [error, submitError, editError]);

  useEffect(() => {
    if (submitLoading === "loaded") {
      window.location.reload(false);
      dispatch(submitReset());
      dispatch(editReset());
    }
  }, [submitLoading]);

  // entry form submit
  const onSubmitEntry = (e) => {
    e.preventDefault();
    let entryObj = {};
    entryObj.book_title = entryBookTitle;
    entryObj.author = entryAuthor;
    entryObj.comment = entryComment;
    entryObj.page = entryPage;
    entryObj.id = your_id;
    if (access_token) {
      entryObj.cookie = true;
      entryObj.token = access_token;
    }
    if (!access_token) {
      entryObj.cookie = false;
      entryObj.token = "";
    }
    dispatch(submitEntry(entryObj));
  };

  return (
    <div id="mainContainer">
      {loading === "loading" ? (
        <img src={Spinner} style={{ width: "100px" }} />
      ) : (
        <div id="innerContainer">
          <div id="mainProfileDiv" className="p-3 mb-2 bg-light text-dark">
            <div id="mainProfileDivImg">
              <img src={`data:image/png;base64,${your_profileImg}`} />
            </div>
            <div
              id="mainProfileDivStats"
              className="p-3 mb-2 bg-light text-dark"
            >
              <h4
                style={{
                  borderBottom: "1px solid black",
                }}
              >
                Username
              </h4>
              <p>{your_userName}</p>
              <h4
                style={{
                  borderBottom: "1px solid black",
                }}
              >
                Bio
              </h4>
              <p>{your_bio}</p>
            </div>
          </div>
          {submitError === "" ? "" : <div id="submitError">{submitError}</div>}
          <div id="mainSubmitDiv" className="p-3 mb-2 bg-light text-dark">
            <div id="mainSubmitDivSubmit">
              <form onSubmit={onSubmitEntry}>
                <h4
                  style={{
                    borderBottom: "1px solid black",
                    textAlign: "left",
                  }}
                >
                  Entry
                </h4>
                <div className="input-group" style={{ marginBottom: "5px" }}>
                  <span
                    className="input-group-text"
                    id="inputGroup-sizing-default"
                  >
                    Book Title
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-default"
                    onChange={bookTitleHandler_entry}
                  />
                </div>
                <div className="input-group" style={{ marginBottom: "5px" }}>
                  <span
                    className="input-group-text"
                    id="inputGroup-sizing-default"
                  >
                    Author
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-default"
                    onChange={authorHandler_entry}
                  />
                </div>
                <div className="input-group" style={{ marginBottom: "5px" }}>
                  <span
                    className="input-group-text"
                    id="inputGroup-sizing-default"
                  >
                    Comment
                  </span>
                  <textarea
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    onChange={commentHandler_entry}
                  ></textarea>
                </div>
                <div className="input-group">
                  <span
                    className="input-group-text"
                    id="inputGroup-sizing-default"
                  >
                    Page
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-default"
                    onChange={pageHandler_entry}
                  />
                </div>
                {submitLoading === "loading" ? (
                  <img src={Spinner} style={{ width: "100px" }} />
                ) : (
                  <button
                    type="submit"
                    className="btn btn-success"
                    style={{ margin: "5px" }}
                  >
                    Submit
                  </button>
                )}
              </form>
            </div>
            <div id="mainSubmitDivEdit">
              <form>
                <h4
                  style={{
                    borderBottom: "1px solid black",
                    textAlign: "left",
                  }}
                >
                  Edit
                </h4>
                <div className="input-group" style={{ marginBottom: "5px" }}>
                  <span
                    className="input-group-text"
                    id="inputGroup-sizing-default"
                  >
                    Book Title
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-default"
                    onChange={bookTitleHandler_edit}
                  />
                </div>
                <div className="input-group" style={{ marginBottom: "5px" }}>
                  <span
                    className="input-group-text"
                    id="inputGroup-sizing-default"
                  >
                    Author
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-default"
                    onChange={authorHandler_edit}
                  />
                </div>
                <div className="input-group" style={{ marginBottom: "5px" }}>
                  <span
                    className="input-group-text"
                    id="inputGroup-sizing-default"
                  >
                    Comment
                  </span>
                  <textarea
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    onChange={commentHandler_edit}
                  ></textarea>
                </div>
                <div className="input-group">
                  <span
                    className="input-group-text"
                    id="inputGroup-sizing-default"
                  >
                    Page
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-default"
                    onChange={pageHandler_edit}
                  />
                </div>
              </form>
            </div>
          </div>
          {editError === "" ? "" : <div id="submitError">{editError}</div>}
          <div
            id="personalCommentsDiv"
            style={{ overflowY: "scroll", height: "300px" }}
          >
            {your_comments === undefined
              ? ""
              : your_comments.map((c) => {
                  return (
                    <div
                      style={{
                        margin: "5px",
                        borderRadius: "5px",
                      }}
                      className="p-3 mb-2 bg-light text-dark"
                    >
                      <h1>{c.book_title}</h1>
                      <p>Author: {c.author}</p>
                      <p>Comment: {c.comment}</p>
                      <p>Page: {c.page}</p>
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        Likes: {c.likes.length} Dislikes: {c.dislikes.length}
                      </div>
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <div>
                          <button
                            type="button"
                            className="btn btn-primary"
                            style={{ margin: "5px" }}
                            onClick={() => {
                              let commentObj = {};
                              if (access_token) {
                                commentObj.cookie = true;
                                commentObj.token = access_token;
                              }
                              if (!access_token) {
                                commentObj.cookie = false;
                                commentObj.token = "";
                              }
                              commentObj.book_title = editBookTitle;
                              commentObj.author = editAuthor;
                              commentObj.comment = editCommentS;
                              commentObj.page = editPage;
                              commentObj.commentId = c._id;
                              dispatch(editComment(commentObj));
                            }}
                          >
                            Edit
                          </button>
                        </div>
                        <div>
                          <button
                            type="button"
                            className="btn btn-danger"
                            style={{ margin: "5px" }}
                            onClick={() => {
                              let obj = {};
                              if (access_token) {
                                obj.cookie = true;
                                obj.token = access_token;
                              }
                              if (!access_token) {
                                obj.cookie = false;
                                obj.token = "";
                              }
                              obj.commentId = c._id;
                              dispatch(deleteComment(obj));
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
