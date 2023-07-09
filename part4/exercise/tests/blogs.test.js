const app = require('../app');
const supertest = require('supertest');
const api = supertest(app);
const mongoose = require('mongoose');

const dummy = require('../utils/list_helper').dummy;
const totalLikes = require('../utils/list_helper').totalLikes;
const favoriteBlog = require('../utils/list_helper').favoriteBlog;
const mostBlogs = require('../utils/list_helper').mostBlogs;
const mostLikes = require('../utils/list_helper').mostLikes;

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Test Blog',
    author: 'John Doe',
    url: 'www.example.com',
    likes: 50,
    __v: 0
  }
];

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }  
];

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
    expect(totalLikes(listWithOneBlog)).toBe(50);
  });

  test('of a bigger list is calculated right', () => {
    expect(totalLikes(blogs)).toBe(36);
  });
});

describe('favorite blog', () => {
  test('of empty list is null', () => {
    expect(favoriteBlog([])).toEqual(null);
  });

  test('when list has only one blog is that blog', () => {
    expect(favoriteBlog(listWithOneBlog)).toEqual(...listWithOneBlog);
  });

  test('of a bigger list is the highest likes count', () => {
    expect(favoriteBlog(blogs)).toEqual({
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
    expect(mostBlogs(listWithOneBlog)).toEqual({
      author: 'John Doe',
      blogs: 1
    });
  });

  test('of a bigger list is the author with the most blogs count', () => {
    expect(mostBlogs(blogs)).toEqual({
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
    expect(mostLikes(listWithOneBlog)).toEqual({
      author: 'John Doe',
      likes: 50
    });
  });

  test('of a bigger list is the author with the most total likes count', () => {
    expect(mostLikes(blogs)).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17
    });
  });
});

test('get all blogs', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);

  expect(response.body).toHaveLength(2);
}, 100000);

afterAll(async () => {
  await mongoose.connection.close();
});