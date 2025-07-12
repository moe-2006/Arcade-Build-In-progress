
let canvas  // Declare canvas variable
let mapImage  // Declare map image variable
let backgroundImg  // Declare background image variable
var player  // Declare player variable
var mainMenu  // Declare mainMenu variable
var state = 0  // Initial game state
let arial  // Declare font variable
let playSetup = false  // Flag to check if play setup is done
let menuSetup = false  // Flag to check if menu setup is done
let img  // Declare image variable
var nameValue  // Declare variable for player name
var leaderboard = []  // Array to hold leaderboard data
let musicOn = true  // Flag for music status
let leaderFirst = true  // Flag for leaderboard display
let musicPlay  // Music player variable
let leaderboardTitle  // Variable for leaderboard title image

// Array of house objects with coordinates and size
let houses = [
  { x: -1827, y: -76, w: 320, h: 340 },
  { x: -1480, y: -70, w: 420, h: 340 },
  { x: -1040, y: -135, w: 330, h: 260 },
  { x: -620, y: -140, w: 240, h: 250 },
  { x: -232, y: 0, w: 382, h: 400 },
  { x: 224, y: -122, w: 300, h: 290 },
  { x: 643, y: -107, w: 240, h: 280 },
  { x: 1030, y: -144, w: 330, h: 260 },
  { x: 1495, y: -70, w: 320, h: 330 },
  // END OF ROW 1 1-9 HOUSES
  { x: -1648, y: -523, w: 240, h: 250 },
  { x: -1312, y: -527, w: 440, h: 246 },
  { x: -872, y: -527, w: 290, h: 246 },
  { x: -492, y: -527, w: 340, h: 246 },
  { x: 143, y: -527, w: 330, h: 246 },
  { x: 498, y: -527, w: 440, h: 246 },
  { x: 930, y: -527, w: 310, h: 246 },
  { x: 1335, y: -527, w: 300, h: 246 },
  // END OF ROW 2 10-18 HOUSES
  { x: -1648, y: -880, w: 320, h: 286 },
  { x: -1205, y: -880, w: 310, h: 286 },
  { x: -809, y: -890, w: 240, h: 276 },
  { x: -479, y: -900, w: 330, h: 260 },
  { x: 168, y: -880, w: 330, h: 286 },
  { x: 569, y: -880, w: 310, h: 286 },
  { x: 989, y: -904, w: 340, h: 270 },
  { x: 1377, y: -880, w: 240, h: 260 },
  // END OF ROW 3 19-25 HOUSES
  { x: -1746, y: -1282, w: 330, h: 260 },
  { x: -1317, y: -1276, w: 350, h: 250 },
  { x: -884, y: -1284, w: 314, h: 250 },
  { x: -487, y: -1284, w: 320, h: 250 },
  { x: 134, y: -1284, w: 314, h: 250 },
  { x: 584, y: -1284, w: 240, h: 250 },
  { x: 995, y: -1284, w: 290, h: 250 },
  { x: 1381, y: -1275, w: 330, h: 260 },
  // FINAL ROW OF HOUSES 26-33
];

// Array for map borders (top, bottom, left, right)
let mapBorders = [
  { x: -470, y: -265, w: 940, h: 20 }, // Top border
  { x: -470, y: 310, w: 940, h: 20 }, // Bottom border
  { x: 510, y: -235, w: 30, h: 510 }, // Right border
  { x: -510, y: -235, w: 30, h: 510 }, // Left border
];

let tick = 60  // Frame rate (ticks per second)

// Handle image loading
function handleImage(image){
  img = image
  console.log("success loading the picture")
}

// Sort the leaderboard based on score
function sortLeaderboard(){
  console.log("sorting")
  let maxScoreRNPlace = 0

  for (i = 0; i < leaderboard.length; i++){
    maxScoreRNPlace = i

    for (j = i; j < leaderboard.length; j++){
      if (leaderboard[j].score > leaderboard[maxScoreRNPlace].score){
        maxScoreRNPlace = j
      }
    }

    let temp = leaderboard[i]
    leaderboard[i] = {name: leaderboard[maxScoreRNPlace].name, score: leaderboard[maxScoreRNPlace].score}
    leaderboard[maxScoreRNPlace] = {name: temp.name, score: temp.score}
  }
}

