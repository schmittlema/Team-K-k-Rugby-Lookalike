// ToDo:
	// Change it from clicking to add a bubble then pressing next, to adding a bubble then moving on to the next one automatically?
	// Change the order to left to right as opposed to outer-left, inner-left, OUTER-right, inner-right
		// This has implications with the "bubbles" array and "convertBubbleToDist"
	// Beautify

var allBlacksPlayers =
	[[39.1, 50.1, 74.9, 72.0, 59.0, 'Sam Cane'],
	[38.0, 47.0, 71.6, 78.1, 62.1, 'Ryan Crotty'],
	[41.0, 44.0, 79.8, 74.2, 58.9, 'Kieran Read'],
	[46.2, 38.1, 75.5, 66.0, 65.5, 'Israel Dagg'],
	[39.0, 45.0, 71.9, 64.0, 60.0, 'Dane Coles'],
	[44.0, 39.0, 79.9, 70.1, 61.1, 'Brodie Retallick'],
	[41.2, 44.0, 81.3, 85.1, 52.4, 'Ben Smith'],
	[39.0, 44.0, 77.0, 77.1, 58.1, 'Aaron Smith'],
	[42.0, 50.0, 83.1, 78.0, 55.2, 'Beauden Barrett']];
var allBlacksImages = ['AB1', 'AB2', 'AB3', 'AB4', 'AB5', 'AB6', 'AB7', 'AB8', 'AB9'];
for (var a = 0; a < allBlacksPlayers.length; a++) {
	for(var w  = 0; w < allBlacksPlayers[0].length - 1; w++) {
		allBlacksPlayers[a][w] = (allBlacksPlayers[a][w]) / 477;
	}
}


var blackFernsPlayers =
	[[35.1, 30.0, 61.2, 76.0, 40.5, 'Chelsea Alley'],
	[36.0, 34.0, 62.4, 67.1, 43.2, 'Eloise Blackwell'],
	[38.1, 28.0, 63.3, 73.0, 43.4, 'Fiao`o Fa`amausili'],
	[35.0, 31.1, 61.9, 69.1, 45.8, 'Honey Hireme'],
	[36.1, 31.0, 72.3, 71.0, 46.1, 'Kelly Brazier'],
	[32.1, 33.0, 55.8, 59.2, 42.4, 'Kendra Cocksedge'],
	[38.1, 37.0, 68.0, 70.2, 46.9, 'Renee Wickcliffe'],
	[34.1, 41.0, 65.0, 70.0, 43.8, 'Selica Winiata'],
	[29.0, 32.0, 53.0, 72.0, 46.9, 'Victoria Subritzky-Nafatali']];
var blackFernsImages = ['BF1', 'BF2', 'BF3', 'BF4', 'BF5', 'BF6', 'BF7', 'BF8', 'BF9'];
for(var f = 0; f < blackFernsPlayers.length; f++) {
	for(var w  = 0; w< blackFernsPlayers[0].length - 1; w++) {
		blackFernsPlayers[f][w] = (blackFernsPlayers[f][w]) / 480;
	}
}


// Initialize the game
var game = new Phaser.Game(480, 660, Phaser.AUTO, 'phaser-example', { preload: preload, create: create });


/////////////////////////////
//////// Variables //////////
/////////////////////////////
var shiftKey; // to be obsolete?

var text, text2, text3, text4, text5;
var face;			// Aids with which team you chose

var MAX_BUBS = 7;
var bubbles = [];	// Stores the placed bubbles
var bubs;			// burrent bubble being blaced
var numBubs = 0;	// Current number of bubbles placed

// Bubble placing instruction variables
var instructionText;
var tCount = 0;

var background;
var chooseAB;
var chooseBF;
var compareTo;

// Video variables
var video;	// The HTMLElement where the webcam will be stored
var bmd;
var sprite;
var pictureTaken;
var start;
var render = false;
/////////////////////////////

