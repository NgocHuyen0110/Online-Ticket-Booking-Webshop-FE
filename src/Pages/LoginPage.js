  import React from "react";
  import { useState } from "react";


  function LoginPage(props) {

    const [email, setEmai] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
      event.preventDefault();
      props.onLogin(email, password);
    }



    return (
      <li className="loginForm">
          <form  onSubmit={handleSubmit}>
          <input
              type="text"
              value={email}
              onChange={(e) => setEmai(e.target.value)}
              className="inputText"
              placeholder=" Enter Username"
          /> <br></br>
        
          <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="inputText"
              placeholder="Enter Password"
          />
        <br></br>
          <button className="inputLogin" type="submit">Login</button>
          <br />
          <a className="signUpText"href="./SignUp"> Sign up here</a>

      </form>
      </li>
    );
  }
  export default LoginPage;
