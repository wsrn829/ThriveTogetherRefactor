import React, { useEffect, useState, useCallback } from "react";
import useAuthActions from "./AuthContext";
import { useParams } from "react-router-dom";

const EditTags = () => {
  const [userData, setUserData] = useState("");
  const [allTags, setAllTags] = useState([]);
  const [userTags, setUserTags] = useState([]);
  const [addableTags, setAddableTags] = useState([]);
  const [tagToAdd, setTagToAdd] = useState("");
  const { token } = useAuthActions();
  const { id } = useParams();

  const getAddableTags = useCallback(() => {
    let difference = allTags;
    userTags.forEach((tag) => {
      for (let i = 0; i < difference.length; i++) {
        if (
          Object.keys(tag).toString() === Object.keys(difference[i]).toString()
        ) {
          difference.splice(i, 1);
        }
      }
    });
    setAddableTags(difference);
  }, [userTags, allTags]);

  const getUserTags = useCallback(async () => {
    let url = `${process.env.REACT_APP_API_HOST}/api/tags/${id}`;
    let response = await fetch(url, {
      credentials: "include",
    });
    let data = await response.json();

    if (response.ok) {
      setUserTags(data.tags);
    } else {
      console.log("Error! Tags not found.");
    }
  }, [userData]);

  useEffect(() => {
    async function getUserData() {
      let url = `${process.env.REACT_APP_API_HOST}/token`;
      let response = await fetch(url, {
        credentials: "include",
      });
      let data = await response.json();

      if (response.ok) {
        setUserData(data.account);
      } else {
        console.log("User data could not be fetched");
      }
    }

    async function getAllTags() {
      let url = `${process.env.REACT_APP_API_HOST}/api/tags`;
      let response = await fetch(url);
      let data = await response.json();

      if (response.ok) {
        setAllTags(data.tags);
      } else {
        console.log("Tags could not be fetched.");
      }
    }

    getUserData();
    getAllTags();
  }, []);

  useEffect(() => {
    getUserTags();
  }, [userData, getUserTags]);

  useEffect(() => {
    getAddableTags();
  }, [userTags, getAddableTags]);

  async function deleteTag(event) {
    event.preventDefault();
    const url = `${process.env.REACT_APP_API_HOST}/api/tags/${event.target.value}`;
    const fetchConfig = {
      method: "delete",
      credentials: "include",
    };

    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      getUserTags();
      getAddableTags();
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const url = `${process.env.REACT_APP_API_HOST}/api/tags/${tagToAdd}`;
    const fetchConfig = {
      method: "post",
      credentials: "include",
    };

    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      getUserTags();
      getAddableTags();
    }
  }

  function handleTagChange(event) {
    const value = event.target.value;
    setTagToAdd(value);
  }

  return (
    <div>
      <div className="content-container rounded-edges bg-text mb-3">
        <h3>Current User Tags:</h3>
        <div className="d-flex mb-3">
          {userTags.map((tag) => {
            let currentTag = Object.entries(tag);
            return (
              <div key={currentTag[0]}>
                <span className="id-tag">
                  {currentTag[0][1]}
                  <button
                    type="button"
                    className="btn-close"
                    onClick={deleteTag}
                    aria-label="delete"
                    value={currentTag[0][0]}
                  ></button>
                </span>
              </div>
            );
          })}
        </div>
        <h3>Add a Tag:</h3>
        <form onSubmit={handleSubmit} id="add-tag">
          <div className="d-flex mb-3">
            <select
              onChange={handleTagChange}
              value={tagToAdd}
              required
              name="tag_to_add"
              id="tag_to_add"
              className="form-select"
            >
              <option value="">Choose a Tag</option>
              {addableTags.map((tag) => {
                let currentTag = Object.entries(tag);
                return (
                  <option
                    key={currentTag[0][0] + currentTag[0][1]}
                    value={currentTag[0][0]}
                  >
                    {currentTag[0][1]}
                  </option>
                );
              })}
            </select>
            <button className="btn btn-primary">Add</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTags;
