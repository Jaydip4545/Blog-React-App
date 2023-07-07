import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Blogs from "./pages/Blogs";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateBlog from "./pages/CreateBlog";
import MyBlogs from "./pages/MyBlogs";
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/blog" element={<Blogs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-blogs" element={<CreateBlog />} />
        <Route path="/register" element={<Register />} />
        <Route path="/my-blogs" element={<MyBlogs />} />
      </Routes>
    </>
  );
}

export default App;
