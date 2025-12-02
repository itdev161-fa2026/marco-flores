## Final Project Enhancement

### Enhancement(s) Implemented

- Dark/Light Theme Toggle
- Post Categories System

### Video Demonstration

- Watch the video here : https://drive.google.com/file/d/1zPiPCQ5KBa8ph6s7YWxuUQ026XxZNJjg/view?usp=sharing

### Features Added
            Dark/Light Theme System
- Added a theme toggle button in the site header that switches between light mode and dark mode.
- Theme preference is saved in `localStorage`, allowing the site to remember the user's chosen theme.
- All pages updated to fully support the dark theme system, including:
  - Home page
  - Login page
  - Register page
  - Post Details page
  - Edit Post page
  - Create Post page
  - PostForm component
  - PostCard component

            Post Categories System
- Users must choose a category when creating/editing a post
- Categories included: Technology, Lifestyle, Tutorial, News, Education, Other.
- Categories badges appear on:
  - Home page
  - Post detail page
- Home page now includes filtering by category:
  - Show all posts
  - Filter by selected category
  

### Technical Implementation

- Libraries/tools used
    - CSS custom properties (variables) for dynamic color theming
    - `localStorage` to store user theme preference

- Key challenges solved
    - Removing hard-coded light-mode colors across multiple components
    - Ensuring consistent theming logic across all UI elements
    - Making error messages, input fields, and buttons readable in both themes
    - Properly applying theme classes to the root HTML element
    - Eliminating conflicts from global CSS
    - Include category and validate it.
    - Updating API endpoints to:
      - Save category when creating posts
      - Update category on edit
      - Filter posts using ?category= query parameter

- Main files/components created
            Dark/Light Theme System
    - `Header.jsx` / `Header.css`
    - `Home.css`
    - `PostCard.css`
    - `Register.css`
    - `Login.css`
    - `PostDetail.css`
    - `EditPost.css`
    - `PostForm.css`
    - `CreatePost.css`
            Post Categories System
    -Created:
     - src/constants/categories.js 
     - src/context/ThemeContext.jsx 
    - Updated:
     - PostForm.jsx -- category dropdown
     - PostCard.jsx -- category badge
     - PostDetail.jsx -- category badge
     - Home.jsx -- category filters
     - api.js -- updated createPost & updatePost to send category

### New Dependencies

- No new dependencies added.

### Setup Instructions

1. Install dependencies: `npm install`
2. Add any required environment variables
3. Start backend 
4. Start frontend
