import Input from "../components/input";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function SignUpPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
    accountType: "",
    branch: "",
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
            <h1>Customer Registration</h1>
            <p>
              Bank employees can register a customer profile and continue
              directly into the account management dashboard.
            </p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <Input
              label="Full name"
              id="fullName"
              placeholder="Enter full name"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              required
            />

            <Input
              label="Phone number"
              id="phone"
              placeholder="Enter phone number"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              required
            />

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
              placeholder="Create secure password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <Input
              label="Account type"
              id="accountType"
              placeholder="Savings or current"
              type="text"
              value={formData.accountType}
              onChange={handleChange}
              required
            />

            <Input
              label="Branch"
              id="branch"
              placeholder="Enter branch name"
              type="text"
              value={formData.branch}
              onChange={handleChange}
              required
            />

            <Button type="submit" name="Create Account" />
          </form>
          <div>
            <p>
              Already registered? <Link to="/login">Log in here</Link>
            </p>
          </div>
        </section>
      </main>
    </>
  );
}

export default SignUpPage;
