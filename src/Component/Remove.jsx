import Urun from "./Urun";
import { useAutoAnimate } from "@formkit/auto-animate/react";

function UrunListesi({ bloglar, deleteBlog }) {
  const [parent] = useAutoAnimate();

  return (
    <div className="archive" ref={parent}>
      <h2>Blog Listesi</h2>
      <div className="admin-urun-container">
        {bloglar.map((blog) => (
          <Urun blog={blog} key={blog.id} deleteBlog={deleteBlog} />
        ))}
      </div>
    </div>
  );
}

export default UrunListesi;
