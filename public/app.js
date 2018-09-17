$.get("/scrape").then(function(data) {
  console.log(data)
  $.getJSON("/articles", function(data) {
    // For each one
    console.log(data)
    for (var i = 0; i < data.length; i++) {
      // Display the apropos information on the page
      $("#articles").append("<div data-id='" + data[i]._id + "' class='articleBlock text-center'><h1>" + data[i].title + "</h1><br />"+data[i].summary+"<br /><br /><a href=http://www.espn.com"+data[i].link+" target='_blank'>http://www.espn.com" + data[i].link + "</a></div>");
    }
  });
})
// Grab the articles as a json
// $.getJSON("/articles", function(data) {
//     // For each one
//     console.log(data)
//     for (var i = 0; i < data.length; i++) {
//       // Display the apropos information on the page
//       $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
//     }
//   });
  
  
  // Whenever someone clicks a p tag
  $(document).on("click", ".articleBlock", function() {
    // Empty the notes from the note section
    $("#notes").empty();
    // Save the id from the p tag
    var thisId = $(this).attr("data-id");
  
    // Now make an ajax call for the Article
    $.ajax({
      method: "GET",
      url: "/articles/" + thisId
    })
      // With that done, add the note information to the page
      .then(function(data) {
        console.log(data);
        // The title of the article
        $("#notes").append("<h2>" + data.title + "</h2><br>");
        if (data.note[0]) {
          $("#notes").append("<h4>Prior Comments</h4><br>");
          for(j=0;j<data.note.length;j++){
          console.log(j)
          console.log(data.note[j].title)
          console.log(data.note[j].body)
          $("#notes").append("<div id='priorNoteTitle"+j+"' class='priorcommentstitle'></div><br>");
          $("#priorNoteTitle"+j).text(data.note[j].title)
          $("#notes").append("<div id='priorNoteBody"+j+"' class='priorcommentsbody'></div><br>");
          $("#priorNoteBody"+j).text(data.note[j].body);
          $("#notes").append("<button data-id='" + data.note[j]._id + "' id='deletenote'>Delete Note</button><br><br>");
          }}
        $("#notes").append("<h4>New Comments</h4><br>");
        // An input to enter a new title
        $("#notes").append("<input id='titleinput' name='title' ><br>");
        // A textarea to add a new note body
        $("#notes").append("<textarea id='bodyinput' name='body'></textarea><br>");
        // A button to submit a new note, with the id of the article saved to it
        $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button><br>");
  
        // If there's a note in the article
        // if (data.note) {
          // Place the title of the note in the title input
          // $("#titleinput").val(data.note.title);
          // Place the body of the note in the body textarea
          // $("#bodyinput").val(data.note.body);
        // }
      });
  });
  
  // When you click the savenote button
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
      .then(function(data) {
        // Log the response
        console.log(data);
        // Empty the notes section
        $("#notes").empty();
      });
  
    // Also, remove the values entered in the input and textarea for note entry
    $("#titleinput").val("");
    $("#bodyinput").val("");
  });
  $(document).on("click", "#deletenote", function() {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");
  
    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
      method: "POST",
      url: "/articles/remove/" + thisId,
      // data: {
      //   // Value taken from title input
      //   title: $("#titleinput").val(),
      //   // Value taken from note textarea
      //   body: $("#bodyinput").val()
      // }
    })
      // With that done
      .then(function(data) {
        // Log the response
        console.log(data);
        // Empty the notes section
        $("#notes").empty();
      });
  
    // Also, remove the values entered in the input and textarea for note entry
    $("#titleinput").val("");
    $("#bodyinput").val("");
  });