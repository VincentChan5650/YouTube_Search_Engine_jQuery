//searchbar Handler animation
$(function(){
  var searchField = $('#query');

  //Focus Handler
  $(searchField).on('focus', function(){
    $(this).animate({
      width:'100%'
    }, 400);
  });

  //Cancel Input (blur) Event Handler
  $(searchField).on('blur', function(){
      if (searchField.val() == ''){

        $(searchField).animate({
          width:'50%'
        }, 400, function(){});

      }
    });

    $('#search-form').submit(function(e){
      //prevent default submitting
      e.preventDefault();
    });
})


//this function will search in YouTube and send response back
// this function is called in side of form html
function search(){
  // clear results
  $('#results').html('');
  $('#buttons').html('');

  // Get Form Input(value)
  q = $('#query').val()

  //run the GET request to getting data from api
  $.get(
    //url for sending the search request
    "https://www.googleapis.com/youtube/v3/search", {

      //parameters that are listed in googleapis, return data
      part: 'snippet, id',
      q: q,
      type: 'video',
      key: 'AIzaSyDgF522nIl2K6aPaqIJrSGFvo4nTqAPK5s'},

      //handling the data that return from the api
      function(data){
        //get next page token and previous page token
        var nextPageToken = data.nextPageToken;
        var prevPageToken = data.prevPageToken;

        console.log(data)

        //loop each single data and display
        $.each(data.items, function(i, item){

          //get the output, single item, pass to getOutput function
          var output = getOutput(item);

          //display results
          $('#results').append(output);
        });

        //create a buttons var and pass prevPageToken and nextPageToken to a function
        var buttons = getButtons(prevPageToken, nextPageToken);
        console.log(buttons);
        //display the buttons
        $('#results').append(buttons);

      }

  );
}

//next page function
function nextPage(){
	var token = $('#next-button').data('token');
	var q = $('#next-button').data(query);
	
	  // clear results
	  $('#results').html('');
	  $('#buttons').html('');

	  // Get Form Input(value)
	  q = $('#query').val()

	  //run the GET request to getting data from api
	  $.get(
		//url for sending the search request
		"https://www.googleapis.com/youtube/v3/search", {

		  //parameters that are listed in googleapis, return data
		  part: 'snippet, id',
		  q: q,
		  pageToken: token,
		  type: 'video',
		  key: 'AIzaSyDgF522nIl2K6aPaqIJrSGFvo4nTqAPK5s'},

		  //handling the data that return from the api
		  function(data){
			//get next page token and previous page token
			var nextPageToken = data.nextPageToken;
			var prevPageToken = data.prevPageToken;

			console.log(data)

			//loop each single data and display
			$.each(data.items, function(i, item){

			  //get the output, single item, pass to getOutput function
			  var output = getOutput(item);

			  //display results
			  $('#results').append(output);
			});

			//create a buttons var and pass prevPageToken and nextPageToken to a function
			var buttons = getButtons(prevPageToken, nextPageToken);
			console.log(buttons);
			//display the buttons
			$('#results').append(buttons);

		  }

	  );
	
}

//previous page function
function prevPage(){
	var token = $('#prev-button').data('token');
	var q = $('#prev-button').data(query);
	
	  // clear results
	  $('#results').html('');
	  $('#buttons').html('');

	  // Get Form Input(value)
	  q = $('#query').val()

	  //run the GET request to getting data from api
	  $.get(
		//url for sending the search request
		"https://www.googleapis.com/youtube/v3/search", {

		  //parameters that are listed in googleapis, return data
		  part: 'snippet, id',
		  q: q,
		  pageToken: token,
		  type: 'video',
		  key: 'AIzaSyDgF522nIl2K6aPaqIJrSGFvo4nTqAPK5s'},

		  //handling the data that return from the api
		  function(data){
			//get next page token and previous page token
			var nextPageToken = data.nextPageToken;
			var prevPageToken = data.prevPageToken;

			console.log(data)

			//loop each single data and display
			$.each(data.items, function(i, item){

			  //get the output, single item, pass to getOutput function
			  var output = getOutput(item);

			  //display results
			  $('#results').append(output);
			});

			//create a buttons var and pass prevPageToken and nextPageToken to a function
			var buttons = getButtons(prevPageToken, nextPageToken);
			console.log(buttons);
			//display the buttons
			$('#results').append(buttons);

		  }

	  );
	
}

// building the output to display html
function getOutput(item){
  //we request two part from api, id and snippet
  var videoId = item.id.videoId;
  var title = item.snippet.title;
  var description = item.snippet.description;
  var thumb = item.snippet.thumbnails.high.url;
  var channelTitle = item.snippet.channelTitle;
  var videoDate = item.snippet.publishedAt;

  //Build output string
  var output = '<li class="jumbotron"><div class="container">'+
  '<div class="list-left">' +
  '<img src='+ thumb +'>' +
  '</div>'+
  '<div class="list-right">'+
  '<h3><a data-fancybox href="http://www.youtube.com/embed/'+videoId+'">'+title+'</a></h3>'+
  '<small>By <span class="cTtitle">'+channelTitle+'</span> on '+videoDate+'</small>'+
  '<p>'+description+'</p>'+
  '</div>'+
  '</div></li>'+
  '<div class="clearfix"></div>'+
  '';

  return output;
}

//build the btn output html
function getButtons(prevPageToken, nextPageToken){

  if(!prevPageToken){

    var btnoutput = '<div class="button-container">'+
    '<button id="next-button" class="btn btn-primary" data-token="'+nextPageToken+'" data-query="'+q+'"'+
    ' onclick="nextPage();">Next</button></div>';

  }else{

    var btnoutput = '<div class="button-container">'+
    '<button id="prev-button" class="btn btn-primary" data-token="'+prevPageToken+'" data-query="'+q+'"'+
    ' onclick="prevPage()">Previous</button>'+
    '<button id="next-button" class="btn btn-primary" data-token="'+nextPageToken+'" data-query="'+q+'"'+
    ' onclick="nextPage()">Next</button></div>';
  }

  return btnoutput;
}
