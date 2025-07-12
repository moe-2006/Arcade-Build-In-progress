class MainMenuUpdated {
	constructor() {
	  // Initialize images for various elements in the main menu
	  this.startGameImg = loadImage("assets/start_game.png");   // Start Game button image
	  this.optionsImg = loadImage("assets/options.png");        // Options button image
	  this.exitImg = loadImage("assets/exit.png");              // Exit button image
	  this.backgroundImg = loadImage("assets/background.png");  // Background image
	  this.optionsScreenImg = loadImage("assets/pngegg.png");   // Options screen image
	  this.titleImg = loadImage("assets/Game_Name.png");        // Game title image
  
	  // Input field for player's name
	  this.nameInput = createInput(""); 
  
	  // Flag to track whether options are open
	  this.optionsOpen = false;
  
	  // Flag for debugging or other purposes
	  this.fixStuff = false;
	}
  
	// Method to reload images and reset elements
	reloadImages(fix = false) {
	  // Remove all elements on the screen
	  removeElements();
	  
	  // Set the rect mode to CORNER
	  rectMode(CORNER);
  
	  // Reinitialize the name input field
	  this.nameInput = createInput(""); 
  
	  // Reset the options state
	  this.optionsOpen = false;
	}
  
	// Setup the main menu by setting the canvas and element properties
	setupMenu() {
	  // Create a canvas that fills the entire window
	  createCanvas(windowWidth, windowHeight);
  
	  // Set up the name input field
	  this.nameInput.attribute("placeholder", "Enter Name");  // Placeholder text
	  this.nameInput.size(200);  // Input width
	  this.nameInput.position(50, (windowHeight / 2) - 150);  // Position on screen
  
	  // Log window size for debugging
	  //console.log(windowWidth, windowHeight);
  
	  // Resize images to appropriate dimensions
	  this.backgroundImg.resize(windowWidth, windowHeight);   // Resize background to fit the window
	  this.startGameImg.resize(120, 50);                       // Resize Start Game button
	  this.optionsImg.resize(75, 50);                          // Resize Options button
	  this.exitImg.resize(75, 50);                             // Resize Exit button
	  this.optionsScreenImg.resize(windowWidth - 270, windowHeight * 0.8);  // Resize options screen
	}
  
	// Check which button was clicked (Start Game, Options, Exit)
	checkButtons() {
	  console.log('checking buttons');
  
	  let baseHeight = windowHeight / 2;

	  if (this.optionsOpen){
	  	let click = this.checkOptions()
	  	if (!click){
	  		this.optionsOpen = false
	  	}
	  }
  
	  // Check if the Start Game button was clicked
	  if ((mouseY > baseHeight - 100) && (mouseY < baseHeight - 50) && (mouseX > 50) && (mouseX < 170)) {
		console.log('Start button pressed');
		this.startGame();  // Call the start game function
	  }
  
	  // Check if the Options button was clicked
	  if ((mouseY > baseHeight) && (mouseY < baseHeight + 50) && (mouseX > 50) && (mouseX < 125)) {
		console.log('Options button pressed');
		this.optionsOpen = !this.optionsOpen;  // Toggle options visibility
	  }
  
	  // Check if the Exit button was clicked
	  if ((mouseY > baseHeight + 100) && (mouseY < baseHeight + 150) && (mouseX > 50) && (mouseX < 125)) {
		console.log('Exit button pressed');
		exitGame();  // Call exit game function
	  }
  
	  // If options are open, check options
	  // if (this.optionsOpen) {
	// 	this.checkOptions();
	  // }
	}
  
	// Check if the music On/Off buttons are clicked
	checkOptions(){

		if ((mouseX > (windowWidth/2) + 15) && (mouseX < (windowWidth/2) + 125) && (mouseY > (windowHeight/2) - 44) && (mouseY < (windowHeight/2) + 6)){
			musicOn = true
			return true
		}

		if ((mouseX > (windowWidth/2) + 105) && (mouseX < (windowWidth/2) + 200) && (mouseY > (windowHeight/2) - 44) && (mouseY < (windowHeight/2) + 6)){
			musicOn = false
			return true
		}

		return false

	}
  
	// Start the game if the name input is valid
	startGame() {
	  // Check if the name is longer than 2 characters
	  if (this.nameInput.value().length > 2) {
		state = 1;  // Set state to 1 (start game)
		nameValue = this.nameInput.value();  // Store the player's name
	  }
	}
  
	// Draw the options screen (music toggle)
	drawOptionsScreen() {
	  push();
  
	  // Draw the background rectangle for options screen
	  // fill("black");
	  // rect(300, windowHeight / 10, windowWidth - 350, windowHeight * 0.8);
	  filter(BLUR)
  
	  // Set the font size for the text
	  textSize(44);
  
	  // Draw the "Music: " label
	  fill("white");
	  text("Music: ", (windowWidth / 2) - 125, (windowHeight / 2));
  
	  // Draw the "On" and "Off" options with transparency if not selected
	  if (!musicOn) {
		fill(255, 255, 255, 127);
	  }
	  text("On", (windowWidth / 2) + 25, (windowHeight / 2));
  
	  fill(255, 255, 255);
	  text("/", (windowWidth / 2) + 100, (windowHeight / 2));
  
	  if (musicOn) {
		fill(255, 255, 255, 127);
	  }
	  text("Off", (windowWidth / 2) + 125, (windowHeight / 2));
  
	  pop();
	}
  
	// Draw the main menu
	drawMenu(){
		clear()

		if (this.optionsOpen){
			this.nameInput.hide()
		}
		else{
			this.nameInput.show()
		}

		push()
			imageMode(CORNER)
			if (this.fixStuff){
				translate(-(windowWidth/2), -windowHeight/2)
			}
			image(this.backgroundImg, 0, 0)
			image(this.startGameImg, 50, (windowHeight/2) - 100)
			image(this.optionsImg, 50, (windowHeight/2))
			image(this.exitImg, 50, (windowHeight/2) + 100)
			image(this.titleImg, (windowWidth/2)-300, 100)

			fill("white")
            textStyle(BOLD)
			textSize(40)
            stroke(0)
            strokeWeight(10)
			text("TO START enter a 3+ character name.\nControls: WASD (Only supported on Keyboard) \nStop at the colored circle to pick up and drop off pasengers. \n", 55, 0.8*windowHeight)
			// this.debug()

			if (this.optionsOpen){
				this.drawOptionsScreen()
			}			

		pop()
	}
  
	// Debug function (show mouse position for debugging)
	debug() {
	  push();
  
	  fill("white");
	  textSize(32);
	  text("Position: " + mouseX + ", " + mouseY, 50, 50);
  
	  pop();
	}
  }
  
