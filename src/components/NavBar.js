import React, { useState } from "react";
import styles from "./NavBar.module.css";
import { NavLink } from "react-router-dom";
import setNavigation from "../components/setNavigation";

function NavBar(props) {
  var links = [];
  const role = props?.claims?.roles;  
  links = setNavigation(role);

  return (
    <nav className="navBar">
      <ul>
        {links.map((link) => {
          return (
            <li key={link.id}>
              <NavLink to={link.path}>{link.text}</NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default NavBar;