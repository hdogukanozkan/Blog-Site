import Add from "./Add";
import Remove from "./Remove";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Admin({ blogAdd, bloglar, deleteBlog }) {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="admin-container">
      <div className="panel">
        <img
          src="https://st2.depositphotos.com/2777531/8692/v/950/depositphotos_86924194-stock-illustration-bold-eagle-bird.jpg"
          alt="kartal"
        />
        <h3>Blog sayısı: {bloglar.length}</h3>
        <div
          className="btn"
          onClick={() => {
            navigate("/");
          }}
        >
          Anasayfaya git.
        </div>
        <div
          className="btn active"
          onClick={(e) => {
            e.target.parentElement.children[4].classList.remove("active");

            e.target.classList.add("active");

            document.getElementsByClassName("add-new-blog")[0].style.display =
              "none";
            document.getElementsByClassName("archive")[0].style.display =
              "block";
          }}
        >
          Blogları Yönet
        </div>
        <div
          className="btn "
          onClick={(e) => {
            e.target.parentElement.children[3].classList.remove("active");

            e.target.classList.add("active");

            document.getElementsByClassName("add-new-blog")[0].style.display =
              "block";
            document.getElementsByClassName("archive")[0].style.display =
              "none";
          }}
        >
          Blog ekle
        </div>
        <br></br>
        <hr></hr>
      </div>
      <div className="container">
        <Add blogAdd={blogAdd} />

        <Remove bloglar={bloglar} deleteBlog={deleteBlog} />
      </div>
    </div>
  );
}

export default Admin;
