import React, { useState } from "react";
import { Link } from "react-router-dom";

const menus = ["album", "todo", "post"];

const Navbar = ({ user }) => {
  // console.log("navbar : user : ", user);

  const [menuId, setMenuId] = useState(0);

  if (user.id <= 0) {
    return "";
  }

  const handleMenu = (menu) => {
    console.log("handleMenu() : menu : ", menu);
    setMenuId(menu);
  };

  const btns = menus.map((menu, index) => {
    const classes = `nav-link ${menuId === index ? "active" : ""}`; //aria-current="page"

    return (
      <li className="nav-item" key={index}>
        <Link to={"/" + menu} onClick={() => handleMenu(index)} className={classes}>
          {menu}
        </Link>
      </li>
    );
  });

  return (
    <div className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Navbar
        </a>
        <div className="collapse navbar-collapse d-flex justify-content-between" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">{btns}</ul>
          <form className="d-flex">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
