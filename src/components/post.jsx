import React from "react";

const post = ({ history, location, match, user }) => {
  // console.log("history : ", history);
  // console.log("match : ", match);
  // console.log("location : ", location);
  // console.log("userId : ", userId);

  // console.log("post : user : ", user);

  if (user.id <= 0) {
    history.push("/login");
    return "";
  }

  return (
    <div>
      <h1>Post List</h1>
      {user.name}
    </div>
  );
};

export default post;
