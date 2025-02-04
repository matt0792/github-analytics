// the home page
// shows list of popular repos

import { useState, useEffect } from "react";
import RepoCard from "../components/RepoCard";
import "./HomePage.css";

const HomePage = () => {
  const [repoData, setRepoData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


  // get popular repos
  useEffect(() => {
    const fetchRepoData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/github/trending-repos`
        );

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Data not found (404)");
          } else {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
        }

        const data = await response.json();
        setRepoData(data);
      } catch (error) {
        console.error("Error fetching trending repos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRepoData();
  }, []);

  return (
    <div className="home-page">
      {!isLoading && repoData ? (
        <>
          <div className="home-repo-container">
            <div className="home-title">Popular Repositories</div>
            {repoData.map((repo) => (
              <RepoCard repo={repo} key={`${repo.id}=${repo.name}`} />
            ))}
          </div>
        </>
      ) : (
        <div className="spinner">
          <i class="bi bi-arrow-repeat"></i>
        </div>
      )}
    </div>
  );
};

export default HomePage;
