import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Auth.css";

function validateLogin(data) {
  const errors = {};
  if (!data.email.includes("@")) errors.email = "Email дұрыс емес";
  if (data.password.length < 6) errors.password = "Кемінде 6 таңба болуы керек";
  return errors;
}

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const errs = validateLogin(form);
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
        <h1 className="auth-title">Жүйеге кіру</h1>
        <p className="auth-subtitle">Аккаунтыңызға кіріңіз</p>

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
            placeholder="Құпия сөзіңіз"
          />
          {errors.password && <span className="error-text">{errors.password}</span>}
        </div>

        <button className="btn-primary btn-full" onClick={handleSubmit}>
          Кіру
        </button>

        <p className="auth-footer">
          Аккаунт жоқ па? <Link to="/register">Тіркелу</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
