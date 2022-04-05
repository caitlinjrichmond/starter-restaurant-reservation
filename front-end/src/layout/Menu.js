import React from "react";

import { Link } from "react-router-dom";

/**
 * Defines the menu for this application.
 *
 * @returns {JSX.Element}
 */

function Menu() {
  return (
    <nav className="navbar navbar-dark align-items-start p-0">
      <div className="container-fluid d-flex flex-column p-0">
        <Link
          className="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0"
          to="/"
        >
          <div className="sidebar-brand-text mx-3">
            <span style={{ color: "#EA9010" }}>Periodic Tables</span>
          </div>
        </Link>
        <hr className="sidebar-divider my-0" />
        <ul className="nav navbar-nav text-light" id="accordionSidebar">
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/dashboard"
              style={{ color: "#90BE6D" }}
            >
              <span className="oi oi-dashboard" style={{ color: "#EAEFBD" }} />
              &nbsp;Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/search"
              style={{ color: "#90BE6D" }}
            >
              <span
                className="oi oi-magnifying-glass"
                style={{ color: "#EAEFBD" }}
              />
              &nbsp;Search
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/reservations/new"
              style={{ color: "#90BE6D" }}
            >
              <span className="oi oi-plus" style={{ color: "#EAEFBD" }} />
              &nbsp;New Reservation
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/tables/new"
              style={{ color: "#90BE6D" }}
            >
              <span className="oi oi-layers" style={{ color: "#EAEFBD" }} />
              &nbsp;New Table
            </Link>
          </li>
        </ul>
        <div className="text-center d-none d-md-inline">
          <button
            className="btn rounded-circle border-0"
            id="sidebarToggle"
            type="button"
          />
        </div>
      </div>
    </nav>
  );
}

export default Menu;
