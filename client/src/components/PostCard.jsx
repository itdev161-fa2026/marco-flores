import { Link } from 'react-router-dom';
import './PostCard.css';

const PostCard = ({ post }) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="post-card">
      <Link to={`/posts/${post._id}`} className="post-card-link">

        {/* Title + Category */}
        <div className="post-card-header">
          <h2>{post.title}</h2>

          {post.category && (
            <span className="post-category-badge">
              {post.category}
            </span>
          )}
        </div>

        {/* Meta */}
        <div className="post-meta">
          <span className="post-author">By {post.user?.name || 'Unknown'}</span>
          <span className="post-date">{formatDate(post.createDate)}</span>
        </div>

        {/* Preview */}
        <p className="post-preview">
          {post.body.substring(0, 150)}
          {post.body.length > 150 ? '...' : ''}
        </p>

        <span className="read-more">Read more →</span>
      </Link>
    </div>
  );
};

export default PostCard;
