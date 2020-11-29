//////////////////////////// VARIABLES ////////////////////////////////////////

const graceNoteMovieApi = "adsprbrpwkseeq22z6hc2386";  //Thammarak account1
// const graceNoteMovieApi = "jf2p6cj9xp8pspnqcjg44rc9";  //Thammarak account2
var graceNoteMoviePrefix = "http://data.tmsapi.com/v1.1/movies/showings?";
// sample of request var graceNoteMoviePrefix = "http://data.tmsapi.com/v1.1/movies/showings?genres=action&startDate=2020-11-23&zip=78613&radius=5&api_key=adsprbrpwkseeq22z6hc2386";

// var yelpApi = "9VUtXRmjC3Psh50MTKDn-lpXsZIazhjlyx88TpX6WWLCHvk-_-DuGww3FkdhLhSDpIPlFvOzMjVSsJaS1hrIbG3FYNxznVAWr_UMGM4E8DbkOzrAz5pYOQY1qUW5X3Yx"
// var yelpApiPrefix = "https://api.yelp.com/v3/businesses/search?";
// sample of request var yelpAPIPrefix = "https://api.yelp.com/v3/businesses/search?term=pizza&latitude=30.266666&longitude=-97.733330&apikey=kttxiZtG1Dr6SQS5GR-wLFn_d-Y4xjs0lqPoakVILmEO8UWcTXfrPZ9PV95L7-traBoAT0kEsK0vsOtq_r-CBmPLqxYYqHe-pKTh2xFNe5saVlDbTAtT0vUmiz25X3Yx";


var omdbApiKey = "5673ffbb";
var omdbPrefix = "http://www.omdbapi.com/?apikey="


var genresSelected = "";
var dateSelected = "";
var zipCode = "";
var radius = "";


// Hardcode to verify API
var genresSelected = "";
// var dateSelected = "2020-11-27";
// var zipCode = "78613";
var zipCode = "";

var radius = "5";

// CURRENT DATE WORKING BUT TRY USER SELECTED DATE
// var currentDate = moment().format('YYYY-MM-DD');
// var currentDate = "";
// console.log(currentDate);

// var movieGenresMatch = [];
var genresSearch = "Action";  // need to link this to event listener
var poster = "";


//////////////////////////// FUNCTION ////////////////////////////////////////


//// 1 /////
function getMovies(zipCode, genresSearch, dateTimeSearch) {
    // use ajax to get movies information

    // var currentDate = dateSearch;


    console.log("line 42 " + zipCode);
    console.log("line 42 " + genresSearch);

    // not able to search by genres need to search for all then filter by code
    // var movieUrlRequest = graceNoteMoviePrefix + "genres="+ genresSelected + "&startDate=" + currentDate + "&zip=" + zipCode + "&radius=" + radius + "&api_key=" + graceNoteMovieApi

    // CURRENT DATE WORKING BUT TRY USER SELECTED SDA
    var movieUrlRequest = graceNoteMoviePrefix + "genres="+ genresSearch + "&startDate=" + dateTimeSearch + "&zip=" + zipCode + "&radius=" + radius + "&api_key=" + graceNoteMovieApi;


    console.log("line 58 " + movieUrlRequest);


    $.ajax({
        url: movieUrlRequest,
        method: "GET",
        error: function (err) {
            alert("The input was not found. Please check your spelling")
            return;
        }
    })
        .then(function (response) {
            return addNewArray(response, zipCode, genresSearch);
            // return addNewArray(response, genresSearch);
        })


}



