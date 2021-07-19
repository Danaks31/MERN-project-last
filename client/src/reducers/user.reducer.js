import {
  GET_USER,
  UPLOAD_PICTURE,
  UPDATE_BIO,
  FOLLOW_USER,
  UNFOLLOW_USER,
} from "../actions/user.actions";

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
    case FOLLOW_USER:
      return {
        ...state,
        following: [action.payload.idToFollow, ...state.following], // On ajoute dans le tableau de suivis, l'id qui est contenus dans le payload ainsi que le contenus qui été déjà dans le tableau grace au spread operator
      };
    case UNFOLLOW_USER:
      return {
        ...state,
        following: state.following.filter(
          (id) => id !== action.payload.idToUnfollow
        ),
      };

    default:
      return state;
  }
}
