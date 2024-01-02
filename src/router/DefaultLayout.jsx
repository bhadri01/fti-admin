import React, { useState } from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";

function DefaultLayout() {
  const { userid } = useParams();
  return (
    <div className="defaultLayout">
      <div className="menu-layout">
        <Menu userid={userid} />
      </div>
      <div className="w-100 admin-box">
        <Header />
        <div className="actual-content">
          <Outlet />
        </div>
        {/* <Footer /> */}
      </div>
    </div>
  );
}

export default DefaultLayout;

const Header = () => (
  <div
    className="d-flex justify-content-between
    w-100 p-3 px-4 sticky-top header-menu"
  >
    <i className="bi bi-list fs-4"></i>
    <i className="bi bi-person-fill fs-4"></i>
  </div>
);
const Footer = () => <>Footer</>;

const Menu = ({ userid }) => {
  const [Drop, setDrop] = useState(false);

  return (
    <div className="top-menu">
      <div className="title">{userid}</div>
      <div className="menu-list">
        <div className="menu-item-top">
          <NavLink
            to={`/${userid}/dashboard`}
            className="nav-link"
            activeclassname="active"
          >
            Dashboard
          </NavLink>
        </div>

        <div className="menu-item-top">
          <NavLink
            to={`/${userid}/home`}
            className="nav-link"
            activeclassname="active"
          >
            Home
          </NavLink>
        </div>
        <div className="menu-drop-list-top">
          <div className="menu-item-top" onClick={() => setDrop((a) => !a)}>
            <span>About Us</span>
            <i
              className="bi bi-caret-down-fill"
              style={{
                transform: `${Drop ? "rotate(180deg)" : "rotate(0deg)"}`,
              }}
            ></i>
          </div>
          <div
            className="drop-item-top"
            style={{ display: `${Drop ? "flex" : "none"}` }}
          >
            <NavLink
              to={`/${userid}/about/vision`}
              className="dropdown-item-top"
            >
              Vision
            </NavLink>
            <NavLink
              to={`/${userid}/about/director`}
              className="dropdown-item-top"
            >
              Director
            </NavLink>
            <NavLink
              to={`/${userid}/about/rules`}
              className="dropdown-item-top"
            >
              Rules
            </NavLink>
            <NavLink
              to={`/${userid}/about/members`}
              className="dropdown-item-top"
            >
              Members
            </NavLink>
          </div>
        </div>

        <div className="menu-item-top">
          <NavLink
            to={`/${userid}/news`}
            className="nav-link"
            activeclassname="active"
          >
            News
          </NavLink>
        </div>
        <div className="menu-item-top">
          <NavLink
            to={`/${userid}/contact`}
            className="nav-link "
            activeclassname="active"
          >
            Contact
          </NavLink>
        </div>
      </div>
    </div>
  );
};
