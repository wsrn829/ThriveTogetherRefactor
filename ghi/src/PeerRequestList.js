import { useEffect, useState } from "react";

const PeerRequestList = () => {
  const [peerRequests, setPeerRequests] = useState([]);
  const [loginAccount, setLoginAccount] = useState(null);

  useEffect(() => {
    async function fetchAccountData() {
      const response = await fetch(`${process.env.REACT_APP_API_HOST}/token`, {
        credentials: "include",
      });
      const data = await response.json();
      if (response.ok) {
        setLoginAccount(data.account);
      }
    }

    fetchAccountData();
  }, []);

  useEffect(() => {
    async function fetchPeerRequests() {
      if (!loginAccount) {
        return;
      }
      const response = await fetch(
        `${process.env.REACT_APP_API_HOST}/api/requests/${loginAccount.id}`,
        {
          credentials: "include",
        }
      );
      if (response.ok) {
        const data = await response.json();
        setPeerRequests(data.peer_requests);
      }
    }

    fetchPeerRequests();
  }, [loginAccount]);

  const handleAction = async (peerRequest, action) => {
    const locationUrl = `${process.env.REACT_APP_API_HOST}/api/requests/update/${peerRequest.recipient}/${peerRequest.sender}/${action}`;
    const fetchConfig = {
      method: "put",
      body: JSON.stringify(),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    };

    const response = await fetch(locationUrl, fetchConfig);
    if (response.ok) {
      if (action === "Reject") {
        window.location.reload();
      } else if (action === "Approve") {
        const approveUrl = `${process.env.REACT_APP_API_HOST}/api/peer_requests`;
        const approve_data = {
          user_id: peerRequest.recipient,
          peer_id: peerRequest.sender,
          peer_name: peerRequest.sender_name,
          profile_link: "",
          tags_id: 1,
          profile_image: "",
          status: 0,
        };
        const approveConfig = {
          method: "POST",
          body: JSON.stringify(approve_data),
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        };
        const responseApprove = await fetch(approveUrl, approveConfig);
        if (responseApprove.ok) {
          const approveUrl = `${process.env.REACT_APP_API_HOST}/api/peer_requests`;
          const approve_data2 = {
            user_id: peerRequest.sender,
            peer_id: peerRequest.recipient,
            peer_name: loginAccount.name,
            profile_link: "",
            tags_id: 1,
            profile_image: "",
            status: 0,
          };
          const approveConfig2 = {
            method: "POST",
            body: JSON.stringify(approve_data2),
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          };
          const responseApprove2 = await fetch(approveUrl, approveConfig2);
          if (responseApprove2.ok) {
            window.location.reload();
          }
        }
      }
    }
  };

  return (
    <div className="container content-container rounded-edges">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Sender</th>
            <th>Has Messaged</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Array.from(peerRequests).map((peerRequest) => {
            return (
              <tr key={peerRequest.sender_name + peerRequest.recipient}>
                <td>{peerRequest.sender_name}</td>
                <td>{peerRequest.has_messaged ? "Yes" : "No"}</td>
                <td>{peerRequest.status}</td>
                <td>
                  <div
                    style={{
                      display: peerRequest.status === "pending" ? "" : "none",
                    }}
                  >
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => handleAction(peerRequest, "Approve")}
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => handleAction(peerRequest, "Reject")}
                    >
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PeerRequestList;
