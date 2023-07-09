const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  return blogs.reduce((favorite, blog) => {
    if (!favorite || blog.likes > favorite.likes) {
      favorite = blog;
    }
    return favorite;
  }, null);
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
};