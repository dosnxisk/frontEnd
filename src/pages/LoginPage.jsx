import { useState } from "react";
import "./LoginPage.css";

export default function LoginPage({ onLogin }) {
  const [view, setView] = useState("login"); // login | forgot | register
  const [form, setForm] = useState({ username: "", password: "", email: "", name: "", newPass: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (form.username === "admin" && form.password === "admin123") {
      onLogin();
    } else {
      setError("Invalid password");
    }
  };

  const handleGmail = () => {
    setSuccess("Google Sign-In is not yet connected to backend.");
  };

  const handleForgot = (e) => {
    e.preventDefault();
    setSuccess("Password reset link sent to " + form.email + "!");
    setTimeout(() => { setView("login"); setSuccess(""); }, 2500);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setSuccess("Account created! You can now sign in.");
    setTimeout(() => { setView("login"); setSuccess(""); }, 2500);
  };

  const reset = (v) => { setView(v); setError(""); setSuccess(""); };

  return (
    <div className="login-wrapper">
      <div className="login-bg">
        <div className="blob blob1" />
        <div className="blob blob2" />
        <div className="blob blob3" />
      </div>

      <div className="login-card">
        <div className="login-logo">
          <div className="logo-icon">LMN</div>
          <div className="logo-text">
            <span className="logo-main">SYSTEM</span>
          </div>
        </div>

        
        {success && <div className="login-success">{success}</div>}

        
        {view === "login" && (
          <>
            <h1 className="login-title">Welcome Back!</h1>
            <p className="login-desc"> </p>

            <form onSubmit={handleLogin} className="login-form">
              <div className="input-group">
                <label>Username</label>
                <input type="text" placeholder="Enter your username" value={form.username}
                  onChange={(e) => setForm({ ...form, username: e.target.value })} required />
              </div>
              <div className="input-group">
                <label>Password</label>
                <input type="password" placeholder="Enter your password" value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })} required />
              </div>
              <div className="forgot-link-row">
                <span onClick={() => reset("forgot")} className="forgot-link">Forgot password?</span>
              </div>
              {error && <div className="login-error">{error}</div>}
              <button type="submit" className="login-btn">Sign In</button>
            </form>

            <div className="divider"><span>or</span></div>

            <button className="gmail-btn" onClick={handleGmail}>
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="G" width="20" />
              Continue with Google
            </button>

            <p className="switch-auth">
              Don't have an account?{" "}
              <span onClick={() => reset("register")} className="switch-link">Sign up</span>
            </p>
            
          </>
        )}

        {view === "forgot" && (
          <>
            <h1 className="login-title">Forgot Password?</h1>
            <p className="login-desc">Enter your email and we'll send a reset link.</p>
            <form onSubmit={handleForgot} className="login-form">
              <div className="input-group">
                <label>Email Address</label>
                <input type="email" placeholder="you@email.com" value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })} required />
              </div>
              <button type="submit" className="login-btn">Send Reset Link</button>
            </form>
            <p className="switch-auth">
              <span onClick={() => reset("login")} className="switch-link">← Back to Sign In</span>
            </p>
          </>
        )}

        {view === "register" && (
          <>
            <h1 className="login-title">Create Account</h1>
            <p className="login-desc"> </p>
            <form onSubmit={handleRegister} className="login-form">
              <div className="input-group">
                <label>Full Name</label>
                <input type="text" placeholder="Lhorie Narra" value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              </div>
              <div className="input-group">
                <label>Email Address</label>
                <input type="email" placeholder="umtc@edu.ph" value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })} required />
              </div>
              <div className="input-group">
                <label>Password</label>
                <input type="password" placeholder="Create a password" value={form.newPass}
                  onChange={(e) => setForm({ ...form, newPass: e.target.value })} required />
              </div>
              <button type="submit" className="login-btn">Create Account</button>
            </form>

            <div className="divider"><span>or</span></div>
            <button className="gmail-btn" onClick={handleGmail}>
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="G" width="20" />
              Sign up with Google
            </button>

            <p className="switch-auth">
              Already have an account?{" "}
              <span onClick={() => reset("login")} className="switch-link">Sign In</span>
            </p>
          </>
        )}
      </div>
    </div>
  );
}