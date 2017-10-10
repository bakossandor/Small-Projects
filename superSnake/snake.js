var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

c.height = 300;
c.width = 300;
var ew = 15; //an element width
var eh = 15; //an element heigth
var cw = c.width/ew; //how many cells we have /x
var ch = c.height/eh; //how many cells we have /y
var dir = "right"; // the starting direction

var fruit = {
}
//the fruit object
var createFruit = function(){
    fruit.fx = Math.floor(Math.random() * cw) * ew;
    fruit.fy = Math.floor(Math.random() * ch) * eh;
}
createFruit();
//creating the fruits random position set the width and the height according to the playground size

var snake = []

snake.unshift(new Tail(0,0));

function Tail (x,y){
    this.x = x;
    this.y = y;
    console.log("tail " + x,y);
};

pressKeys();
function pressKeys(){
    document.addEventListener("keydown", keyDownTextField);
};

function keyDownTextField(e) {
    var keyCode = e.keyCode;
    if(keyCode === 37 && dir !== "right") {
        dir = "left";
    } else if (keyCode === 38 && dir !== "down") {
        dir = "up";
    } else if(keyCode === 39 && dir !== "left") {
        dir = "right";
    } else if (keyCode === 40 && dir !== "up") {
        dir = "down";
    };
    console.log(dir);
}
//this block set the direction of the snake next move

var play = function(){
    var draw = setInterval(function(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        fruitEat();
        for (var i = 0; i < snake.length; i++){
            ctx.fillStyle="#820263";
            ctx.fillRect(snake[i].x, snake[i].y, ew, eh);
            console.log("elso " +snake[0].x, snake[0].y);
        }
        theNextHead();
        ctx.fillStyle = "#04A777";
        ctx.fillRect(fruit.fx, fruit.fy, ew, eh)
        //drawing the fruits1
    }, 80)
}

play();

function theNextHead (){
    if (dir == "right"){
        snake.unshift(new Tail(snake[0].x + ew, snake[0].y));
    } else if (dir == "left") {
        snake.unshift(new Tail(snake[0].x - ew, snake[0].y));
    } else if (dir == "down") {
        snake.unshift(new Tail(snake[0].x, snake[0].y + eh));
    }  else if (dir == "up") {
        snake.unshift(new Tail(snake[0].x, snake[0].y - eh));
    };
    //creating the next head of the snake
    if (snake[0].x === canvas.width){
        snake.unshift(new Tail(0, snake[0].y));
        snake.pop();
    } else if (snake[0].x < 0){
        snake.unshift(new Tail(canvas.width-ew,  snake[0].y));
        snake.pop();
    } else if (snake[0].y === canvas.height) {
        snake.unshift(new Tail(snake[0].x, 0));
        snake.pop();
    } else if (snake[0].y < 0 ){
        snake.unshift(new Tail(snake[0].x, canvas.height - eh));
        snake.pop();
    }
    //we create a playground without walls, so we "reset" the snakes coordinates
    snake.pop();
}

function fruitEat(){
    if (snake[0].x === fruit.fx && snake[0].y === fruit.fy){
        snake.unshift(new Tail(fruit.fx, fruit.fy));
        createFruit();
    }
}
