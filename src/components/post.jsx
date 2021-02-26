import React, { useState, useEffect } from "react";

const Post = ({ history, user }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [postId, setPostId] = useState(0);

  useEffect(() => {
    if (user.id <= 0) {
      history.push("/login");
      return "";
    }

    fetch(`https://jsonplaceholder.typicode.com/users/${user.id}/posts`)
      .then((response) => response.json())
      .then((json) => {
        // console.log("posts : ", json);
        console.log("Post : useEffect()");
        setPosts(json);
        setLoading(true);
      });
  }, []);

  if (user.id <= 0) {
    history.push("/login");
    return "";
  }

  const handleClick = (id) => {
    console.log("Post : handleClick() : id : ", id);

    if (id === postId) {
      return;
    }

    const post = posts.find((post) => id === post.id);
    if (post.comments) {
      setPostId(id);
      return;
    }

    fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
      .then((response) => response.json())
      .then((json) => {
        let newPosts = [...posts];
        let newPost = newPosts.find((post) => post.id === id);
        newPost.comments = json;
        setPostId(id);
        setPosts(newPosts);
        // console.log("fetch() : posts : ", json);
      });
  };

  const getComments = (id) => {
    if (!postId) return;
    if (postId !== id) return;

    const comments = posts.find((post) => post.id === postId).comments;
    const list = comments.map((comment) => (
      <li key={comment.id} alt={comment.name} className="border-bottom">
        <p>{comment.name}</p>
        <p>{comment.body}</p>
      </li>
    ));

    return <ul className="row">{list}</ul>;
  };

  const getPosts = (id) => {
    if (!loading) return "loading...";

    console.log("getPosts()");

    return posts.map((post) => {
      const classes = `list-group-item list-group-item-action ${
        post.id === postId ? "active" : ""
      }`;

      return (
        <button
          type="button"
          className={classes}
          key={post.id}
          onClick={() => handleClick(post.id)}
        >
          {post.title}
        </button>
      );
    });
  };

  return (
    <div className="d-flex">
      <div className="col-md-4 ml-4">
        <h3>Post List</h3>
        <div className="list-group">{getPosts()}</div>
      </div>
      <div className="col-md-7 mt-4">{getComments(postId)}</div>
    </div>
  );
};

export default Post;
