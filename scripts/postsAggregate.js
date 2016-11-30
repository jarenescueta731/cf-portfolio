var posts = [];

// make a constructor to build the blog posts based on the HTML template.
function Post (options){
  this.title = options.title;
  this.datePublished = options.datePublished;
  this.author = options.author;
  this.body = options.body;
}

// make a prototype post that passes new posts into the HTML template.
Post.prototype.toHtml = function(){
  var $newPost = $('article.template').clone();
  $newPost.find('h1').text(this.title);
  $newPost.find('time').text(this.datePublished);
  $newPost.find('.author').text(this.author);
  $newPost.find('.post-content').append(this.body);
  // remove the template class to show the object
  $newPost.removeClass('template');
  return $newPost;
};

// sort the blog posts by newest to oldest
blogPosts.sort(function(currentObject, nextObject){
  return (new Date(nextObject.datePublished)) - (new Date(currentObject.datePublished));
});

// push the new posts into the array
blogPosts.forEach(function(blogPostObj){
  posts.push(new Post(blogPostObj));
});

posts.forEach(function(blogPostObj) {
  $('#posts').append(blogPostObj.toHtml());
});