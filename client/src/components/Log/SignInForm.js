import { useState, useRef } from "react";
import axios from "axios";

const SignInForm = () => {
  // Hooks pour récuperer les value des input
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const emailErr = useRef(null);
  const passwordErr = useRef(null);

  const handleLogin = (e) => {
    e.preventDefault();

    // withCredentials est un boolean qui qui dis si true ou false il faut une authentification sécurisé ( ici cookies )
    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/user/login`,
      withCredentials: true,
      data: {
        email,
        password,
      },
    })
      .then((res) => {
        if (res.data.errors) {
          emailErr.current.innerHTML = res.data.errors.email;
          passwordErr.current.innerHTML = res.data.errors.password;
        } else {
          window.location = "/";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <form action="" onSubmit={handleLogin} id="sign-up-form">
        <label htmlFor="email">Email</label>
        <br />
        <input
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          value={email}
        />
        <div ref={emailErr} className="email error"></div>
        <br />

        <label htmlFor="password">Mot de passe</label>
        <br />
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          value={password}
        />
        <br />
        <div ref={passwordErr} className="password error"></div>
        <br />
        <input id="password" type="submit" value="Connexion" />
      </form>
    </div>
  );
};

export default SignInForm;
