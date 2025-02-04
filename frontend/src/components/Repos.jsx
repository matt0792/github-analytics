// list of repos for specific user
// used on user page

import "./Repos.css";
import { useNavigate } from "react-router-dom";

const Repos = ({ userData }) => {
  const navigate = useNavigate();
  function handleClick(name) {
    navigate(`/repo/${userData.profile.login}/${name}`);
  }
  return (
    <div className="repos">
      {userData.repos.map((repo) => (
        <div
          className="repo-card"
          onClick={() => handleClick(repo.name)}
          key={`${repo.id}-${repo.name}`}
        >
          <div className="repo-name">{repo.name}</div>
          {repo.isFork && <div className="fork">FORK</div>}

          <div className="info-container">
            {repo.language && (
              <>
                <i class="bi bi-input-cursor-text"></i>
                <div className="info-text">{repo.language}</div>
              </>
            )}
          </div>
          <div className="info-container">
            <i class="bi bi-star-fill"></i>
            <div className="info-text">{repo.stars}</div>
          </div>

          <p className="repo-desc">
            {repo.description || "No description available."}
          </p>
          <div className="link-group">
            <a
              className="ext-link"
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on GitHub
            </a>
            <i class="bi bi-box-arrow-up-right"></i>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Repos;
