$(document).ready(function(){

    var audio = $("audio");
    //declaring the audio files
    var seriaMemory = [];
    //the program seriaMemory
    var playerAnswers = [];
    //the playerAnswers

    $(".start h2").on("click", function () {
        $(this).closest(".start").css("display", "none");
        strictMode = $(this).data("mode");
        console.log(strictMode);
        generateRandomNumber();
        playTheGame();
        return;
    });
    //I set the first "start window" to close when a user choose mode
    //and set this to a strictMode variable
    //generate a random number
    //if the player clicks a mode it starts the game

    var generateRandomNumber = function(){
        var theRandomNumber = Math.floor(Math.random()*4);
        seriaMemory.push(theRandomNumber);
    };
    //generating the theRandomNumber variable and push to the memory the play method/function reads from it

    var playTheGame = function(){
        var i = 0;
        display("Listen the beautiful music", "current streak : "+seriaMemory.length);
        var playTheSeriaInterval = setInterval(function(){
            playingAudio(seriaMemory[i]);
            colors(seriaMemory[i]+1);
            i = i + 1;
            if (i === seriaMemory.length){
                clearInterval(playTheSeriaInterval);
                playerPick();
            } else {

            };

        }, 800);
    };
    //the game method when the computer start to show the pattern
    //we have a i variable to control the loop, everytime the function runs it resets and with each induvidual trigger implement by one
    //it invokes the colors function and the playingAudio functions
    //at the end the if i is reached the seriaMemory length it stops running and gives the player the opportunity to click.

    var playerPick = function(){
        $(".key div").on("click", function(){
            var dataNum = $(this).data("num");
            playerAnswers.push(dataNum);
            playingAudio(dataNum);
            colors(dataNum+1);
            checkAnswer();
        });
    };
    //the function which controls the player picks/answers
    //when the user clicks it push the answer to the playerAnswers array;
    //and fire the color function and the audio starts
    //the dataNum helps us to implement it to the functions
    //each hit we check the answer

    var checkAnswer = function(){
        var latestAnswer = playerAnswers[playerAnswers.length-1];
        var compareAnswer = seriaMemory[playerAnswers.length-1];
        //The latest answer var is dinamically the last clicked color div
        //the compareAnswer var is dinamically the same indexed seriaMemory
        if (latestAnswer == compareAnswer && playerAnswers.length === seriaMemory.length){
            $(".key div").off("click");
            playerAnswers = [];
            display("nice", "it is growing");
            generateRandomNumber();
            setTimeout(playTheGame, 1200);
        //if the latestAnswer(the player last click) is equal to compareAnswer(the same indexed elem in the seriaMemory
        //we reset the eventListeners and reset the playerAnswers
        //then finish this seria and jump the next one with a little delay(UI/UX)
        //but before we have to create a new number
        } else if(latestAnswer == compareAnswer){
        display("go on", "your current good answers :"+playerAnswers.length);
        //in this case go on
        } else if (latestAnswer != compareAnswer) {
            if (strictMode){
                $(".key div").off("click");
                display("oh nooo", "next time my friend");
                $(".start").css("display", "block");
                playerAnswers = [];
                seriaMemory = [];
            } else if (!strictMode) {
                $(".key div").off("click");
                display("listen again", "current streak : "+seriaMemory.length);
                setTimeout(function(){
                    playTheGame();
                    playerAnswers = [];
                }, 700);
            };
        };
        //the last condition has two alternatives when we make a mistake depending on the strictMode we have 2 opportunity
        //strictMode true --> begin from the beginning
        //strictMode false --> the computer shows the current seria again with a delay
        //both case we lose the events
    }

    var playingAudio = function(number){
        audio[number].play();
    };
    //this functions help to play the audios it has a "number" arguments which is set which sound will be played

    var colors = function(elem){
        var nthElement = $(".key div:nth-of-type("+elem+")");
        var classes =nthElement.attr("class");
            nthElement.removeClass(classes);
            nthElement.addClass(classes+"2");
            $("body").css("background-color", nthElement.css("background-color"));
            setTimeout(function(){
                nthElement.removeClass(classes+"2");
                nthElement.addClass(classes);
                $("body").css("background-color", "transparent");
            }, 500);
    }
    //adding color chnage when a user click an element
    //the nthElement var is came from a dom and it is dinamically changes
    //first we remove the class of the clicked div second give them a new class which are described in the css
    //the overall click event is half sec
    //when we put it into the other functions we have to take care of that the nth-element is not zero based
    //finally i set the color of the backgorund with each click and each random event

    var display = function(top, bottom){
        $(".instructions div p:first").text(top);
        $(".instructions div p:last").text(bottom);
    };
    //this function set the display with two argumens the first arg is the top sign of the display part of the game the second is the bottom

}); //THE WINDOW ONLOAD JQUERY FUNCTION
