import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard";
import { getPosts } from "../services/api";
import { AuthContext } from "../context/authContext";
import "./Home.css";
import { CATEGORIES } from "../constants/categories";

const Home = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // NEW: Category filter
  const [category, setCategory] = useState("All");

  const { user } = useContext(AuthContext);

  // Fetch posts when page loads OR when category changes
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);

        // Pass category to backend (skip if "All")
        const categoryQuery = category !== "All" ? category : null;

        const data = await getPosts(categoryQuery);
        setPosts(data);
        setError(null);
      } catch (err) {
        setError("Failed to load posts. Make sure the backend server is running.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [category]);

  if (loading) {
    return <div className="container loading">Loading posts...</div>;
  }

  if (error) {
    return <div className="container error">{error}</div>;
  }

  return (
    <div className="container">
      <div className="home-header">
        <h1>Recent Posts</h1>

        {user ? (
          <button
            onClick={() => navigate("/posts/create")}
            className="create-post-button"
          >
            Create New Post
          </button>
        ) : (
          <p className="auth-message">
            <a href="/login">Login</a> or <a href="/register">register</a> to create posts.
          </p>
        )}
      </div>

      {/* ============================
          CATEGORY FILTER DROPDOWN  
      =============================*/}
      <div className="category-filter">
        <label>Category:</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Posts */}
      {posts.length === 0 ? (
        <div className="no-posts">
          <p>No posts available for this category.</p>
        </div>
      ) : (
        <div className="posts-list">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
