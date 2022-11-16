import { Link } from "react-router-dom";

function Urun({ blog, deleteBlog }) {
  const handleClick = (e) => {
    e.preventDefault();
    deleteBlog(blog);
  };

  const handleEditClick = () => {
    console.log("CLİCK");
  };

  return (
    <div className="urun">
      <p className="urunid">{blog.id}-</p>
      <img src={blog.img} alt="bot" />
      <h3>{blog.title}</h3>
      <div className="buttons">
        <Link
          to={`/admin/edit/${blog.id}`}
          className="edit"
          onClick={handleEditClick}
        >
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
