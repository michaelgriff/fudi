import React from "react";
import {
  NavbarContainer,
  Logo,
  LogoContainer,
  Option,
  StyledLink,
} from "../styles/NavbarElements";
import {
  BrowserRouter as Router,
  Link,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Restaurants from "../pages/Restaurants";
import Profile from "../pages/Profile";
import Users from "../pages/Users";

const Navbar = ({ user, setUser }) => {
  return (
    <Router>
      <div>
        {user ? (
          <NavbarContainer>
            <LogoContainer>
              <Logo src={require("../images/fudi-logo.png")} />
            </LogoContainer>
            <Option>
              <StyledLink to="/home">Home</StyledLink>
            </Option>
            <Option>
              <StyledLink to="/restaurants">Restaurants</StyledLink>
            </Option>
            <Option>
              <StyledLink to="/users">Users</StyledLink>
            </Option>
            <Option>
              <StyledLink
                to={"/profile" + `/${user.username}`}
                state={{ user }}
              >
                Profile
              </StyledLink>
            </Option>
          </NavbarContainer>
        ) : null}
        {/* A <Switch> looks through its children <Route>s and
      renders the first one that matches the current URL. */}
        <Routes>
          <Route
            path="/"
            element={
              user ? (
                <Navigate replace to="/home" />
              ) : (
                <Navigate replace to="/login" />
              )
            }
          />
          <Route path="/home" element={<Home user={user} />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/restaurants"
            element={<Restaurants uuid={user.uuid} />}
          />
          <Route path="/users" element={<Users user={user} />} />
          <Route path="/profile/:id" element={<Profile user={user} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default Navbar;
