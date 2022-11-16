import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Axios from "axios";

function Edit({ editBlogs }) {
  const navigate = useNavigate();
  const [edit, setEdit] = useState({
    title: "",
    img: "",
    text: "",
  });
  // const [newEdit, setNewEdit] = useState();

  const handleClick = (e) => {
    e.preventDefault();
    editBlogs(id, edit);
    navigate("/admin/");
  };

  const handleChange = (e) => {
    console.log(e.target.name);
    setEdit((route) => ({
      ...route,
      [e.target.name]: e.target.value,
    }));
  };

  const { id } = useParams();

  useEffect(() => {
    async function fetchApi() {
      Axios.get(`https://react-blog-sites.herokuapp.com/yazi/${id}`)
        .then((res) => res.data)
        .then((data) =>
          setEdit({
            id: data.id,
            title: data.title,
            img: data.img,
            text: data.text,
            date: data.date,
            yorumlar: data.yorumlar,
          })
        )
        .catch((err) => console.error(err));
    }

    fetchApi();
  }, [id]);

  /*   
 useEffect(async () => {
    

  }, []);
   */
  return (
    <div className="edit-new-blog">
      <h1>Blog Editlesene kardeş. </h1>
      <form onSubmit={handleClick}>
        <div className="box">
          <label htmlFor="blogTitle">Title:</label>
          <input
            type="text"
            id="blogTitle"
            placeholder="enter to title..."
            required
            name="title"
            value={edit.title}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="box">
          <label htmlFor="blogImage">Image:</label>
          <input
            type="text"
            id="blogImage"
            placeholder="enter to title..."
            required
            name="img"
            value={edit.img}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="box">
          <label htmlFor="blogText">Blog Text:</label>
          <textarea
            type="text"
            id="blogText"
            placeholder="enter to blog..."
            required
            name="text"
            value={edit.text}
            onChange={(e) => handleChange(e)}
          />
        </div>

        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default Edit;
