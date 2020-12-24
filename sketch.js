var monkey;
var monkey_running;
var ground;
var banana;
var bananaImg;
var bananaGroup;
var obstacle;
var obstacleImg;
var obstacleGroup;
var score=0;
var survivalTime=0;
var jungle;
var jungleImg;
var gamestate;
var PLAY;
var end;
function preload(){
monkey_running=loadAnimation("sprite_0.png","sprite_1.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png");
bananaImg=loadImage("banana.png");
obstacleImg=loadImage("obstacle.png");
jungleImg=loadImage("jungleImg.jpg");
}
function setup(){
//creating a canvas
createCanvas(600, 600);

  
ground=createSprite(200,560,600,10);
ground.visible=true;

jungle=createSprite(300,300,20,20);
jungle.addImage("jungle",jungleImg);
jungle.scale=1;
jungle.velocityX=-5;
jungle.visible=false;

//creating my monkey sprite,adding the animations to it, and scaling it down
monkey=createSprite(100,500,20,20);
monkey.addAnimation("monkey_run",monkey_running);
monkey.scale=0.2;
    
monkey.depth=jungle.depth;
monkey.depth=monkey.depth+1;

  

//creating the groups
bananaGroup=new Group();
obstacleGroup=new Group();
}

function draw() {
  background ("lightgray");
  if (gamestate===PLAY){

    
    //creating an infinite illusion
  if (jungle.x<0){
    jungle.x=jungle.width/2;
    }
   if (ground.x<600){
    ground.x=ground.width/2;
    }
    
   if(keyDown("space") &&monkey.y>=325){
    monkey.velocityY=-10;
     }
  
  if (monkey.isTouching(bananaGroup)){
    score++;
    bananaGroup.destroyEach();
  }
     //once the trex jumps it will come back with gravity
  monkey.velocityY=monkey.velocityY+0.5;
    
    //console.log(gameState);
   //making the trex collide with the invisible ground
  monkey.collide(ground);
  monkey.collide(obstacleGroup);
  monkey.collide(bananaGroup);

    function spawnBanana(){
  //console.log(rand);
  if(frameCount%80===0){
    //creating a cloud sprite
  banana=createSprite(600,220,50,15);
    //adding the image
  banana.addImage("banana",bananaImg);
    //giving the x velocity
  banana.velocityX=-5;
    //scaling the cloud sprite down
  banana.scale=0.2;
    //creating a group for the clouds
 bananaGroup.add(banana)
  banana.lifetime=120;
  banana.depth=jungle.depth;
  banana.depth=banana.depth+1;
  }
}
 function spawnObstacle(){
    if(frameCount%200===0){
      //creating the obstacle sprite
      obstacle = createSprite(600,545,15,15);
      obstacle.addImage("ob",obstacleImg); 
      //scaling the obstacle sprite down
      obstacle.scale=0.4;
      //giving the obstacle sprite an x velocity
      obstacle.velocityX=-5;
      //creating a group for the obstacles
      obstacleGroup.add(obstacle)
      obstacle.debug=false;
      obstacle.lifetime=190
  obstacle.depth=jungle.depth;
  obstacle.depth=obstacle.depth+1;
  }
  }
  spawnBanana();
  spawnObstacle();
  }
       
   text("score: "+score,350,50);
  survivalTime=Math.ceil(frameCount/frameRate())
  //console.log(frameRate())
  text("survivaltime: "+survivalTime, 100,50);
    
  
  if (monkey.isTouching(obstacleGroup)){
    monkey.destroy();
    bananaGroup.destroyEach();
    obstacleGroup.destroyEach();
  }

  
 drawSprites();
  }

