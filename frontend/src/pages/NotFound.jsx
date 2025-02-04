// 404 page

import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="not-found">
      <div className="nf-title">404</div>
      <div className="nf-text">
        The requested page or resource was not found
      </div>
      <div className="link-group">
        <i class="bi bi-house-fill"></i>
        <a href="/" className="link">
          Back to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
