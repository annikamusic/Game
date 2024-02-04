let inputDir = { x: 0, y: 0}
const foodsound = new Audio('music/food.mp3');
const gameoversound = new Audio('music/gameover.mp3');
const movesound = new Audio('music/move.mp3');
const musicsound = new Audio('music/music.mp3');
let speed = 5;
let score = 0;
let lasrpaintTime = 0;
let snakearr = [
    {x: 13, y: 15}
]; 
food = {x: 6, y: 7};


function main(ctime){
    window.requestAnimationFrame(main);
    //console.log(ctime) 
    if((ctime - lasrpaintTime)/1000 < 1/speed)
    {
        return
    }
    lasrpaintTime = ctime;
    gameEngine();
}

function isCollide(snake){
    //if snake collide to itself
    for (let i = 1; i < snakearr.length; i++){
       if(snake[i].x == snake[0].x && snake[i].y == snake[0].y){//===
            return true;
       }
    }
    //if you hit the wall
      if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0){
        return true
      }
 }


function gameEngine()
{   //part 1: updating the snake array & food
    if(isCollide(snakearr)){
        gameoversound.play();
        musicsound.pause();
        inputDir = {x: 0, y: 0};
        alert("Game over press any key to play again!")
        snakearr = [{x: 13, y: 15}];
        musicsound.play();
        score = 0;
    }
    //placing the food in diff place and score increse
    if(snakearr[0].y == food.y && snakearr[0].x == food.x){
        foodsound.play();
        score +=1;
        if(score > hiscoreval){
            hiscoreval + score;
            localStorage.getItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "Hisscore: " + hiscore;;
        }
        scoreBox.innerHTML  = "Score: " + score
        snakearr.unshift({x: snakearr[0].x + inputDir.x, y: snakearr[0].y + inputDir.y})//adsa element in the front of the array
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b - a)*Math.random()), y: Math.round(a + (b - a)*Math.random())}//Formula to generate random number between given integers

    }
    //Moving the game
    for(let i = snakearr.length - 2; i >= 0; i--){
        
        snakearr[i+1] ={...snakearr[i]};//spread operator: The spread operator is a shorthand for iterating over either arrays, plain objects, or arguments of a function.

    }

    snakearr[0].x += inputDir.x;
    snakearr[0].y += inputDir.y;

    // part 2: display the snake
    board.innerHTML = "";
    snakearr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        snakeElement.classList.add('head')
        if(index == 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);

    });
    //display the food
    foodElement = document.createElement('div');
    foodElement.classList.add('food')
    foodElement.style.gridRowStart =food.y;
    foodElement.style.gridColumnStart = food.x;
    board.appendChild(foodElement);


}

















//Main logic start here
window.localStorage.setItem("hiscore", null);

let hiscore = window.localStorage.getItem("hiscore");

if(hiscore === null){
    hiscoreval = 0;
   window.localStorage.setItem("hiscore", hiscoreval);
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "Hisscore: " + hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e=>{
        inputDir = { x: 0, y: 1}
        movesound.play();
        switch(e.key){
                    case "ArrowUp":
                        console.log("ArrowUp")
                        inputDir.x = 0;
                        inputDir.y = -1;
                    break;

                    case "ArrowDown":
                        console.log("Arrowdown")
                        inputDir.x = 0;
                        inputDir.y = 1;
                    break;

                    case "ArrowLeft":
                        console.log("ArrowLeft")
                        inputDir.x = -1;
                        inputDir.y = 0;
                    break;

                    case "ArrowRight":
                        console.log("ArrowRight")
                        inputDir.x = 1;
                        inputDir.y = 0;
                    break;
                    
            default:
                break;
        }
});