import React, { useState } from "react";
import "./sidebar.scss";
import avatar from "../../assets/image/avatar.jpg";
import sidebar_item from "../../assets/fakeData/sidebarData";
import { Link } from "react-router-dom";
import { ChevronRight } from "@mui/icons-material";
import { LOCAL_STORAGE } from "constants/gloabalUrl";
import { useEffect } from "react";
import authApi from "api/authApi";

const SidebarItem = (props) => {
  const active = props.active ? "active" : "";
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className="sidebar-item">
      <div className={`sidebar-item__inner ${active}`} onClick={handleOpen}>
        {props.icon}
        <span>{props.name}</span>
        {props.listItem ? (
          <span className="icon-right" onClick={handleOpen}>
            <ChevronRight />
          </span>
        ) : null}
      </div>
      {open && props.listItem ? (
        <ul className="sidebar-item__list">
          {props.name === "Products"
            ? props.listItem.map((item, index) => {
                return (
                  <Link to={`/products${item.routeItem}`}>
                    <li key={index}>{item.name}</li>
                  </Link>
                );
              })
            : props.listItem.map((item, index) => {
                return (
                  <Link to={`/users${item.routeItem}`}>
                    <li key={index}>{item.name}</li>
                  </Link>
                );
              })}
        </ul>
      ) : null}
    </div>
  );
};

export default function Sidebar(props) {
	const { isOpen, toggle } = props;
  const [user, setUser] = useState();
  const activeItem = sidebar_item.findIndex((value) => value.route === props.location.pathname);
  
  useEffect(() => {
    const getUser = async () => {
      const res = await authApi.getInfo();
      setUser(res?.user);
    }
    getUser();
  }, [])

	const handleClick = (sidebarItem) => {
    if (sidebarItem.displayName === "Logout") {
      window.localStorage.removeItem(LOCAL_STORAGE.accessToken);
      window.localStorage.removeItem(LOCAL_STORAGE.refreshToken);
		} else {
			return;
    }
  };

  return (
    <div
      className={`${isOpen ? "sidebar active" : "sidebar"} `}
      onClick={toggle}
      isOpen={isOpen}
    >
      <div className="sidebar-logo">
        <img src={avatar} alt="" />
        <div className="sidebar-info">
          <h2>{user?.username}</h2>
          <p>Manager</p>
        </div>
      </div>
      {sidebar_item.map((item, index) => {
        return (
          <Link to={item.route} key={index} onClick={() => handleClick(item)}>
            <SidebarItem
              icon={item.icon}
              name={item.displayName}
              active={index === activeItem}
              listItem={item.listItem}
              route={item.route}
            />
          </Link>
        );
      })}
    </div>
  );
}
