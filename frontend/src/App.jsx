function App() {
  return (
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

        <form className="signup-form">
          <label htmlFor="name">Full name</label>
          <input id="name" type="text" placeholder="Enter your full name" />

          <label htmlFor="email">Email address</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email address"
          />

          <label htmlFor="mobile">Mobile number</label>
          <input
            id="mobile"
            type="tel"
            placeholder="Enter your mobile number"
          />

          <label htmlFor="password">Create password</label>
          <input
            id="password"
            type="password"
            placeholder="Create a secure password"
          />

          <button type="submit">Create account</button>
        </form>
      </section>
    </main>
  );
}

export default App;
