$(document).ready(function(){

  /********************
   * Global Variables *
   ********************/  
  
  var $logo = $('#logo');
  var $logo_link = $logo.find('a');
  
  var $stream = $('#stream');
  var $stream_post = $stream.children('.post').first();
  var $stream_author = $stream_post.children('.author').children('a');
  var $stream_timestamp = $stream_post.children('.timestamp');
  var $stream_message = $stream_post.children('.message');
  var streaming = false;

  var $timeline = $('#timeline');

  var index = streams.home.length - 1;
  var interval;

  /*************
   * Functions *
   *************/  
   
  var formatTime = function(time){
    return moment(time).startOf('hour').fromNow();
  }
  
  var fillStream = function(tweet){
    $stream_author.text('@' + tweet.user);
    $stream_timestamp.text(formatTime(tweet.created_at));
    $stream_message.text(tweet.message);
  };
  
  var clearStream = function(){
    $stream_author.text('');
    $stream_timestamp.text('');
    $stream_message.text('');
  };
  
  var resetStream = function(){
    $stream_post.clearQueue(); // stop animations
    clearInterval(interval);  // stops interval
    $timeline.empty();  // deletes timeline posts
    streaming = false;
  };
  
  var postTimeline = function(tweet){
    var post = $('<div>').addClass('post').addClass('white');
    var author = $('<div>').addClass('author').text('@' + tweet.user);
    var timestamp = $('<div>').addClass('timestamp').text(formatTime(tweet.created_at));
    var message = $('<div>').addClass('message').text(tweet.message);
    
    post.append(author).append(timestamp).append(message);
    $timeline.append(post);
  };
  
  var showStream = function(){
  
   resetStream();
   streaming = true;
   $stream.fadeIn('slow');
   
   interval = setInterval(function show(){
    index = streams.home.length - 1;
    while(index >= 0 && streaming){
      var tweet = streams.home[index];
      $stream_post.fadeIn({
    	      duration: "slow", 
    	      start: function(){
              fillStream(this);
            }.bind(tweet)})
    	   .delay(3000)
    	   .fadeOut("slow", clearStream);
      index-=1;
    }
    return show;
    }(), 10000);
  };
  
  var showTimeline = function(){

    resetStream(); 

    // fades out stream
    $stream.fadeOut("fast", function(){
    
      // adds nodes to DOM
      var author = $stream_author.text().replace('@', ''); 
      _.each(streams.users[author],function(e){
        postTimeline(e);
      });    
     
     // fades in timeline
     $timeline.fadeIn("slow");
    });
  };
 

  /******************
   * Event Handlers *
   ******************/ 
    
  $logo_link.on('click', function () {if(!streaming) {showStream();}});
  $stream_author.on('click', showTimeline);

  /****************
   * Default code *
   ****************/ 
    
  showStream(); 

});