function resetGame() {
	game.world.removeAll();

	text.kill()
	text2.kill();
	text3.kill();
	text4.kill();
	text5.kill();
	face = true;
	bubbles = [];

	background.kill();
	chooseAB.kill();
	chooseBF.kill();
	compareTo = [];

	// bmd.kill();
	// sprite.kill();
	
	bubs = null;
	numBubs = 0;

	instructionText.kill();
	tCount = 0;

	video.style.visibility = "hidden";
}


function preload() {
	// Outlines for getting the correct face size
	game.load.image('manFace', 'allBlacks/face.png');
	game.load.image('womanFace', 'blackFerns/face.png');	

	game.load.image('AB1', 'allBlacks/SamCane.png');
	game.load.image('AB2', 'allBlacks/RyanCrotty.png');
	game.load.image('AB3', 'allBlacks/KieranRead.png');
	game.load.image('AB4', 'allBlacks/IsraelDagg.png');
	game.load.image('AB5', 'allBlacks/DaneColes.png');
	game.load.image('AB6', 'allBlacks/BrodieRetallick.png');
	game.load.image('AB7', 'allBlacks/BenSmith.png');
	game.load.image('AB8', 'allBlacks/AaronSmith.png');
	game.load.image('AB9', 'allBlacks/BeaudenBarrett.png');

	game.load.image('BF1', 'blackferns/ChelseaAlley.png');
	game.load.image('BF2', 'blackferns/EloiseBlackwell.png');
	game.load.image('BF3', 'blackferns/Fiao\'oFa\'amausili.png');
	game.load.image('BF4', 'blackferns/HoneyHireme.png');
	game.load.image('BF5', 'blackferns/KellyBrazier.png');
	game.load.image('BF6', 'blackferns/KendraCocksedge.png');
	game.load.image('BF7', 'blackferns/ReneeWickcliffe.png');
	game.load.image('BF8', 'blackferns/SelicaWiniata.png');
	game.load.image('BF9', 'blackferns/VictoriaSubritzky-Nafatali.png');
	// game.load.image('grid', 'assets/tests/debug-grid-1920x1920.png');
	
	game.load.image('restart', 'restart.png');
	game.load.image('back', 'back.png');	
	game.load.image('next', 'next.png');
	game.load.image('enter', 'enter.png');
	game.load.image('bubble', 'redcross.png');
	game.load.image('retake','retake.png');
	game.load.image('take','take.png');
	game.load.image('continue','continue.png');	
	
	game.load.image('categoriesBackground', 'bg2.jpg');
	game.load.image('allBlacks', 'all_blacks.gif');	
	game.load.image('blackFerns', 'black_ferns.jpg');
}

function create() {


	background = game.add.sprite(-500, 0, 'categoriesBackground');
	background.scale.setTo(0.6, 0.6);	
	background.anchor.set(0, 0);

	text = game.add.text(30, 6, 'Who is your rugby lookalike?', { font: "22px Trajan", fill: "#ffffff" });
    text.stroke = "#000000";
    text.strokeThickness = 5;
    text.setShadow(2, 2, "#333333", 2, true, false);

	text4 = game.add.text(140, 40, 'Choose a team!', { font: "40px Haettenschweiler", fill: "#ffffff" });
	text4.stroke = "#000000";
    text4.strokeThickness = 5;

	text2 = game.add.text(165, 300, "Mens' Team", { font: "40px Haettenschweiler", fill: "#ffffff" });
	chooseAB = game.add.button(140, 100, 'allBlacks', actionClickOne, this);

	text3 = game.add.text(145, 520, "Womens' Team", { font: "40px Haettenschweiler", fill: "#ffffff" });
	chooseBF = game.add.button(130, 360, 'blackFerns', actionClickTwo, this);

	//// Still in place, but might be deleted. Depends on how we're getting rid of the 'next' button
	// Set up the keys being used
	shiftKey = game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);
	// Prevent the browser from picking up the keystrokes
	game.input.keyboard.addKeyCapture([ Phaser.Keyboard.SHIFT ]);

	// console.log("Create", chooseBF, chooseBF.kill);
}

