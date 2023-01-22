import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import { useState } from "react";
import Signup from "./components/Signup";
import Restaurants from "./components/Restaurants";

function App() {
  const [uuid, setUuid] = useState("");
  return (
    <div className="App">
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/users">Users</Link>
              </li>
              <li>
                <Link to="/restaurants">Restaurants</Link>
              </li>
            </ul>
          </nav>

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Routes>
            <Route path="/" element={<Home name={uuid} />} />
            <Route path="/login" element={<Login setUuid={setUuid} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/restaurants" element={<Restaurants uuid={uuid} />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
