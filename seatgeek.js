$(document).ready(function(){
    $('.datepicker').datepicker({});
    $('input.autocomplete').autocomplete({
        data: {
          "Hiking": null,
          "Dancing": null,
          "Kayaking": null,
        },
    });
});

// hide load page

setTimeout(hideLoadPage, 2500);
setTimeout(showLandingPage, 2500);

function hideLoadPage() {
  $("#loadPage").attr("style", "display: none;");
}

function showLandingPage() {
  $("#landingPage").attr("style", "display:block;");
}

// create random background image - derived from: https://www.dyn-web.com/code/random-image-js/

var random_images_array = [
  "/activities-background1.png",
  "/activities-background2.png",
  "/activities-background3.png",
  "/activities-background4.png",
];

function getRandomImage(imgAr, path) {
  path = path || "././images"; // default path here
  var num = Math.floor(Math.random() * imgAr.length);
  var img = imgAr[num];
  var imgStr = 'url("' + path + img + '") ';
  // document.write(imgStr); document.close();
  $("#landingPage.lpImage").attr("style", "background-image:" + imgStr + " ;");
  //   console.log("I made it here");
}

// let rando = getRandomImage(random_images_array);
// setTimeout(getRandomImage(random_images_array), 4000);
// setTimeout(console.log("I made it further"), 4000);
setTimeout(function () {
  getRandomImage(array, path);
}, 4000);


//SeatGeek Page

$("#find-event").on("click", function(event){

    event.preventDefault();

    // Here we grab the text from the search input box

    var eventlist = $("#autocomplete-input").val();
    var eventcity = $("#city-input").val();

    //var dateselector = $("#date").val();
    
   var queryURL = "https://api.seatgeek.com/2/events?venue.city=" + eventcity + "&taxonomies.name=" + eventlist + "&client_id=MjEyNDUyODZ8MTU5NjkxNDAwNi40OQ";
   console.log(queryURL);
   
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
    

        //Log the resulting onject
        console.log(response);

       var eventDetails= $("#event-view");

       let mappedCards = response.events.map(event => {
         var temp =`
              <div class="card">
                <div class="card-image">
                  <img src="images/sample-1.jpg">
                  <span class="card-title">${event.title}</span>
                  <a class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">add</i></a>
                </div>
                <div class="card-content">
                  <p>${event.description}</p>
                  <p>${event.type}</p>
                </div>
              </div>
            </div>
          </div>`;

         eventDetails.append(temp);
       })

       //Original -Working
       /* var temp = `
          <div class = "card">
            <h2>${event.title}</h2>
            <p>${event.type}</p>
            <p>${event.description}</p>
          </div> `; */

    
        

        
    });

    //Clear Results
    $("#clear-event").on("click", function(event) {
        event.preventDefault ();
        $("event-view").remove("event-view");
    })
    
})