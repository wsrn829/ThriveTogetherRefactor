import React, {useEffect, useState, useCallback } from 'react';
import { connect } from 'react-redux';

function InboxForm(props) {
    const [message, setMessage] = useState("");
    const [userData, setUserData] = useState("");
    const [updatedConversation, setUpdatedConversation] = useState([]);
    const { recipient } = props;

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
                console.log("Your data could not be fetched");
            }
        }
        getUserData();
    }, []);

    const fetchInitialConversation = useCallback( async () => {
        try {

            const messagesUrl = `${process.env.REACT_APP_API_HOST}/api/messages/${userData["id"]}/message/${recipient.recipient}`; // Assuming 2 is the recipient ID
            const fetchConfig = {
            credentials: 'include',
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
            };

            const response = await fetch(messagesUrl, fetchConfig);
            const data = await response.json();

            if (response.ok) {
                if (data.length > 10) {
                    const truncData = data.slice(0,10);
                    setUpdatedConversation(truncData);

                } else {
                    setUpdatedConversation(data);
                }

            } else {
            console.log("Could not retrieve initial conversation.");
            }
        } catch (error) {
            console.error('Error fetching initial conversation data:', error);
        }
    }, [userData, recipient.recipient])


    useEffect(() => {
        if (userData.id) {
            fetchInitialConversation();
        }


    }, [userData.id, recipient, fetchInitialConversation]);

    const handleNewMessage = (event) => {
        const value = event.target.value;
        setMessage(value);
    }




    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};

        data.content = message;
        data.sender = userData.id;
        data.recipient = props.recipient.recipient;
        const createMessageUrl = `${process.env.REACT_APP_API_HOST}/api/messages/create`;
        const fetchConfig = {
            credentials: "include",
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        try {
            const response = await fetch(createMessageUrl, fetchConfig);
            // let info = await response.json();

            if (response.ok) {
                const messagesUrl = `${process.env.REACT_APP_API_HOST}/api/messages/${data.sender}/message/${data.recipient}`;
                const fetchConfig2 = {
                    credentials: "include",
                    method: "get",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
                const response2 = await fetch(messagesUrl, fetchConfig2);
                let info2 = await response2.json();

                if (response2.ok) {
                    if (info2.length > 10) {
                        const truncData = info2.slice(0,10);
                        setUpdatedConversation(truncData);
                    } else {
                        setUpdatedConversation(info2);
                    }
                } else {
                    console.log("Could not retrieve updated conversation.");
                }
                setMessage("");
            } else {
            console.log("could not create message");
        }
    } catch (error) {
        console.error("Error handling the form submission:", error);
    }
    };



return (
    <div className="my-5 container">
      <div className="row">
        <div className="col">
          <div className="card shadow mb-4">
            <div className="card-body">
              <h1 className="card-title">Conversation</h1>
              {Array.isArray(updatedConversation) && updatedConversation.length > 0 ? (
                updatedConversation.slice().reverse().map((message) => (
                  <div key={message.id} className="mb-3">
                    {message.sender === props.recipient.recipient ? (
                      <strong>{ message.username }</strong>
                    ) : (
                      <strong>Me</strong>
                    )}: {message.content}
                  </div>
                ))
              ) : (
                <div>Loading...</div> // You can also render an empty state here
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="card shadow">
            <div className="card-body">
              <h1 className="card-title">Inbox</h1>
              <form onSubmit={handleSubmit} id="create-model-form">
                <div className="form-floating mb-3">
                  <input onChange={handleNewMessage} required placeholder="NewMessage" type="text" id="new_message" name="new_message" value={message} className="form-control" />
                  <label htmlFor="new_message">Message</label>
                </div>
                <button className="btn btn-lg btn-primary">Send</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}

const mapStateToProps = (state) => ({
  recipient: state.recipient,
});

export default connect(mapStateToProps)(InboxForm);
