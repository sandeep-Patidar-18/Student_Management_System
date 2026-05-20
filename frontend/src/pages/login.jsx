import Input from "../components/input";
import Button from "../components/Button";
import SignUp from "./signup";

function InputPage(props) {
  return (
    <>
      <main className="page-shell">
        <section className="signup-card">
          <div className="form-header">
            <p className="form-kicker">Central Library Ratlam</p>
            <h1>Student Login</h1>
            <p>
              Sign in to continue to your Study Hub account and access your
              library dashboard.
            </p>
          </div>

          <form className="auth-form">
            <Input
              label="Email"
              id="email"
              placeholder="Enter email here"
              type="email"
            />

            <Input
              label="Password"
              id="password"
              placeholder="Enter password here"
              type="password"
            />

            <Button type="submit" name="Login" />
          </form>
          <div>
            <p>
              Create a new account  <Link to="/SignUp">SignUp</Link>
            </p>
          </div>
        </section>
      </main>
    </>
  );
}

export default InputPage;
