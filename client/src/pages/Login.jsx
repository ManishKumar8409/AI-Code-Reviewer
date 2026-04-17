import { useState } from "react";
import { loginUser, registerUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false); // ✅ FIXED
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (isLogin) {
        const res = await loginUser(form);

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        navigate("/");
      } else {
        await registerUser(form);
        setIsLogin(true);
      }
    } catch {
      alert("Error");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">

        <h2 className="auth-title">
          {isLogin ? "Welcome Back 👋" : "Create Account 🚀"}
        </h2>

        {!isLogin && (
          <input
            name="name"
            placeholder="Name"
            className="input-field"
            onChange={handleChange}
          />
        )}

        {/* EMAIL */}
        <input
          name="email"
          placeholder="Email"
          className="input-field"
          onChange={handleChange}
        />

        {/* PASSWORD WITH EYE */}
        <div className="password-box">
          <input
            type={showPassword ? "text" : "password"}   // ✅ FIXED
            name="password"
            placeholder="Password"
            className="input-field"
            onChange={handleChange}
          />

          <span
            className="eye-icon"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        <button className="primary-btn" onClick={handleSubmit}>
          {isLogin ? "Login" : "Register"}
        </button>

        <p
          className="auth-link"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin
            ? "New user? Register"
            : "Already have account? Login"}
        </p>

      </div>
    </div>
  );
};

export default Login;