import Input from "./components/input";

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
          <Input 
          label="name"
          id="name"
          placeholder="enter name here "
          type="text" />

          <button type="submit">Create account</button>
        </form>
      </section>
    </main>
  );
}

export default App;
