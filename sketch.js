var bg,bgImg;
var player, shooterImg, shooter_shooting;


function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
  background_j5 = loadImage("assets/SSs.png")
  bgImg = loadImage("assets/bg.jpeg")
  Game_j1 = loadImage("assets/Game_j1.jpeg")
  Game_j2 = loadImage("assets/Game_j2.jpeg")
  Game_j3 = loadImage("assets/Game_j3.webp")
  Game_j4 = loadImage("assets/Game_j4.jpg")
  Enemy_j1IMG = loadImage("assets/Enemy_j1.jpeg")
 bulletIMG = loadImage("assets/Bullet.png ")
 explosion = loadSound("assets/explosion.mp3")
} 

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
//bg.addImage(background_j5)
bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1835, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)
   bulletGroup = createGroup()
   Enemy_j1Group = createGroup()
   
  }

  score = 0;

function draw() {
  background(0); 

  if(frameCount%100===0){
    Enemy()
  }
    handalecolision();

  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
 
  player.addImage(shooter_shooting)

}
 if(keyDown("RIGHT_ARROW")){
   shootBullet()
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}

text("Score: "+ score, 500,50);


drawSprites();

}

function shootBullet(){
 
  bullet= createSprite(150, width/2, 50,20)
  bullet.y= player.y-20
  bullet.addImage(bulletIMG)
  bullet.scale=0.5
  bullet.velocityX= 7
  bulletGroup.add(bullet)


}

function Enemy(){
  Enemy_j1 = createSprite(800,random(20,780),40,40)
     Enemy_j1.scale = 0.3
       Enemy_j1.debug = true
       Enemy_j1.velocityX= -2
        Enemy_j1Group.add(Enemy_j1)
        Enemy_j1.addImage(Enemy_j1IMG)
}
function handalecolision(){
  
  if(bulletGroup.isTouching(Enemy_j1Group))
    {
      explosion.play();
       bulletGroup.destroyEach();
       Enemy_j1Group.destroyEach();      
       score = score+10
    }
}
