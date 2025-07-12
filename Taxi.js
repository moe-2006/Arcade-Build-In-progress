class Taxi{ 


  // 1920 - 60, 1080 - 155
  constructor(x=0, y=-365, ang=0, angSpeed=0.01*Math.PI, speed=0, maxSpeed=6, accel=0, maxAccel=1, dAcc=0.01, friction=0.02, sizex=windowWidth*2, sizey=windowHeight*2, cameraSizeX=windowWidth, cameraSizeY=windowHeight, cameraThreshX=windowWidth/6, cameraThreshY=windowHeight/6, timer=50, totalLives=5){
    // this.img = loadImage("./assets/loadImage_0.png")

    // innitializes all default car settings
    this.ang = ang
    this.angSpeed = angSpeed
    this.speed = speed
    this.maxSpeed = maxSpeed
    this.accel = accel
    this.maxAccel = maxAccel
    this.dAcc = dAcc
    this.x = x
    this.y = y
    this.sizex = sizex
    this.sizey = sizey
    this.friction = friction
    this.cameraSizeX = cameraSizeX
    this.cameraSizeY = cameraSizeY
    this.cameraThreshX = cameraThreshX
    this.cameraThreshY = cameraThreshY
    this.cameraPos = [(-sizex/2)+(cameraSizeX/2), -(sizey/2)+(cameraSizeY/2)]
    this.mapPos = [0, 0]
    this.playerMoveX = true
    this.playerMoveY = true
    this.wall = false
    this.startHouse = 0
    this.DestHouse = 1
    this.totalLives = totalLives
    this.lives = totalLives
    this.reachedStart = false
    this.reachedDest = false
    this.timer = timer
    this.timerYes = true
    this.tick = 60
    this.levelIndex = 0;
    this.score = 0
    this.drawCenter = [(-sizex/2)+(cameraSizeX/2), -(sizey/2)+(cameraSizeY/2)]
    mapImage.resize(sizex, sizey)
    this.drawPos = [this.drawCenter[0] + this.x - this.cameraPos[0],
                      this.drawCenter[1] - this.y + this.cameraPos[1]]

                      // starts the map and destination / start points
    this.scrollMap(true)
    this.chooseStart()
    this.chooseDest()

    this.dir = [Math.cos(this.ang), Math.sin(this.ang)]
    console.log(windowHeight, windowWidth)
    // console.log(this.cameraPos, this.drawCenter, this.mapPos, this.drawPos[0])
  }
 // re initializes taxi properties when game go end
  init(x=0, y=-365, ang=0, angSpeed=0.01*Math.PI, speed=0, maxSpeed=6, accel=0, maxAccel=1, dAcc=0.01, friction=0.02, sizex=windowWidth*2, sizey=windowHeight*2, cameraSizeX=windowWidth, cameraSizeY=windowHeight, cameraThreshX=windowWidth/6, cameraThreshY=windowHeight/6, timer=  50, totalLives=10){
    this.ang = ang
    this.angSpeed = angSpeed
    this.speed = speed
    this.maxSpeed = maxSpeed
    this.accel = accel
    this.maxAccel = maxAccel
    this.dAcc = dAcc
    this.x = x
    this.y = y
    this.sizex = sizex
    this.sizey = sizey
    this.friction = friction
    this.cameraSizeX = cameraSizeX
    this.cameraSizeY = cameraSizeY
    this.cameraThreshX = cameraThreshX
    this.cameraThreshY = cameraThreshY
    this.cameraPos = [(-sizex/2)+(cameraSizeX/2), -(sizey/2)+(cameraSizeY/2)]
    this.mapPos = [0, 0]
    this.playerMoveX = true
    this.playerMoveY = true
    this.wall = false
    this.startHouse = 0
    this.DestHouse = 1
    this.reachedStart = false
    this.reachedDest = false
    this.timer = timer
    this.timerYes = true
    this.tick = 60
    this.levelIndex = 0;
    this.score = 0
    this.totalLives = totalLives
    this.lives = totalLives
    this.drawCenter = [(-sizex/2)+(cameraSizeX/2), -(sizey/2)+(cameraSizeY/2)]
    mapImage.resize(sizex, sizey)
    this.drawPos = [this.drawCenter[0] + this.x - this.cameraPos[0],
                      this.drawCenter[1] - this.y + this.cameraPos[1]]

    this.scrollMap(true)
    this.chooseStart()
    this.chooseDest()

    this.dir = [Math.cos(this.ang), Math.sin(this.ang)]
    console.log(windowHeight, windowWidth)
    // console.log(this.cameraPos, this.drawCenter, this.mapPos, this.drawPos[0])
  }
  // position of the taxi
  getPos(){
    return [this.x, this.y]
  }
 // preloads the car
  preloadPlayer(){
    this.img = loadImage("assets/car.png")
  }

  // self explanatory function
  handleMovementInput(){
    let ws = false
    if (keyIsDown(65)){
      this.ang -= this.angSpeed
    }
    if (keyIsDown(68)){
      this.ang += this.angSpeed
    }
    if (keyIsDown(87)){
      this.accel += this.dAcc
      ws = true
    }
    if (keyIsDown(83)){
      this.accel -= this.dAcc
      ws = true
    }

    this.speedCheck(ws)
  
  }
   // works with input to move da car
  handleMovement(){
    this.dir = [Math.cos(this.ang), Math.sin(this.ang)]
  
    let dx, dy;

    // if u hit a wall, change movement
    if (this.wall && this.speed > 0){
      this.speed = Math.min(this.speed, 1)
      if (this.accel > 0){
        this.accel = Math.min(this.accel, 0.1)
      }
      else{
        this.accel = Math.max(this.accel, -0.1)
      }
    }
    else if (this.wall && this.speed < 0){
      this.speed = Math.max(this.speed, -1)
      if (this.accel > 0){
        this.accel = Math.min(this.accel, 0.1)
      }
      else{
        this.accel = Math.max(this.accel, -0.1)
      }
    }
    dx = this.dir[0]*this.speed
    dy = this.dir[1]*this.speed
    

    this.y -= dy
    this.x += dx

  //   if (this.playerMoveX){
  //     this.drawPos[0] = this.x
  //   }
  //   if (this.playerMoveY){
  //     this.drawPos[1] = this.y
  //   }

    this.drawPos[0] = this.drawCenter[0] + this.x - this.cameraPos[0]
    this.drawPos[1] = this.drawCenter[1] - this.y + this.cameraPos[1]

    this.worldBorderCheck()
    this.doCollisions()
  }
  // dont let car leave the world
  worldBorderCheck(){
    if (this.x <= -this.sizex/2){
      this.x = -this.sizex/2
      this.wall = true
      return
    }
    if (this.x >= this.sizex/2){
      this.x = this.sizex/2
      this.wall = true
      return
    }

    if (this.y <= -this.sizey){
      this.y = -this.sizey
      this.wall = true
      return
    }
    if (this.y >= 0){
      this.y = 0
      this.wall = true
      return
    }

    this.wall = false
  }
 // dont let car go too fast or go too fast too fast (accel)
  speedCheck(wOrS){
  
    this.speed += this.accel
  
    if (this.speed > this.maxSpeed){
      this.speed = this.maxSpeed
    }
    else if (this.speed < -this.maxSpeed){
      this.speed = -this.maxSpeed
    }
  
    if (this.accel > this.maxAccel){
      this.accel = this.maxAccel
    }
    else if (this.accel < -this.maxAccel){
      this.accel = -this.maxAccel
    }
  
    if (!wOrS){
      this.accel = 0
      if (this.speed >= this.friction){
        this.speed -= this.friction
      }
      else if(this.speed <= -this.friction){
        this.speed += this.friction
      }
    }

    if (this.speed < 0.02 && this.speed > 0){
      this.speed = 0
    }
    else if (this.speed > -0.02 && this.speed < 0){
      this.speed = 0
    }

  }
  
  setupPlayer() {
    arial = loadFont("assets/ARIAL.TTF")
    console.log("Setup start for player")
    removeElements()
    canvas = createCanvas(this.sizex, this.sizey, WEBGL)
    // background(mapImage, 255)
    angleMode(RADIANS)
    rectMode(CENTER)
    this.scrollMap()
    console.log("Setup done for player")
    textFont(arial)
  }
// everything you see in the hud, right here
  drawHUD(){
    push()
    // rotate(this.ang)
    // text("Hello", this.drawPos[0], this.drawPos[1])
    // translate(this.drawPos[0], this.drawPos[1])
    fill("black")
    textSize(32)
    // textAlign(CENTER, CENTER)

    let timeText = "Time Left: " + this.timer
    let scoreText = "Current Score: " + this.score
    let livesText = "Lives: " + this.lives + " / " + this.totalLives

    let finalText = timeText + "\n" + scoreText + "\n" + livesText

    text(finalText, -this.sizex/2, -this.sizey/2+32)
    pop()
  }

  drawHouseHB(dist, disty){
    push()

      for (let i = 0; i < houses.length; i++){
        fill(0, 0, 0, 0)
        strokeWeight(1)
        let box = houses[i]
        let boxY = box.y * windowHeight / 922
        let boxX = box.x * windowWidth / 1912
        let boxW = box.w * windowWidth / 1912
        let boxH = box.h * windowHeight / 922
        // translate(houses[i].x + this.mapPos[0] + (houses[i].w/2), - houses[i].y - (this.sizey/2) + this.mapPos[1] + (houses[i].h/2))
        rect(boxX + this.mapPos[0] + (boxW/2), - boxY - (this.sizey/2) + this.mapPos[1] + (boxH/2), boxW, boxH)
      }

    pop()
  }
 // dont let me hit da house
  doCollisions(){

      for (let i = 0; i < houses.length; i++){
        fill(0, 0, 0, 0)
        strokeWeight(1)
        // translate(houses[i].x + this.mapPos[0] + (houses[i].w/2), - houses[i].y - (this.sizey/2) + this.mapPos[1] + (houses[i].h/2))
        // let boxX = houses[i].x + this.mapPos[0] + (houses[i].w/2)
        // let boxY = - houses[i].y - (this.sizey/2) + this.mapPos[1] + (houses[i].h/2)
        // rect(, , houses[i].h)
        let box = houses[i]
        let boxY = box.y * windowHeight / 922
        let boxX = box.x * windowWidth / 1912
        let boxW = box.w * windowWidth / 1912
        let boxH = box.h * windowHeight / 922
        let hit = false
        // console.log(box.x, box.x + 0.01, box.y, this.x, this.y, ((this.y < box.y) && (this.y > box.y - box.h) && (this.x > box.x) && (this.x - box.x < 2)));
        
        if ((this.y <= boxY) && (this.y > boxY - boxH) && (this.x >= boxX) && (this.x < boxX + 10)){
          this.x = boxX
          hit = true
        }
        if ((this.y <= boxY) && (this.y > boxY - boxH) && (this.x <= boxX + boxW) && (this.x > boxX + boxW - 10)){
          this.x = boxX + boxW
          hit = true
        }
        if ((this.x >= boxX) && (this.x < boxX + boxW) && (this.y >= boxY - boxH) && (this.y < boxY - boxH + 10)){
          this.y = boxY - boxH
          hit = true
        }
        if ((this.x >= boxX) && (this.x < boxX + boxW) && (this.y <= boxY) && (this.y > boxY - 10)){
          this.y = boxY
          hit = true
        }

        if ((hit) && (Math.abs(this.speed) > 2) && (!this.wall)){
          this.lives -= 1
          this.wall = true
        }
        else if(hit){
          this.wall = true
        }
      }

  }
// gives me random numba 
  randomIntGen(min, max){
    return (Math.floor(Math.random() * (max - min + 1)) + min) 
  }
// gives me random house from random numba
  chooseStart(){
    let startPoint = this.randomIntGen(0, houses.length - 1)
    this.startHouse = startPoint
  }
// gives me random destination house from randum numba
  chooseDest(){
    let endPoint = this.randomIntGen(0, houses.length - 1)
    while (endPoint == this.startHouse){
      endPoint = this.randomIntGen(0, houses.length - 1)
    }

    this.DestHouse = endPoint
  }

  drawStartAndDest(){
    push()
      let box = houses[this.startHouse]
      let boxY = box.y * windowHeight / 922
      let boxX = box.x * windowWidth / 1912
      let boxW = box.w * windowWidth / 1912
      let boxH = box.h * windowHeight / 922
      // translate(houses[i].x + this.mapPos[0] + (houses[i].w/2), - houses[i].y - (this.sizey/2) + this.mapPos[1] + (houses[i].h/2))
      fill(255, 0, 0, 127)
      rect(boxX + this.mapPos[0] + (boxW/2), - boxY - (this.sizey/2) + this.mapPos[1] + (boxH/2), boxW, boxH)
      text
      box = houses[this.DestHouse]
      boxY = box.y * windowHeight / 922
      boxX = box.x * windowWidth / 1912
      boxW = box.w * windowWidth / 1912
      boxH = box.h * windowHeight / 922
      // translate(houses[i].x + this.mapPos[0] + (houses[i].w/2), - houses[i].y - (this.sizey/2) + this.mapPos[1] + (houses[i].h/2))
      fill(255, 0, 0, 127)
      rect(boxX + this.mapPos[0] + (boxW/2), - boxY - (this.sizey/2) + this.mapPos[1] + (boxH/2), boxW, boxH)
    pop()
  }

  drawNextPoint(){
    push()

      if (!this.reachedStart){

        // console.log("checking startPoint");
        
        fill(255, 0, 255, 127)
        strokeWeight(0)
        let box = houses[this.startHouse]
        let boxY = box.y * windowHeight / 922
        let boxX = box.x * windowWidth / 1912
        let boxW = box.w * windowWidth / 1912
        let boxH = box.h * windowHeight / 922
        // translate(houses[i].x + this.mapPos[0] + (houses[i].w/2), - houses[i].y - (this.sizey/2) + this.mapPos[1] + (houses[i].h/2))
        ellipse(boxX + this.mapPos[0] + (boxW/2), - boxY - (this.sizey/2) + this.mapPos[1] + (1.1*boxH), 20)
      }

      else if(!this.reachedDest){
        fill(255, 255, 0, 127)
        strokeWeight(0)
        let box = houses[this.DestHouse]
        let boxY = box.y * windowHeight / 922
        let boxX = box.x * windowWidth / 1912
        let boxW = box.w * windowWidth / 1912
        let boxH = box.h * windowHeight / 922
        // translate(houses[i].x + this.mapPos[0] + (houses[i].w/2), - houses[i].y - (this.sizey/2) + this.mapPos[1] + (houses[i].h/2))
        ellipse(boxX + this.mapPos[0] + (boxW/2), - boxY - (this.sizey/2) + this.mapPos[1] + (1.1*boxH), 20)
      }

    pop()
    
  }

  checkNextPoint(){

    if (!this.reachedStart){

      // console.log("Checking startPoint");
      

      let box = houses[this.startHouse]
      let boxY = box.y * windowHeight / 922
      let boxX = box.x * windowWidth / 1912
      let boxW = box.w * windowWidth / 1912
      let boxH = box.h * windowHeight / 922

      let realX = boxX + (boxW/2)
      let realY = boxY - (1.1*boxH)

      let dirPlayer = [this.x - realX, this.y - realY]
      let r = 30
      let dist = (dirPlayer[0]*dirPlayer[0]) + (dirPlayer[1]*dirPlayer[1])

      // console.log(dist, dirPlayer[1], realY, this.y);
      

      if ((dist <= (r*r)) && this.speed == 0){
        this.reachedStart = true
      }
    }

    else if (!this.reachedDest){

      // console.log("Checking startPoint");
      

      let box = houses[this.DestHouse]
      let boxY = box.y * windowHeight / 922
      let boxX = box.x * windowWidth / 1912
      let boxW = box.w * windowWidth / 1912
      let boxH = box.h * windowHeight / 922

      let realX = boxX + (boxW/2)
      let realY = boxY - (1.1*boxH)

      let dirPlayer = [this.x - realX, this.y - realY]
      let r = 30
      let dist = (dirPlayer[0]*dirPlayer[0]) + (dirPlayer[1]*dirPlayer[1])

      // console.log(dist, dirPlayer[1], realY, this.y);
      

      if ((dist <= (r*r)) && this.speed == 0){
        this.reachedDest = true
      }
    }

  }
 // draws the player car
  drawPlayer() {

    push();
    // background(mapImage)
      translate(this.drawPos[0], this.drawPos[1])
      rotate(this.ang)
      strokeWeight(0)
      texture(img);
      rect(0, 0, 100, 100)
    pop()
  }

  
  scrollMap(st = false){
    if (st){
      console.log("check");
    }
    
    if (this.x > (this.cameraPos[0] + this.cameraThreshX)){
      this.cameraPos[0] = this.x - this.cameraThreshX
      let dist = this.cameraPos[0] - this.drawCenter[0]
      this.mapPos[0] = -dist
    }
    if (this.x < (this.cameraPos[0] - this.cameraThreshX)){
      this.cameraPos[0] = this.x + this.cameraThreshX
      let dist = this.cameraPos[0] - this.drawCenter[0]
      this.mapPos[0] = -dist
    }

    if (this.y < (this.cameraPos[1] - this.cameraThreshY)){
      this.cameraPos[1] = this.y + this.cameraThreshY
      let dist = this.cameraPos[1] - this.drawCenter[1]
      this.mapPos[1] = dist
    }
    if (this.y > (this.cameraPos[1] + this.cameraThreshY)){
      // console.log("")
      this.cameraPos[1] = this.y - this.cameraThreshY
      let dist = this.cameraPos[1] - this.drawCenter[1]
      this.mapPos[1] = dist
    }
  }
      
 // da map
  drawMap() {

    // console.log(this.drawCenter[0], this.mapPos[0], this.cameraPos[0], this.x, this.x - (this.cameraPos[0] + this.cameraThreshX), this.speed)
    // console.log(this.y, this.cameraPos[1] + this.cameraThreshY)
    image(mapImage, this.mapPos[0]-(this.sizex/2), this.mapPos[1]-(this.sizey/2))
    // image(mapImage, -2000, -1600)
  }
// timer for da  hud
  doTimer(){
    if (this.timerYes){
      this.timer--
    }
  }

  doTick() {
    this.tick--
    
    if (keyIsPressed){
        this.handleMovementInput()
    }
    else{
        this.speedCheck(false)
    }
    this.handleMovement()
    this.checkNextPoint()

    clear()
    this.scrollMap()
    this.drawMap()
    // console.log(this.mapPos)
    this.drawPlayer()
    this.drawHUD()
    // this.drawHouseHB()
    // this.drawStartAndDest()
    this.drawNextPoint()

    if (this.tick == 0){
      this.tick = 60
      this.doTimer()
    }
    
    if (this.reachedStart && this.reachedDest) {
  // Only level up if below max level
  if (this.levelIndex < 3) {
    this.levelIndex++; // advance to the next level
    console.log("Level up! Now at level:", this.levelIndex);

    // You can set new level-specific properties here
    if (this.levelIndex === 1) {
      this.maxSpeed = 7;
      this.maxAccel = 2;
      this.timer += 18;
    } else if (this.levelIndex === 2) {
      this.maxSpeed = 9;
      this.maxAccel = 3;
      this.timer += 15;
    } else if (this.levelIndex === 3) {
      this.maxSpeed = 11;
      this.maxAccel = 4;
      this.timer += 10;
    }
  } else{
    this.maxSpeed = 11;
      this.maxAccel = 4;
    this.timer += 10;
  }

  // Score update logic
  this.score += this.timer;

  // Reset points
  this.chooseStart();
  this.chooseDest();
  this.reachedStart = false;
  this.reachedDest = false;
}



    if (this.timer == 0 || this.lives == 0 ){
      this.endGame()
      mainMenu.fixStuff = true
    }
    
  }
 // if you die, this is what you see
  endGame(){
    state = 3
    leaderboard.push({name: nameValue, score: this.score})
    console.log(leaderboard);
    sortLeaderboard()
  }

}
