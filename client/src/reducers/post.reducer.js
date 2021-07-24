import {
  GET_POSTS,
  LIKE_POST,
  UNLIKE_POST,
  UPDATE_POST,
  DELETE_POST,
  EDIT_COMMENT,
  DELETE_COMMENT,
} from "../actions/post.actions";

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

    case UPDATE_POST:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          return {
            ...post,
            message: action.payload.message,
          };
        } else return post;
      });

    case DELETE_POST:
      return state.filter((post) => post._id !== action.payload.postId);

    case EDIT_COMMENT:
      // On veux mettre à jour un commentaire qui est contenus dans un post, on map sur les post pour récuperer tout les post
      return state.map((post) => {
        // On selectionne le post qui corréspond à l'id du post en question
        if (post._id === action.payload.postId) {
          return {
            ...post,
            // On map sur le array des comments, puis on fait une confition pour cibler seulement celui qui correspond à l'id de la req
            comments: post.comments.map((comment) => {
              if (comment._id === action.payload.commentId) {
                return {
                  ...comment, // On recupere la totalité du comment
                  text: action.payload.text, // On met à jour son text
                };
              } else {
                // Si nous n'avons pas de resultat return comment pour ne pas écraser les comment par vide
                return comment;
              }
            }),
          };
        } else return post; // Sinon si pas de resultat, return le post
      });

    case DELETE_COMMENT:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          return {
            ...post,
            comments: post.comments.filter(
              (comment) => comment._id !== action.payload.commentId
            ),
          };
        } else return post;
      });

    default: {
      return state;
    }
  }
}
