import { useEffect, useState } from "react";
import API from "../services/api";
import PostCard from "../components/PostCard";

export default function FollowersFeed() {
  const [posts, setPosts] = useState([]);

  const VETERAN_ID = "PASTE_LOGGED_IN_VETERAN_ID";

  useEffect(() => {
    loadFeed();
  }, []);

  const loadFeed = async () => {
    const res = await API.get(`/posts/feed/${VETERAN_ID}`);
    setPosts(res.data);
  };

  return (
    <div className="container mt-3">
      <h4 className="mb-3">Followers Feed</h4>

      {posts.length === 0 && (
        <div className="alert alert-info">
          No posts from followed users yet
        </div>
      )}

      {posts.map((p) => (
        <PostCard key={p._id} post={p} />
      ))}
    </div>
  );
}
