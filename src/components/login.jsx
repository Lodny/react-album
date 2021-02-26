import React, { useState, useEffect } from "react";

const Login = ({ history, login, user }) => {
  const [inputId, setInputId] = useState("");
  const [users, setUsers] = useState(null);

  useEffect(() => {
    console.log("Login : useEffect()");

    fetch(`https://jsonplaceholder.typicode.com/users`)
      .then((response) => response.json())
      .then((json) => {
        setUsers(json);
        // console.log(json);
      });
  }, []);

  if (user.id > 0) {
    history.push("/");
    return "";
  }

  let alertMsg = "";
  if (user.id === -1) {
    alertMsg = (
      <div className="alert alert-danger" role="alert">
        해당 아이디는 존재 하지 않습니다.
      </div>
    );
  }

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("onSubmit() : inputId : ", inputId);

    if (!users) return;
    // console.log(users);

    const user = users.find((user) => user.id === +inputId);

    if (!user) {
      login({ id: -1 }); // 없는 ID
      return;
    }

    console.log(user);
    login(user);

    history.push("/");
  };

  return (
    <div className="text-center offset-sm-4 col-sm-4">
      <main className="form-signin">
        <form>
          <img className="mb-4 mt-5" src="./bootstrap-logo.svg" alt="" width="72" height="57"></img>
          <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
          {alertMsg}
          <input
            type="username"
            className="form-control mb-2"
            placeholder="input user ID"
            required
            autoFocus
            onChange={(e) => setInputId(e.target.value)}
            value={inputId}
          ></input>
          <button className="w-100 btn btn-lg btn-primary" type="submit" onClick={onSubmit}>
            Sign in
          </button>
          <p className="mt-5 mb-3 text-muted">&copy; 2017–2021</p>
        </form>
      </main>
    </div>
  );
};

export default Login;
