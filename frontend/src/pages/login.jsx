function InputPage(props) {
  return (
    <>
      <main className="page-shell">
        <section className="signup-card">
          <div className="form-header">
            <p className="form-kicker">Central Library Ratlam</p>
            <h1>Student Signup</h1>
            <p>
              Create your account to join Study Hub and continue your learning
              journey.
            </p>
          </div>

          <form className="login-form">
            <Input
              label="email"
              id="email"
              placeholder="enter email here "
              type="email"
            />

            <Input
              label="password"
              id="password"
              placeholder="create password here "
              type="password"
            />

            <button type="submit" name="Login" />
          </form>
        </section>
      </main>
    </>
  );
}
