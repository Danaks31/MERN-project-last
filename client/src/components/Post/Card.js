import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { isEmpty } from "../Utils";

const Card = ({ post }) => {
  const [isLoading, setIsLoading] = useState(true);

  // Nous avons besoins des données de touts les utilisateur pour savoir les like / id des user
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    !isEmpty(usersData[0] && setIsLoading(false));
  }, [userData]);

  return (
    <li className="card-container">
      {/* Si nos données sont en train de charger, afficher un loading */}
      {isLoading ? <i className="fas fa-spinner fa-spin"></i> : <h2>test</h2>}
    </li>
  );
};

export default Card;
