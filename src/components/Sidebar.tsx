import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartPlus,
  faComputer,
  faUserAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="left-sidebar" data-sidebarbg="skin6">
      <div className="scroll-sidebar">
        <nav className="sidebar-nav">
          <ul id="sidebarnav">
            <li className="sidebar-item">
              <Link
                to={"/"}
                className="sidebar-link waves-effect waves-dark sidebar-link"
              >
                <div className="mx-3">
                  <FontAwesomeIcon icon={faComputer} />
                </div>
                <div className=""></div>
                <span className="hide-menu">Dashboard</span>
              </Link>
            </li>
            <li className="sidebar-item">
              <Link
                to={"/product"}
                className="sidebar-link waves-effect waves-dark sidebar-link"
              >
                <div className="mx-3">
                  <FontAwesomeIcon icon={faCartPlus} />
                </div>
                <span className="hide-menu">Product</span>
              </Link>
            </li>
            <li className="sidebar-item">
              <Link
                to={"/user"}
                className="sidebar-link waves-effect waves-dark sidebar-link"
              >
                <div className="mx-3">
                  <FontAwesomeIcon icon={faUserAlt} />
                </div>
                <span className="hide-menu">Users</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
