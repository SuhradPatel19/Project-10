var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":["28b27075-3824-4c4f-9be6-3bd9056fde48","a3ec9e5c-6cdd-4b04-ba8e-8f703068bb8c","21f98998-4bbe-458f-b0ab-e3e2d2f36c3c"],"propsByKey":{"28b27075-3824-4c4f-9be6-3bd9056fde48":{"name":"puck","sourceUrl":"assets/api/v1/animation-library/gamelab/wcuV7DcPEac2EjLNAPemwiDn.zqV1cHa/category_sports/puck.png","frameSize":{"x":393,"y":243},"frameCount":1,"looping":true,"frameDelay":2,"version":"wcuV7DcPEac2EjLNAPemwiDn.zqV1cHa","categories":["sports"],"loadedFromSource":true,"saved":true,"sourceSize":{"x":393,"y":243},"rootRelativePath":"assets/api/v1/animation-library/gamelab/wcuV7DcPEac2EjLNAPemwiDn.zqV1cHa/category_sports/puck.png"},"a3ec9e5c-6cdd-4b04-ba8e-8f703068bb8c":{"name":"player","sourceUrl":"assets/v3/animations/qUmjfjXFSAu0QDEiQJ_hMdle0MVlSoWXWZbaO6NgWGY/a3ec9e5c-6cdd-4b04-ba8e-8f703068bb8c.png","frameSize":{"x":779,"y":602},"frameCount":1,"looping":true,"frameDelay":4,"version":"NDzEtKJep9f5jaIQdruoCzI7LZCxhmhf","loadedFromSource":true,"saved":true,"sourceSize":{"x":779,"y":602},"rootRelativePath":"assets/v3/animations/qUmjfjXFSAu0QDEiQJ_hMdle0MVlSoWXWZbaO6NgWGY/a3ec9e5c-6cdd-4b04-ba8e-8f703068bb8c.png"},"21f98998-4bbe-458f-b0ab-e3e2d2f36c3c":{"name":"comp","sourceUrl":"assets/v3/animations/qUmjfjXFSAu0QDEiQJ_hMdle0MVlSoWXWZbaO6NgWGY/21f98998-4bbe-458f-b0ab-e3e2d2f36c3c.png","frameSize":{"x":779,"y":602},"frameCount":1,"looping":true,"frameDelay":4,"version":"JWEPTpLzwbG.BFDM3L_sKcAbFdlH2IIl","loadedFromSource":true,"saved":true,"sourceSize":{"x":779,"y":602},"rootRelativePath":"assets/v3/animations/qUmjfjXFSAu0QDEiQJ_hMdle0MVlSoWXWZbaO6NgWGY/21f98998-4bbe-458f-b0ab-e3e2d2f36c3c.png"}}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

var playerMallet;

var playerNet=createSprite(200,18,100,20);
playerNet.shapeColor=("yellow");

var computerNet=createSprite(200,382,100,20);
computerNet.shapeColor=("yellow");

var compScore = 0;
var playerScore = 0;

var gamestate = "serve";

// making court
var boundary1 = createSprite(200,0,400,10);
boundary1.shapeColor = "white";
var boundary2 = createSprite(200,400,400,10);
boundary2.shapeColor = "white";
var boundary3 = createSprite(0,200,10,400);
boundary3.shapeColor = "white";
var boundary4 = createSprite(400,200,10,400);
boundary4.shapeColor = "white";



// creating objects and giving them colours
var striker = createSprite(200,200,10,10);
striker.shapeColor = "white";
striker.setAnimation("puck");
striker.scale=0.1;

var playerMallet = createSprite(200,50,50,10);
playerMallet.shapeColor = "black";
playerMallet.setAnimation("player");
playerMallet.scale=0.1;

var computerMallet = createSprite(200,350,50,10);
computerMallet.shapeColor = "black";
computerMallet.setAnimation("comp");
computerMallet.scale=0.1;
function draw() {
  //clear the screen
  background("green");
  
   fill("maroon");
     textSize(30);
     text (compScore,25,225);
     text (playerScore,25, 185);
  
  
  
 if (striker.isTouching(playerNet)) {
   compScore++; 
   resetball();
   }
   
   if (striker.isTouching(computerNet)) {
   playerScore++; 
   resetball();
   }
   
   
   if (playerScore==5 || compScore==5) {
     gamestate="end";
   }
   
  if (gamestate==="end") {
    fill("maroon");
     textSize(30);
     text ("Game Over!",170,160);
     text ("Press R to restart",60,190);
  }
  if (keyDown("R") && gamestate==="end") {
    playerScore=0;
    compScore=0;
    gamestate="serve";
  }
  
  
  //make the player paddle move with the Arrow keys
  paddleMovement();
  
  
  //AI for the computer paddle
  //make it move with the striker's y position
  computerMallet.x = striker.x;

  
  //draw line at the centre
   for (var i = 0; i < 400; i=i+20) {
    line(i,200,i+10,200);
  }
  
  //create edge boundaries
  //make the striker bounce with the top and the bottom edges
  createEdgeSprites();
  
  striker.bounceOff(edges);
  striker.bounceOff(playerMallet);
  striker.bounceOff(computerMallet);
  
  playerMallet.bounceOff(edges);
  computerMallet.bounceOff(edges);
  
  if (gamestate==="serve") {
    textSize(18);
    fill("maroon");
    text("Press Space to Strike",120,180);  
  
  }
  
  if (keyDown("space") && gamestate==="serve") {
    serve();
    gamestate="play";
  }
  
  drawSprites();
}

function serve() {
  striker.velocityX = 10;
  striker.velocityY = 5;
 
}

function resetball() {
  striker.x=200;
  striker.y=200;
  striker.velocityX=0;
  striker.velocityY=0;
}
function paddleMovement()
{
  if(keyDown("left")){
    playerMallet.x = playerMallet.x-10;
    
  } 
  
  if(keyDown("right")){
    playerMallet.x = playerMallet.x+10;
    
  }
  
  if(keyDown("up")){
   if(playerMallet.y>25)
   {
    playerMallet.y = playerMallet.y- 10;
   }
  }
  
  if(keyDown("down")){
    if(playerMallet.y<120)
   {
    playerMallet.y = playerMallet.y+10;
   }
  }
}

// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
