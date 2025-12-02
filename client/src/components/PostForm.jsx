import { useState, useEffect } from 'react';
import './PostForm.css';
import { CATEGORIES } from "../constants/categories";

const PostForm = ({ mode, initialData, onSubmit, onCancel, loading }) => {
  const [formData, setFormData] = useState({
    title: '',
    body: '',
    category: '',
  });

  const [errors, setErrors] = useState({});

  const { title, body, category } = formData;

  // Pre-populate form when editing
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        body: initialData.body || '',
        category: initialData.category || '',
      });
    }
  }, [initialData]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // Clear error for this field when user starts typing
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Title validation
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    } else if (title.trim().length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
    }

    // Body validation
    if (!body.trim()) {
      newErrors.body = 'Body is required';
    } else if (body.trim().length < 10) {
      newErrors.body = 'Body must be at least 10 characters';
    }

    // Category validation
    if (!category.trim()) {
      newErrors.category = 'Category is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Pass category to parent component
    await onSubmit(title.trim(), body.trim(), category);
  };

  return (
    <div className="post-form">
      <h2>{mode === 'create' ? 'Create New Post' : 'Edit Post'}</h2>

      <form onSubmit={handleSubmit}>

        {/* TITLE FIELD */}
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={onChange}
            placeholder="Enter post title"
            className={errors.title ? 'input-error' : ''}
            disabled={loading}
          />
          {errors.title && <span className="field-error">{errors.title}</span>}
        </div>

        {/* CATEGORY DROPDOWN */}
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={category}
            onChange={onChange}
            className={errors.category ? 'input-error' : ''}
            disabled={loading}
          >
            <option value="">-- Select a category --</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && (
            <span className="field-error">{errors.category}</span>
          )}
        </div>

        {/* BODY FIELD */}
        <div className="form-group">
          <label htmlFor="body">Body</label>
          <textarea
            id="body"
            name="body"
            value={body}
            onChange={onChange}
            placeholder="Write your post content here..."
            rows="12"
            className={errors.body ? 'input-error' : ''}
            disabled={loading}
          />
          {errors.body && <span className="field-error">{errors.body}</span>}
        </div>

        {/* ACTION BUTTONS */}
        <div className="form-actions">
          <button type="submit" className="submit-button" disabled={loading}>
            {loading
              ? mode === 'create'
                ? 'Creating...'
                : 'Saving...'
              : mode === 'create'
              ? 'Create Post'
              : 'Save Changes'}
          </button>

          <button
            type="button"
            onClick={onCancel}
            className="cancel-button"
            disabled={loading}
          >
            Cancel
          </button>
        </div>

      </form>
    </div>
  );
};

export default PostForm;
