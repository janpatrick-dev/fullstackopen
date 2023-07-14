const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');
const User = require('../models/user');

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17fd',
    title: 'Test Blog',
    author: 'John Doe',
    user: '5a422aa71b54a676234d17fe',
    url: 'www.example.com',
    likes: 50,
    __v: 0
  }
];

const listWithOneUser = [
  {
    _id: '5a422aa71b54a676234d17fe',
    username: 'testuser',
    password: '$2b$10$rRt8iGkMDTGCUPRnMmA9J.rZdX1vFXFurziej9LRtSSGEAZ2CBO/.',
    name: 'test user',
    __v: 0
  }
]

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

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs;
};

const deleteBlog = async (id) => {
  await Blog.findByIdAndRemove(id);
};

const updateLikes = async (id, value) => {
  await Blog.findByIdAndUpdate(id, { likes: value }, { new: true });
};

const usersInDb = async () => {
  const users = await User.find({});
  return users;
};

const currentUser = async () => {
  const users = await usersInDb();
  const user = users[0];

  const userForToken = { username: user.username, id: user._id };
  const token = jwt.sign(userForToken, process.env.TEST_SECRET, { expiresIn: 60 });

  const decodedToken = jwt.verify(token, process.env.TEST_SECRET);

  return { token, decodedToken, user };
}

module.exports = {
  listWithOneBlog,
  listWithOneUser,
  blogs,
  blogsInDb,
  deleteBlog,
  updateLikes,
  usersInDb,
  currentUser
};