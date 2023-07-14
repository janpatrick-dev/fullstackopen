const jwt = require('jsonwebtoken');

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('Authorization');
  if (authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.replace('Bearer ', '');
  }
  next();
};

const userExtractor = (request, response, next) => {
  const SECRET_KEY = process.env.NODE_ENV === 'test'
    ? process.env.TEST_SECRET
    : process.env.SECRET;
  const decodedToken = jwt.verify(request.token, SECRET_KEY);
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'invalid token' });
  }
  request.user = decodedToken;
  next();
};

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'JsonWebTokenError') {
    return response.status(401).send({ error: error.message });
  } else if (error.message.includes('minimum allowed length')) {
    return response.status(400).send({ error: error.message });
  }

  next(error);
}

module.exports = {
  tokenExtractor,
  userExtractor,
  errorHandler
};