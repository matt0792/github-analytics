import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./UserPage.css";
import ProfileCard from "../components/ProfileCard";
import Repos from "../components/Repos";
import LeftCollapse from "../components/LeftCollapse";

const UserPage = () => {
  const { username } = useParams();
  const [showRepos, setShowRepos] = useState(true);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const toggleShowRepos = () => {
    setShowRepos((prevState) => !prevState);
  };

  // get data from api
  useEffect(() => {
    const fetchGitHubUserData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/github/user/${username}`
        );

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Data not found (404)");
          } else {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
        }
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGitHubUserData();
  }, [username]);

  return (
    <div className="all-content">
      <LeftCollapse userData={userData} />
      <div className="user-page">
        {!isLoading && userData ? (
          <>
            <div className="section-row">
              <ProfileCard userData={userData} />
            </div>
            <div className="section">
              <div className="header-misc" onClick={toggleShowRepos}>
                <div className="header-text">Repos</div>
                <div className={`icon ${showRepos ? "rotated" : ""}`}>
                  <i className="bi bi-chevron-down"></i>
                </div>
              </div>
              <div className="sub-header-text">
                <i class="bi bi-info-circle-fill"></i> Click a repo to expand
                details
              </div>
              {showRepos && <Repos userData={userData} />}
            </div>
          </>
        ) : (
          <div className="spinner">
            <i class="bi bi-arrow-repeat"></i>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPage;
