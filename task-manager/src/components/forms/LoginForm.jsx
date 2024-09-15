import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../../apis/taskmanagerapis";
import "../../styles/LoginForm.css";
import { handleToken } from "../../utils/handleToken";
import { toast } from "react-toastify";

const LoginForm = () => {
  const [username, setUsername] = useState(""); 
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { access_token, refresh_token } = await loginUser({ username, password }); 
      handleToken(access_token); 
      navigate("/");
    } catch (error) {
      setError("Login failed. Please try again.");
      toast.error("Try Again");
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username:</label> 
            <input
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)} 
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit">Login</button>
        </form>
        <div className="register-link">
          <p>Don't have an account?</p>
          <Link to="/register">Register here</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
