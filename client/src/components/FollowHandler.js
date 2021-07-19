import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { followUser, unfollowUser } from "../actions/user.actions";
import { isEmpty } from "./Utils";

const FollowHandler = ({ idToFollow }) => {
  // On recupere les data du suer connecter via le reducer
  const userData = useSelector((state) => state.userReducer);
  const [isFollowed, setIsFollowed] = useState(false);
  const dispatch = useDispatch();

  const handleFollow = () => {
    dispatch(followUser(userData._id, idToFollow));
    setIsFollowed(true);
  };
  const handleUnfollow = () => {
    console.log("Undfollow");
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
        <span>
          <button onClick={handleUnfollow} className="unfollow-btn">
            Abonné
          </button>
        </span>
      )}
      {isFollowed === false && !isEmpty(userData) && (
        <span>
          <button onClick={handleFollow} className="follow-btn">
            Suivre
          </button>
        </span>
      )}
    </>
  );
};

export default FollowHandler;
