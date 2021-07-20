import axios from "axios";

// posts
export const GET_POSTS = "GET_POSTS";
export const LIKE_POST = "LIKE_POST";
export const UNLIKE_POST = "UNLIKE_POST";

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
      cata: { id: userId },
    })
      .then((res) => {})
      .catch((err) => {
        dispatch({ type: UNLIKE_POST, payload: { postId, userId } });
      });
  };
};
