import { useEffect, useState } from "react";
import API from "../services/api";
import PostCard from "../components/PostCard";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    const res = await API.get("/posts");
    setPosts(res.data);
  };

  const createPost = async () => {
    await API.post("/posts", {
      content,
      postedByType: "Veteran",
      postedBy: "PASTE_VETERAN_ID"
    });
    setContent("");
    loadPosts();
  };

  return (
    <div className="container">
      <div className="card p-3 mb-3">
        <h5>Create Post</h5>
        <textarea
          className="form-control mb-2"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button className="btn btn-primary" onClick={createPost}>
          Post
        </button>
      </div>

      {posts.map((p) => (
        <PostCard key={p._id} post={p} />
      ))}
    </div>
  );
}
