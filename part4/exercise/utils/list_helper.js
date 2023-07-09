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

const mostBlogs = (blogs) => {
  return blogs.reduce((mostBlogs, blog) => {
    const authorBlogsCount = blogs.filter((b) => b.author === blog.author).length;
    if (!mostBlogs || authorBlogsCount > mostBlogs.blogs) {
      mostBlogs = { author: blog.author, blogs: authorBlogsCount };
    }
    return { author: mostBlogs.author, blogs: mostBlogs.blogs }; 
  }, null);
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
};