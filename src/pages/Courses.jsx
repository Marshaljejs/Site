import { useState } from "react";
import { coursesData } from "../data/courses";
import Card from "../components/Card";
import "../styles/Courses.css";

function Courses() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Барлығы");

  const categories = ["Барлығы", "Frontend", "Backend", "JavaScript", "Design"];

  const filtered = coursesData.filter((c) => {
    const matchSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "Барлығы" || c.category === category;
    return matchSearch && matchCat;
  });

  return (
    <div className="courses-page">
      <div className="courses-header">
        <h1 className="page-title">Курстар</h1>
        <p className="page-subtitle">Барлық қолжетімді курстар</p>
      </div>

      <div className="courses-filters">
        <input
          className="search-input"
          type="text"
          placeholder="Курс іздеу..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="category-tabs">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`cat-tab ${category === cat ? "active" : ""}`}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <p className="results-count">Табылды: {filtered.length} курс</p>

      <div className="cards-grid">
        {filtered.map((course) => (
          <Card
            key={course.id}
            title={course.title}
            description={course.description}
            category={course.category}
            rating={course.rating}
            linkTo={`/courses/${course.id}`}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="no-results">Курс табылмады</p>
      )}
    </div>
  );
}

export default Courses;
