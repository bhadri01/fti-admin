import React, { useEffect, useState } from "react";
import {
  NavLink,
  Outlet,
  Route,
  useNavigate,
  useParams,
} from "react-router-dom";
import { clearTokenCookie } from "../api/TokenManager";

function DefaultLayout() {
  const { userid } = useParams();
  const [menuLayout, setMenuLayout] = useState(true);
  useEffect(() => {
    if (window.innerWidth > 700) {
      setMenuLayout(true);
    } else {
      setMenuLayout(false);
    }
  }, []);
  return (
    <div className="defaultLayout">
      <div
        className={`${menuLayout ? "menu-layout" : "menu-layout menuactive"}`}
      >
        <Menu userid={userid} />
      </div>
      <div className="w-100 admin-box">
        <Header setMenuLayout={setMenuLayout} />
        <div className="actual-content">
          <Outlet />
        </div>
        {/* <Footer /> */}
      </div>
    </div>
  );
}

export default DefaultLayout;

const Header = ({ setMenuLayout }) => {
  const route = useNavigate();
  const ClickHandler = () => {
    setMenuLayout((a) => !a);
  };
  const [Data, setData] = useState({
    companyName: "",
    email: "",
    signout: "signout",
  });
  useEffect(() => {
    setData((a) => ({
      ...a,
      companyName: localStorage.getItem("companyName"),
      email: localStorage.getItem("email"),
    }));
  }, []);
  return (
    <div
      className="d-flex justify-content-between
    w-100 p-3 px-4 sticky-top header-menu"
    >
      <i className="bi bi-list fs-4" onClick={ClickHandler}></i>
      <ul className="navbar-nav">
        <li className="nav-item dropdown">
          <span
            className="nav-link dropdown-toggle"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i class="bi bi-people-fill"></i>
          </span>
          <ul className="dropdown-menu">
            <li>
              <a className="dropdown-item" href="#">
                {Data.companyName}
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                {Data.email}
              </a>
            </li>
            <li>
              <a
                className="dropdown-item"
                onClick={() => {
                  clearTokenCookie();
                  route("/login");
                }}
                style={{ cursor: "pointer" }}
              >
                {Data.signout}
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};
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
            to={`/${userid}/activity`}
            className="nav-link"
            activeclassname="active"
          >
            Activity
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
