import React, { useState, useEffect, createContext } from "react";
import axios from "axios";

// context
const PostContext = createContext();

const PostProvider = ({ children }) => {
  // state
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  // get Posts
  const getAllPosts = async () => {
    setLoading(false);
    try {
      const { data } = await axios.get("/post/get-all-post");
      setLoading(false);
      setPosts(data?.posts);
    } catch (error) {
      console.log();
      setLoading(false);
    }
  };

  //   initial Posts
  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <PostContext.Provider value={[posts, setPosts, getAllPosts]}>
      {children}
    </PostContext.Provider>
  );
};

export { PostContext, PostProvider };
