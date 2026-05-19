
import Input from "../components/input";
import Button from "../components/Button";

function SignUp(){
    return(
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

        <form className="auth-form">
          <Input 
          label="Name"
          id="name"
          placeholder="Enter name here"
          type="text" />

           <Input 
          label="Mobile"
          id="mobile"
          placeholder="Enter mobile no here"
          type="number" />

           <Input 
          label="Email"
          id="email"
          placeholder="Enter email here"
          type="email" />

           <Input 
          label="Password"
          id="password"
          placeholder="Create password here"
          type="password" />

          <Button type="submit" name="Sign Up" />
        </form>
      </section>
    </main>
        </>
    );
}

export default SignUp;
