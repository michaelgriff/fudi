import "./App.css";

import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import HashLoader from "react-spinners/HashLoader";
import { LoadingContainer } from "./styles/LoadingElements";

function App() {
  const userString = localStorage.getItem("user");
  const [user, setUser] = useState(userString ? JSON.parse(userString) : "");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <div className="App">
      {loading ? (
        <LoadingContainer>
          <HashLoader size={75} color={"#fff"} loading={loading} />
        </LoadingContainer>
      ) : null}
      <Navbar user={user} setUser={setUser} setLoading={setLoading} />
    </div>
  );
}

export default App;
