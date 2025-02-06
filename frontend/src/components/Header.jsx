// generic header

import "./Header.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = ({}) => {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchInput.trim() === "") return;
    navigate(`/user/${searchInput}`);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="header">
      <div className="link-container">
        <div className="link-group">
          <i class="bi bi-house-fill"></i>
          <a href="/" className="link">
            <div className="brand">GitHub Analytics</div>
          </a>
        </div>
      </div>
      {/* Search bar */}
      <div className="search-container">
        <input
          className="search-input"
          type="text"
          placeholder="Search GitHub User..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button className="search-button" onClick={handleSearch}>
          <i class="bi bi-search"></i>
        </button>
      </div>
    </div>
  );
};

export default Header;
