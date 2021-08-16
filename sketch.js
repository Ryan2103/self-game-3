
var gameState="start"
var boyImg,boy
var bgImg,boyImg1,bg,boyOver
var boyJ
var stone,stoneImg
var ground
var stoneGroup
var coin ,coinGroup,coinImg
var score=0
var time, count 
var a,aImg
var enemy,enemyImg,enemy1
var laser,laserImg,laserGroup
var start,startImg
var s,sImg
var life=3
var lifeImg,life1,life2,life3
var gameOver,over
var restart,no
var thanks,thanksImg
var enemyRun,enemyRunImg,enemyGroup

function preload(){
boyImg=loadAnimation("images/r1.png","images/r2.png","images/r3.png","images/r4.png")
bgImg=loadImage("images/bg2.jpg")
boyImg1=loadImage("images/still.png")
boyJ=loadAnimation("images/j1.png","images/j2.png","images/j3.png","images/j4.png")
stoneImg=loadImage("images/stone.png")
coinImg=loadAnimation("images/coin.png","images/c1.png","images/c2.png","images/c3.png","images/c4.png","images/c5.png")
aImg=loadImage("images/thumbs.gif")
enemyImg=loadAnimation("images/e1.png","images/e2.png","images/e1.png","images/e2.png","images/e3.png","images/e1.png","images/e3.png","images/e4.png","images/e5.png","images/e6.png")
laserImg=loadImage("images/laser.png")
enemy1=loadAnimation("images/d1.png","images/d1.png","images/d1.png","images/d1.png","images/d1.png","images/d2.png","images/d3.png","images/d4.png")
startImg=loadImage("images/start.png")
sImg=loadImage("images/game.PNG")
lifeImg=loadImage("images/heart.png")
boyOver=loadAnimation("images/g1.png","images/g2.png","images/g3.png")
gameOver=loadImage("images/1.jpg")
thanksImg=loadImage('images/thanks.jpg')
enemyRunImg=loadAnimation("images/crop (1).png","images/crop (2).png","images/crop (3).png","images/crop (4).png","images/crop (5).png","images/crop (6).png")
}


function setup() {
  createCanvas(1200,400);
 /* for(var i=100; i<1200; i=i+250 ){
  stone=createSprite(i,random(100,400),50,50)
  stone.addImage("stone",stoneImg)
  stone.scale=0.9 
stone.velocityX=-2
  }*/

  bg=createSprite(400,200,400,200)
 bg.addImage("bg",bgImg)
  bg.scale=1
  bg.visible=false
  over=createSprite(600,170,20,20)
over.addImage("game",gameOver)
over.scale=1.5
over.visible=false
  boy=createSprite(100, 100, 50, 50);
boy.addImage("boyImg1",boyImg1)
boy.addAnimation("boy",boyImg)
boy.addAnimation("jump",boyJ)
boy.addAnimation("over",boyOver)
boy.visible=false
//boy.collide(stone)

enemy=createSprite(1100,320,20,20)
enemy.addAnimation("enemy",enemyImg)
enemy.addAnimation("e",enemy1)
enemy.scale=1.5
enemy.visible=false

s=createSprite(600,200,20,20)
s.addImage("read",sImg)
s.scale=0.8
s.width=20

start=createSprite(900,350,50,50)
start.addImage("start",startImg)
start.scale=0.5

/*laser=createSprite(1050,300,20,20)
laser.addImage("l",laserImg)
laser.scale=0.1
laser.visible=false*/

a=createSprite(400,200,20,20)
a.addImage("up",aImg)
a.visible=false

life1=createSprite(110,45,20,20)
life1.addImage("life1",lifeImg)
life1.scale=0.15
life1.visible=false

life2=createSprite(160,45,20,20)
life2.addImage("life2",lifeImg)
life2.scale=0.15
life2.visible=false

life3=createSprite(210,45,20,20)
life3.addImage("life2",lifeImg)
life3.scale=0.15
life3.visible=false

ground=createSprite(600,380,1200,10)
ground.visible=false

stoneGroup=new Group ()
coinGroup=new Group ()
laserGroup=new Group ()
enemyGroup=new Group ()

boy.debug=false
boy.setCollider("rectangle",0,0,40,100)

if(score==2){
  life=life+1
}
}


