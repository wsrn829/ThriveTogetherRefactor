import { useEffect } from "react";
import LoginForm from "./LoginForm.js";
import AccountForm from "./AccountForm.js";
import PeerList from "./PeerList.js";
import PeerButton from "./PeerButton.js";
import AccountInfo from "./AccountInfo.js";
import EditTags from "./EditTags.js";
import Nav from "./Nav.js";
import { useLocation, BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import AccountUpdate from "./AccountUpdate.js";
import MatchView from "./MatchView.js";
import InboxPage from "./Messages/InboxPage.js";
import "./Messages/styles.css";
import PeerRequestList from "./PeerRequestList.js";
import LandingPage from "./LandingPage.js";

function App() {
  const domain = /https:\/\/[^/]+/;
  const basename = process.env.PUBLIC_URL.replace(domain, "");

  useEffect(() => {
    async function getData() {
      let url = `${process.env.REACT_APP_API_HOST}/api/launch-details`;
      console.log("fastapi url: ", url);
      let response = await fetch(url);
      console.log("------- hello? -------");

      if (response.ok) {
        console.log("got launch data!");
      } else {
        console.log("drat! something happened");
      }
    }
    getData();
  }, []);

  return (
    <BrowserRouter basename={basename}>
      <AuthProvider baseUrl={process.env.REACT_APP_API_HOST}>
        <MainApp />
      </AuthProvider>
    </BrowserRouter>
  );
}

function MainApp() {
  const location = useLocation();

  return (
    <div>
      <div className="grid">
        <Routes>
          <Route exact path="/" element={<LandingPage />}></Route>
        </Routes>
        {location.pathname !== "/" && <Nav />}
        <main className="main-content">
          <Routes>
            <Route exact path="/login" element={<LoginForm />}></Route>
            <Route exact path="/register" element={<AccountForm />}></Route>
            <Route exact path="/inbox" element={<InboxPage />}></Route>
            <Route exact path="/peers" element={<PeerList />}></Route>
            <Route exact path="/peer" element={<PeerButton />}></Route>
            <Route exact path="/matches" element={<MatchView />}></Route>
            <Route exact path="/info" element={<AccountInfo />}></Route>
            <Route exact path="/update" element={<AccountUpdate />}></Route>
            <Route exact path="/edit_tags" element={<EditTags />}></Route>
            <Route
              exact
              path="/peer_requests"
              element={<PeerRequestList />}
            ></Route>
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
