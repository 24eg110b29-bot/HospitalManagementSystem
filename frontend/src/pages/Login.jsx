
function Login() {

  return (
    <div className="login-page">

      <div className="login-card">

        <div className="login-icon">
          🔐
        </div>

        <h1>Login</h1>

        <p>
          Login to access the Hospital Management System
        </p>

        <form>

          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
            />
          </div>

          <button
            className="primary-btn login-btn"
            type="submit"
          >
            Login
          </button>

        </form>

      </div>

    </div>
  );
}

export default Login;