import { useRef, useState } from "react";
import axios from "axios";
import SignInForm from "./SignInForm";

const SignUpForm = () => {
  // hooks
  const [email, setEmail] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [password, setPassword] = useState("");
  const [controlPassword, setControlPassword] = useState("");
  // formSubmit permettra si true afficher le formulaire de connexion, si false afficher l'insciption
  const [formSubmit, setFormSubmit] = useState(false);

  //input
  const termCheckbox = useRef(null);
  const passwordInputRef = useRef(null);
  const confirmPasswordInputRef = useRef(null);
  const pseudoInputRef = useRef(null);
  const emailInputRef = useRef(null);
  // Error div
  const termsCheckboxErr = useRef(null);
  const passwordConfirmError = useRef(null);
  const passwordErr = useRef(null);
  const pseudoError = useRef(null);
  const emailErr = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    passwordConfirmError.current.innerHTML = "";
    termsCheckboxErr.current.innerHTML = "";

    if (password !== controlPassword || !termCheckbox.current.checked) {
      if (password !== controlPassword) {
        passwordConfirmError.current.innerHTML =
          "Les mots de passe ne sont pas identiques";
      }

      if (!termCheckbox.current.checked) {
        termsCheckboxErr.current.innerHTML = "Veuillez accepter les conditions";
      }
    } else {
      axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}api/user/register`,
        withCredentials: true,
        data: {
          email,
          pseudo,
          password,
        },
      })
        .then((res) => {
          if (res.data.errors) {
            emailErr.current.innerHTML = res.data.errors.email;
            pseudoError.current.innerHTML = res.data.errors.pseudo;
            passwordErr.current.innerHTML = res.data.errors.password;
          } else {
            setFormSubmit(true);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      {formSubmit ? (
        // Si formSubmit est true ( après une insciption validé sans erreur ) affiche le form de login
        <>
          <SignInForm />
          <span></span>
          <h4 className="success">
            Enregistrement réussi, veuillez-vous connecter
          </h4>
        </>
      ) : (
        <form onSubmit={handleSubmit} method="post">
          <label htmlFor="email">Email</label>
          <br />
          <input
            ref={emailInputRef}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            type="text"
          />
          <div ref={emailErr} className="email error"></div>
          <br />
          <label htmlFor="">Pseudo</label>
          <br />
          <input
            ref={pseudoInputRef}
            value={pseudo}
            onChange={(e) => setPseudo(e.target.value)}
            id="pseudo"
            type="pseudo"
          />
          <div ref={pseudoError} className="pseudo error"></div>
          <br />
          <label htmlFor="password">Mot de passe</label>
          <br />
          <input
            ref={passwordInputRef}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            type="password"
          />
          <div ref={passwordErr} className="password error"></div>
          <br />
          <label htmlFor="password">Confirmer le mot de passe</label>
          <br />
          <input
            ref={confirmPasswordInputRef}
            value={controlPassword}
            onChange={(e) => setControlPassword(e.target.value)}
            id="controlPassword"
            type="password"
          />
          <div
            ref={passwordConfirmError}
            className="passwordConfirm error"
          ></div>
          <br />
          <input ref={termCheckbox} type="checkbox" name="terms" id="terms" />
          <span>Accepter les Condition générales</span>
          <div ref={termsCheckboxErr} className="terms error"></div>
          <br />
          <input type="submit" value="S'inscrire" />
        </form>
      )}
    </>
  );
};

export default SignUpForm;
