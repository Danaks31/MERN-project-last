import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import FollowHandler from "../FollowHandler";
import { dateParser, isEmpty } from "../Utils";

const Card = ({ post }) => {
  const [isLoading, setIsLoading] = useState(true);

  // Nous avons besoins des données de touts les utilisateur pour savoir les like / id des user
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    !isEmpty(usersData[0] && setIsLoading(false)); // On vérifie qu'il y a des données dans usersData et si il y en a, passé loading à false
  }, [userData]);

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
                    if (user._id === post.posterId) return user.picture; // On vérifie a chaque boucle que le user._id corresponde posterId
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
                      if (user._id === post.posterId) return user.pseudo; // On vérifie a chaque boucle que le user._id corresponde posterId
                    })}
                </h3>
                {post.posterId !== userData._id && (
                  <FollowHandler idToFollow={post.posterId} type={"card"} />
                )}
              </div>
              <span>{dateParser(post.createdAt)}</span>
            </div>
            <p>{post.message}</p>
            {post.picture && (
              <img src={post.picture} alt="card-pic" className="card-pic" />
            )}
          </div>
        </>
      )}
    </li>
  );
};

export default Card;
