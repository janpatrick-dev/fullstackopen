const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const { userExtractor } = require('../utils/middleware');

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

blogsRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body;

  if (!body.title) {
    return response.status(400).json({ error: 'title is required' });
  }

  if (!body.url) {
    return response.status(400).json({ error: 'url is required' });
  }

  try {
    const currentUser = request.user;
    const user = await User.findById(currentUser.id);
  
    const blog = new Blog({
      title: body.title,
      author: body.author,
      user: user.id,
      url: body.url,
      likes: body.likes || 0
    });

    const savedBlog = await blog.save();
    user.blogs = [...user.blogs, savedBlog];
    await user.save();

    const populatedBlog = await savedBlog.populate('user', { username: 1, name: 1 });
    
    response.status(201).json(populatedBlog);
  } catch (exception) {
    response.status(500).json({ error: exception.message });
  }
});

blogsRouter.put('/:id', userExtractor, async (request, response) => {
  try {
    const { likes } = request.body;
    const blog = await Blog.findByIdAndUpdate(
      request.params.id,
      { likes },
      { new: true, runValidators: true, context: 'query' }
    );

    response.status(200).json(blog);
  } catch (exception) {
    response.status(500).json({ error: exception.message });
  }
});

blogsRouter.delete('/', async (request, response) => {
  try {
    await Blog.deleteMany({});
  } catch (exception) {
    console.log('asdasd');
    response.status(500).json({ error: exception.message });
  }
});

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  try {
    const currentUser = request.user;
    const blog = await Blog.findById(request.params.id);

    if (!blog) {
      return response.status(404).json({ error: 'blog does not exist!' });
    }

    if (currentUser.id !== blog.user.toString()) {
      return response.status(401).json({ error: 'unauthorized access' });
    }

    const user = await User.findById(blog.user.toString());
    user.blogs = user.blogs.filter((b) => b.toString() !== blog.toString());

    await user.save();
    await blog.deleteOne();
    
    response.status(204).json({});
  } catch (exception) {
    response.status(500).json({ error: exception.message });
  }
});

module.exports = blogsRouter;