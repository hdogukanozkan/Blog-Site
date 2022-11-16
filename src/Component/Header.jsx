import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="container header">
      <h1>HDO</h1>

      <div>
        <Link to={`/`}>
          <span>Home</span>
        </Link>
        <Link to={`/blog/`}>
          <span>Blog</span>
        </Link>

        <Link to={`/admin/`}>
          <span>Admin Panel</span>
        </Link>
      </div>
    </header>
  );
}

export default Header;
/*

  <Link to={`/admin`}>
        <i className="fa-solid fa-user-secret"></i>
      </Link>

*/