import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updatePost } from "../../actions/post.actions";
import FollowHandler from "../FollowHandler";
import { dateParser, isEmpty } from "../Utils";
import CardComments from "./CardComments";
import DeleteCard from "./DeleteCard";
import LikeButton from "./LikeButton";

const Card = ({ post }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdated, setIsUpdated] = useState(false);
  const [textUpdate, setTextUpdate] = useState("");
  const [showComments, setShowComments] = useState(false);

  // Nous avons besoins des données de touts les utilisateur pour savoir les like / id des user
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const updateItem = () => {
    if (textUpdate) {
      dispatch(updatePost(post._id, textUpdate));
    }
    setIsUpdated(false);
  };

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    !isEmpty(usersData[0] && setIsLoading(false)); // On vérifie qu'il y a des données dans usersData et si il y en a, passé loading à false
  }, [usersData]);

  return (
    <li className="card-container">
      {/* Si nos données sont en train de charger, afficher un loading */}
      {isLoading ? (
        <i className="fas fa-spinner fa-spin"></i>
      ) : (
        <>
          <div className="card-left">
            <img
              src={
                !isEmpty(usersData[0]) && // On vérifie si les données sont fausse sinon il y auras isntantanément une érreur
                usersData
                  .map((user) => {
                    if (user._id === post.posterId) return user.picture;
                    // On vérifie a chaque boucle que le user._id corresponde posterId
                    else return null;
                  })
                  .join("") // .join("") permet qu'entre chaque élément il n'y ai rien, de base il y aurais des , et donc un src faux
              }
              alt="poster-pic"
            />
          </div>
          <div className="card-right">
            <div className="card-header">
              <div className="pseudo">
                <h3>
                  {!isEmpty(usersData[0]) && // On vérifie si les données sont fausse sinon il y auras isntantanément une érreur
                    usersData.map((user) => {
                      if (user._id === post.posterId) return user.pseudo;
                      // On vérifie a chaque boucle que le user._id corresponde posterId
                      else return null;
                    })}
                </h3>
                {/* Permet de ne pas afficher la bouton like sur les post de la personne connecter */}
                {post.posterId !== userData._id && (
                  <FollowHandler idToFollow={post.posterId} type={"card"} />
                )}
              </div>
              <span>{dateParser(post.createdAt)}</span>
            </div>
            {isUpdated === false && <p>{post.message}</p>}
            {isUpdated && (
              <div className="update-post">
                <textarea
                  defaultValue={post.message}
                  onChange={(e) => setTextUpdate(e.target.value)}
                />
                <div className="button-container">
                  <button className="btn" onClick={updateItem}>
                    Valider modifications
                  </button>
                </div>
              </div>
            )}
            {post.picture && (
              <img src={post.picture} alt="card-pic" className="card-pic" />
            )}
            {post.video && (
              <iframe
                title={post._id}
                width="500"
                height="300"
                src={post.video}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            )}
            {userData._id === post.posterId && (
              <div className="button-container">
                <div onClick={() => setIsUpdated(!isUpdated)}>
                  <img src="./img/icons/edit.svg" alt="edit" />
                </div>
                <DeleteCard id={post._id} />
              </div>
            )}
            <div className="card-footer">
              <div
                onClick={() => setShowComments(!showComments)}
                className="comment-icon"
              >
                <img src="./img/icons/message1.svg" alt="comment" />
                <span>{post.comments.length}</span>
              </div>
              <div className="like-container">
                <LikeButton post={post} />
                <span>{post.likers.length}</span>
              </div>

              <img src="./img/icons/share.svg" alt="share" />
            </div>
            {showComments && <CardComments post={post} />}
          </div>
        </>
      )}
    </li>
  );
};

export default Card;
