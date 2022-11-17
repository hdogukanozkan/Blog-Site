import { Link } from "react-router-dom";

function Urun({ blog, deleteBlog }) {
  //Silme işlemini gerçekleştiriyoruz
  const handleClick = (e) => {
    e.preventDefault();
    deleteBlog(blog);
  };

  return (
    <div className="urun">
      <p className="urunid">{blog.id}-</p>
      <img src={blog.img} alt="bot" />
      <h3>{blog.title}</h3>
      <div className="buttons">
        <Link to={`/admin/edit/${blog.id}`} className="edit">
          Edit
        </Link>
        <button className="delete" onClick={(e) => handleClick(e)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default Urun;
