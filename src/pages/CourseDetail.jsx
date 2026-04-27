import { useParams, Link, Navigate } from "react-router-dom";
import { coursesData } from "../data/courses";
import "../styles/CourseDetail.css";

function CourseDetail() {
  const { id } = useParams();
  const course = coursesData.find((c) => c.id === Number(id));

  if (!course) {
    return <Navigate to="/404" replace />;
  }

  return (
    <div className="course-detail">
      <div className="breadcrumb">
        <Link to="/">Басты бет</Link>
        <span> / </span>
        <Link to="/courses">Курстар</Link>
        <span> / </span>
        <span>{course.title}</span>
      </div>

      <div className="detail-card">
        <span className="detail-badge">{course.category}</span>
        <h1 className="detail-title">{course.title}</h1>
        <p className="detail-desc">{course.description}</p>

        <div className="detail-meta">
          <div className="meta-item">
            <span className="meta-label">Рейтинг</span>
            <span className="meta-value">{course.rating} / 5.0</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Ұзақтығы</span>
            <span className="meta-value">{course.duration}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Сабақтар</span>
            <span className="meta-value">{course.lessons} сабақ</span>
          </div>
        </div>

        <div className="detail-actions">
          <Link to="/register" className="btn-primary">Курсқа жазылу</Link>
          <Link to="/courses" className="btn-outline">Артқа</Link>
        </div>
      </div>
    </div>
  );
}

export default CourseDetail;
