import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ContributorGraph from "../components/ContributorGraph";
import ProfileCard from "../components/ProfileCard";
import "./RepoPage.css";

const RepoPage = () => {
  const { username, repo } = useParams();
  const [repoData, setRepoData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  // get repo data
  useEffect(() => {
    const fetchRepoData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/github/repo/${username}/${repo}`
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

        if (data.repo && data.repo.owner && data.repo.owner.login) {
          fetchGitHubUserData(data.repo.owner.login);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchRepoData();
  }, [username, repo]);


  // fetch user data from repos 
  const fetchGitHubUserData = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/github/user/${username}`
      );
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="repo-page">
      {!isLoading && repoData ? (
        <>
          <div className="top">
            <div className="repo-title">{repo}</div>
            <div className="repo-desc">{repoData.repo.description}</div>
            <div className="misc-text git-link link-group repo-link">
              <a
                href={repoData.repo.html_url}
                className="link"
                target="_blank"
                rel="noopener noreferrer"
              >
                View on GitHub
              </a>
            </div>
          </div>
          <div className="content-sections">
            <div className="repo-section 1">
              <div className="misc-title">Owner:</div>
              <ProfileCard userData={userData} />
            </div>
            <div className="repo-section 2">
              <div className="misc-title">Contributors:</div>
              <ContributorGraph contributors={repoData.contributors} />
              <div className="contributor-list">
                {repoData.contributors.map((contributor) => (
                  <div className="contributor-card" key={contributor.id}>
                    <img
                      src={contributor.avatar_url}
                      alt={`${contributor.login} Profile Image `}
                      className="profile-image"
                    ></img>
                    <div className="cont-card-content">
                      <div className="cont-name">{contributor.login}</div>
                      <div className="misc-text">
                        Contributions: {contributor.contributions}
                      </div>
                      <div className="misc-text link-group repo-link">
                        <a href={`/user/${contributor.login}`} className="link">
                          View Profile
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="repo-section 3">
              <div className="misc-title">Recent Commits:</div>
              {repoData.recentCommits.map((commit) => (
                <div className="commit" key={commit.id}>
                  <div className="commit-name">{commit.name}</div>
                  <div className="commit-date">{commit.date}</div>
                  <div className="commit-message">{commit.message}</div>
                </div>
              ))}
            </div>
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

export default RepoPage;
