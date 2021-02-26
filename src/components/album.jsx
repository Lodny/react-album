import React, { useState, useEffect } from "react";

const Album = ({ history, user }) => {
  // console.log("history : ", history);
  // console.log("match : ", match);
  // console.log("location : ", location);
  // console.log("userId : ", userId);

  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(false);
  const [albumId, setAlbumId] = useState(0);

  useEffect(() => {
    if (user.id <= 0) {
      history.push("/login");
      return "";
    }

    fetch(`https://jsonplaceholder.typicode.com/users/${user.id}/albums`)
      .then((response) => response.json())
      .then((json) => {
        // console.log("albums : ", json);
        console.log("Album : useEffect()");
        setAlbums(json);
        setLoading(true);
      });
  }, []);

  if (user.id <= 0) {
    history.push("/login");
    return "";
  }

  const handleClick = (id) => {
    console.log("Album : handleClick() : id : ", id);

    if (id === albumId) {
      return;
    }

    const album = albums.find((album) => id === album.id);
    if (album.photos) {
      setAlbumId(id);
      return;
    }

    fetch(`https://jsonplaceholder.typicode.com/albums/${id}/photos`)
      .then((response) => response.json())
      .then((json) => {
        let newAlbums = [...albums];
        let newAlbum = newAlbums.find((album) => album.id === id);
        newAlbum.photos = json;
        setAlbumId(id);
        setAlbums(newAlbums);
        // console.log("fetch() : albums : ", json);
      });
  };

  const getPhotos = (id) => {
    if (!albumId) return;
    if (albumId !== id) return;

    const photos = albums.find((album) => album.id === albumId).photos;
    const list = photos.map((photo) => (
      <img src={photo.thumbnailUrl} key={photo.id} alt={photo.title} />
    ));

    return <div className="row">{list}</div>;
  };

  const getAlbums = (id) => {
    if (!loading) return "loading...";

    console.log("getAlbums()");

    return albums.map((album) => {
      const classes = `list-group-item list-group-item-action ${
        album.id === albumId ? "active" : ""
      }`;

      return (
        <button
          type="button"
          className={classes}
          key={album.id}
          onClick={() => handleClick(album.id)}
        >
          {album.title}
        </button>
      );
    });
  };

  return (
    <div className="d-flex">
      <div className="col-md-4 ml-4">
        <h3>Album List</h3>
        <div className="list-group">{getAlbums()}</div>
      </div>
      <div className="col-md-7">{getPhotos(albumId)}</div>
    </div>
  );
};

export default Album;
