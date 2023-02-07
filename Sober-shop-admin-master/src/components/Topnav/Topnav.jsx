import React from "react";
import "./topnav.scss";
import { Search, Menu } from "@mui/icons-material";
import Dropdown from "components/Dropdown/Dropdown";
import avatar from "assets/image/avatar.jpg";
import { user_menu } from "assets/fakeData/dropdown";
import { Link, useHistory } from "react-router-dom";
import { LOCAL_STORAGE } from "constants/gloabalUrl";

const renderUserToggle = () => {
  return (
    <div className="user">
      <img
        src={avatar}
        alt=""
        style={{ width: "40px", height: "40px", borderRadius: "50%" }}
      />
    </div>
  );
};

// const renderNoticeItem = (item, index) => {
//     return (
//         <Link className="render-item" key={index}>
//             <span className="render-item__icon">{item.icon}</span>
//             <span>{item.content}</span>
//         </Link>
//     )
// }

const renderUserMenu = (item, index, history) => {
  const handleClick = () => {
    if (item.content !== "Logout") {
      history.push(item.route);
    } else {
      history.push(item.route);
      window.localStorage.removeItem(LOCAL_STORAGE.accessToken);
      window.localStorage.removeItem(LOCAL_STORAGE.refreshToken);
    }
  };
  return (
    <div className="render-item" key={index} onClick={handleClick}>
      <span className="render-item__icon">{item.icon}</span>
      <span>{item.content}</span>
    </div>
  );
};

export default function Topnav({ toggle }) {
  const history = useHistory();

  return (
    <div className="topnav">
      <div className="topnav-left">
        <h1>
          <Link to="/">Sober Shop</Link>
        </h1>
        <div className="topnav-left__toggle" onClick={toggle}>
          <Menu />
        </div>
      </div>

      <div className="topnav-right">
        <div className="topnav-right__item">
          <div className="topnav-right__search">
            <Search className="search-icon" />
            <input type="text" placeholder="Search..." />
          </div>
        </div>
        {/* <div className="topnav-right__item">
                    <Badge badgeContent={6} color="success">
                        <NotificationsNone />
                    </Badge>
                    <Dropdown
                        icon={<NotificationsNone />}
                        badge="6"
                        contentData={notice_menu}
                        renderItem={(item, index) => renderNoticeItem(item, index)}
                        renderFooter={() => <Link to="/">View all</Link>}
                    />
                </div> */}
        {/* <div className="topnav-right__item">
                    <ColorLens />
                </div> */}
        <div className="topnav-right__item">
          <Dropdown
            customToggle={() => renderUserToggle()}
            contentData={user_menu}
            renderItem={(item, index) => renderUserMenu(item, index, history)}
          />
        </div>
      </div>
    </div>
  );
}
