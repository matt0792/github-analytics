// collapsible left tab 
// shows extra info on user page

import "./LeftCollapse.css";
import { useState } from "react";
import LanguageGraph from "./LanguageGraph";

const LeftCollapse = ({ userData }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => {
    setIsCollapsed((prevState) => !prevState);
  };

  return (
    <div
      className={`left-collapse transition ${isCollapsed ? "collapsed" : ""}`}
    >
      {userData && (
        <>
          <div className="content">
            <div className="title">Languages:</div>
            <div className="item-container">
              <LanguageGraph userData={userData} />
            </div>
            <div className="misc-section">
              {userData.profile.location && (
                <div className="misc-text">
                  Location: {userData.profile.location}
                </div>
              )}
              {userData.profile.email && (
                <div className="misc-text">
                  Email: {userData.profile.email}
                </div>
              )}
              <div className="misc-text">
                Followers: {userData.profile.followers}
              </div>
              <div className="misc-text">
                Following: {userData.profile.following}
              </div>
              <div className="misc-text">
                Last Updated: {userData.profile.updated_at}
              </div>
              <div className="misc-text">
                Profile Visibility: {userData.profile.user_view_type}
              </div>
              <div className="misc-text">ID: {userData.profile.id}</div>
            </div>
          </div>
          <div className="collapse-button" onClick={toggleCollapse}>
            <i
              class={`bi bi-chevron-right ${isCollapsed ? "" : "rotated"}`}
            ></i>
          </div>
        </>
      )}
    </div>
  );
};

export default LeftCollapse;
