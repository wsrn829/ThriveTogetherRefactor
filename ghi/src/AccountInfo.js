import React, { useState } from "react";
import { Link } from "react-router-dom";
import useAuthActions from "./AuthContext";

const AccountInfo = () => {
  const [userId, setUserId] = useState("");
  const [accountInfo, setAccountInfo] = useState("");
  const { token } = useAuthActions();

  async function getAccountInfo() {
    console.log(token);

    try {
      let url = `${process.env.REACT_APP_API_HOST}/api/accounts/${userId}`;
      let response = await fetch(url, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      let data = await response.json();

      if (response.ok) {
        setAccountInfo(data);
      } else {
        console.log("Account info could not be found");
      }
    } catch (error) {
      console.error("Error fetching account info:", error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await getAccountInfo();
  };

  return (
    <div className="content-container bg-text rounded-edges d-flex justify-content-center">
      <h5 className="card-header">Get Account Information</h5>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <br></br>
          <label>
            User ID:
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </label>
          <div>
            <br></br>
          </div>
          <div>
            <input className="btn btn-primary" type="submit" value="Submit" />
          </div>
        </form>
        <br></br>
        {accountInfo && (
          <div>
            <h5>Account Information: {userId}</h5>
            <pre>{JSON.stringify(accountInfo, null, 2)}</pre>
            <br></br>
            <Link to={`/update/${userId}`}>
              <div>
                <input
                  className="btn btn-primary"
                  type="submit"
                  value="Update"
                />
              </div>
            </Link>
            <br></br>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountInfo;
