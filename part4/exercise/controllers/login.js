const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const User = require('../models/user');

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body;
  const secret = process.env.NODE_ENV === 'test'
    ? process.env.TEST_SECRET
    : process.env.SECRET;

  const user = await User.findOne({ username });
  const passwordValid = user === null
    ? false
    : await bcrypt.compare(password, user.password);

  if (!(user && passwordValid)) {
    return response.status(401).json({ error: 'invalid credentials' });
  }

  const userForToken = {
    username: user.username,
    id: user._id
  };

  // token expires in 1 hour
  const token = jwt.sign(
    userForToken,
    secret,
    { expiresIn: 60*60 }
  );

  response.json({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;