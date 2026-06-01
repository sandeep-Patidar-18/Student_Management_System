import Input from "../components/input";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/dashboard");
  };

  return (
    <>
      <main className="page-shell">
        <section className="signup-card">
          <div className="form-header">
            <p className="form-kicker">TrustWave Bank</p>
            <h1>Employee Login</h1>
            <p>
              Sign in as a bank employee to manage customer balances, deposits,
              and withdrawals from the operations dashboard.
            </p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <Input
              label="Email"
              id="email"
              placeholder="Enter email address"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <Input
              label="Password"
              id="password"
              placeholder="Enter password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <Button type="submit" name="Log In" />
          </form>
          <div>
            <p>
              Register a managed customer account <Link to="/signup">Sign up</Link>
            </p>
          </div>
        </section>
      </main>
    </>
  );
}

export default LoginPage;
