import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Auth.css";

function validateRegister(data) {
  const errors = {};
  if (!data.name.trim()) errors.name = "Аты міндетті";
  if (!data.email.includes("@")) errors.email = "Email дұрыс емес";
  if (data.password.length < 6) errors.password = "Кемінде 6 таңба болуы керек";
  if (data.password !== data.confirm) errors.confirm = "Құпия сөздер сәйкес емес";
  return errors;
}

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const errs = validateRegister(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    login(form.email);
    navigate("/profile");
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Тіркелу</h1>
        <p className="auth-subtitle">Жаңа аккаунт жасаңыз</p>

        <div className="form-group">
          <label className="form-label">Аты-жөні</label>
          <input
            className={`form-input ${errors.name ? "error" : ""}`}
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Аты-жөніңіз"
          />
          {errors.name && <span className="error-text">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label className="form-label">Email</label>
          <input
            className={`form-input ${errors.email ? "error" : ""}`}
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="email@example.com"
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label className="form-label">Құпия сөз</label>
          <input
            className={`form-input ${errors.password ? "error" : ""}`}
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Кемінде 6 таңба"
          />
          {errors.password && <span className="error-text">{errors.password}</span>}
        </div>

        <div className="form-group">
          <label className="form-label">Құпия сөзді растаңыз</label>
          <input
            className={`form-input ${errors.confirm ? "error" : ""}`}
            type="password"
            name="confirm"
            value={form.confirm}
            onChange={handleChange}
            placeholder="Қайта енгізіңіз"
          />
          {errors.confirm && <span className="error-text">{errors.confirm}</span>}
        </div>

        <button className="btn-primary btn-full" onClick={handleSubmit}>
          Тіркелу
        </button>

        <p className="auth-footer">
          Аккаунт бар ма? <Link to="/login">Кіру</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
