import React, { useEffect } from "react";
import Blog from "../components/Blog";
import { useState } from "react";
import axios from "axios";
import { get } from "mongoose";
const MyBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  const deleteItem = (e) => {
    getAllBlog();
  };
  const getAllBlog = async () => {
    const user = localStorage.getItem("user");

    const { data } = await axios.get("/api/v1/blog/user-blog/" + user);
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
              deleteItem={deleteItem}
              name={item.user.username}
              content={item.content}
              time={Date(item.createdAt)}
              title={item.title}
              image={item.image}
              flag={true}
              id={item._id}
            ></Blog>
          </div>
        );
      })}
    </div>
  );
};

export default MyBlogs;
