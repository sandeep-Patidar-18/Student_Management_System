
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

        <form className="signup-form">
          <Input 
          label="name"
          id="name"
          placeholder="enter name here "
          type="text" />

           <Input 
          label="mobile"
          id="mobile"
          placeholder="enter mobile no  here "
          type="number" />

           <Input 
          label="email"
          id="email"
          placeholder="enter email here "
          type="email" />

           <Input 
          label="password"
          id="password"
          placeholder="create password here "
          type="password" />

          <button type="submit" name="SignUp"/>
        </form>
      </section>
    </main>
        </>
    );
}

export default SignUp;