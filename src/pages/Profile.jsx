import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { coursesData } from "../data/courses";
import "../styles/Profile.css";

function Profile() {
  const { user, logout } = useAuth();

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="profile-avatar">{user.email[0].toUpperCase()}</div>
        <div className="profile-info">
          <h1 className="profile-name">{user.email}</h1>
          <p className="profile-role">Студент</p>
        </div>
        <button className="btn-outline" onClick={logout}>Шығу</button>
      </div>

      <div className="profile-section">
        <h2 className="section-title">Менің курстарым</h2>
        <div className="cards-grid">
          {coursesData.slice(0, 3).map((course) => (
            <Link to={`/courses/${course.id}`} key={course.id} className="profile-course-card">
              <span className="detail-badge">{course.category}</span>
              <p className="profile-course-title">{course.title}</p>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${Math.floor(Math.random() * 60 + 20)}%` }} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;