// ToDo: combine these two, maybe give it a boolean/enum to distinguish between the options
function actionClickOne(obj, pointer, someBool){
	// console.log("ClickOne", chooseBF, chooseBF.kill);
	document.getElementById('man').style.display = "";
	

	compareTo = allBlacksPlayers;
	images = allBlacksImages;
	face = true;
	create1_5();
}

function actionClickTwo(obj, pointer, someBool){
	document.getElementById('woman').style.display = "";


	compareTo = blackFernsPlayers;
	images = blackFernsImages;
	face = false;
	create1_5();
}

function create1_5(){
	text.kill();
	text2.kill();
	text3.kill();
	text4.kill();

	chooseAB.kill();
	// console.log("Create1_5 before", chooseBF, chooseBF.kill);
	// chooseBF.klll(); // temp comment, uncomment later
	// console.log("Create1_5 after", chooseBF, chooseBF.kill);
	chooseBF.visible = false;
	background.kill();



	// Hide this guy
	// start the new video stuff
	// create buttons for taking pitcures etc.
		// unhide the thing
		// set the taken image as the new background



	var phaser = document.getElementsByTagName('canvas')[0];
	// phaser.style.visibility = "hidden";
	phaser.style.position = "absolute";
	phaser.style.display = "";
	// game.paused = true;





	video = document.querySelector('#video');
	pictureTaken = false;
	start = true;
	
	re = game.add.button(125,500,'retake',retakeFunc,this);
	re.visible = false;
	take = game.add.button(200,500,'take',takeFunc,this);

	navigator.getMedia = (navigator.getUserMedia ||
		navigator.webkitGetUserMedia ||
		navigator.mozGetUserMedia ||
		navigator.msGetUserMedia);

	navigator.getMedia({
			video: true,
			audio: false
		},
		function(stream) {
			videoStream = stream;	// Saves the video stream so we can stop it later

			if (navigator.mozGetUserMedia) {
				video.mozSrcObject = stream;
			} else {
				var vendorURL = window.URL || window.webkitURL;
				video.src = vendorURL.createObjectURL(stream);
			}
		},
		function(err) {
			console.log("An error occured! " + err);
		}
	);

	video.style.display = ""; //test
	video.style.visibility = "";
	video.play();

	bmd = game.add.bitmapData(480,660);

	textt = game.add.text(83, 550, 'To get started, take a picture of yourself.', { font: "25px Haettenschweiler", fill: "#ffffff"});

    text5 = game.add.text(55, 570, 'Make sure you line your face up with the outline!', { font: "25px Haettenschweiler", fill: "#ffffff"});
}

function create2() {
	background = sprite; // Attempt at making it so we can add bubbles to the webcam picture
	text5.kill();
	textt.kill();
	background.anchor.set(0, 0);
	background.inputEnabled = true;
	// console.log(background);
	background.events.onInputDown.addOnce(addBubble, this);

	instruction_text = game.add.text(60, 0, 'Click anywhere to create a point.\nClick and drag the point to move it.\nYou can shift-click to remove a point.', { font: "33px Haettenschweiler", fill: "#ffffff" });
	instruction_text.stroke = "#000000";
    instruction_text.strokeThickness = 5;

	backButton = game.add.button(5, 5, 'back', function() { resetGame(); create(); }, this);
	backButton.scale.setTo(0.1, 0.1);
	
	instructionText = game.add.text(0, 500, 'Place a point on the outer corner of the left eye. \nPress the "Next" button when done', { font: "30px Haettenschweiler", fill: "#ffffff" });
	instructionText.stroke = "#000000";
    instructionText.strokeThickness = 5;
	
	// TO BE REPLACED WITH OTHER DIFFERENT FUNCITONALITY
	next = game.add.button(295, 590, 'next', buttonClicked, this);
	next.scale.setTo(0.3, 0.3);
}


