const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({});
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
    url: body.url,
    likes: body.likes || 0
  });

  blog
    .save()
    .then((result) => {
      response.status(201).json(result);
    });
});

module.exports = blogsRouter;