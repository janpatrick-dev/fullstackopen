const jwt = require('jsonwebtoken');
const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

const getTokenFrom = (request) => {
  const authorization = request.get('Authorization');
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '');
  }
};

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
    return response.status(401).json({ error: 'title is required' });
  }

  if (!body.url) {
    return response.status(401).json({ error: 'url is required' });
  }

  try {
    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET);
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'invalid token' });
    }
  
    const user = await User.findById(decodedToken.id);
  
    const blog = new Blog({
      title: body.title,
      author: body.author,
      user: user.id,
      url: body.url,
      likes: body.likes || 0
    });
  
    user.blogs = [...user.blogs, blog];
    await user.save();
  
    const savedBlog = await blog.save();
    response.status(201).json(savedBlog);
  } catch (exception) {
    response.status(500).json({ error: exception.message });
  }
});

module.exports = blogsRouter;