/**
 * Created by elenastaylor on 3/16/17.
 */
// ALL GIPHY IMAGES ARE A COURTESY OF GIPHY.COM

// initial array of myMusicGenres
var myMusicGenres = ["Rock", "Jazz", "Disco", "Reggae"];
// variable to set the limit of how many images will be pulled from api request
var limit = 10;

// create gifs based on user button selection
function addGifs() {
    $("#gifsArea").empty();
    var musicGenre = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + musicGenre + "&limit=" + limit + "&api_key=dc6zaTOxFJmzC";
    // ajax request to giphy api
    $.ajax({url: queryURL, method: 'GET'})
        .done(function(response) {
            // repeat until limit is reached
            for (var i = 0; i < limit; i++) {
                // save animated url as variable
                var animatedURL = response.data[i].images.fixed_height.url;
                // save still url as variable
                var stillURL = response.data[i].images.fixed_height_still.url;
                // save rating as a variable
                var rating = response.data[i].rating.toUpperCase();
                // create new panel
                var panelDiv = $("<div>");
                panelDiv.addClass("col-lg-6 col-md-12 col-sm-12 panel");
                // create panel body
                var panelBody = $("<div>");
                panelBody.addClass("row panel-body");
                // create new image element
                var newGif = $("<img>");
                newGif.addClass("gif");
                // update data attributes with url's
                newGif.attr("data-still", stillURL);
                newGif.attr("data-animated", animatedURL);
                newGif.attr("src", stillURL);
                newGif.attr("data-state", "still");
                // add gif to panel body
                panelBody.append(newGif);
                // create new panel footer
                var panelFooter = $("<div>");
                panelFooter.addClass("row panel-footer");
                // create new panel footer header
                var panelRating = $("<h4>");
                panelRating.addClass("nunito");
                panelRating.text("Rating: " + rating);
                // add rating to panel footer
                panelFooter.append(panelRating);
                // add panel body and then panel footer to panel div
                panelDiv.append(panelBody).append(panelFooter);
                // add new panel to gifs area
                $("#gifsArea").append(panelDiv);
            }
        });
}

// empty buttons area and then create new buttons from myMusicGenres array and add back to buttons area
function createButtons() {
    $("#buttonsArea").empty();
    for (var i = 0; i < myMusicGenres.length; i++) {
        var newBtn = $("<button>");
        newBtn.addClass("btn btn-primary btn-lg musicGenre nunito");
        newBtn.attr("data-name", myMusicGenres[i]);
        newBtn.text(myMusicGenres[i]);
        $("#buttonsArea").append(newBtn);
    }
}
// set restrictions to choose only music genres
var musicPool = ["rock", "blues", "jazz", "pop", "disco", "indie", "alternative", "classical", "punk", "grunge",
    "new wave", "ragtime", "lullabies", "country", "dance", "electronic", "opera", "r&b", "hip-hop", "latin",
    "gospel"];
function limitMusicGenre(musicGenre) {
    var found = false;
    for (var i = 0; i < musicPool.length; i++) {
        if (musicGenre == musicPool[i]) {
            found = true;
            break;
        }
    }
    if (!found) {
        alert("This music genre does not exist!");
    }
    return found;
}


// when user clicks submit button, add input to myMusicGenres array
$("#submitBtn").on("click", function() {
    // check that input field is not blank
    if ($("#addMusicGenre").val().trim() !== "") {
        var newMusicGenre = $("#addMusicGenre").val().trim();

        if (limitMusicGenre(newMusicGenre)) {
            myMusicGenres.push(newMusicGenre);
            createButtons();
            $("#addMusicGenre").val("");
        }
    }
    return false;
});

// when user clicks a gif, check its current state and update url accordingly
$(document).on("click", ".gif", function(){
    var state = $(this).attr("data-state");
    // if state is still, replace image src url with animated url
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animated"));
        $(this).attr("data-state", "animated");
        // if state is animated, replace image src url with still url
    } else if (state === "animated") {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

// if user clicks on a musicGenre button, run addGifs function
$(document).on("click", ".musicGenre", addGifs);

// create buttons on page load
createButtons();