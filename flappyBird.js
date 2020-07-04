//create a canvas variable to select the canvas
var cvs=document.getElementById("canvas");
//context variable
var ctx=cvs.getContext("2d")

//load images
var bird=new Image();
var bg=new Image();
var fg=new Image();
var pipeNorth=new Image();
var pipeSouth=new Image();

//give source
bird.src="images/bird.png";
bg.src="images/bg.png";
fg.src="images/fg.png";
pipeNorth.src="images/pipeNorth.png";
pipeSouth.src="images/pipeSouth.png";



//some variables
var gap=85;
var constant=pipeNorth.height+gap;

//position of bird interms of x and y position
var bX=10;
var bY=150;

var gravity=1.5;
var score=0;

//include the audio files
var fly =new Audio();
var scor=new Audio();

fly.src="sounds/fly.mp3";
scor.src="sounds/score.mp3";




//on key down
document.addEventListener("keydown",moveUp);

function moveUp()
{
    bY-=25;
    //when bird flies play fly audio
    fly.play();
}
//declare the pipe coordinates-its an array
var pipe=[];
pipe[0]={
   x:cvs.width,
   y:0
};









//draw the images
function draw()
{
    //draw the background with x and y position=0
    ctx.drawImage(bg,0,0);

   //use a for loop to print or draw all the pipes
    for(var i=0;i<pipe.length;i++) {
 //draw the pipe north and pipe south
        ctx.drawImage(pipeNorth,pipe[i].x,pipe[i].y);
        ctx.drawImage(pipeSouth,pipe[i].x,pipe[i].y+constant);
      //to move the pipe to the left
        pipe[i].x--;

        if(pipe[i].x==125)
        {
            //push a new value to the array pipe
            pipe.push({
                x:cvs.width,
                y:Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height
            });
        }

        //detect if bird collides with the pipes
        if(bX+bird.width>=pipe[i].x && bX<=pipe[i].x+pipeNorth.width 
        && (bY<=pipe[i].y+pipeNorth.height || bY+bird.height>=pipe[i].y+constant)|| 
        bY+bird.height>=cvs.height-fg.height)
        {
            location.reload();//if theres a collision reload the page
        }
        if(pipe[i].x==5)
        {
            score++;
            //if score increments play audio scor
            scor.play();
        }
    }

    

    //draw the foreground
    ctx.drawImage(fg,0,cvs.height-fg.height);

    //draw the bird
    ctx.drawImage(bird,bX,bY);

    //bird falls continously by gravity so increment bY by gravity
    bY+=gravity;
    

    ctx.fillStyle="#000";
    ctx.font="20px Verdana";
    //score,x,y-cvs.height puts it at the bottom

    ctx.fillText("Score : "+score,10,cvs.height-20);

    requestAnimationFrame(draw);
}
draw();