//// 2 /////
function addNewArray(response, zipCode, genresSearch) {
    // FILTER ONLY GENRES THAT MATCH SELECTED AND PUSH INTO NEW ARRAY newMovieArray

    console.log("line 67 " + zipCode);
    console.log("line 67 " + genresSearch);

    console.log("line 80 typeof genresSearch " + typeof(genresSearch));
    console.log("line 80 " + response.length);

    var movieGenresMatch = [];


    for (i = 0; i < response.length; i++) {
        // for (i = 0; i < 3; i++) {
        var movieMatch = response[i].title;
        // var movieMatchNoSpace = response[i].title.replace(/ /g, "_");

        var genresMatch = response[i].genres;
        // convert response genres to lower case to compare with user genres selected

        console.log("line 92 typeof genresMatch " + typeof(genresMatch));
        console.log("line 92 genresMatch.length " + genresMatch.length);


        for (x = 0; x < genresMatch.length; x++) {
            genresMatch[x] = genresMatch[x].toLowerCase();
        }

        console.log("line 85 loop " + i + "genresMatch " + genresMatch);
        console.log("line 85 loop " + i  + "genresSearch " + genresSearch);

        var showtimesMatch = response[i].showtimes;
        var imageMatch = response[i].preferredImage.uri;
        // console.log("line 101 " + showtimesMatch);
        // console.log("line 101 " + imageMatch);

        if (genresMatch.includes(genresSearch)) {
            console.log("line 109 loop " + i + "genresMatch " + genresMatch + "has " + genresSearch);
            movieGenresMatch.push({ Title: movieMatch, Genres: genresSearch, Showtimes: showtimesMatch, Image: imageMatch });

            // 78613 ACTIVE SHOW FOUR ARRAY TRY 78749 SHOW FOUR TOO
            console.log("line 109 " + movieGenresMatch);
            console.log("line 109 " + movieGenresMatch.length);

        }


        console.log("line 118 " + movieGenresMatch);
        console.log("line 118 " + movieGenresMatch.length);
    }

    // THIS IS WHERE THE PROBLEM FOUND BELOW TWO VAR WAS MISSING FOR 78749 BUT 78613 WORKS
    console.log("line 123 " + movieGenresMatch);
    console.log("line 123 " + movieGenresMatch.length);
    // ADDING MATCH ONES TO NEW MOVIE ARRAY
    var newMovieArray = []

    // 78749 DID NOT REACH HERE BUT 78613 SHOW FOUR WHY???
    console.log("line 116 " + movieGenresMatch.length);

    for (i = 0; i < movieGenresMatch.length; i++) {
        for (y = 0; y < movieGenresMatch[i].Showtimes.length; y++) {
            newMovieArray.push({ Title: movieGenresMatch[i].Title, Theatre: movieGenresMatch[i].Showtimes[y].theatre.name, Showtimes: movieGenresMatch[i].Showtimes[y].dateTime, Image: movieGenresMatch[i].Image });

            console.log("line 102 " + movieGenresMatch[i].Title);
            console.log("line 102 " + movieGenresMatch[i].Showtimes[y].theatre.name);
            console.log("line 102 " + movieGenresMatch[i].Showtimes[y].dateTime);
            console.log("line 102 " + movieGenresMatch[i].Image);

        }
    }

    console.log("line 128 " + newMovieArray);

    renderMoviesResult(newMovieArray);
}



//// 3 /////
function renderMoviesResult(newMovieArray) {
    // to display movie search result

    console.log("line 175 " + newMovieArray);
    var startCard = 0
    var currentMovieName = "";
    var currentTheatre = "";

    for (var i = 0; i < newMovieArray.length; i++) {
        // for (var i = 0; i < 1; i++) {
        // FOR DEBUG

        var movieName = newMovieArray[i].Title;
        var theatre = newMovieArray[i].Theatre;
        var imageUrl = newMovieArray[i].Image;

        // console.log("line 201 " + imageUrl);
        // console.log("line 191 " + movieName);
        // console.log("line 192 " + theatre);

        if (movieName !== currentMovieName) {
            ++startCard
        }

        var cardNumber = "mov-result-" + startCard;
        // same movie scenarios to display only one
        if (movieName === currentMovieName) {
            // console.log("equal");
            cardNumber = currentCardNumber;
            $(`#${cardNumber}`).find('.showTime').append("<p>" + newMovieArray[i].Theatre + "</p>");
            $(`#${cardNumber}`).find('.showTime').append("<p>" + newMovieArray[i].Showtimes + "</p>");

        } else {
            // console.log("not equal");
            $(`#${cardNumber}`).find('.mov-title').text(newMovieArray[i].Title);
            $(`#${cardNumber}`).find('.theatre').text(newMovieArray[i].Theatre);
            $(`#${cardNumber}`).find('.showTime').text(newMovieArray[i].Showtimes);
            // ADDING MOVIE IMAGE WILL CHANGE TO POSTER
            $(`#${cardNumber}`).find('.movieThumb').attr('src', "http://demo.tmsimg.com/" + newMovieArray[i].Image);

            // ++ startCard


            // ///// TRY ADD MOVIE POSTER HERE

            // var movieMatchNoSpace = newMovieArray[i].Title.replace(/ /g, "_");;
            // var omdbUrlRequest = omdbPrefix + omdbApiKey + "&t=" + movieMatchNoSpace
            // console.log("line 168 " + omdbUrlRequest);

            // $.ajax({
            //     url: omdbUrlRequest,
            //     method: "GET",
            // })
            //     .then(function (response) {

            //         poster = response.Poster
            //         console.log("line 179 " + poster);

            //         // $(`#${cardNumber}`).find('.movieThumb').attr('src', "Thammarak");

            //     });



        }

        var currentMovieName = newMovieArray[i].Title;
        var currentCardNumber = cardNumber;
        var currentTheatre = theatre;

    }
    // END OF FOR LOOP


    // getPoster(newMovieArray);
}


