function Post (opts) {
  for (var keys in opts) {
    this[keys] = opts[keys];
  }
}

Post.allPosts = [];

Post.prototype.toHtml = function(){
  var $templateScript = $('#postsTemplate').html();
  var compiledTemplate = Handlebars.compile($templateScript);
  return compiledTemplate(this);
};

Post.loadAll = function(inputData) {
  inputData.sort(function(a,b) {
    return (new Date(b.datePublished)) - (new Date(a.datePublished));
  })
  .map(function(ele) {
    Post.allPosts.push(new Post(ele));
  });
};

Post.fetchAll = function() {
  if (localStorage.postsJSON){
    $.ajax({
      url: 'data/posts.json',
      type: 'HEAD',
      success: function(postsJSON, textStatus, jqXHR){
        var etag = jqXHR.getResponseHeader('etag');
        if(localStorage.etag === etag){
          Posts.loadAll(JSON.parse(postsJSON));
          postsViewer.renderToPage();
        }else{
          $.getJSON('data/posts.json', function( postsJSON, textStatus, jqXHR){
            jqXHR.getResponseHeader('etag');
            Post.loadAll(postsJSON);
            localStorage.setItem('posts', JSON.stringify(postsJSON));
            postsViewer.renderToPage();
          });
        }
      }
    });
  }

  else{
    $.getJSON('data/posts.json', function( postsJSON, textStatus, jqXHR){
      jqXHR.getResponseHeader('etag');
      console.log(jqXHR.getResponseHeader('etag'));
      Post.loadAll(postsJSON);
      localStorage.setItem('posts', JSON.stringify(postsJSON));
      postsViewer.renderToPage();
    });
  }
};
//


/* Great work so far! STRETCH GOAL TIME!? Our main goal in this part of the
   lab will be saving the eTag located in Headers, to see if it's been updated:

  Article.fetchAll = function() {
    if (localStorage.hackerIpsum) {
       Let's make a request to get the eTag (hint: what method on which object could we use to find the eTag?
       $.getJSON('data')

    } else {}
  }
*/
