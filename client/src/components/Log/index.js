import { useState } from "react";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

const Log = (props) => {
  // React hook pour affichage conditionnelle
  const [showSignUpModal, setShowSignUpModal] = useState(props.showSignInModal);

  const handleClick = (e) => {
    if (e === "S'inscrire") {
      setShowSignUpModal(false);
    } else {
      setShowSignUpModal(true);
    }
  };

  return (
    <div className="connection-form">
      <div className="form-container">
        <ul>
          <li
            className={showSignUpModal ? null : "active-btn"}
            onClick={(e) => handleClick(e.target.textContent)}
          >
            S'inscrire
          </li>
          <li
            className={showSignUpModal ? "active-btn" : null}
            onClick={(e) => handleClick(e.target.textContent)}
          >
            Se connecter
          </li>
        </ul>
        {showSignUpModal ? <SignInForm /> : <SignUpForm />}
      </div>
    </div>
  );
};

export default Log;
