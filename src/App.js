import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/login";
import Album from "./components/album";
import Todo from "./components/todo";
import Post from "./components/post";
import Navbar from "./components/navbar";

import "./App.css";

function App() {
  const [user, setUser] = useState({ id: 0 });

  const handleLogin = (user) => {
    setUser(user);
    console.log("App : handleLogin() : login success : ", user.id, user.name);
  };

  return (
    <div className="App">
      <Router>
        <Navbar user={user} />
        <Route exact path="/" component={(props) => <Album {...props} user={user} />} />
        <Route path="/album" component={(props) => <Album {...props} user={user} />} />
        <Route path="/login" component={(props) => <Login {...props} login={handleLogin} user={user} />} />
        <Route path="/todo" component={(props) => <Todo {...props} user={user} />} />
        <Route path="/post" component={(props) => <Post {...props} user={user} />} />
      </Router>
    </div>
  );
}

export default App;
