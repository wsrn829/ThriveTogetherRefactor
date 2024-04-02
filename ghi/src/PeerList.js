import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPeers } from "./peersActions";

function PeerList() {
  const dispatch = useDispatch();
  const { peers, status, error } = useSelector((state) => state.peers);
  // const [peer, setPeer] = useState([]);
  // const [peerData, setPeerData] = useState("");
  // const [peerDataLoaded, setPeerDataLoaded] = useState(false);

  useEffect(() => {
    dispatch(fetchPeers());
  }, [dispatch]);

  if (status === "loading") {
    return <div>Loading...</div>;
  } else if (status === "failed") {
    return <div>Error: {error}</div>;
  }
  // useEffect(() => {
  //   async function getPeerData() {
  //     const url = `${process.env.REACT_APP_API_HOST}/token`;
  //     const response = await fetch(url, {
  //       credentials: "include",
  //     });
  //     const data = await response.json();

  //     if (response.ok) {
  //       setPeerData(data.account);
  //       setPeerDataLoaded(true);
  //     } else {
  //       console.log("Peer data could not be fetched");
  //     }
  //   }

  //   getPeerData();
  // }, [peerDataLoaded]);

  // const LoadPeers = useCallback(async () => {
  //   if (!peerDataLoaded || !peerData) {
  //     return;
  //   } else {
  //     const response = await fetch(
  //       `${process.env.REACT_APP_API_HOST}/api/peers/${peerData["id"]}`,
  //       {
  //         credentials: "include",
  //       }
  //     );

  //     if (response.ok) {
  //       const data = await response.json();
  //       setPeer(data);
  //     } else {
  //       console.log("Error! Peer not found.");
  //     }
  //   }
  // }, [peerData, peerDataLoaded]);

  // useEffect(() => {
  //   LoadPeers();
  // }, [peerData, LoadPeers]);

  return (
    <div className="content-container rounded-edges">
      <h1>Peers</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Username</th>
            <th>Profile Link</th>
            <th>Profile Image</th>
          </tr>
        </thead>
        <tbody>
          {peers.map((peerData) => {
            return (
              <tr key={peerData.id + peerData.peer_name}>
                <td>{peerData.peer_name}</td>
                <td>{peerData.profile_link}</td>
                <td>{peerData.profile_image}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default PeerList;
