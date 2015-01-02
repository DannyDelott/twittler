$(document).ready(function(){

  /********************
   * Global Variables *
   ********************/  
  
  var $stream = $('#stream');
  var $stream_post = $stream.children('.post').first();
  var $stream_author = $stream_post.children('.author').children('a');
  var $stream_timestamp = $stream_post.children('.timestamp');
  var $stream_message = $stream_post.children('.message');
  
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
  
  var showStream = function(){
  
   $stream.fadeIn('slow');
   
   interval = setInterval(function show(){
    index = streams.home.length - 1;
    while(index >= 0){
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

  /****************
   * Default code *
   ****************/ 
    
  showStream(); 

});