// Handle error events
function handleError(event){
  console.log(event)
}

// Preload assets before starting the game
function preload(){
  backgroundImg = loadImage("assets/background.png")  // Load background image
  musicPlay = loadSound("assets/background_music.mp3")  // Load background music
  mapImage = loadImage("assets/Game_map.png")  // Load map image
  img = loadImage("assets/car.png", handleImage, handleError)  // Load car image
  arial = loadFont("assets/ARIAL.TTF")  // Load font
  leaderboardTitle = loadImage("assets/leaderboard.png")  // Load leaderboard title image

  player = new Taxi()  // Create player instance
  mainMenu = new MainMenuUpdated()  // Create main menu instance
}

// Check for mouse clicks
function mouseClicked(){
  console.log("checking clicks")
  if (state == 0 ){
    mainMenu.checkButtons()  // Check buttons in the main menu
  }

  if (state == 3){
    state = 0  // Reset state to main menu
  }
}

// Setup the game environment
function setup(){
  backgroundImg.resize(windowWidth, windowHeight)  // Resize background image to fit window
  musicPlay.loop()  // Start music loop
  musicPlay.setVolume(1)  // Set music volume to max

  rectMode(CORNER)  // Set rectangle drawing mode to corner
}

// Show the leaderboard on screen
function showLeaderBoard(){
  mainMenu.nameInput.hide()  // Hide the name input field

  push()
    translate(-windowWidth, -windowHeight)  // Move the canvas for the leaderboard effect
    image(backgroundImg, 0, 0)  // Draw the background image
    image(leaderboardTitle, (windowWidth/2)-200, 100)  // Draw leaderboard title
    fill("white")  // Set text color to white
    textSize(50)  // Set text size
    let x = 1
    for (i = 0; i < Math.min(10, leaderboard.length); i++){  // Display top 10 leaderboard entries
      let show = ""
      show += leaderboard[i].name
      show += "  " + leaderboard[i].score
      text(show, (windowWidth/2) - 75, 250 + (50*i))  // Display each leaderboard entry
      x++
    }

    text("Click to Continue", (windowWidth/2) - 175, 250 + (50*(x)))  // Display click-to-continue message
  pop()
}

// Main game loop (draw each frame)
function draw(){
  if (!musicOn){
    musicPlay.setVolume(0)  // Mute music if it's off
  }
  else{
    musicPlay.setVolume(1)  // Play music if it's on
  }

  tick -= 1  // Decrease tick count

  if (state == 0){  // Main menu state
    if (!menuSetup){
      rectMode(CORNER)
      mainMenu.nameInput.show()  // Show name input field
      mainMenu.reloadImages()  // Reload menu images
      mainMenu.setupMenu()  // Setup the menu
      menuSetup = true  // Set menu setup flag to true
      playSetup = false  // Reset play setup flag
      leaderFirst = true  // Reset leaderboard flag
    }
    mainMenu.drawMenu()  // Draw the menu
  }

  if (state == 1){  // Game state
    if (!playSetup){
      player.init()  // Initialize player
      player.setupPlayer()  // Setup player
      playSetup = true  // Set play setup flag to true
      menuSetup = false  // Reset menu setup flag
      leaderFirst = true  // Reset leaderboard flag
    }

    player.doTick()  // Update player state each tick    
  }

  if (state == 3){  // Leaderboard state
    clear()  // Clear the screen
    showLeaderBoard()  // Show leaderboard
  }

  if (tick == 0){  // Reset tick counter every 60 frames
    tick = 60
  }
}

// Function to exit the game
function exitGame(){
  window.close()  // Close the browser window
}
