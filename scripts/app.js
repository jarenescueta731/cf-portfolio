var postsViewer = {};

// menu close after li click
$(document).ready(function(){
  $('.nav-item').click(function(){
    $('input[type=checkbox]').trigger('click');
  });
});

// menu functionality: on click hide other sections
postsViewer.navigationFilter = function(){
  $('.main-nav').on('click', '.nav-item',function(){
    // Hide all of the sections that contain unwanted content
    $('.page-content').hide();
    // Fade in the single section that is wanted
    $('#' + $(this).data('spec')).fadeIn('slow');
    // sort of makeshift way to scroll back to the top
    window.setTimeout(function(){window.scrollTo(0, 0);}, 100);
  });
  $('.main-nav .menu-item:first').click();
};

postsViewer.renderToPage = function(){
  Post.allPosts.forEach(function(blogPostObj) {
    $('#posts').append(blogPostObj.toHtml());
  });
  postsViewer.navigationFilter();
};

Post.fetchAll();
