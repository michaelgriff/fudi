import "./App.css";

import { useState, useEffect } from "react";

import Navbar from "./components/Navbar";

function App() {
  const userString = localStorage.getItem("user");
  const [user, setUser] = useState(userString ? JSON.parse(userString) : "");

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <div className="App">
      <Navbar user={user} setUser={setUser} />
    </div>
  );
}

export default App;
