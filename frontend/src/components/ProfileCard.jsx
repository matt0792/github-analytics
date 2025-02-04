// multi-purpose user profile card

import "./ProfileCard.css";

const ProfileCard = ({userData}) => {
  return (
    <div className="profile-card">
      <img
        src={userData.profile.avatar_url}
        alt="Profile Image"
        className="profile-image"
      ></img>
      <div className="profile-name">{userData.profile.name}</div>
      <div className="profile-username">@{userData.profile.login}</div>
      {userData.profile.company && (
        <div className="company">{userData.profile.company}</div>
      )}
      {userData.profile.bio && (
        <div className="profile-bio">{userData.profile.bio}</div>
      )}
    </div>
  );
};

export default ProfileCard;
