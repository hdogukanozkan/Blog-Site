import React, { useEffect, useState } from "react";
import Blog from "./Blog";
import { useAutoAnimate } from "@formkit/auto-animate/react";

function Blogs({ blogs, search }) {
  const [parent] = useAutoAnimate();
  const [n, setN] = useState(10);

  let lastBlog = blogs.slice(0, n);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className=" container AllBlogs">
      <div className="searchdiv">
        <input
          className="searchbar"
          type="text"
          placeholder="Search to blog..."
          onChange={(e) => {
            search(e);
          }}
        />
      </div>
      <div className=" blogs" ref={parent}>
        {lastBlog.map((blog, idx) => (
          <Blog blog={blog} key={idx} />
        ))}
      </div>
      <div className="dahafazla">
        <button onClick={() => setN(n + 10)}>More...</button>
      </div>
    </div>
  );
}

export default Blogs;
