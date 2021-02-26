import React from "react";

const home = ({ history, location, match, user }) => {
  // console.log("history : ", history);
  // console.log("match : ", match);
  // console.log("location : ", location);
  // console.log("userId : ", userId);

  console.log("home : user : ", user);

  if (user.id <= 0) {
    history.push("/login");
    return "";
  }

  return (
    <div>
      <h1>Home</h1>
      {user.name}
    </div>
  );
};

export default todo;
