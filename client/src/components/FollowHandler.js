import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { followUser, unfollowUser } from "../actions/user.actions";
import { isEmpty } from "./Utils";

// Le type va nous permettre de faire un affichage conditionnelle, sur la page d'accueil ou dans le profil
const FollowHandler = ({ idToFollow, type }) => {
  // On recupere les data du suer connecter via le reducer
  const userData = useSelector((state) => state.userReducer);
  const [isFollowed, setIsFollowed] = useState(false);
  const dispatch = useDispatch();

  const handleFollow = () => {
    dispatch(followUser(userData._id, idToFollow));
    setIsFollowed(true);
  };
  const handleUnfollow = () => {
    dispatch(unfollowUser(userData._id, idToFollow));
    setIsFollowed(false);
  };

  useEffect(() => {
    // On vérifie que le tableau de follower ne soit pas vide sinon on stop ici
    if (!isEmpty(userData.following)) {
      // Si le tableaux n'est pas vide et q'il contient l'id passer en props
      if (userData.following.includes(idToFollow)) {
        console.log("include idToFollow");
        setIsFollowed(true);
      } else setIsFollowed(false);
    }
  }, [userData, idToFollow]);

  return (
    <>
      {isFollowed && !isEmpty(userData) && (
        <span onClick={handleUnfollow}>
          {type === "suggestion" && (
            <button className="unfollow-btn">Abonné</button>
          )}
          {type === "card" && (
            <img src="./img/icons/checked.svg" alt="checked" />
          )}
        </span>
      )}
      {isFollowed === false && !isEmpty(userData) && (
        <span onClick={handleFollow}>
          {type === "suggestion" && (
            <button className="follow-btn">Suivre</button>
          )}
          {type === "card" && <img src="./img/icons/check.svg" alt="check" />}
        </span>
      )}
    </>
  );
};

export default FollowHandler;
