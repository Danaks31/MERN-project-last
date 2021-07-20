import { GET_POSTS, LIKE_POST } from "../actions/post.actions";

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
        if (post.id === action.payload.postId) {
          return {
            // tout le contenus du post
            ...post,
            // On ajoute au tableau des like du post, l'id de notre utilisateur ainsi que toute les données qui y été déjà via le spread operator
            likers: [action.payload.userId, ...post.likers],
          };
        }
      });
    }
    default: {
      return state;
    }
  }
}
