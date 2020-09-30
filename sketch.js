var End  = 0;
var Play = 1;
var Serve = 2;
var Win = 3;
var gameState = 2;
var bg,bgImage,bg2Image,bg3Image,win;
var start,startImage;
var monkey,monkey_running;
var ground,ground2;
var banana,bananaImage,bananaGroup;
var ob,obImage,obGroup;
var restart,restartImage;
var score;

function preload(){
 bgImage = loadImage("deep-tropical-jungles-southeast-asia-260nw-1536287759.webp");
  bg2Image = loadImage("Forest-04.jpg");
  startImage = loadImage("download (4).jpg");
  monkey_running=loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  obImage =  loadImage("obstacle.png");
  bananaImage = loadImage("banana.png");
  bg3Image = loadImage("5dd52585e279ff90d458a33bf44a7325.jpg");
restartImage=loadImage("79-791506_reset-button-restart-button-pixel-art-8-bit.png");
  win = loadImage("win.jpg");
}
function setup(){
createCanvas(600,200);
  bg = createSprite(300,141,10,10);
  bg.addImage(bgImage);
  bg.x = bg.width /2;
  start = createSprite(320,170,100,30);
  start.addImage(startImage);
  start.scale = 0.5;
  start.visible = false;
  monkey = createSprite(90,150,10,10);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.1;
  monkey.visible =false;

  ground  = createSprite(300,198,600,5);
  ground.visible = false;
  
  restart = createSprite(556.5,180,10,10);
  restart.addImage(restartImage);
  restart.scale = 0.1;
  restart.visible = false;
  score = 0;
  obGroup = createGroup();
  bananaGroup = createGroup();
}

function draw(){
 background("green");

   monkey.collide(ground); 
  drawSprites();
   if(gameState === Serve){
     fill("red");
     textSize(30);
  text("Save The Hungry ",150,30);
     fill("white")
  text("From The Monster",190,60);
     fill("blue");
     text("Monkey",400,30);
     text("He is in ",210,100);
     fill("red");
     text("Danger",330,100);
     start.visible = true;
     if(mousePressedOver(start)){
     starts();
     }
  }

  if(gameState === Play){
    fill("black");
    textSize(30);
  
   text("Banana               :"+score,5,25);
    fill("red");
    text("Power",120,25);
    if(score>=30){
    gameState = Win;
    }
    restart.visible= false;
  start.visible = false;
    bg.addImage(bg2Image);
    bg.scale = 0.7;
    bg.velocityX = -(3+score/2);
   if (bg.x < 93){
      bg.x = bg.width/2;
    }
    bg.y = 70;
    monkey.visible = true;
    
   
  if(keyDown("space")&& monkey.y >=156.8) {
        monkey.velocityY = -10;
      
    }
    
    //add gravity
    monkey.velocityY = monkey.velocityY+0.7;
      obs();
    bananas();
       obGroup.velocityX = -5;
   
    }
if(bananaGroup.isTouching(monkey)){
bananaGroup.destroyEach();
  score = score+5;
}
   if(obGroup.isTouching(monkey)){
  gameState = End;
   }
     console.log(monkey.y);
  if(gameState === End){
  monkey.visible = false;
    bg.addImage(bg3Image);
    bg.velocityX = 0;
    bananaGroup.destroyEach();
    obGroup.destroyEach();
    bg.x = 300;
    bg.y = 100;
    restart.visible = true;
    if(mousePressedOver(restart)){
    gameState = Play;
      score = 0;
       monkey.x = 90;
     monkey.y = 150;
    }
  }
   if(gameState === Win){
   bg.addImage(win);
     bananaGroup.destroyEach();
     obGroup.destroyEach();
     monkey.visible = false;
     bg.velocityX= 0;
      bg.x = 300;
    bg.y = 60;
     bg.scale = 0.5;
    
    restart.visible = true;
    if(mousePressedOver(restart)){
    gameState = Play;
       monkey.x = 90;
     monkey.y = 150;
      score = 0;
   }
  }
}
function starts(){
gameState = Play;
}
function obs(){
  if(frameCount % 80 ===0){
  ob = createSprite(610,185,10,10);
  ob.addImage(obImage);
   ob.velocityX = -(6+score/2);;
    ob.setCollider("circle",0,0,40);
      ob.debug = false;
    ob.scale = 0.11;
    ob.lifetime = 220;
  obGroup.add(ob);
   
}
}
function bananas(){
    if(frameCount % 60 === 0){
  banana=createSprite(610,Math.round(random(94.5,165)),10,10);
  banana.addImage(bananaImage);
   banana.velocityX = -(5+score/2);
banana.setCollider("circle",0,50,40);
      banana.debug = false;
    banana.scale = 0.09;
      banana.lifetime = 220;
  bananaGroup.add(banana);
}
}
