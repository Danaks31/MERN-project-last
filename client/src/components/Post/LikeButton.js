import { useState, useEffect, useContext } from "react";
import { UidContext } from "../AppContext";
import { useDispatch } from "react-redux";

// ReactJs Popup est un bibliotheque pour généré un popup au clic
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { likePost } from "../../actions/post.actions";

const LikeButton = ({ post }) => {
  const [liked, setLiked] = useState(false);

  // Nous n'avons besoind que de l'id de l'utilsateur connecter
  const uid = useContext(UidContext);

  const dispatch = useDispatch();

  useEffect(() => {
    //  Si le tableau de like du post contient l'id de l'utilsateur connecter
    if (post.likers.includes(uid)) setLiked(true);
  }, [uid, post.likers, liked]);

  const like = () => {
    dispatch(likePost(post._id, uid));
    setLiked(true);
  };

  const unlike = () => {};

  return (
    <div className="like-container">
      {uid === null && (
        <Popup
          trigger={<img src="./img/icons/heart.svg" alt="like" />}
          position={["bottom center", "right bottom", "bottom left"]}
          closeOnDocumentClick
        >
          <div>Connectez-vous pour aimer un post !</div>
        </Popup>
      )}
      {uid && liked === false && (
        <img src="./img/icons/heart.svg" onClick={like} alt="like" />
      )}
      {uid && liked && (
        <img src="./img/icons/heart-filled.svg" onClick={unlike} alt="unlike" />
      )}
    </div>
  );
};

export default LikeButton;
