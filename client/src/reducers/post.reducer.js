import { GET_POSTS, LIKE_POST, UNLIKE_POST } from "../actions/post.actions";

const initialState = {};

export default function postReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS: {
      return action.payload;
    }
    case LIKE_POST: {
      // On boucle sur la liste des post
      return state.map((post) => {
        // On séléctionne le post qui corréspond à l'id dans la requête ( payload )
        if (post._id === action.payload.postId) {
          return {
            // tout le contenus du post
            ...post,
            // On ajoute au tableau des like du post, l'id de notre utilisateur ainsi que toute les données qui y été déjà via le spread operator
            likers: [action.payload.userId, ...post.likers],
          };
        }
        return post; // Si on entre pas dans le if ( pour tout les post qui ne correseponde pas à l'id, return le post, sinon on auras une liste de post 'null' et un valide)
      });
    }
    case UNLIKE_POST: {
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          return {
            ...post,
            likers: post.likers.filter((id) => id !== action.payload.userId), // retourne tout les post qui ne corresponde pas à l'id
          };
        }
        return post;
      });
    }
    default: {
      return state;
    }
  }
}
