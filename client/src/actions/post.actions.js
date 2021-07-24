import axios from "axios";

// posts
export const GET_POSTS = "GET_POSTS";
export const LIKE_POST = "LIKE_POST";
export const UNLIKE_POST = "UNLIKE_POST";
export const UPDATE_POST = "UPDATE_POST";
export const DELETE_POST = "DELETE_POST";
export const EDIT_COMMENT = "EDIT_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";

// comments
export const ADD_COMMENT = "ADD_COMMENT";

export const getPosts = (num) => {
  return (dispatch) => {
    return axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/post`,
    })
      .then((res) => {
        // On créé un tableaux qui va contenir de 0 à {num} post, num étant de +5 à chaque fin de scroll (Thread.js)
        const array = res.data.slice(0, num);
        dispatch({ type: GET_POSTS, payload: array });
      })
      .catch((err) => console.log(err));
  };
};

// Nous avons besoins du postId pour savoir quel post nous devons modifier, du userId pour savoir qui like
export const likePost = (postId, userId) => {
  return (dispatch) => {
    dispatch({ type: LIKE_POST, payload: { postId, userId } });

    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/post/like-post/` + postId,
      data: { id: userId },
    })
      .then((res) => {
        // On envois à notre reducer le type ainsi que le le postId et le userId de notre requete
      })
      .catch((err) => {
        dispatch({ type: UNLIKE_POST, payload: { postId, userId } });
        console.log(err);
      });
  };
};

export const unlikePost = (postId, userId) => {
  return (dispatch) => {
    dispatch({ type: UNLIKE_POST, payload: { postId, userId } });
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/post/unlike-post/` + postId,
      data: { id: userId },
    })
      .then((res) => {})
      .catch((err) => {
        dispatch({ type: UNLIKE_POST, payload: { postId, userId } });
      });
  };
};

export const updatePost = (postId, message) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/post/${postId}`,
      data: { message },
    })
      .then((res) => {
        dispatch({ type: UPDATE_POST, payload: { postId, message } });
      })
      .catch((err) => console.log(err));
  };
};

export const deletePost = (postId) => {
  return (dispatch) => {
    return axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}api/post/${postId}`,
    })
      .then((res) => {
        dispatch({ type: DELETE_POST, payload: { postId } });
      })
      .catch((err) => console.log(err));
  };
};

export const addComment = (postId, commenterId, text, commenterPseudo) => {
  return (dispatch) => {
    dispatch({ type: ADD_COMMENT, payload: { postId } });
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/post/comment-post/${postId}`,
      data: { commenterId, text, commenterPseudo },
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
};

export const editComment = (postId, commentId, text) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/post/edit-comment-post/${postId}`,
      data: { commentId, text },
    })
      .then((res) => {
        dispatch({ type: EDIT_COMMENT, payload: { postId, commentId, text } });
      })
      .catch((err) => console.log(err));
  };
};

export const deleteComment = (postId, commentId) => {
  console.log("deleteComment avant dispatch");
  return (dispatch) => {
    console.log("deleteComment après dispatch");
    console.log("postId", postId);
    console.log("commentId", commentId);

    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/post/delete-comment-post/${postId}`,
      data: { commentId },
    })
      .then((res) => {
        console.log("Réponse", res);
        dispatch({ type: DELETE_COMMENT, payload: { postId, commentId } });
      })
      .catch((err) => console.log("Erreur deleteComment post.actions", err));
  };
};
