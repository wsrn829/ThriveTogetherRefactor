import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { setRecipient } from "./recipientActions";

function InboxCards(props) {
  const [messagesData, setMessagesData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [userDataLoaded, setUserDataLoaded] = useState(false);

  useEffect(() => {
    async function getUserData() {
      let url = `${process.env.REACT_APP_API_HOST}/token`;
      let response = await fetch(url, {
        credentials: "include",
      });
      let data = await response.json();

      if (response.ok) {
        setUserData(data.account);
        setUserDataLoaded(true);
      } else {
        console.log("Your data could not be fetched");
      }
    }

    getUserData();
  }, [userDataLoaded]);

  useEffect(() => {
    async function getMessagesData() {
      if (!userDataLoaded || !userData) {
        return;
      } else {
        let url = `${process.env.REACT_APP_API_HOST}/api/messages/${userData["id"]}`;
        let response = await fetch(url, {
          credentials: "include",
        });
        let data = await response.json();
        if (response.ok) {
          setMessagesData(data);
        } else {
          console.log("could not return user messages");
        }
      }
    }

    getMessagesData();
  }, [userData, userDataLoaded]);

  const handleSetRecipient = (userId) => {
    props.setRecipient({ recipient: userId });
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-start">
        <div className="col-lg-6">
          {messagesData.map((conversation) => (
            <div key={conversation[0].id} className="card mb-4">
              <div className="card-body">
                <div className="d-flex align-items-center mb-2">
                  <div
                    className="rounded-circle overflow-hidden me-2"
                    style={{ width: "40px", height: "40px" }}
                  >
                    <img
                      src={conversation[0].profile_image}
                      alt="Profile"
                      className="img-fluid"
                    />
                  </div>
                  <strong>{conversation[0].username}</strong>
                </div>
                <div className="d-flex justify-content-center mt-2">
                  <p>{conversation[0].content}</p>
                </div>
                <small className="text-muted">
                  {new Date(conversation[0].date).toLocaleString("en-US", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </small>
              </div>
              <div className="d-flex justify-content-left mt-2">
                <button
                  className="btn btn-sm btn-primary mb-2"
                  onClick={() => handleSetRecipient(conversation[0].user_id)}
                >
                  Message
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  recipient: state.recipient,
});

export default connect(mapStateToProps, { setRecipient })(InboxCards);
