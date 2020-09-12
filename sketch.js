//declaring the variables
var PLAY = 1;
var END = 0;
var gameState = 1
var score = 0;
var sword, fruit1, fruit2, fruit3, fruit4, monster;
var swordImage, monsterImage, gameoverImage;
var fruitGroup, enemyGroup;
var gameover;
var score = 0;
var gameOverSound ,knifeSwoosh;

function preload() {
  //loading images
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");

  monsterImage = loadImage("alien1.png");
  swordImage = loadImage("sword.png");
  gameoverImage = loadImage("gameover.png")
  
  gameOverSound = loadSound("gameover.mp3")
  knifeSwooshSound = loadSound("knifeSwoosh.mp3")
}

function setup() {

  //creating the canvas
  createCanvas(600, 500);

  //creating the sword
  sword = createSprite(40, 200, 20, 20);
  sword.scale = 0.7;
  sword.addImage(swordImage);

  //making the groups
  fruitGroup = createGroup();
  enemyGroup = createGroup();
}

function draw() {

  //making the background sky blue
  background("skyblue");

  //controlling the game through game state
  if (gameState === PLAY) {

    Enemy();
    fruits();

    sword.y = World.mouseY;
    sword.x = World.mouseX;

    if (fruitGroup.isTouching(sword)) {
      fruitGroup.destroyEach();
      
      knifeSwooshSound.play();
      
      score = score + 2;
    } else if (enemyGroup.isTouching(sword)) {
      gameState = END;

      fruitGroup.destroyEach();
      enemyGroup.destroyEach();

      gameOverSound.play();
      
      fruitGroup.velocityX = 0;
      enemyGroup.velocityX = 0;

      sword.addImage(gameoverImage);
      sword.scale = 2;
      sword.x = 300;
      sword.y = 250;
    }
  }

  //draw the sprites
  drawSprites();

  //display the score
  text(" score " + score, 550, 20);
}

function fruits() {
  if (World.frameCount % 80 === 0) {
    position = Math.round(random(1, 2));

    fruit = createSprite(400, 200, 20, 20);

    if (position == 1) {
      fruit.x = 400;
      fruit.velocityX = -(7 + (score / 4));
    } else {
      if (position == 2) {
        fruit.x = 0;

        fruit.velocityX = (7 + (score / 4));
      }
    }

    fruit.scale = 0.2;

    r = Math.round(random(1, 4));
    if (r == 1) {
      fruit.addImage(fruit1);
    } else if (r == 2) {
      fruit.addImage(fruit2);
    } else if (r == 3) {
      fruit.addImage(fruit3);
    } else {
      fruit.addImage(fruit4);
    }

    fruit.y = Math.round(random(50, 340));

    fruit.setLifetime = 100;

    fruitGroup.add(fruit);
  }
}

function Enemy() {
  if (World.frameCount % 200 === 0) {
    monster = createSprite(400, 200, 20, 20);
    monster.addAnimation("moving", monsterImage);
    monster.y = Math.round(random(100, 300));
    monster.velocityX = -(8 + (score / 10));
    monster.setLifetime = 50;

    enemyGroup.add(monster);
  }
}