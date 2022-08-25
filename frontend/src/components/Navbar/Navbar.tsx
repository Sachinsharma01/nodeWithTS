import React from "react";

const Navbar = () => {
  return (
    // !using bootstrp navbar classes to make a responsive navbar
    <div className="navbar bg-dark navbar-lg">
        <div className="d-flex flex-row justify-content-between align-items-center w-100 mx-3">
          <div>
            <a href="#" className="navbar-brand">
              <img
                src="https://raw.githubusercontent.com/TypeStrong/ts-node/HEAD/logo.svg?sanitize=true"
                alt="logo"
                className="d-inline-block align-text-top"
                height="50"
                width="120"
              />
            </a>
          </div>
          <div>
            <ul className="navbar-nav ">
              <li className="nav-item">
                <button className="btn btn-outline-primary">Log In</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
  );
};

export default Navbar;
