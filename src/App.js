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
import { SpinnerCircularSplit } from "spinners-react";

const api = "http://localhost:3002/yazi";
//https://blogs-api-production-2ef0.up.railway.app/yazi

function App() {
  const [search, setSearch] = useState("");
  const [blog, setBlog] = useState([]);
  const [loading, setLoading] = useState(true);

  // Sayfa yüklendiğinde api'dan verileri çekiyoruz ve state içine aktarıyoruz.
  useEffect(() => {
    Axios.get(api)
      .then((res) => res.data)
      .then((data) => setBlog(data))
      .catch((err) => console.error(err));

    console.log("çalıştı mı test 123");

    setTimeout(() => {
      setLoading(false);
    }, 250);
  }, []);

  /* Blog ekleme kısmı*/
  const blogAdd = async (e) => {
    await Axios.post(api, {
      title: e.target.blogTitle.value,
      img: e.target.blogImage.value,
      text: e.target.blogText.value,
      date: new Date().toLocaleDateString(),
      yorumlar: [],
    });
    Axios.get(`${api}`)
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

    Axios.delete(`${api}/${sil.id}`);
    setBlog(newBlogList);
  };

  // Blogları güncelliyoruz
  const editBlogs = async (id, updatedBlog) => {
    await Axios.put(`${api}/${id}`, updatedBlog);
    Axios.get(`${api}`)
      .then((res) => res.data)
      .then((data) => setBlog(data))
      .catch((err) => console.error(err));
  };

  // Blogları filtreleme ve sıralama işlemlerini gerçekleştiriyoruz
  let filterblog = blog
    .sort((a, b) => (a.id > b.id ? -1 : b.id > a.id ? 1 : 0))
    .filter((yazi) => {
      return yazi.title.toLowerCase().includes(search);
    });

  //Ana sayfada 6 tane Blog gösterilmesini istiyoruz.
  let lastBlog = blog.slice(0, 6);

  return (
    <div className="App">
      {loading ? (
        <SpinnerCircularSplit
          size={50}
          thickness={180}
          speed={100}
          color="rgba(255, 255, 255, 1)"
          secondaryColor="rgba(57, 118, 172, 1)"
        />
      ) : (
        <>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Header />
                  <div className="container AllBlogs">
                    <h1>Yeni Haberler</h1>
                    <div className=" blogs">
                      {lastBlog.map((blog, idx) => (
                        <Blog blog={blog} key={idx} />
                      ))}
                    </div>
                  </div>
                  <Footer />
                </>
              }
            />
            <Route
              path="/blog/"
              element={
                <>
                  <Header />
                  <Blogs blogs={filterblog} search={searchFilter} />
                  <Footer />
                </>
              }
            />
            <Route
              path="/admin/edit/:id"
              element={
                <>
                  <Header />
                  <Edit editBlogs={editBlogs} />
                  <Footer />
                </>
              }
            />
            <Route path="/blog/:id" element={<Details />} />
            <Route
              path="/admin"
              element={
                <>
                  <Header />
                  <Admin
                    deleteBlog={deleteBlog}
                    blogAdd={blogAdd}
                    bloglar={blog}
                  />
                  <Footer />
                </>
              }
            />
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;
