import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      const blogs = action.payload;
      return blogs.sort((a, b) => b.likes - a.likes);
    },
    createBlog(state, action) {
      const newBlogs = [...state, action.payload];
      return newBlogs.sort((a, b) => b.likes - a.likes);
    },
    updateBlog(state, action) {
      const updatedBlogs = state.map((blog) => {
        if (blog.id === action.payload.id) {
          return action.payload;
        }
        return blog;
      });
      return updatedBlogs.sort((a, b) => b.likes - a.likes);
    },
    removeBlog(state, action) {
      return state.filter((b) => b.id !== action.payload);
    }
  },
});

export const { setBlogs, createBlog, updateBlog, removeBlog } = blogsSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createNewBlog = (body) => {
  return async (dispatch) => {
    const blog = await blogService.create(body);
    dispatch(createBlog(blog));
    return blog;
  };
};

export const incrementBlogLikes = (blog) => {
  return async (dispatch) => {
    const updateBody = {
      ...blog,
      likes: blog.likes + 1,
    };
    const updatedBlog = await blogService.update(blog.id, updateBody);
    dispatch(updateBlog(updatedBlog));
  };
};

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    const { title, author, id } = blog;

    if (window.confirm(`Remove blog ${title} by ${author}`)) {
      await blogService.remove(id);
      dispatch(removeBlog(id));
    }
  };
};

export default blogsSlice.reducer;
