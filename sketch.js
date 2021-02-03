var trex, trex_running, trex_collided;
var ground, invisible_ground, groundImage;
var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var score;

function preload(){
  
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1= loadImage("obstacle1.png");
  obstacle2= loadImage("obstacle2.png");
  obstacle3= loadImage("obstacle3.png");
  obstacle4= loadImage("obstacle4.png");
  obstacle5= loadImage("obstacle5.png");
  obstacle6= loadImage("obstacle6.png");
  
}

function setup() {
  canvas = createCanvas(displayWidth-20, displayHeight-10);
  database = firebase.database();
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,50);
  ground.addImage("background", groundImage);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup =new Group();
  
  score = 0;
  
}

function draw() {
  background(220);
  
  score = score + Math.round(getFrameRate()/60);
  text("Score: "+ score, 500,50);
  
  if(keyDOwn("space")){
    trex.velocityY = -10;
  }
  
  trex.velocityY = trex.velocityY + 0.8;
  
  if(ground.x < 0){
    ground.x = ground/2;
  }
  
  trex.collide(invisibelGround);
  
}

function spawnClouds(){
  if(frameCount % 60 === 0){
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.raound((80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
    cloud.lifetime = 200;
    
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    cloudsGroup.add(cloud);
  }
}

function spawnObstacles(){
  if(frameCount % 60 === 0){
    var obstacle = craetteSprite(600,165,10,40);
    obstacle.velocityX = -4;
    
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
             break;
             
      case 2: obstacle.addImage(obstacle2);
             break;
             
      case 3: obstacle.addImage(obstacle3);
             break;
             
      case 4: obstacle.addImage(obstacle4);
             break;
             
      case 5: obstacle.addImage(obstacle5);
             break;
             
      case 6: obstacle.addImage(obstacle6);
             break;       
    }
    
    
    obstacle.scale = 0.5;
    obstcale.lifetime = 300;
    obsaclesGroup.add(obstacle);
  }
}