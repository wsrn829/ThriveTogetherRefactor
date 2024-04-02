import React, { useState } from "react";
import useAuthActions from "./AuthContext";

function PeerButton(props) {
  const [addSuccess, setAddSuccess] = useState(false);
  const { token } = useAuthActions();

  async function handleAddPeer(event) {
    event.preventDefault();
    const data = {
      sender: props.senderId,
      recipient: props.recipientId,
      status: "pending",
      has_messaged: false,
      sender_name: props.senderName,
      recipient_name: props.recipientName,
    };
    const peerUrl = `${process.env.REACT_APP_API_HOST}/api/requests/create`;
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    };
    const response = await fetch(peerUrl, fetchConfig);
    if (response.ok) {
      setAddSuccess(true);
    }
  }

  return (
    <div>
      {addSuccess ? (
        <div className="btn btn-primary">Success!</div>
      ) : (
        <button className="btn btn-primary" onClick={handleAddPeer}>
          Add Peer
        </button>
      )}
    </div>
  );
}

export default PeerButton;
