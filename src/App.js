import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import { useState } from "react";
import Signup from "./components/Signup";
import Restaurants from "./components/Restaurants";
import Profile from "./components/Profile";
import Users from "./components/Users";

function App() {
  const [user, setUser] = useState("");
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
                <Link to="/restaurants">Restaurants</Link>
              </li>
              <li>
                <Link to="/users">Users</Link>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
            </ul>
          </nav>

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Routes>
            <Route path="/" element={<Home user={user} />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/restaurants"
              element={<Restaurants uuid={user.uuid} />}
            />
            <Route path="/users" element={<Users user={user} />} />
            <Route path="/profile" element={<Profile user={user} />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
