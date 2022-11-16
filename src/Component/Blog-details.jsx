import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const api = "https://react-blog-sites.herokuapp.com/yazi";

function Details() {
  const [parent] = useAutoAnimate();
  const [blog, setBlog] = useState({
    title: "",
    img: "",
    text: "",
    date: "",
    yorumlar: [],
  });

  const [yorum, setYorum] = useState({
    message: "",
    date: "",
  });
  const { id } = useParams();

  const [digerBloglar, setDigerBloglar] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);

    const idmiz = id;
    async function fetchApi() {
      const response = await Axios.get(`${api} ${idmiz}`);
      setBlog({
        date: response.data.date,
        id: response.data.id,
        title: response.data.title,
        img: response.data.img,
        text: response.data.text,
        yorumlar: response.data.yorumlar,
      });
    }
    fetchApi();
  }, [id]);

  useState(() => {
    window.scrollTo(0, 0);
    async function getRandom() {
      const response = await Axios.get(api);
      var shuffled = response.data.sort(function () {
        return 0.5 - Math.random();
      });
      setDigerBloglar(shuffled);
    }

    getRandom();
  }, []);

  let n = 5;

  var selected = digerBloglar.slice(0, n);

  const editBlogs = async (yorum) => {
    const newBlog = {
      title: blog.title,
      img: blog.img,
      text: blog.text,
      date: blog.date,
      yorumlar: [...blog.yorumlar, yorum],
    };

    await Axios.put(`$api ${id}`, newBlog);
  };

  const handleYorumYaz = (e) => {
    e.preventDefault();
    setBlog({
      title: blog.title,
      img: blog.img,
      text: blog.text,
      date: blog.date,
      yorumlar: [...blog.yorumlar, yorum],
    });

    editBlogs(yorum);
    let spaceYorum = {
      yorum: "",
      date: "",
    };
    setYorum(spaceYorum);
    e.target.Yorumumuz.value = "";
  };

  return (
    <div className="container blog-page">
      <h1>{blog.title}</h1>
      <div className="grid-test">
        <div className="content">
          <img src={blog.img} alt={"test"} />
          <p>{blog.text}</p>
          <div className="yorumlar">
            <h2>Yorumlar</h2>
            <div className="yorum-yaz">
              <form onSubmit={(e) => handleYorumYaz(e)} className="yorum-text">
                <textarea
                  placeholder="Text to message..."
                  required
                  id="Yorumumuz"
                  value={yorum.message}
                  onChange={(e) => {
                    setYorum({
                      message: e.target.value,
                      date: new Date().toLocaleTimeString(),
                    });
                  }}
                />
                <button className="yorum-gonder" type="Submit">
                  Yaz.
                </button>
              </form>
            </div>
            <div className="yorumlari-listele" ref={parent}>
              {blog.yorumlar.map((yorum, idx) => (
                <div className="Message" key={idx}>
                  <div className="avatar">
                    <img
                      src="https://avatars.githubusercontent.com/u/77576605?v=4"
                      alt="avatar"
                    />
                    <h3>Hanifi Doğukan Özkan</h3>
                  </div>
                  <p>
                    {yorum.message}
                    <span>{yorum.date}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="oneriler">
          {selected.map((populer) => (
            <div className="blog-container" key={populer.id}>
              <Link to={`/blog/${populer.id}`}>
                <img src={populer.img} alt="" />
              </Link>
              <div className="box-container">
                <Link to={`/blog/${populer.id}`}>
                  <h2>{populer.title}</h2>
                </Link>
                <span className="date">{populer.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Details;
