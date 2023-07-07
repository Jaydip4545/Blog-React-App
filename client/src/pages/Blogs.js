import React, { useEffect } from "react";
import Blog from "../components/Blog";
import { useState } from "react";
import axios from "axios";
const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const getAllBlog = async () => {
    const { data } = await axios.get("/api/v1/blog/all-blog");
    setBlogs(data?.blogs);
    console.log(data);
  };
  useEffect(() => {
    getAllBlog();
  }, []);
  return (
    <div>
      {blogs?.map((item) => {
        return (
          <div className="blog-container">
            {" "}
            <Blog
              name={item.user.username}
              content={item.content}
              time={Date(item.createdAt)}
              title={item.title}
              image={item.image}
            ></Blog>
          </div>
        );
      })}
    </div>
  );
};

export default Blogs;
