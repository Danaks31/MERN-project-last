import { useState, useEffect } from "react";
import Routes from "../src/components/Routes";
import { UidContext } from "./components/AppContext";
import axios from "axios";

const App = () => {
  const [uid, setUid] = useState(null);

  // A chaque fois que l'on va appeller le component ( à chaque changement de page, au premier rendu etc), le useEffect va se lire
  useEffect(() => {
    // Vérifi si l'utilisateur possede un cookie de sécurité grâce à auth.middleware.requireAuth
    const fetchToken = async () => {
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}jwtid`,
        withCredentials: true,
      })
        .then((res) => {
          console.log(res);
          setUid(res.data);
        }) // Si il n'y a pas d'érreur stock l'id utilisateur dans Uid
        .catch((err) => console.log("No token"));
    };
    fetchToken();
  }, [uid]);

  return (
    <UidContext.Provider value={uid}>
      <Routes />
    </UidContext.Provider>
  );
};

export default App;
