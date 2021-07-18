import { GET_USER, UPLOAD_PICTURE, UPDATE_BIO } from "../actions/user.actions";

const initialState = {};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    // Si le type de l'action est GET_USER ( déclarer dans actions/user.actions.js)
    case GET_USER:
      // return le contenus de l'action
      return action.payload;
    case UPLOAD_PICTURE:
      return {
        ...state, // On récupere toutes les informations déjà existante grâce au spread operator ...
        picture: action.payload, // On change le chemin d'accès de la photo
      };
    case UPDATE_BIO:
      return {
        ...state,
        bio: action.payload,
      };

    default:
      return state;
  }
}
