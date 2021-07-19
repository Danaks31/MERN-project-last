import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "../actions/post.actions";
import { isEmpty } from "./Utils";

import Card from "./Post/Card";

const Thread = () => {
  const [loadPost, setLoadPost] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    // Si loadpost est true, recupere tout les posts, puis passe loadpost sur false
    if (loadPost) {
      dispatch(getPosts);
      setLoadPost(false);
    }
  }, [loadPost, dispatch]);

  const postsData = useSelector((state) => state.postReducer);

  console.log(postsData);

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
