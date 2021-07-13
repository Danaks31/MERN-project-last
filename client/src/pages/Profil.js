import { useContext } from "react";
import Log from "../components/Log";
import { UidContext } from "../components/AppContext";

const Profil = () => {
  // De cette maniere on va récuperer la value du context qui est ici l'id de l'utilisateur connecter
  const uid = useContext(UidContext);

  return (
    <div className="profil-page">
      {uid ? (
        <h1>Test</h1>
      ) : (
        <div className="log-container">
          {/* Grâce à la props showSignInModal on affiche le form login, ou le form signUp  */}
          <Log showSignInModal={false} />
          <div className="img-container">
            <img src="./img/log.svg" alt="img-log" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Profil;
