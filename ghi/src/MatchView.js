import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PeerButton from "./PeerButton";
import useToken from "./useToken";

const MatchView = () => {
  const [matches, setMatches] = useState();
  const [userData, setUserData] = useState("");
  const [userTags, setUserTags] = useState([]);
  const [tagToSearch, setTagToSearch] = useState("");
  const { token } = useToken();
  let carouselCounter = 0;

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

    getUserData();
  }, []);

  useEffect(() => {
    async function getUserTags() {
      let url = `${process.env.REACT_APP_API_HOST}/api/tags/${userData["username"]}`;
      let response = await fetch(url, {
        credentials: "include",
      });
      let data = await response.json();

      if (response.ok) {
        setUserTags(data.tags);
      } else {
        console.log("Error! Tags not found.");
      }
    }

    getUserTags();
  }, [userData]);

  async function handleSubmit(event) {
    event.preventDefault();
    let url = `${process.env.REACT_APP_API_HOST}/api/matches/${tagToSearch}`;
    let response = await fetch(url, {
      credentials: "include",
    });
    let data = await response.json();

    if (response.ok) {
      setMatches(data);
    } else {
      console.log("Error!!! Matches not found.");
    }
  }

  function handleTagToSearchChange(event) {
    const value = event.target.value;
    setTagToSearch(value);
  }

  return (
    <div>
      <div className="content-container rounded-edges bg-text mb-3">
        {!token && (
          <h3 className="text-center">
            Please login to use this functionality.
          </h3>
        )}
        {token && (
          <div>
            <h3 className="card-header text-center">Matching</h3>
            <div className="d-flex justify-content-center">
              <form
                onSubmit={handleSubmit}
                id="match-tag"
                style={{ width: "750px" }}
              >
                <div className="card-body"> Your current tags are:</div>
                <div className="d-flex mb-3">
                  <select
                    onChange={handleTagToSearchChange}
                    value={tagToSearch}
                    required
                    name="tag_to_search"
                    id="tag_to_search"
                    className="form-select"
                  >
                    <option value="">Choose a tag</option>
                    {userTags.map((tag) => {
                      let matchTag = Object.entries(tag);
                      return (
                        <option
                          key={matchTag[0][0] + matchTag[0][1]}
                          value={matchTag[0][1]}
                        >
                          {matchTag[0][1]}
                        </option>
                      );
                    })}
                  </select>
                  <button className="btn btn-primary">Search</button>
                </div>
              </form>
            </div>
            {matches !== undefined ? (
              <div>
                <div
                  id="carouselExampleControls"
                  className="carousel carousel-dark slide"
                  data-bs-ride="false"
                  data-bs-interval="false"
                >
                  <div className="carousel-inner">
                    <div>
                      {matches.matches
                        .filter((match) => match.username !== userData.username)
                        .map((match) => {
                          carouselCounter += 1;
                          return (
                            <div
                              className={`carousel-item ${
                                carouselCounter === 1 ? "active" : ""
                              }`}
                              key={`${match.id} + ${match.username}`}
                            >
                              <div className="content-container rounded-edges bg-text col-lg-4 d-block mx-auto">
                                <div className="d-flex justify-content-between">
                                  <h4>
                                    <Link to={`${match.profile_link}`}>
                                      {match.username}
                                    </Link>
                                  </h4>
                                  <img
                                    src={`${match.profile_image}`}
                                    alt="user avatar"
                                    className="circle"
                                    style={{ width: "40px", height: "40px" }}
                                  ></img>
                                </div>
                                <div className="card-body">
                                  <h6>Gender:</h6>
                                  <span>{match.gender}</span>
                                  <h6>Pronouns:</h6>
                                  <span>{match.pronouns}</span>
                                  <h6>About Me:</h6>
                                  <div
                                    style={{
                                      height: "150px",
                                      overflow: "scroll",
                                    }}
                                  >
                                    <span>{match.about_me}</span>
                                  </div>
                                  <h6>Tags:</h6>
                                  <div className="mb-3">
                                    {match.tags.map((tag) => {
                                      return (
                                        <span
                                          className="id-tag"
                                          key={`${tag} + 1`}
                                        >
                                          {" "}
                                          {tag}{" "}
                                        </span>
                                      );
                                    })}
                                  </div>
                                </div>
                                <div className="d-flex justify-content-center mb-3">
                                  <PeerButton
                                    senderId={userData.id}
                                    recipientId={match.id}
                                    senderName={userData.username}
                                    recipientName={match.username}
                                  />
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                  <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExampleControls"
                    data-bs-slide="prev"
                  >
                    <span
                      className="carousel-control-prev-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExampleControls"
                    data-bs-slide="next"
                  >
                    <span
                      className="carousel-control-next-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Next</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="content-container rounded-edges col-lg-4 d-block mx-auto bg-text">
                <h5>Select a tag to start matching!</h5>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchView;
