import React, { useState, useEffect } from "react";
import Login from "./components/login";

import "./App.css";

function App() {
  const [userid, setUserid] = useState(0);
  const [users, setUsers] = useState(null);

  useEffect(() => {
    console.log("App() : useEffect()");

    fetch(`https://jsonplaceholder.typicode.com/users`)
      .then((response) => response.json())
      .then((json) => {
        setUsers(json);
        // console.log(json);
      });
  }, []);

  const handleLogin = (id) => {
    console.log("App() : handleLogin() : ", id);

    if (!users) return;
    // console.log(users);

    const user = users.find((user) => user.id === +id);

    if (!user) {
      setUserid(-1); // 없는 ID
      return;
    }

    console.log(user);

    setUserid(id);
    console.log("App() : handleLogin() : login success : ", user.name);
  };

  return (
    <div className="App">
      <Login login={handleLogin} id={userid} />
    </div>
  );
}

export default App;
