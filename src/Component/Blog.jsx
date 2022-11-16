import { Link } from "react-router-dom";

function Blog({ blog }) {
  return (
    <div className="blog-container">
      <Link to={`/blog/${blog.id}`}>
        <img src={blog.img} alt="" />
      </Link>
      <div className="box-container">
        <Link to={`/blog/${blog.id}`}>
          <h2>{blog.title}</h2>
        </Link>
        <p>{blog.text.substring(0, 150) + " [...]"}</p>
        <span className="date">{blog.date}</span>
      </div>
    </div>
  );
}

export default Blog;
