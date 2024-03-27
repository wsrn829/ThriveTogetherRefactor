import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAuthActions from "./AuthContext";

const AccountInfo = () => {
  const [userId, setUserId] = useState("");
  const [accountInfo, setAccountInfo] = useState("");
  const { fetchWithToken } = useAuthActions();

  const getAccountInfo = async () => {
    try {
      let url = `${process.env.REACT_APP_API_HOST}/api/accounts/${userId}`;
      let [data, responseOk] = await fetchWithToken(url, "GET");

      if (responseOk) {
        setAccountInfo(data);
      } else {
        console.log("Account info could not be found");
      }
    } catch (error) {
      console.error("Error fetching account info:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      getAccountInfo();
    }
  }, [userId, fetchWithToken]);

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
            <Link to={`/update`}>
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