function addBubble(obj, pointer) {
	if(numBubs >= MAX_BUBS) {
		return;
	}
	else {
		numBubs++;
	}

	canNext = true; // Allows next button to be clicked
		// in the future maybe change to change the button inputEnabled field?

	// DEBUG
	// console.log(pointer);
	// console.log("Set bubble at pointer (x,y): (" + pointer.x + ", " + pointer.y + ")");
	
	bubs = game.add.sprite(pointer.x, pointer.y, 'bubble');
	//	Set the origin of the bubble to the center, not top left corner
	bubs.anchor.set(0.5, 0.5);
	//	Input Enable the sprite
	bubs.inputEnabled = true;
	//	Allow dragging - the 'true' parameter will make the sprite snap to the center
	bubs.input.enableDrag(true);
	//	Add listener to delete a bubble if shift-clicked, delete it
	// bubs.events.onInputDown.add(bubbleListener, this);
}

// Deprecated bc not using keyboard
function bubbleListener(obj, pointer) {
	// If the shift key is held down and a bubble is clicked, that bubble will poof out of existence
	if(obj.inputEnabled && shiftKey.isDown) {
		obj.kill();
		bubs = null;
		background.events.onInputDown.addOnce(addBubble, this);
		
		numBubs--;
	}
}


function buttonClicked(obj, pointer) {
	// console.log("Clicked button");
	if(bubs != null) {
		// console.log("Added bubble to array.");

		//	Add the newly made bubble to the array
		// bubs.inputEnabled = false;
		bubs.input.disableDrag();
		bubs.events.onInputDown.removeAll();
		bubbles[bubbles.length] = bubs;
		bubs = null;	// Reset the reference just in case


		// we could just put these into an array for modularity
		tCount++;
		switch(tCount) {
			case 1:
				instructionText.text = "Place a dot on the inner corner of the left eye.\nPress the \"Next\" button when done";
				break;
			case 2:
				instructionText.text = "Place a dot on the outer corner of the right eye.\nPress the \"Next\" button when done";
				break;
			case 3:
				instructionText.text = "Place a dot on the inner corner of the right eye.\nPress the \"Next\" button when done";
				break;
			case 4:
				instructionText.text = "Place a dot on the tip of the nose.\nPress the \"Next\" button when done";
				break;
			case 5:
				instructionText.text = "Place a dot on the left corner of the mouth.\nPress the \"Next\" button when done";
				break;
			case 6:
				instructionText.text = "Place a dot on the right corner of the mouth.\nPress the \"Next\" button when done";
				break;
				//
			default:
				break;
		}
		//


		// If you're on the last round, add in the next 
		if(numBubs == MAX_BUBS) {
			next.kill();
			instructionText.text = "You're all done! \nClick the \"Enter\" button to see who you look\n most like.";
 			enterButton = game.add.button(270, 590, 'enter', function(me) {
				comparePoints(convertBubbleToDist(bubbles), compareTo);
				//

				me.kill();
 			}, this);
 			enterButton.scale.setTo(0.4, 0.4);
			obj.kill();
		}
		else {
			background.events.onInputDown.addOnce(addBubble, this);
			canNext = false;
		}
	}
}


function convertBubbleToDist(buttonArray) {
	var userDist =
		[distance(buttonArray[0].position, buttonArray[1].position),
		 distance(buttonArray[1].position, buttonArray[3].position),
		 distance(buttonArray[0].position, buttonArray[4].position),
		 distance(buttonArray[5].position, buttonArray[4].position),
		 distance(buttonArray[6].position, buttonArray[5].position)
		];
	
	// console.log(userDist);
	/*
	0	outer left
	1	inner left
	2	outer right
	3	inner right
	4	nose
	5	left mouth
	6	right mouth
	

	0	eye inner to outer
			left
	1	eye inner to inner
	2	eye outer to nose
	3	mouth to nose
	4	mouth to mouth
	*/
	return userDist;
}

