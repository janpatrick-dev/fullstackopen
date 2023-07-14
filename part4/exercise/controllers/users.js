const bcrypt = require('bcrypt');
const User = require('../models/user');
const usersRouter = require('express').Router();

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({})
    .populate('blogs', { url: 1, title: 1, author: 1 });
  response.json(users);
});

usersRouter.post('/', async (request, response) => {
  const { username, password, name } = request.body;

  try {
    if (!username) {
      return response.status(401).json({ error: 'username is required!' });
    }

    if (!password) {
      return response.status(401).json({ error: 'password is required!' });
    }

    if (password.length < 3) {
      return response.status(401).json({ error: 'password must be 3 characters or more' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
  
    const user = new User({
      username,
      password: hashedPassword,
      name
    });
    const savedUser = await user.save();
  
    response.status(201).json(savedUser);
  } catch (exception) {
    response.status(401).json({ error: exception.message });
  }
});

module.exports = usersRouter;