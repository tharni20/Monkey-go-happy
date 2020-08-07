
var PLAY = 1;
var END = 0;
var gameState = PLAY;


var monkey, monkeyAnimation;
var jungle, jungleImage; 
var invisibleground;
var banana, bananaImage;
var bananaGroup;
var rock, rockImage;
var rockGroup;
var gameOver, overImage;
var restart, restartImage;
var score;



function preload() {
monkeyAnimation = loadAnimation ("Monkey_01.png", "Monkey_02.png", "Monkey_03.png","Monkey_04.png", "Monkey_05.png", "Monkey_06.png","Monkey_07.png", "Monkey_08.png", "Monkey_09.png","Monkey_10.png" );

jungleImage = loadImage ("jungle2.jpg");
  
bananaImage = loadImage ("Banana.png");

rockImage = loadImage ("stone.png");
  
//overImage = loadImage ("gameOver.png");
  
restartImage = loadImage ("restart.png");

}



function setup() {
  createCanvas(600, 300);
  
  jungle = createSprite (0,0,600,300);
  jungle.addImage ("j1", jungleImage);
  jungle.scale = 1.5;
  
  monkey = createSprite (50,250,15,15);
  monkey.addAnimation("m1", monkeyAnimation);
  monkey.scale = 0.1;
  
  invisibleground = createSprite(200,280,600,10);
  invisibleground.visible = false;
  
 // gameOver = createSprite(200,150,15,15);
 // gameOver.addImage ("g2",overImage);
  //gameOver.scale = 0.5;
  
  restart = createSprite(200,250,15,15);
  restart.addImage ("r1",restartImage);
  restart.scale = 0.5;

  restart.visible = false;
  
  score=0;
  
  bananaGroup = new Group();
  
  rockGroup = new Group ();


}

function draw (){
 background("white");
  
   if(gameState === PLAY){
  
    
     
    jungle.velocityX = -2;
  
   if (jungle.x < 0){
      jungle.x = jungle.width/2;
    }
  
  
   if (keyDown("space")) {
    monkey.velocityY = -12; 
  }  
     
   if (bananaGroup.isTouching(monkey)) {
     score = score +2;
   }
 
  
   monkey.velocityY = monkey.velocityY + 0.8;  

   spawnbanana();
  
   spawnrock();
     
   if(rockGroup.isTouching(monkey)){
      gameState = END;
    }
     
     if(bananaGroup.isTouching(monkey)){
      bananaGroup.destroyEach();
    }
  }
  
    else if (gameState === END) {
    
    monkey.velocityY = 0;
    bananaGroup.setVelocityXEach(0);
    rockGroup.setVelocityXEach(0);
    jungle.velocityX = 0;
    
    bananaGroup.setLifetimeEach(-1);
    rockGroup.setLifetimeEach(-1); 
      
    restart.visible = true;
  
  }
  
  if (mousePressedOver(restart)) {
    reset();
   }

   monkey.collide(invisibleground);
  
  drawSprites();
     
   textSize(20);
   text(score,500,50);
  
}

function reset () {
  gameState = PLAY;
  restart.visible = false;
 // gameOver.visible = false;
  bananaGroup.destroyEach();
  rockGroup.destroyEach();
  score = 0;
}


function spawnbanana() {
  
  
  if (frameCount % 100 === 0) {
    banana = createSprite(600,220,40,10);
    banana.y = Math.round(random(152,200));
    banana.addImage("c1", bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -3;
    
     
    banana.lifetime = 200;
    
    
    bananaGroup.add(banana);
  }
}

function spawnrock() {
  if(World.frameCount % 80 === 0) {
    var rock = createSprite(600,265,10,40);
    rock.addImage ("r1",rockImage);
    rock.scale = 0.2;
    rock.velocityX = (-6);
    
    rock.setCollider("circle", 0,0,120);
    
    //rock.debug = true;
    
    
    rock.lifetime = 100;
    
    
    rockGroup.add(rock);
  }
}