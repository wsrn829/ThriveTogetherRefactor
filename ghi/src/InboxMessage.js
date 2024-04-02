import React, {useEffect, useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { setRecipient } from './recipientActions';


function InboxMessage(props){
    const [message, setMessage] = useState("");
    const [userData, setUserData] = useState("");
    const [updatedConversation, setUpdatedConversation] = useState([]);
    const [peers, setPeers] = useState([]);
    const [peer, setPeer] = useState("")

     const handlePeerChange = (event) => {
        const value = event.target.value;
        setPeer(value);
    }

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


    const getPeers = useCallback(async () => {
        const user_id = userData["id"];
        const url = `${process.env.REACT_APP_API_HOST}/api/peers/${user_id}`;
        const response = await fetch(url, {
          credentials: "include",
        });
        if (response.ok) {
            const data = await response.json();
            setPeers(data);
        }
    }, [userData]);

    const handleNewMessage = (event) => {
        const value = event.target.value;
        setMessage(value);
    }

    useEffect(() => {
        if (userData.id) {
            getPeers();
        }
    }, [userData.id, getPeers]);

    const handleSetRecipient = (peer) => {
      props.setRecipient({recipient: peer});
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};

        data.content = message;
        data.sender = userData.id;
        data.recipient = peer;
        handleSetRecipient(peer);

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
                <div className="form-floating mb-3">
                    <select onChange={handlePeerChange} value={peer.peer_id} required name="peer" id="peer" className="form-select">
                                <option value="">Choose a Peer</option>
                                {peers.map(peer => {
                                    return (
                                        <option key={peer.peer_id} value={peer.peer_id}>{peer.peer_name}</option>
                                    );
                                })}
                    </select>
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

InboxMessage.defaultProps = {
  recipient: { recipient: 'defaultValue' },
};

const mapStateToProps = (state) => ({
  recipient: state.recipient,
});

export default connect(mapStateToProps, { setRecipient })(InboxMessage);
