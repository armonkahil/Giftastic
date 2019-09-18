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
var key = "RROr9Y2Ozap7XjYW8vBV8jD8HUhyjPOD";

function animateThis() {
  var state = $(this).attr("data-state");
  console.log(this);
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
}

function animalGIPHY() {
  var animal = $(this).attr("data-name");

  var queryURL =
    "https://api.giphy.com/v1/gifs/search?q=" +
    animal +
    "&api_key=" +
    key +
    "&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  })
    .then(function(response) {
      console.log("query url: ", queryURL);

      console.log(response);
      var results = response.data;
      for (var i = 0; i < results.length; i++) {
        var animalDiv = $("<div>");
        animalDiv.addClass("gifs");

        var p = $("<p>").text("Rating: " + results[i].rating);

        var animalImage = $("<img>");
        animalImage.attr("src", results[i].images.fixed_height_still.url);
        animalImage.attr("data-animate", results[i].images.fixed_height.url);
        animalImage.attr(
          "data-still",
          results[i].images.fixed_height_still.url
        );
        animalImage.attr("data-state", "still");
        animalImage.addClass("gif");

        animalDiv.append(p);
        animalDiv.append(animalImage);

        $("#animalGifs").prepend(animalDiv);
      }
    });
}

function renderButtons() {
  $("#buttons-view").empty();

  for (var i = 0; i < animals.length; i++) {
    var a = $("<button>");
    a.addClass("animal-btn btn btn-info");
    a.attr("type", "button");
    a.attr("data-name", animals[i]);
    a.text(animals[i]);
    $("#buttons-view").append(a);
  }
}

$("#add-animal").on("click", function(event) {
  event.preventDefault();
  var newAnimal = $("#animal-input")
    .val()
    .trim();

  animals.push(newAnimal);

  renderButtons();
});

$(document).on("click", ".animal-btn", animalGIPHY);
$(document).on("click", ".gif", animateThis);
renderButtons();
