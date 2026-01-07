export default function PostCard({ post }) {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h6 className="text-muted">{post.postedByType}</h6>
        <p>{post.content}</p>

        {post.mediaUrl && (
          <img
            src={post.mediaUrl}
            alt="media"
            className="img-fluid rounded"
          />
        )}
      </div>
    </div>
  );
}
