// =============================================================================
// global array storing initial buttons
// =============================================================================
var animals = [
  "dog",
  "cat",
  "rabbit",
  "hamster",
  "skunk",
  "goldfish",
  "bird",
  "ferret",
  "turtle",
  "tiger",
  "chinchilla",
  "hedgehog",
  "hermit crab",
  "gerbil",
  "polar bear",
  "chickens",
  "capybara",
  "panther",
  "serval",
  "elephant",
  "frog"
];
//api key
var key = "RROr9Y2Ozap7XjYW8vBV8jD8HUhyjPOD";

//animate and pause function
function animateThis() {
//local variable storing the state of the image
  var state = $(this).attr("data-state");
  // if image state is stll
  if (state === "still") {
    //switch the src url with the animate url
    $(this).attr("src", $(this).attr("data-animate"));
    //set image state to animate
    $(this).attr("data-state", "animate");
  } else {
    //set the src url to the still url
    $(this).attr("src", $(this).attr("data-still"));
    //set the image state
    $(this).attr("data-state", "still");
  }
}
//ajax function
function animalGIPHY() {
  //variable storing the data-name from the button clicked on
  var animal = $(this).attr("data-name");
//builing the queryURL
  var queryURL =
    "https://api.giphy.com/v1/gifs/search?q=" +
    animal +
    "&api_key=" +
    key +
    "&limit=10";
//ajax method
  $.ajax({
    url: queryURL,
    method: "GET"
  })
//then run this function
  .then(function(response) {
    console.log(response);
//variable to store the returned object
      var results = response.data;
      //runs through the array of data
      for (var i = 0; i < results.length; i++) {
        //a variable to store a div
        var animalDiv = $("<div>");
        //add a "gif" class
        animalDiv.addClass("gifs");
        //a variable to store a p element
        var p = $("<p>").text("Rating: " + results[i].rating);
        //a variable to store the img element
        var animalImage = $("<img>");
        //adding the still source
        animalImage.attr("src", results[i].images.fixed_height_still.url);
        //adding the animate source
        animalImage.attr("data-animate", results[i].images.fixed_height.url);
        //adding the still source to pause gif when clicked on twice
        animalImage.attr(
          "data-still",
          results[i].images.fixed_height_still.url
        );
        //adding the image state
        animalImage.attr("data-state", "still");
        animalImage.addClass("gif img-responsive img-thumbnail rounded float-left img-fluid");

        animalDiv.append(p);
        animalDiv.append(animalImage);
          //add the div to animal gif area
        $("#animalGifs").prepend(animalDiv);
      }
    });
}
//function for building buttons
function buttonBuild() {
//empty target area just in case
  $("#buttons-view").empty();
//for the length of the array
  for (var i = 0; i < animals.length; i++) {
    //local var to store button variable 
    var a = $("<button>");
    //add the proper classes
    a.addClass("animal-btn btn btn-info");
    a.attr("type", "button");
    //add the animal to data-name on the button
    a.attr("data-name", animals[i]);
    a.text(animals[i]);
    $("#buttons-view").append(a);
  }
}
//event listener for submit button
$("#add-animal").on("click", function(event) {
 //prevent the form from automatically submitting
  event.preventDefault();
  var newAnimal = $("#animal-input")
    .val()
    .trim();
    console.log(newAnimal);
//add new animal to animal array
if (newAnimal === undefined || newAnimal.length == 0){
  return
} else {
   animals.push(newAnimal);
//build buttons
  buttonBuild();
}
 
});
//add an event listener to the animal buttons
$(document).on("click", ".animal-btn", animalGIPHY);
//add an event listener to gifs for animation and pausing
$(document).on("click", ".gif", animateThis);
//generate the initial buttons
buttonBuild();
