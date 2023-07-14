const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog
      .find({})
      .populate('user', { username: 1, name: 1 });
    response.json(blogs);
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.post('/', async (request, response) => {
  const body = request.body;

  if (!body.title) {
    return response.status(400).json({ error: 'title is required' });
  }

  if (!body.url) {
    return response.status(400).json({ error: 'url is required' });
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    user: body.userId,
    url: body.url,
    likes: body.likes || 0
  });

  const user = await User.findById(body.userId);
  user.blogs = [...user.blogs, blog];
  await user.save();

  const savedBlog = await blog.save();
  response.status(201).json(savedBlog);
});

module.exports = blogsRouter;