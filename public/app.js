// Grab the articles as a json
$.getJSON("/articles", function(data) {
  // For each one
    $("#articles").empty();


  for (var i = 0; i < data.length; i++) {

 
    $("#articles").append("<p class='jumbotron' data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "<br/>" +  "<button id='savenote' >Save Note</button>"+"</p>");
  }
});


// Whenever someone clicks a p tag
$(document).on("click", 'p', function() {

  $("#notes").empty();

  var thisId = $(this).attr("data-id");


  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })

    .done(function(data) {
      console.log(data);

      $("#notes").append("<h2> note</h2>");

      $("#notes").append("<input id='titleinput' name='title' >");

      $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
     
      $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

      if (data.note) {
  
        $("#titleinput").val(data.note.title);
    
        $("#bodyinput").val(data.note.body);
      }
    });
});


$(document).on("click", "#savenote", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .done(function(data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $("#notes").empty();
    });


  $("#titleinput").val("");
  $("#bodyinput").val("");
});
