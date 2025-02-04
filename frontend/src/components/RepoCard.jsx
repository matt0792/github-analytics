// barebones repo card used on home page

import "./RepoCard.css";
import { useNavigate } from "react-router-dom";

const RepoCard = ({ repo }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/repo/${repo.owner}/${repo.name}`);
  };
  return (
    <div className="repo-home-card" onClick={handleClick}>
      <div className="home-repo-title">{repo.name}</div>
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
        <div className="home-repo-stars">{repo.stars}</div>
      </div>
      <div className="home-repo-desc">{repo.description}</div>
    </div>
  );
};

export default RepoCard;
