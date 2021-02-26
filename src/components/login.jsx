import React, { useState } from "react";

const Login = ({ login, id }) => {
  const [userid, setUserid] = useState("");

  if (id > 0) return "";

  let alertMsg = "";
  if (id === -1) {
    alertMsg = (
      <div className="alert alert-danger" role="alert">
        해당 아이디는 존재 하지 않습니다.
      </div>
    );
  }

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
    login(userid);
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
            id="inputUsername"
            className="form-control mb-2"
            placeholder="input user ID"
            required
            autoFocus
            onChange={(e) => setUserid(e.target.value)}
            value={userid}
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
