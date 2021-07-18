import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { uploadPicture } from "../../actions/user.actions";

const UploadImage = () => {
  const [file, setFile] = useState();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);

  const handlePicture = (e) => {
    e.preventDefault();
    console.log("target ", file);
    // Fonction Js qui créé un objet qui contient les data que l'on souhaite envoyer à via notre requete
    const data = new FormData();

    data.append("name", userData.pseudo);
    data.append("userId", userData._id);
    data.append("file", file);

    // console.log(data.get("file"));

    // console.log(data);
    // Puis on envois à notre action les data que l'on souhaite passer dans la req.body ainsi que l'id de l'user connecter
    dispatch(uploadPicture(data, userData._id));
  };
  return (
    <form
      onSubmit={handlePicture}
      className="upload-pic"
      // enctype="multipart/formdata"
    >
      <label htmlFor="file">Changer d'image de profil</label>
      <input
        type="file"
        id="file"
        name="file"
        accept=".jpg, .jpeg, .png"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <br />
      <input type="submit" value="Envoyer" />
    </form>
  );
};

export default UploadImage;
