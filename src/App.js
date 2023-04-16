import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import "./App.css";

import AuthService from "./services/auth.service";

import { Dropdown, DropdownButton } from "react-bootstrap";
import EventBus from "./common/EventBus";
import CreateFeedback from "./components/CreateFeedback";
import Home from "./components/Home";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Register from "./components/Register";
import EditFeedback from "./pages/EditFeedback.page";
import SearchUser from "./pages/SearchUser.page";
import ViewCompletedFeedback from "./pages/ViewCompletedFeedback.page";
import ViewDirectReportess from "./pages/ViewDirectReportess.page";
import ViewOpenFeedback from "./pages/ViewOpenFeedback.page";

const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes("ROLE_MANAGER"));
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setShowModeratorBoard(false);
    setCurrentUser(undefined);
  };

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-success">
        <Link to={"/"} className="navbar-brand">
          Performance Management App!
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Home
            </Link>
          </li>

          {showModeratorBoard && (
            <DropdownButton id="dropdown-basic-button" variant="success" title="Manager's Space">
              <Dropdown.Item href="/viewDirectReportees">View 360&#xb0; Feedback</Dropdown.Item>
            </DropdownButton>
          )}

          {currentUser && (
            <DropdownButton id="dropdown-basic-button" variant="success" title="User's Space">
              <Dropdown.Item href="/searchUser">Request 360&#xb0; Feedback</Dropdown.Item>
              <Dropdown.Item href="/viewRequestedFeedback">Provide Feedback</Dropdown.Item>
            </DropdownButton>
          )}
        </div>

        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/searchUser" element={<SearchUser />} />
          <Route path="/createFeedback" element={<CreateFeedback />} />
          <Route path="/viewDirectReportees" element={<ViewDirectReportess />} />
          <Route path="/viewCompletedFeedback" element={<ViewCompletedFeedback />} />
          <Route path="/viewRequestedFeedback" element={<ViewOpenFeedback />} />
          <Route path="/providefeedback" element={<EditFeedback />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
