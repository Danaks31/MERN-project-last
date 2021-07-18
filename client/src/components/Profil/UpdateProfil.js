import { useState } from "react";
import LeftNav from "../LeftNav";
import { useSelector, useDispatch } from "react-redux";
import UploadImage from "./UploadImage";
import { updateBio } from "../../actions/user.actions";
import { dateParser } from "../Utils";

const UpdateProfil = () => {
  const userData = useSelector((state) => state.userReducer);
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
          <h5 onClick={() => setFollowersPopUp(true)}>
            Abonnements : {userData.following ? userData.following.length : "0"}
          </h5>
          <h5 onClick={() => setFollowingPopUp(true)}>
            Abonnés : {userData.following ? userData.followers.length : "0"}{" "}
          </h5>
        </div>
      </div>
      {followersPopUp && (
        <div className="popup-profil-container">
          <div className="modal">
            <h3>Abonnements</h3>
            <span className="cross" onClick={() => setFollowersPopUp(false)}>
              &#10005;
            </span>
          </div>
        </div>
      )}
      {followingPopUp && (
        <div className="popup-profil-container">
          <div className="modal">
            <h3>Followers</h3>
            <span className="cross" onClick={() => setFollowingPopUp(false)}>
              &#10005;
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateProfil;
