$(document).ready(function(){
    $("button").on("click", function (e) {
        if($("input").val().length > 0){
        e.preventDefault();
        //I must use this e.preventDefault because it prvent the page relaod after a click happens!!
        var search=$("input").val();
        //it gives us the value of the user input
        $(".answers>div").remove();
        //I remove all divs if there is a new request
        // // it removes all of the fetched data from the screen
            $.ajax({
                url: "https://en.wikipedia.org/w/api.php?",
                data: {
                    action: "opensearch",
                    limit: 10,
                    search: search,
                    format: "json"
                },
                dataType: "jsonp",
                //I set the data props accoriding to the wikipedia api docs
                //search val is what the user use
                //we can easily set a limit
                success: function(data){
                    console.log(data);
                    for (var i=0; i<data[1].length; i++){
                        $(".answers").append("<div><h2>"+data[1][i]+"</h2><p class='toggle'>"+data[2][i]+"</p><a href='"+data[3][i]+"'class='toggle'>wikipedia</a></div>");
                    }
                    $(".answers h2").on("click", function(){
                        $(this).next("p").toggle();
                        $(this).next("p").next("a").toggle();
                    })
                    //as soon as we get back the data we push tjem into the screen
                    //creating divs with h2, p and a elements/ h2 the title/p the content/a the wiki link
                    //I use a toggle function on it. It shows the content as the user clicks to the h2(title)
                }//end of the first ajax success
            }) //end of the ajax call
        }//the first if statement end here
    })//button
})//The window onload function

//https://en.wikipedia.org/w/api.php?action=opensearch?limit=5?search=Barcelona