//// 4 /////
// function getPoster(newMovieArray) {


//     console.log("line 155 " + newMovieArray);
//     console.log("line 155 " + newMovieArray[0].Title);


//     for (var i = 0; i < newMovieArray.length; i++) {
//         // for (var i = 0; i < 1; i++) {
//         // FOR DEBUG

//         // var movieMatchNoSpace = newMovieArray[i].title.replace(/ /g, "_");
//         var movieMatchNoSpace = newMovieArray[i].Title.replace(/ /g, "_");;
//         console.log("line 165 " + movieMatchNoSpace);

//         var omdbUrlRequest = omdbPrefix + omdbApiKey + "&t=" + movieMatchNoSpace
//         console.log("line 168 " + omdbUrlRequest);
//         $.ajax({
//             url: omdbUrlRequest,
//             method: "GET",
//         })
//             .then(function (response) {

//                 addPosterToArray(response, newMovieArray);
                
//             });
//     }

// }

//// 4 half /////

// function addPosterToArray (response, newMovieArray) {



//     for (i = 0; i < newMovieArray.length; i++) {
//         var posterUrl = response.Poster;
//         console.log("line 193 " + posterUrl);
//         newMovieArray[i].Poster = posterUrl;

//         console.log("line 197 newMovieArray[i].Poster " + newMovieArray[i].Poster);

//     }


//     renderPoster(newMovieArray);


// }


//// 5 /////
// function renderPoster(newMovieArray) {


//     var startCard = 0
//     var currentMovieName = "";
    
//     for (var i = 0; i < newMovieArray.length; i++) {

//         var movieName = newMovieArray[i].Title;


//         if (movieName !== currentMovieName) {
//             ++startCard
//         }

//         var cardNumber = "mov-result-" + startCard;
//         // same movie scenarios to display only one
//         if (movieName === currentMovieName) {
//             console.log("equal movieName = currentMovieName " + movieName +'='+ currentMovieName);
//             cardNumber = currentCardNumber;
//             // $(`#${cardNumber}`).find('.showTime').append("<p>" + newMovieArray[i].Theatre + "</p>");
//             // $(`#${cardNumber}`).find('.showTime').append("<p>" + newMovieArray[i].Showtimes + "</p>");

//         } else {
//             console.log("not equal movieName = currentMovieName " + movieName +'!='+ currentMovieName);
//             console.log("line 217 " + newMovieArray[i].Poster);
//             $(`#${cardNumber}`).find('.movieThumb').attr('src', newMovieArray[i].Poster);

//             // ++ startCard

//         }

//         var currentMovieName = newMovieArray[i].Title;
//         var currentCardNumber = cardNumber;


//     }


// }


//////////////////////////// EXECUTION ////////////////////////////////////////

/////// 1 USER MUST SELECT ZIP AND GENRES FIRST BEFORE GET MOVIE RESULT ////////

///// KEEP WORKING CODE START ////
// alert("Please input your current location");

// $("#location-button").click(function (event) {
//     event.preventDefault;

//     alert("Please select Movie Genres or Food Type")

//     window.zipCode = $('input').val();
//     console.log("line 270 " + zipCode);

//     $(".target").change(function (event) {
//         event.preventDefault;
    
//         window.genresSearch = $("#movie-selections option:selected").text();
//         genresSearch = genresSearch.toLowerCase();
//         console.log("line 270 " + genresSearch);
    
//         getMovies(zipCode, genresSearch);
    
//     });

    
// })
///// KEEP WORKING CODE END ////


///////////////////TRYING CODE ////////////////////////


alert("Please input your current location");

$("#location-button").click(function (event) {
    event.preventDefault;

    alert("Please select Movie Genres or Food Type")

    window.zipCode = $('input').val();
    console.log("line 270 " + zipCode);

    $(".target").change(function (event) {
        event.preventDefault;

        alert("Please select Date and Time")

    
        window.genresSearch = $("#movie-selections option:selected").text();
        genresSearch = genresSearch.toLowerCase();
        console.log("line 270 " + genresSearch);
    

        $("#date-time-submit").click(function (event) {
            event.preventDefault;

            window.dateSearch = $('#date-select').val();
            console.log("line 387 " + dateSearch);
            window.timeSearch = $('#time-select').val();
            console.log("line 387 " + timeSearch);

            // window.dateSelected = window.dateSearch + window.timeSearch;
            // window.dateSelected = moment().format()

            window.dateTimeSearch = dateSearch + "T" + timeSearch;

            getMovies(zipCode, genresSearch, dateTimeSearch);

        });
    
    });

    
})
