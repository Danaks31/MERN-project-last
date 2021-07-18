import React from "react";
import axios from "axios";

// Librairie qui permet de gérer les cookies
import cookie from "js-cookie";

const Logout = () => {
  const removeCookie = (key) => {
    // Si window est défini ( si la page est active )
    if (window !== "undefined") {
      cookie.remove(key, { expire: 1 });
    }
  };
  // Grâce à l'appelle api on supprime le cookie en back puis on redirige vers l'accueil ( qui va vérifier si oui ou non il y a un cookie )
  const logout = async () => {
    await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/user/logout`,
      withCredentials: true,
    })
      .then(() => removeCookie("jwt")) // On appelle la fonction déclaerer plus haut pour supprimer le cookies en front
      .catch((err) => console.log(err));
    window.location = "/";
  };
  return (
    <li onClick={logout}>
      <img src="./img/icons/logout.svg" alt="logout" />
    </li>
  );
};

export default Logout;
