import { useState } from "react";
import LeftNav from "../LeftNav";
import { useSelector, useDispatch } from "react-redux";
import UploadImage from "./UploadImage";
import { updateBio } from "../../actions/user.actions";
import { dateParser } from "../Utils";
import FollowHandler from "../FollowHandler";

const UpdateProfil = () => {
  // Information sur UN user
  const userData = useSelector((state) => state.userReducer);
  // Info' sur TOUT les user
  const usersData = useSelector((state) => state.usersReducer);
  const [bio, setBio] = useState("");
  // Bolean qui permettra de savoir si la bio est sous forme de texte ou de textearea
  const [updateForm, setUpdateForm] = useState(false);
  const dispatch = useDispatch();

  const [followersPopUp, setFollowersPopUp] = useState(false);
  const [followingPopUp, setFollowingPopUp] = useState(false);

  const handleChange = (e) => {
    dispatch(updateBio(userData._id, bio));
    setUpdateForm(false);
  };

  return (
    <div className="profil-container">
      <LeftNav />
      <h1>Profil de {userData.pseudo}</h1>
      <div className="update-container">
        <div className="left-part">
          <h3>Photo de profil</h3>
          <img src={userData.picture} alt="user-pic" />
          <UploadImage />
        </div>
        <div className="right-part">
          <div className="bio-update">
            <h3>Bio</h3>
            {updateForm === false && (
              <>
                <p onClick={() => setUpdateForm(!updateForm)}>{userData.bio}</p>
                <button onClick={() => setUpdateForm(!updateForm)}>
                  Modifier bio
                </button>
              </>
            )}
            {updateForm && (
              <>
                <textarea
                  autoFocus={true}
                  type="text"
                  defaultValue={userData.bio}
                  onChange={(e) => setBio(e.target.value)}
                ></textarea>
                <button onClick={handleChange}>
                  Valider les modifications
                </button>
              </>
            )}
          </div>
          <h4>Membre depuis le {dateParser(userData.createdAt)}</h4>
          <h5 onClick={() => setFollowingPopUp(true)}>
            Abonnements : {userData.following ? userData.following.length : "0"}
          </h5>
          <h5 onClick={() => setFollowersPopUp(true)}>
            Abonnés : {userData.followers ? userData.followers.length : "0"}
          </h5>
        </div>
      </div>
      {followersPopUp && (
        <div className="popup-profil-container">
          <div className="modal">
            <h3>Abonnés</h3>
            <span className="cross" onClick={() => setFollowersPopUp(false)}>
              &#10005;
            </span>
            <ul>
              {/* On boucle sur la liste des utilisateurs */}
              {usersData.map((user) => {
                // On boucle l'action autant de fois que notre user connecté à de follower dans le tableau
                for (let i = 0; i < userData.followers.length; i++) {
                  // On vérifie quel id corréspond au id dans notre tableau de follower et on les affiche en boucle
                  if (user._id === userData.followers[i]) {
                    return (
                      <li key={user._id}>
                        <img src={user.picture} alt="user-pic" />
                        <h4>{user.pseudo}</h4>
                        <div className="follow-handler">
                          <FollowHandler
                            idToFollow={user._id}
                            type={"suggestion"}
                          />
                        </div>
                      </li>
                    );
                  }
                }
                return null;
              })}
            </ul>
          </div>
        </div>
      )}
      {followingPopUp && (
        <div className="popup-profil-container">
          <div className="modal">
            <h3>Abonnements</h3>
            <span className="cross" onClick={() => setFollowingPopUp(false)}>
              &#10005;
            </span>
            <ul>
              {/* On boucle sur la liste des utilisateurs */}
              {usersData.map((user) => {
                // On boucle l'action autant de fois que notre user connecté à de follower dans le tableau
                for (let i = 0; i < userData.following.length; i++) {
                  // On vérifie quel id corréspond au id dans notre tableau de follower et on les affiche en boucle
                  if (user._id === userData.following[i]) {
                    return (
                      <li key={user._id}>
                        <img src={user.picture} alt="user-pic" />
                        <h4>{user.pseudo}</h4>
                        <div className="follow-handler">
                          <FollowHandler
                            idToFollow={user._id}
                            type={"suggestion"}
                          />
                        </div>
                      </li>
                    );
                  }
                }
                return null;
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateProfil;