// Takes in two of (Phaser.Point)
// Returns the distance between the two given points
function distance(xy1, xy2) {
	return Math.sqrt(Math.pow(xy2.x - xy1.x, 2) + Math.pow(xy2.y - xy1.y, 2)) / background.width;;
}



// compare: [][]
	// [person][facepoint distance]
		// last is name
// user: []
	// facepoint distances from the webcam

// var lookAlike; // moved to inside the function
function comparePoints(user, compare) {
	var difference = createArray(compare.length, user.length);
	// for(var i = 0; i > compare.length; i++)
	// 	for(var j = 0; j > user.length; j++)
	// 		difference[i][j] = 0;
	var score = [].repeat(0, compare.length);// = 0;//Number.MAX_SAFE_INTEGER;

	for (var i = 0; i < compare.length; i++) {
		// console.log("outer: " + i);
		for (var a = 0; a < user.length; a++) {
			// console.log("(outer, inner): (" + i + ", " + a + ")");
			var x = Math.abs(user[a] - compare[i][a]);
			difference[i][a] = x;
		}
	}

	// console.log("difference: " + difference);

	for (var b = 0; b < compare.length; b++){
		for (var j = 0; j < user.length; j++) {
			score[b] += difference[b][j];
		}
	}
	
	// console.log("Score: " + score);

	var count = 0;
	var lowest = score[0];
	for (var q = 1; q < score.length; q++){
		// console.log("test");
		if (score[q] < lowest){
			lowest = score[q];
			count = q;
			// console.log("Changed lowest");
		}
	}
	
	backButton.kill();

	background.kill();
	var lookAlike = game.add.sprite(0, 0, images[count]);
	result = game.add.text(70, 6, "You look most like " + compare[count][user.length] + "!",  { font: "30px Haettenschweiler", fill: "#ffffff" });
	result.stroke = "#000000";
    result.strokeThickness = 5;

	var restart = game.add.button(game.world.centerX - 95, 400, 'restart', function() { resetGame(); create(); }, this, 2, 1, 0);
}



////////////////
// Camera stuff
////////////////
function takeFunc(){
	cont = game.add.button(250,500,'continue',continueFunc,this);

	// bmd.context.drawImage(video, 0, 0, 640, 480, 0, 0, 480, 480);
	video.style.visibility = "hidden";


	bmd.context.drawImage(video, 0, 0);
	sprite = game.add.sprite(0, 0, bmd);

	take.visible = false;
	re.visible = true;
	pictureTaken = true;
}

function retakeFunc(){
	cont.kill();

	video.style.visibility = "";

	sprite.kill();

	re.visible = false;
	take.visible = true;
	pictureTaken = false;
	bmd.clear();
	bmd.update();
}

var videoStream;
function continueFunc(){
	document.getElementById('man').style.display = "none";
	document.getElementById('woman').style.display = "none";

	re.visible = false;
	take.visible = false;
	cont.visible = false;
	render = false;

	videoStream.getTracks().forEach(function(stream) {
    	if(stream)
	    	stream.stop();
    });

	window.URL.revokeObjectURL(video.src);

	create2();
}

function render () {
	if (render){
		if (!(pictureTaken)){
			bmd.context.drawImage(video, 0, 0);
			if(!(start)){
				sprite.kill(true);
				facesprite.kill(true);
				start = false;
			}
			else{
				sprite = game.add.sprite(0, 0, bmd);
			}
		  //bmd.draw(0,0,'faceline');

		  bmd.dirty = true;
		}
	

		if(face)
			facesprite = game.add.sprite(0, 0, 'manFace');
		else
			facesprite = game.add.sprite(0, 0, 'womanFace');
	}

	
}
////////////////




// --vvv-- not ours --vvv--

Array.prototype.repeat = function(what, L){
	while(L) this[--L] = what;
	return this;
}

// can do createArray(a, b);
function createArray(length) {
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args);
    }

    return arr;
}