function draw() {
  background(0)

  drawSprites();
 
 //console.log(World.seconds)


  if(gameState=="start"){

    if(mousePressedOver(start)){
   gameState="play"
   start.visible=false
   s.visible=false
   frameCount=0
    }

  }
  else if(gameState=="play"){
    count=0
count=World.seconds
console.log(count)
    fill("yellow")
    textSize(20)
    text("coins collected: "+ score,1020,50)
    text("timer: " + count,550,50)
    text("lives:",40,50)
    bg.visible=true
boy.visible=true
life1.visible=true
life2.visible=true
life3.visible=true


    if (bg.x <100){
      bg.x = bg.width/2;
     } 
    
     bg.velocityX=-4
    
    
      boy.collide(ground)
      boy.collide(stoneGroup)
      boy.addImage("boyImg1",boyImg1)
    
    
      if(boy.velocityX==0){
        boy.changeAnimation("boyImg1",boyImg1)
      }
    
      if(boy.collide(stoneGroup)){
    boy.changeAnimation("boyImg1",boyImg1)
    
      }
    
      if(keyDown(RIGHT_ARROW)){
        boy.x=boy.x+5
        boy.changeAnimation("boy",boyImg)
      }
    
      if(keyDown(LEFT_ARROW)){
        boy.x=boy.x-5
        boy.changeAnimation("boy",boyImg)
      }
    
      if(boy.y>100){
      if(keyDown("space")){
        boy.velocityY=-8
       boy.changeAnimation("jump",boyJ)
      }
    }
      boy.velocityY=boy.velocityY+0.4

      if(boy.isTouching(enemyGroup)){
        life=life-1
        enemyGroup.destroyEach()
      }
    
      
      if(count>3&&count<100){
    //a.visible=true  
    enemy.visible=true
    if(count==99){
      enemy.changeAnimation("e",enemy1)
    }
    if(frameCount%40==0){
    //laser.visible=true
    laser=createSprite(1050,320,20,20)
    laser.addImage("l",laserImg)
    laser.scale=0.1
    laser.velocityX=-15
    laser.lifetime
    laserGroup.add(laser)


    }
      }
      else{
        enemy.visible=false
      }
     
      spawnStone()
      
      spawnCoin()
      spawnEnemy()
      if(laserGroup.isTouching(boy)){
        life=life-1
        laserGroup.destroyEach()
        
      }

      if(boy.isTouching(coinGroup)){
        score=score+1
        coinGroup.destroyEach()
      }

    //  console.log(life)
    if(life==0){
      gameState="end"
    }

    if(life<=2){
      life3.visible=false
    }
    if(life<=1){
      life2.visible=false
    }
    if(life<=0){
      life1.visible=false
    }
    
      //if(frameCount%50==0){


  }
  else{
if(gameState=="end"){
  enemy.visible=false
over.visible=true
  boy.x=600
  boy.y=300
  boy.changeAnimation("over",boyOver)
  coinGroup.destroyEach()
  stoneGroup.destroyEach()
  bg.visible=false
  enemyRun.visible=false
  laserGroup.destroyEach()
  restart=createSprite(530,230,70,20)
  restart.visible=false
  no=createSprite(670,230,40,20)
  no.visible=false
  if(mousePressedOver(restart)){
    gameState="play"
    life=life+3
    score=0
    over.visible=false
    boy.x=100
    boy.y=100
    boy.changeAnimation("boyImg1",boyImg1)
    bg.visible=true
  }
  if(mousePressedOver(no)){
    thanks=createSprite(600,200,20,20)
    thanks.addAnimation("thanks",thanksImg)
    thanks.scale=1.5

  }

}

  }
}


function spawnStone(){
  if(frameCount%150===0){
stone=createSprite(1100,Math.round(random(150,330)),100,10)
stone.addImage("stone",stoneImg)
stone.scale=0.9
stone.velocityX=-2
stone.lifetime=1000
stoneGroup.add(stone)
//boy.collide(stone)
stone.debug=false
stone.setCollider("rectangle",0,-25,100,60)
  }
}

function spawnCoin(){
  if(frameCount%150===0){
coin=createSprite(1100,stone.y-80,100,10)
coin.addAnimation("coin",coinImg)
coin.scale=0.6
coin.velocityX=-2
coin.lifetime=1000
coinGroup.add(coin)

  }
}

function spawnEnemy(){
if(frameCount%200===0){
  enemyRun=createSprite(1300,Math.round(random(150,200)),20,20)
  enemyRun.addAnimation("run",enemyRunImg)
  enemyRun.velocityX=-10
  enemyRun.lifetime=500
  enemyRun.scale=1.5
  enemyGroup.add(enemyRun)
  enemyRun.debug=false
  enemyRun.setCollider("rectangle",0,5,40,60)
}

}


/*if(boy.isTouching(coin)){
  score=score+1
  coin.destroy()
 /* for (var j = 0; j < 1000; j++){
  coinGroup.get(j).destroyEach()
  }*/
  
  


function myTime(){

  //time=setTimeout(,3000)




}