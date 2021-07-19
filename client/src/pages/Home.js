import React from "react";

// Components import
import LeftNav from "../components/LeftNav";
import Thread from "../components/Thread";

const Home = () => {
  return (
    <div className="home">
      <LeftNav />
      <div className="main">
        <Thread />
      </div>
    </div>
  );
};

export default Home;
