import axios from "axios";

// On créé des nommage que l'on va ensuite lié avec une action
export const GET_USER = "GET_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";
export const UPDATE_BIO = "UPDATE_BIO";

export const getUser = (uid) => {
  // dispatch envois les donner à notre reducer
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/user/${uid}`)
      .then((res) => {
        dispatch({ type: GET_USER, payload: res.data });
      })
      .catch((err) => console.logg(err));
  };
};

// export const uploadPicture = (data, id) => {
//   console.log("Je rentre", id);
//   return (dispatch) => {
//     console.log("dispatch ", data.get("file"));
//     return axios
//       .post(`${process.env.REACT_APP_API_URL}api/user/upload`, data, {
//         headers: { "Content-Type": "multipart/form-data" },
//       })
//       .then((res) => {
//         console.log("res axios :", res);
//         // Ici nou sommes obliger de refaire un get étant donner que l'image de profile est unique et donc on doit récuperer le chemin déjà existant
//         return axios
//           .get(`${process.env.REACT_APP_API_URL}api/user/${id}`)
//           .then((res) => {
//             console.log("res axios 2 : ", res);
//             dispatch({ type: UPLOAD_PICTURE, payload: res.data.picture }); // On change le chemin dans le reducer pour changer l'affichage en front
//           })
//           .catch((err) => console.log(err));
//       });
//   };
// };

export const uploadPicture = (data, id) => {
  return (dispatch) => {
    return axios
      .post(`${process.env.REACT_APP_API_URL}api/user/upload`, data)
      .then((res) => {
        if (res.data.errors) {
          console.log(res.data.errors);
        } else {
          // dispatch({ type: GET_USER_ERRORS, payload: "" });
          return axios
            .get(`${process.env.REACT_APP_API_URL}api/user/${id}`)
            .then((res) => {
              dispatch({ type: UPLOAD_PICTURE, payload: res.data.picture });
            });
        }
      })
      .catch((err) => console.log(err));
  };
};

export const updateBio = (userId, bio) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/user/` + userId,
      data: { bio },
    })
      .then((res) => {
        dispatch({ type: UPDATE_BIO, payload: bio });
      })
      .catch((err) => console.log(err));
  };
};
