import React, { useEffect, useState } from "react";
import "./scss/app.scss";
import Header from "./Component/Header";
import Blogs from "./Component/Blogs";
import Axios from "axios";
import Admin from "./Component/Admin";
import Edit from "./Component/Edit";
import Details from "./Component/Blog-details";
import Blog from "./Component/Blog";
import Footer from "./Component/Footer";
import { Route, Routes } from "react-router-dom";

const api = "https://react-blog-sites.herokuapp.com/yazi/";

function App() {
  const [search, setSearch] = useState("");
  const [blog, setBlog] = useState([]);

  useEffect(() => {
    Axios.get(api)
      .then((res) => res.data)
      .then((data) => setBlog(data))
      .catch((err) => console.error(err));

    console.log("çalıştı mı test 123");
  }, []);

  /* Burada blog verilerinin güncelliğini sağlıyoruz */

  /* Blog ekleme kısmı*/
  const blogAdd = async (e) => {
    await Axios.post(api, {
      title: e.target.blogTitle.value,
      img: e.target.blogImage.value,
      text: e.target.blogText.value,
      date: new Date().toLocaleDateString(),
      yorumlar: [],
    });
    Axios.get(`api`)
      .then((res) => res.data)
      .then((data) => setBlog(data))
      .catch((err) => console.error(err));
  };

  /* search bardan gelen input verisi */
  const searchFilter = (e) => {
    setSearch(e.target.value.toLowerCase());
  };

  /* Blog siliyoruz */
  const deleteBlog = (sil) => {
    const newBlogList = blog.filter((b) => b.id !== sil.id);

    Axios.delete(`$api ${sil.id}`);
    setBlog(newBlogList);
  };

  const editBlogs = async (id, updatedBlog) => {
    await Axios.put(`$api ${id}`, updatedBlog);
    Axios.get(`api`)
      .then((res) => res.data)
      .then((data) => setBlog(data))
      .catch((err) => console.error(err));
  };

  let filterblog = blog
    .sort((a, b) => (a.id > b.id ? -1 : b.id > a.id ? 1 : 0))
    .filter((yazi) => {
      return yazi.title.toLowerCase().includes(search);
    });

  let lastBlog = blog.slice(0, 6);

  return (
    <div className="App">
      <Header />

      <Routes>
        <Route
          path="/"
          element={
            <div className="container AllBlogs">
              <h1>Yeni Haberler</h1>
              <div className=" blogs">
                {lastBlog.map((blog, idx) => (
                  <Blog blog={blog} key={idx} />
                ))}
              </div>
            </div>
          }
        />
        <Route
          path="/blog/"
          element={<Blogs blogs={filterblog} search={searchFilter} />}
        />
        <Route
          path="/admin/edit/:id"
          element={<Edit editBlogs={editBlogs} />}
        />
        <Route path="/blog/:id" element={<Details />} />
        <Route
          path="/admin"
          element={
            <Admin deleteBlog={deleteBlog} blogAdd={blogAdd} bloglar={blog} />
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
