import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "../actions/post.actions";
import { isEmpty } from "./Utils";

import Card from "./Post/Card";

const Thread = () => {
  const [count, setcount] = useState(5);
  const [loadPost, setLoadPost] = useState(true);
  const dispatch = useDispatch();

  const loadMore = () => {
    // On vérifie si la position du scroll actuelle est supérieur à la hauteur max de la page
    // La position actuelle + la partie haute du scroll +1 par rapport au max
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >
      document.scrollingElement.scrollHeight
    ) {
      setLoadPost(true); // On passe loadPost à true ce qui va lancer le useeffect
    }
  };

  useEffect(() => {
    // Si loadpost est true, recupere tout les posts, puis passe loadpost sur false
    if (loadPost) {
      dispatch(getPosts(count));
      setLoadPost(false);
      setcount(count + 5);
    }

    window.addEventListener("scroll", loadMore);
    return () => window.removeEventListener("scroll", loadMore);
  }, [loadPost, dispatch, count]);

  const postsData = useSelector((state) => state.postReducer);

  return (
    <>
      <div className="thread-container">
        <ul>
          {!isEmpty(postsData[0]) &&
            postsData.map((post) => {
              return <Card post={post} key={post._id} />;
            })}
        </ul>
      </div>
    </>
  );
};

export default Thread;
