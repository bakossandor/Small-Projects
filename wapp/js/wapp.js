$(document).ready(function(){
    console.log("ready is running");
    $("button").on("click", function (e) {
        if($("input").val().length > 0){
        e.preventDefault();
        //I must use this e.preventDefault because it prvent the page relaod after a click happens!!
        var key = "fa8c2799036ece12d32cd100b3b0f58d";
        //a darksky api key
        var adress=$("input").val();
        //it gives us the value of the user input
        var geourl ="https://maps.googleapis.com/maps/api/geocode/json?address="+adress;
        //first ajax call url get the location
        var calccelsius = function(fahrenheit){
            return ((fahrenheit-32)*5/9).toFixed(1);
        };
        // a function which vonverts fahrenheit to celsius
        $(".weather div").remove();
        // it removes all of the fetched data from the screen
            $.ajax({
                url: geourl,
                success: function(data){
                    var lat = data.results[0].geometry.location.lat;
                    var long = data.results[0].geometry.location.lng;
                    var jsonadress = (data.results[0].formatted_address);
                    $(".weather").append("<div>"+jsonadress+"</div>");
                    //first i get the data from the google api and store it in a variable plus write the country and the city name into the screen
                    $.ajax({
                        url: "https://api.darksky.net/forecast/"+key+"/"+lat+","+long,
                        dataType: "jsonp",
                        success: function(data){
                            $(".weather").append("<div><span>"+data.currently.summary+"</span><img src='assets/SVG/"+data.currently.icon+".svg' alt='img'><span>"+calccelsius(data.currently.temperature)+"&#8451;</span></div>")
                        //second  I use the data from the previous call to get the weather of the place I want plus add the result into the screen
                        }//end of the second success call
                    })//end of the 2.ajax call
                }//end of the first ajax success
            }) //end of the first ajax call
        }//the first if statement end here
    })//button
})//The window onload function


// https://api.darksky.net/forecast/fa8c2799036ece12d32cd100b3b0f58d/37.8267,-122.4233
//darksky api key

// var geokey = "AIzaSyAS2NlkqFLmlx392t2bU_qvD2XijWJiXqg";
//google api key
