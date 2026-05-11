import { useState } from "react";
import { loginUser, registerUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const [isLogin, setIsLogin] = useState(true);

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  // HANDLE INPUT
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // HANDLE SUBMIT
  const handleSubmit = async () => {

    try {

      // LOGIN
      if (isLogin) {

        const res = await loginUser(form);

        // SAVE USER
        localStorage.setItem(
          "token",
          res.data.token
        );

        localStorage.setItem(
          "user",
          JSON.stringify(res.data.user)
        );

        // GO HOME
        navigate("/");

      } else {

        // REGISTER
        await registerUser(form);

        alert("Registration Successful ✅");

        setIsLogin(true);
      }

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (

    <div className="auth-wrapper">

      <div className="auth-card">

        {/* TITLE */}
        <h2 className="auth-title">
          {isLogin
            ? "Welcome Back 👋"
            : "Create Account 🚀"}
        </h2>

        {/* NAME */}
        {!isLogin && (
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="input-field"
            onChange={handleChange}
          />
        )}

        {/* EMAIL */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="input-field"
          onChange={handleChange}
        />

        {/* PASSWORD */}
        <div className="password-box">

          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            className="input-field"
            onChange={handleChange}
          />

          {/* EYE ICON */}
          <span
            className="eye-icon"
            onClick={() =>
              setShowPassword(!showPassword)
            }
          >
            {showPassword ? "🙈" : "👁️"}
          </span>

        </div>

        {/* BUTTON */}
        <button
          className="primary-btn"
          onClick={handleSubmit}
        >
          {isLogin ? "Login" : "Register"}
        </button>

        {/* TOGGLE */}
        <p
          className="auth-link"
          onClick={() =>
            setIsLogin(!isLogin)
          }
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