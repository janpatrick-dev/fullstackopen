const app = require('../app');
const supertest = require('supertest');
const api = supertest(app);
const mongoose = require('mongoose');
const Blog = require('../models/blog');
const helper = require('./test_helper');

const dummy = require('../utils/list_helper').dummy;
const totalLikes = require('../utils/list_helper').totalLikes;
const favoriteBlog = require('../utils/list_helper').favoriteBlog;
const mostBlogs = require('../utils/list_helper').mostBlogs;
const mostLikes = require('../utils/list_helper').mostLikes;

beforeEach(async () => {
  await Blog.deleteMany({});

  const initialBlogs = helper.blogs;

  for (let blog of initialBlogs) {
    const blogObject = new Blog(blog);
    await blogObject.save();
  }
});

test('dummy returns one', () => {
  const blogs = [];

  const result = dummy(blogs);
  expect(result).toBe(1);
});

describe('total likes', () => {
  test('of empty list is zero', () => {
    expect(totalLikes([])).toBe(0);
  });

  test('when list has only one blog equals the likes of that', () => {
    expect(totalLikes(helper.listWithOneBlog)).toBe(50);
  });

  test('of a bigger list is calculated right', () => {
    expect(totalLikes(helper.blogs)).toBe(36);
  });
});

describe('favorite blog', () => {
  test('of empty list is null', () => {
    expect(favoriteBlog([])).toEqual(null);
  });

  test('when list has only one blog is that blog', () => {
    expect(favoriteBlog(helper.listWithOneBlog)).toEqual(...helper.listWithOneBlog);
  });

  test('of a bigger list is the highest likes count', () => {
    expect(favoriteBlog(helper.blogs)).toEqual({
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      __v: 0
    });
  });
});

describe('most blogs', () => {
  test('of empty list is null', () => {
    expect(mostBlogs([])).toBe(null);
  });

  test('when list has only one blog is the author of that blog', () => {
    expect(mostBlogs(helper.listWithOneBlog)).toEqual({
      author: 'John Doe',
      blogs: 1
    });
  });

  test('of a bigger list is the author with the most blogs count', () => {
    expect(mostBlogs(helper.blogs)).toEqual({
      author: 'Robert C. Martin',
      blogs: 3
    });
  });
});

describe('most likes', () => {
  test('of empty list is null', () => {
    expect(mostLikes([])).toBe(null);
  });

  test('when list has only one blog is the author of that blog', () => {
    expect(mostLikes(helper.listWithOneBlog)).toEqual({
      author: 'John Doe',
      likes: 50
    });
  });

  test('of a bigger list is the author with the most total likes count', () => {
    expect(mostLikes(helper.blogs)).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17
    });
  });
});

describe('exercises 4.8 to 4.12', () => {
  test('4.8 - get all blogs', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  
    expect(response.body).toHaveLength(6);
  });
  
  test('4.9 - verify if id property exists in blog', async () => {
    const blogs = await helper.blogsInDb();
    expect(blogs[0].id).toBeDefined();
  });

  test('4.10 - verify if blog was created successfully', async () => {
    const blogObject = { ...helper.listWithOneBlog[0] };
    
    await api
      .post('/api/blogs')
      .send(blogObject)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const currentBlogs = await helper.blogsInDb();

    expect(currentBlogs).toHaveLength(7);
    expect(currentBlogs.map((b) => b.title)).toContain('Test Blog');
  });

  test('4.11 - verify if likes property is missing from request', async () => {
    const blogObject = { ...helper.listWithOneBlog[0] };
    delete blogObject.likes;

    expect(blogObject.likes).not.toBeDefined();

    const response = await api
      .post('/api/blogs')
      .send(blogObject)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const newBlog = response.body;

    expect(newBlog.likes).toBeDefined();
    expect(newBlog.likes).toBe(0);
  });

  test('4.12 - verify if the title or url property are missing from request', async () => {
    const blogObject = { ...helper.listWithOneBlog[0] };
    delete blogObject.title;

    await api
      .post('/api/blogs')
      .send(blogObject)
      .expect(400);

    blogObject.title = helper.listWithOneBlog[0].title;

    expect(blogObject).toEqual(helper.listWithOneBlog[0]);

    delete blogObject.url;

    await api
      .post('/api/blogs')
      .send(blogObject)
      .expect(400);

    blogObject.url = helper.listWithOneBlog[0].url;

    expect(blogObject).toEqual(helper.listWithOneBlog[0]);
  });
});

describe('exercises 4.13 - 4.14', () => {
  test('4.13 delete a single blog post resource', async () => {
    let blogs = await helper.blogsInDb();
    const blogToDelete = blogs[0];

    await helper.deleteBlog(blogToDelete.id);

    blogs = await helper.blogsInDb();
    expect(blogs.map((b) => b.title))
      .not
      .toContain(blogToDelete.title);
  });

  test('4.14 verify if likes of blog post is updated', async () => {
    let blogs = await helper.blogsInDb();
    let blogToUpdate = blogs[0];

    expect(blogToUpdate.likes).toBe(7);

    await helper.updateLikes(blogToUpdate.id, 10);
    
    blogs = await helper.blogsInDb();
    blogToUpdate = blogs[0];

    expect(blogToUpdate.likes).toBe(10);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});