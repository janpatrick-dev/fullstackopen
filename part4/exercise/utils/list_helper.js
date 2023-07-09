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
  return blogs.reduce((authorWithMostBlogs, blog) => {
    const authorBlogsCount = blogs.filter((b) => b.author === blog.author).length;
    if (!authorWithMostBlogs || authorBlogsCount > authorWithMostBlogs.blogs) {
      authorWithMostBlogs = { 
        author: blog.author, 
        blogs: authorBlogsCount 
      };
    }
    return authorWithMostBlogs; 
  }, null);
};

const mostLikes = (blogs) => {
  return blogs.reduce((authorWithMostLikes, blog) => {
    const currentAuthorBlogs = blogs.filter((b) => b.author === blog.author);
    const likesReducer = (totalLikes, b) => totalLikes + b.likes;
    const currentAuthorLikes = currentAuthorBlogs.reduce(likesReducer, 0);

    if (!authorWithMostLikes || currentAuthorLikes > authorWithMostLikes.likes) {
      authorWithMostLikes = { 
        author: blog.author, 
        likes: currentAuthorLikes
      };
    }
    return authorWithMostLikes; 
  }, null);
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};