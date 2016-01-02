var debugInfo=false;
var editMode=false;

var gameOver=null;

var editor=new editCursor();

bConsoleBox=new textbox();
bConsoleBox.width=300;
bConsoleBox.height=CANVAS_HEIGHT-12;
bConsoleBox.log("Loading...");
bConsoleBox.y=18;
bConsoleBox.x=18;
bConsoleBox.lines=4;

var curDungeon= new dungeon("dungeon2");

var showMap=false;

var buttonX=156;

var buttons=new Array();
var timy=new button();
timy.text="North";
timy.x=200-buttonX;
timy.y=640;
timy.exists=true;
timy.shiftable=true;
timy.visible=true;
timy.doThings=function()
{
	if((this.shiftable) && (shiftdown))
	{
		if(curDungeon.roomY>0)
		{
			if((curDungeon.rooms[curDungeon.roomZ][curDungeon.roomX][curDungeon.roomY-1].active) ||(curDungeon.createRoom(curDungeon.roomZ,curDungeon.roomX,curDungeon.roomY-1)))
			{
				curDungeon.smartAddDoor(8,1,0);
				editor.clearConfirm();
				editor.penDown=false;
				curDungeon.changeRoom(0,!editMode);
			}
		}else{
			bConsoleBox.log("Can't go off the map");
		}
	}else
	{
		curDungeon.changeRoom(0,true);
	}
}

var touchshiftkey=new akey("shift");

buttons.push(timy);
timy=new button();
timy.text="South";
timy.x=200-buttonX;
timy.y=680;
timy.exists=true;
timy.shiftable=true;
timy.visible=true;
timy.doThings=function()
{
	if((this.shiftable) && (shiftdown))
	{
		if(curDungeon.roomY<curDungeon.getHeight()-1)
		{
			if((curDungeon.rooms[curDungeon.roomZ][curDungeon.roomX][curDungeon.roomY+1].active) ||(curDungeon.createRoom(curDungeon.roomZ,curDungeon.roomX,curDungeon.roomY+1)))
			{
				curDungeon.smartAddDoor(8,13,2);
				editor.clearConfirm();
				editor.penDown=false;
				curDungeon.changeRoom(2,!editMode);
			}
		}else
		{
			bConsoleBox.log("Can't go off the map");
		}
	}else
	{
		curDungeon.changeRoom(2,!editMode);
	}
}
buttons.push(timy);
timy=new button();
timy.text="East";
timy.x=235-buttonX;
timy.y=660;
timy.exists=true;
timy.shiftable=true;
timy.visible=true;
timy.doThings=function()
{
	if((this.shiftable) && (shiftdown))
	{
		if(curDungeon.roomX<curDungeon.getWidth()-1)
		{
			if((curDungeon.rooms[curDungeon.roomZ][curDungeon.roomX+1][curDungeon.roomY].active)|| (curDungeon.createRoom(curDungeon.roomZ,curDungeon.roomX+1,curDungeon.roomY)))
			{
				curDungeon.smartAddDoor(18,6,1);
				editor.clearConfirm();
				editor.penDown=false;
				curDungeon.changeRoom(1,!editMode);
			}
		}else{
			bConsoleBox.log("Can't go off the map");
		}
	}else
	{
		curDungeon.changeRoom(1,!editMode);
	}
}
buttons.push(timy);
timy=new button();
timy.text="West";
timy.x=165-buttonX;
timy.y=660;
timy.exists=true;
timy.shiftable=true;
timy.visible=true;
timy.doThings=function()
{
	if((this.shiftable) && (shiftdown))
	{
		if(curDungeon.roomX>0)
		{
			if((curDungeon.rooms[curDungeon.roomZ][curDungeon.roomX-1][curDungeon.roomY].active) ||(curDungeon.createRoom(curDungeon.roomZ,curDungeon.roomX-1,curDungeon.roomY)))
			{
				//curDungeon.curRoom().addDoor(3)
				//curDungeon.rooms[curDungeon.roomZ][curDungeon.roomX-1][curDungeon.roomY].addDoor(1);
				curDungeon.smartAddDoor(1,6,3);
				editor.clearConfirm();
				editor.penDown=false;
				curDungeon.changeRoom(3,!editMode);
			}
		}else
		{
			bConsoleBox.log("Can't go off the map");
		}
	}else{
		curDungeon.changeRoom(3,!editMode);
	}
}
buttons.push(timy);
timy=new button();
timy.text="Up";
timy.x=270-buttonX;
timy.y=640;
timy.exists=true;
timy.shiftable=true;
timy.visible=true;
timy.doThings=function()
{
	if((this.shiftable) && (shiftdown))
	{
		if(curDungeon.roomZ<curDungeon.floors-1)
			{
				if((curDungeon.rooms[curDungeon.roomZ+1][curDungeon.roomX][curDungeon.roomY].active) ||(curDungeon.createRoom(curDungeon.roomZ+1,curDungeon.roomX,curDungeon.roomY)))
				{
					curDungeon.smartAddStair(editor.x,editor.y,true);
					editor.clearConfirm();
					editor.penDown=false;
					curDungeon.changeFloor(true,!editMode);
				}
			}else
			{
				//bConsoleBox.log("Can't go off the map");
				bConsoleBox.log("Will create new floor. Confirm? (Y/N)","yellow");
				editor.confirming=true;
				editor.confirmingWhat=function() {
					curDungeon.addFloor();
					bConsoleBox.log("New floor created");
				}
			}
	}else
	{
		curDungeon.changeFloor(true,!editMode);
	}
}
buttons.push(timy);
timy=new button();
timy.text="Down";
timy.x=270-buttonX;
timy.y=680;
timy.exists=true;
timy.shiftable=true;
timy.visible=true;
timy.doThings=function()
{
	if((this.shiftable) && (shiftdown))
	{
		if(curDungeon.roomZ>0)
		{
			if((curDungeon.rooms[curDungeon.roomZ-1][curDungeon.roomX][curDungeon.roomY].active) ||(curDungeon.createRoom(curDungeon.roomZ-1,curDungeon.roomX,curDungeon.roomY)))
			{
				curDungeon.smartAddStair(editor.x,editor.y,false);
				editor.clearConfirm();
				editor.penDown=false;
				curDungeon.changeFloor(false,!editMode);
			}
		}else
		{
			bConsoleBox.log("Can't go off the map");
		}
	}else
	{
		curDungeon.changeFloor(false,!editMode);
	}
}
buttons.push(timy);
//lights.push(new light(7092,3748,14));
//lights.push(new light(7208,3777,14));

var upkey=new akey("up");
var downkey=new akey("down");
var deletekey=new akey("del");
var helpkey=letterkeys[7].check()
var insertkey=new akey("insert");
var tabkey=new akey("tab");
var fillkey=letterkeys[5];
var modekey=letterkeys[12];
var undokey=new akey("z");
var editkey=new akey("e");
var yeskey=new akey("y");
var nokey=new akey("n");
var controlkey=new akey("cntrl");
var copykey=new akey("c");
var pastekey=new akey("p");
var savefloorkey = new akey("k");
var loadfloorkey = new akey("l");

var miles=new dude();
miles.AI=false;
miles.tileX;//todo
miles.equip(legArmorList[Math.floor(Math.random()*legArmorList.length)]);
miles.equip(chestArmorList[Math.floor(Math.random()*chestArmorList.length)]);
miles.gun=miles.guns[0];
miles.torchHand=1;

//miles.tileX=221;
//miles.y=221*tileSize;

//people.push(miles);
miles.task="wandering aimlessly";

/*var mel=new flame(lights);
mel.x=9*32;//miles.x;
mel.y=9*32;//miles.y;
mel.alive=true;
fires.push(mel);

var mlel=new flame(lights);
mlel.x=19*32;
mlel.type=0;
mlel.y=9*32;
mlel.alive=true;
fires.push(mlel);
*/




function allPoint(guy)
{
	for (var i=1;i<people.length;i++)
	{
		people[i].stopGesturing();
		people[i].doGesture(Math.floor(Math.random()*6),50000,miles);
		//console.log(":yar:");
	}
}

//camera.center(miles);

//camera.tileX=1472;
//camera.tileY=3360;

document.body.addEventListener("click", mouseClick, false);
//document.body.addEventListener("dblclick", mouseDblClick, false);
document.body.addEventListener("mousewheel",mouseWheel,false);
document.body.addEventListener("DOMMouseScroll", mouseWheel, false);


//-----------------------------------------------


requestAnimationFrame = window.requestAnimationFrame || 
                        window.mozRequestAnimationFrame || 
                        window.webkitRequestAnimationFrame || 
                        window.msRequestAnimationFrame || 
                        setTimeout; 


var canvasElement = $("<canvas width='" + CANVAS_WIDTH + "' height='" + CANVAS_HEIGHT + "'></canvas");
var canvas = canvasElement.get(0).getContext("2d");

var radarElement = $("<canvas width='" + MAP_WIDTH + "' height='" + MAP_HEIGHT + "'></canvas");
var radarCanvas = radarElement.get(0).getContext("2d");

var mapCanvasElement = $("<canvas width='" + MAP_WIDTH + "' height='" + MAP_HEIGHT + "'></canvas");
var mapCanvas = mapCanvasElement.get(0).getContext("2d");

var concanvasElement = $("<canvas width='" + 290 + "' height='" + CANVAS_HEIGHT + "'></canvas");
var concanvas = concanvasElement.get(0).getContext("2d");

concanvasElement.css("position", "absolute").css("z-index", "2").css("top", canvasElement.position().top).css("left", CANVAS_WIDTH);
concanvasElement.appendTo('body');
canvasElement.css("position", "absolute").css("z-index", "1");
canvasElement.appendTo('body');
canvasElement.css("position", "absolute").css("z-index", "0").css("top", canvasElement.position().top).css("left", canvasElement.position().left);
canvasElement.get(0).addEventListener("mousemove", mouseXY, false);

var gamepadSupportAvailable = !!navigator.getGamepads || !!navigator.webkitGamepads;

var gamepad = navigator.getGamepads && navigator.getGamepads()[0];

window.addEventListener("GamepadConnected", function(e) {
  console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
  e.gamepad.index, e.gamepad.id,
  e.gamepad.buttons.length, e.gamepad.axes.length);
});

window.addEventListener("GamepadDisconnected", function(e) {
  console.log("Gamepad disconnected from index %d: %s",
  e.gamepad.index, e.gamepad.id);
});


function playSound(name){
    
    nerp=document.getElementById(name);
    if(nerp.ended === true || nerp.currentTime === 0){
        nerp.play();
        numsounds++;
    }
    
}

controller= new virtualGamePad();

var savekey=new akey("i"); //define the different keys
var loadkey=new akey("o");
var shiftkey=new akey("shift");


var gamestart=false;
var radar=true;

function drawGUI(can)
{
	if(editMode)
	{
		can.globalAlpha=0.75;
		can.fillStyle="white";
		canvas.fillRect(2,2,228,68);
		can.fillStyle="blue";
		canvas.fillRect(6,6,221,60);
		can.fillStyle="yellow";
		can.fillText(curDungeon.name,8,22);
		can.fillText("Floor: "+curDungeon.roomZ+"/"+(curDungeon.floors-1),8,44);
		can.fillText("Room: "+curDungeon.rooms[curDungeon.roomZ][curDungeon.roomX][curDungeon.roomY].name,8,62);
		var cont=0;
		can.globalAlpha=1;
	}else
	{	
		drawHearts(miles,can);
		
	}
}

function drawDebug(can)
{
	if(!debugInfo) {return;}
	can.globalAlpha=0.75;
	can.fillStyle="blue";
	canvas.fillRect(672,6,221,90);
	can.fillStyle="yellow";
	can.fillText("Particles: "+monsta.particles.length,675,25);
	can.fillText("Gamespeed: "+gameSpeed,675,41);
	can.fillText("FPS:"+FPS,675,57);//+camera.x+","+camera.y,25,57);
	can.globalAlpha=1;
}

function merp() {
requestAnimationFrame(merp,canvas);

FPS=countFPS();
	if(mode==0){
		mainMenuUpdate();
		mainMenuDraw();
	}else if(mode==1){
		mainUpdate();
		mainDraw();	
	}else if(mode==2){
		//troopScreenUpdate();
		//troopScreenDraw();
	}
	//canvas.beginPath();
	//osCanvas.drawImage(canvasElement,0,0);
}




/*document.getElementById("myAudio").addEventListener('ended', function() { //loops music
    this.currentTime = 0;
    this.play();
}, false);*/

function menuDraw()
{
	return;
    battletick++;
    //canvas.save();
    canvas.globalAlpha=0.80;
    canvas.fillStyle =  "#DCDCDC";
    canvas.fillRect(25,95,850,500);
    canvas.fillStyle =bColors[6];//Math.floor(Math.random()*5)];// "#483D8B ";
    canvas.fillRect(40,110,820,470);
    //canvas.restore();
	canvas.globalAlpha=1;
    canvas.font = "14pt Calibri";
    canvas.textAlign = "left";
    canvas.textBaseline = "middle";
    
}

if(MUSIC_ON){
	document.getElementById("titleAudio").volume=MUSIC_VOL;
	document.getElementById("titleAudio").play(); //starts music
}

function mainMenuDraw(){
	canvas.fillStyle = "black";
	canvas.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
	titlesprite.draw(canvas,0,0);
	canvas.fillStyle = "black";
	canvas.font = "16pt Calibri";
	//canvas.fillText("Press Enter",200,500);
	canvas.fillText("  New Game",80,640);
	canvas.fillStyle = "grey";
	//canvas.fillText("  Load Game",80,665);

	if(mmcur){
		//canvas.fillText("-",78,640);
	}else	{
		//canvas.fillText("-",78,665);

	}
	//monsta.draw(canvas,camera);
	//canvas.fillText("Particles: "+ monsta.particles.length,460,550);
};

function inventoryScreenDraw(){
	canvas.fillStyle = "black";
	canvas.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
	troopScreensprite.draw(canvas,0,0);
	canvas.fillStyle = "black";
	canvas.font = "12pt Calibri";
	//canvas.fillText("Press Enter",200,500);
	canvas.fillText("0",71,757);
	monsta.draw(canvas,camera);
	//canvas.fillText("Particles: "+ monsta.particles.length,460,550);
};




function startGame()
{
	mode=1;	
	camera.tileX=0;
	camera.tileY=0;
	
	graphboat = mapToGraph(curDungeon.rooms[curDungeon.roomZ][curDungeon.roomX][curDungeon.roomY],true);
	graph = mapToGraph(curDungeon.rooms[curDungeon.roomZ][curDungeon.roomX][curDungeon.roomY],false);
	starter();
}

function starter()
{		
	gamestart=true;	
	//bees=true;
	
	bConsoleBox.log("started");
	bConsoleBox.log("Hit E for Edit Mode");
}

function inventoryScreenUpdate(){
	//startGame();
	var tick=0;
	lasttime=milliseconds;
    timestamp = new Date();
    milliseconds = timestamp.getTime();
    tick++;
	monsta.update();
	 if(debugkey.check()) {
		MUSIC_ON=!MUSIC_ON;
		document.getElementById("titleAudio").pause();
		//monsta.startOrbit(40000,Math.floor(Math.random()*CANVAS_WIDTH),Math.floor(Math.random()*CANVAS_HEIGHT),60);
	 }
	
	
	
	gamepad = navigator.getGamepads && navigator.getGamepads()[0];
	if(controller.buttons[7].check())
	{
		mode=1;
	}
		
	if(escapekey.check()){
		mode=1;
	}

	//TODO HERE
};

function mainMenuUpdate(){
	//startGame();
	var tick=0;
	lasttime=milliseconds;
    timestamp = new Date();
    milliseconds = timestamp.getTime();
    tick++;
	monsta.update();
	 if(debugkey.check()) {
		MUSIC_ON=!MUSIC_ON;
		document.getElementById("titleAudio").pause();
		//monsta.startOrbit(40000,Math.floor(Math.random()*CANVAS_WIDTH),Math.floor(Math.random()*CANVAS_HEIGHT),60);
	 }

	
	
	
	gamepad = navigator.getGamepads && navigator.getGamepads()[0];
	if(controller.buttons[7].check())
	{
		startGame();
	}else if(startkey.check()){
		startGame();
	}
	if(downkey.check()){
		mmcur=!mmcur;
	}
	if(upkey.check()){
		mmcur=!mmcur;
	}
	
};

//------------MAIN DRAW-----------------------------------------
function mainDraw() {
	//SHOULDN'T
		canvas.fillStyle = "black";
	canvas.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);

	curDungeon.draw(canvas,camera);
	//curRoom.draw(canvas,camera);
	//curRoom.draw(canvas,camera);
	if(customConsole)
	{
		bConsoleBox.draw(concanvas);
	}else
	{
		concanvas.clearRect(0,0,432,CANVAS_HEIGHT);
	}
	if(!gamestart) {return;}
		
	monsta.draw(canvas,camera);

	if(true)//(!stayDay)
	{
		canvas.globalAlpha=LightLevels[Darkness];
		canvas.fillStyle="black";
		canvas.fillRect(0,0,CANVAS_WIDTH, CANVAS_HEIGHT);
	}

	for(var i=0;i<curDungeon.curRoom().lights.length;i++)
	{
		//lights[i].draw(canvas,camera);
		lightenGradient(canvas,camera,curDungeon.curRoom().lights[i], curDungeon.curRoom().lights[i].radius)
	}
	mapDirty=true;
	
	//canvas.globalAlpha=1;
	/*if(showMap)
	{
		curMap.drawMap(camera,0,0);
	}else
	{
		canvas.globalAlpha=1;//0.4;
		curMap.drawRadar(camera,665,475);
	}*/
	
	if(editMode)
	{
		canvas.fillStyle="yellow";
		canvas.globalAlpha=1;
		canvas.font = "32pt Calibri";
		canvas.fillText("Edit Mode",380,125);
		canvas.font = "16pt Calibri";
		if(curDungeon.curRoom().hidden)
		{
			canvas.fillText("Hidden Room",580,145);
		}
		
		
		if(editor.mode==editModes.Pen)
		{
			if(editor.penDown)
			{	
				canvas.fillText("Pen Down",18,126);
			}else
			{
				canvas.fillText("Pen Up",18,126);
			}
			
		}
		else if(editor.mode==editModes.Stamp){
			canvas.fillText("Stamp mode",18,126);
		}else if(editor.mode==editModes.SwitchLink){
			canvas.fillText("Linking mode",18,126);
		}else if(editor.mode==editModes.Fill){
			canvas.fillText("Fill mode",18,126);
		}else if(editor.mode==editModes.Objects){
			canvas.fillText("Object mode",18,126);
		}else if (editor.mode==editModes.Door)
		{
			canvas.fillText("Door Mode",18,126);
		}else
		{
			canvas.fillText("Pen Mode",18,126);
		}
		if(editor.mode==editModes.Door)
		{
			if(editor.doorType==0)
			{
				canvas.fillText("Regular Door",18,96);
			}else if(editor.doorType==1)
			{
				canvas.fillText("Closed Door",18,96);
			}else if(editor.doorType==2)
			{
				canvas.fillText("Locked Door",18,96);
			}else if(editor.doorType==3)
			{
				canvas.fillText("Bombable Door",18,96);
			}else if(editor.doorType==4)
			{
				canvas.fillText("Bombed Door",18,96);
			}
			
		}else if(editor.mode==editModes.Objects)
		{
			canvas.fillText("Selected: ",18,96);
			if(objectSprites[editor.objectType])
			{
				objectSprites[editor.objectType].draw(canvas,110,73);
			}else
			{
				console.log("no sprite for "+editor.objectType);
			}
		}else
		{
			canvas.fillText("Selected: ",18,96);
			if(dungeonTileSprite[editor.brushType])
			{
				dungeonTileSprite[editor.brushType].draw(canvas,110,73);
			}else
			{
				console.log("no sprite for "+editor.brushType);
			}
		}
		
	}	
	

	drawDebug(canvas);
	curDungeon.drawMiniMap(canvas);//,player
	
	
	for (var h=0;h<buttons.length;h++)
	{
		buttons[h].draw(canvas);
	}
	drawGUI(canvas);
	
	if(editMode) 
	{
		if(curDungeon.curRoom().active)
		{
			editor.draw(canvas);
		}
	}else
	{
		miles.draw(canvas,camera);
	}
	for(var i=0;i<curDungeon.curRoom().fires.length;i++)
	{
		curDungeon.curRoom().fires[i].draw(canvas,camera);
	}
	if(gameOver)
	{
	 /*	canvas.fillStyle="white";
		var wodth=78+gameOver.length*8;
		var yex=Math.floor(CANVAS_WIDTH/2-wodth*0.5);

		var yey=Math.floor(CANVAS_HEIGHT/2);
		canvas.fillRect(yex,yey,wodth,100);	
		canvas.fillStyle="blue";
		canvas.fillRect(yex+12,yey+12,wodth-24,100-24);
		canvas.fillStyle = "white";
		canvas.font = "12pt Calibri";
		//canvas.fillText("Press Enter",200,500);
		canvas.fillText("Game Over",yex+wodth/2-32,yey+38);
		canvas.fillText(gameOver,yex+wodth/6,yey+64);*/
	}
};
//------------MAIN LOOP-----------------------------------------
function mainUpdate()
{
	if(!gamestart) return;
	if(gameOver) return;
	//hack
	controller.update();
	//mel.x=miles.x;
	//mel.y=miles.y-26+miles.headHeight;
	var tick=0;	
    lasttime=milliseconds;
    timestamp = new Date();
    milliseconds = timestamp.getTime();
    tick++;
	thyme.update();
	if((editMode) && (savekey.check()))
	{
		bConsoleBox.log("Existing room save will be overwritten. Confirm? (Y/N)","yellow");
		editor.confirming=true;
		editor.confirmingWhat=function() {
			curDungeon.curRoom().save("Dungeon/dungeons/"+curDungeon.name+"/"+"floor"+curDungeon.roomZ+"/");
			curDungeon.curRoom().saveObjects("Dungeon/dungeons/"+curDungeon.name+"/"+"floor"+curDungeon.roomZ+"/");
	    }
	}
	if((editMode) && (loadkey.check()))
	{
		bConsoleBox.log(curDungeon.curRoom().name +" will be overwritten. Confirm? (Y/N)","yellow");
		editor.confirming=true;
		editor.confirmingWhat=function() {
			curDungeon.curRoom().load("dungeons/"+curDungeon.name+"/"+"floor"+curDungeon.roomZ+"/");
			curDungeon.curRoom().loadObjects("dungeons/"+curDungeon.name+"/"+"floor"+curDungeon.roomZ+"/");
		}
	}
		
	if((editMode) && (savefloorkey.check()))
	{
		bConsoleBox.log("Existing floor save will be overwritten. Confirm? (Y/N)","yellow");
		editor.confirming=true;
		editor.confirmingWhat=function() {
			curDungeon.saveFloor();
		}
	}
	if((editMode) && (loadfloorkey.check()))
	{
		bConsoleBox.log("Unsaved data will be lost. Confirm? (Y/N)","yellow");
		editor.confirming=true;
		editor.confirmingWhat=function() {
			curDungeon.loadFloor();
		}
	}
		
	if((editMode) && (modekey.check()))
	{
		editor.mode++;
		editor.penDown=false;
		if(editor.mode>editor.numModes)
		{
			editor.mode=0;
		}
		
	}
	if((editMode) &&(undokey.check()))
	{
	    undoEdit(curDungeon.curRoom());
	}
	if((editMode) &&(shiftkey.checkDown()))
	{
		if(copykey.check())
		{
			editor.clipBoard.copyTiles(curDungeon.curRoom());
			editor.clipBoard.copyStairs(curDungeon.curRoom());
			editor.clipBoard.active=true;
			editor.clipBoard.exits=new Array();
			editor.clipBoard.redoWalls();
			bConsoleBox.log(curDungeon.rooms[curDungeon.roomZ][curDungeon.roomX][curDungeon.roomY].name+" copied to clipboard without doors.");
		}
	}
	if((editMode) && (copykey.check()))
	{
		editor.clipBoard.copyTiles(curDungeon.curRoom());
		editor.clipBoard.copyExits(curDungeon.curRoom());
		editor.clipBoard.active=true;
		bConsoleBox.log(curDungeon.rooms[curDungeon.roomZ][curDungeon.roomX][curDungeon.roomY].name+" copied to clipboard.");
	}else if((editMode)&&pastekey.check())
	{
		
		if(!editor.clipBoard.active)
		{
			bConsoleBox.log("Clipboard is empty.");
		}else if(!curDungeon.curRoom().active)
		{
			curDungeon.createRoom(curDungeon.roomZ,curDungeon.roomX,curDungeon.roomY,editor.clipBoard);
		}else
		{
			bConsoleBox.log(curDungeon.rooms[curDungeon.roomZ][curDungeon.roomX][curDungeon.roomY].name +" will be overwritten. Confirm? (Y/N)","yellow");
			editor.confirming=true;
			editor.confirmingWhat=function(){
				curDungeon.createRoom(curDungeon.roomZ,curDungeon.roomX,curDungeon.roomY,editor.clipBoard);
			}
		}
	}

	
	if((editMode) && (fillkey.check()))
	{
		if((editor.brushType!=DungeonTileType.UpStair) && (editor.brushType!=DungeonTileType.DownStair))
		{
			curDungeon.curRoom().fillAll(editor.brushType);
			curDungeon.curRoom().stairs = new Array();
		}else
		{
			bConsoleBox.log("Can't fill with stairs");
		}
	}
	if(tabkey.check())
	{
		if(editor.mode==editModes.Door)
		{
			editor.doorType++;
			if(editor.doorType>editor.numDoorTypes)
			{
				editor.doorType=0;
			}
		}else if(editor.mode==editModes.Objects)
		{
			editor.objectType++;
			if(editor.objectType<editor.numObjectTypes)
			{
				editor.objectType=0;
			}
		}else
		{
			editor.brushType++;
			if(editor.brushType>33)
			{
				editor.brushType=0;
			}else if(editor.brushType==21)//skip water animation tiles
			{
				editor.brushType=24;
			}else if(editor.brushType==25)//skip lava animation tiles.
			{
				editor.brushType=33;
			}else if((editor.brushType==10) && (OPTIONS.skipWallTiles))//skip lava animation tiles.
			{
				editor.brushType=18;
			}
		}
	}
	if (editclickkey.check())
	{
		if(editor.mode==editModes.Pen)
		{
			editor.penDown=!editor.penDown;
		}else if(editor.mode==editModes.Stamp)
		{
			editor.getTile(curDungeon.curRoom()).data=editor.brushType;
			for(var i=0;i<curDungeon.curRoom().stairs.length;i++)
			{
				if((curDungeon.curRoom().stairs[i].x==editor.x) &&(curDungeon.curRoom().stairs[i].y==editor.y) )
				{
					curDungeon.curRoom().stairs.splice(i,1);
				}
			}
			if(editor.brushType==DungeonTileType.UpStair)
			{
				curDungeon.curRoom().addStair(editor.x,editor.y,true);
			}else if(editor.brushType==DungeonTileType.DownStair)
			{
				curDungeon.curRoom().addStair(editor.x,editor.y,false);
			}
		}else if(editor.mode==editModes.Fill)
		{
			if((editor.brushType!=DungeonTileType.UpStair) && (editor.brushType!=DungeonTileType.DownStair))
			{
				curDungeon.curRoom().fill(editor.x,editor.y,editor.brushType);
				curDungeon.curRoom().setStairs();
			}else
			{
				bConsoleBox.log("Can't fill with stairs");
			}
		}else if(editor.mode==editModes.Door)
		{
			if(editor.x==2) //left
			{
				curDungeon.smartAddDoor(1,editor.y,3,editor.doorType);
			}else if(editor.x==17) //right
			{
			    curDungeon.smartAddDoor(18,editor.y,1,editor.doorType);
			}else if(editor.y==2) //top
			{
				curDungeon.smartAddDoor(editor.x,1,0,editor.doorType);
			}else if(editor.y==12) //bottom
			{
				curDungeon.smartAddDoor(editor.x,13,2,editor.doorType);
			}else
			{
				bConsoleBox.log("Not the best spot for a door.");
				return;
			}
				
		}
		//special case for stairs!!
			
	}
	for (var h=0;h<buttons.length;h++)
	{
		buttons[h].update();
		if(!buttons[h].exists)
		{
			buttons.splice(h,1);
			h--;
		}
	}
	if(editMode)
	{
		/*if(letterkeys[15].check())
		{
			editor.penDownMode=!editor.penDownMode;
		}*/
		if(letterkeys[7].check())
		{
		
			//HELP
			bConsoleBox.log("CONTROLS:","yellow");
			bConsoleBox.log("Arrow Keys - Move room");
			bConsoleBox.log("Page Up/Down - Move floors");
			bConsoleBox.log("Shift + Arrow/Page keys - Make or connect room in that direction");
			bConsoleBox.log("W A S D - Move cursor");
			bConsoleBox.log("Shift + W A S D - Remove door");
			bConsoleBox.log("Delete - Delete room");
			bConsoleBox.log("Shift + Delete - Delete floor");
			bConsoleBox.log("Insert - Create Room");
			bConsoleBox.log("0 - Toggle hidden room");
			bConsoleBox.log("Tab - Change selected tile/door");
			bConsoleBox.log("F - Fill entire floor");
			bConsoleBox.log("M  - Cycle edit modes");
			bConsoleBox.log("K  - Save floor");
			bConsoleBox.log("L  - Load floor");
			bConsoleBox.log("I  - Save room");
			bConsoleBox.log("O  - Load room");
			bConsoleBox.log("C  - Copy room");
			bConsoleBox.log("Shift + C  - Copy room sans doors");
			bConsoleBox.log("P  - Paste room");
		    bConsoleBox.log("Space - Set Tile/Pen Down/Fill/Place Door");
			bConsoleBox.log("Left Click  - Place");
			bConsoleBox.log("Right Click  - Change mode/grab object");
			bConsoleBox.log("Mouse Wheel  - Change selected");
			//bConsoleBox.log("Z - Undo");
			bConsoleBox.log("Hit E to leave edit mode");
				//bConsoleBox.log("Someting - Fill!");

		}
		if(numberkeys[0].check())
		{
			curDungeon.curRoom().hidden=!curDungeon.curRoom().hidden
		}
		if(yeskey.check())
		{
			if(editor.confirming)
			{
				editor.confirmed=true;
				editor.confirming=false;
				editor.confirmingWhat();
				editor.confirmingWhat=null;
				bConsoleBox.log("Y","Yellow");
			}
		}
		if(nokey.check())
		{
			if(editor.confirming)
			{
				editor.confirming=false;
				bConsoleBox.log("N","Yellow");
			}
		}
		if(deletekey.check())
		{	
			if(shiftkey.checkDown())
			{
				bConsoleBox.log("Entire floor will be deleted. Confirm? (Y/N)","yellow");
				editor.confirming=true;
				editor.confirmingWhat=function(){curDungeon.wipeFloor(curDungeon.roomZ);}
			}
			else
			{
				bConsoleBox.log(curDungeon.rooms[curDungeon.roomZ][curDungeon.roomX][curDungeon.roomY].name +" will be deleted. Confirm? (Y/N)","yellow");
				editor.confirming=true;
				editor.confirmingWhat=function(){curDungeon.rooms[curDungeon.roomZ][curDungeon.roomX][curDungeon.roomY]=new room();
				curDungeon.rooms[curDungeon.roomZ][curDungeon.roomX][curDungeon.roomY].active=false;}
			}	
		}
		if(insertkey.check())
		{
			if(!curDungeon.curRoom().active)
			{
				curDungeon.createRoom(curDungeon.roomZ,curDungeon.roomX,curDungeon.roomY);
			}else
			{
				bConsoleBox.log("Room already exists!");
			}
			
		}
		if(shiftkey.checkDown())
		{
			
			if(letterkeys[22].check())
			{
				//curDungeon.curRoom().addDoor(0);
				//curDungeon.curRoom().removeDoor(0);
				curDungeon.smartRemoveDoor(curDungeon.roomZ,curDungeon.roomX,curDungeon.roomY,0);
			}
			if(letterkeys[0].check())
			{
				//curDungeon.curRoom().addDoor(3);
				//curDungeon.curRoom().removeDoor(3);
				curDungeon.smartRemoveDoor(curDungeon.roomZ,curDungeon.roomX,curDungeon.roomY,3);
			}
			if(letterkeys[18].check())
			{
				//curDungeon.curRoom().addDoor(2);
				//curDungeon.curRoom().removeDoor(2);
				curDungeon.smartRemoveDoor(curDungeon.roomZ,curDungeon.roomX,curDungeon.roomY,2);
			}
			if(letterkeys[3].check())
			{
				//curDungeon.curRoom().addDoor(1);
				//curDungeon.curRoom().removeDoor(1);
				curDungeon.smartRemoveDoor(curDungeon.roomZ,curDungeon.roomX,curDungeon.roomY,1);
			}
			if(pageupkey.check())
			{
				if(curDungeon.roomZ<curDungeon.floors-1)
				{
					if((curDungeon.rooms[curDungeon.roomZ+1][curDungeon.roomX][curDungeon.roomY].active) ||(curDungeon.createRoom(curDungeon.roomZ+1,curDungeon.roomX,curDungeon.roomY)))
					{
						curDungeon.smartAddStair(editor.x,editor.y,true);
						editor.clearConfirm();
						editor.penDown=false;
						curDungeon.changeFloor(true,!editMode);
					}
				}else
				{
					//bConsoleBox.log("Can't go off the map");
					bConsoleBox.log("Will create new floor. Confirm? (Y/N)","yellow");
					editor.confirming=true;
					editor.confirmingWhat=function() {
						curDungeon.addFloor();
						bConsoleBox.log("New floor created");
					}
				}
			}
			if(pagedownkey.check())
			{
				if(curDungeon.roomZ>0)
				{
					if((curDungeon.rooms[curDungeon.roomZ-1][curDungeon.roomX][curDungeon.roomY].active) ||(curDungeon.createRoom(curDungeon.roomZ-1,curDungeon.roomX,curDungeon.roomY)))
					{
						curDungeon.smartAddStair(editor.x,editor.y,false);
						editor.clearConfirm();
						editor.penDown=false;
						curDungeon.changeFloor(false,!editMode);
					}
				}else
				{
					bConsoleBox.log("Can't go off the map");
				}
			}
			if(leftkey.check())
			{
				if(curDungeon.roomX>0)
				{
					if((curDungeon.rooms[curDungeon.roomZ][curDungeon.roomX-1][curDungeon.roomY].active) ||(curDungeon.createRoom(curDungeon.roomZ,curDungeon.roomX-1,curDungeon.roomY)))
					{
						//curDungeon.curRoom().addDoor(3)
						//curDungeon.rooms[curDungeon.roomZ][curDungeon.roomX-1][curDungeon.roomY].addDoor(1);
						curDungeon.smartAddDoor(1,6,3);
						editor.clearConfirm();
						editor.penDown=false;
						curDungeon.changeRoom(3,!editMode);
					}
				}else
				{
					bConsoleBox.log("Can't go off the map");
				}
			}
			if(rightkey.check())
			{
				if(curDungeon.roomX<curDungeon.getWidth()-1)
				{
					if((curDungeon.rooms[curDungeon.roomZ][curDungeon.roomX+1][curDungeon.roomY].active)|| (curDungeon.createRoom(curDungeon.roomZ,curDungeon.roomX+1,curDungeon.roomY)))
					{
						curDungeon.smartAddDoor(18,6,1);
						editor.clearConfirm();
						editor.penDown=false;
						curDungeon.changeRoom(1,!editMode);
					}
				}else{
					bConsoleBox.log("Can't go off the map");
				}
			}
			if(upkey.check())
			{
				if(curDungeon.roomY>0)
				{
					if((curDungeon.rooms[curDungeon.roomZ][curDungeon.roomX][curDungeon.roomY-1].active) ||(curDungeon.createRoom(curDungeon.roomZ,curDungeon.roomX,curDungeon.roomY-1)))
					{
						curDungeon.smartAddDoor(8,1,0);
						editor.clearConfirm();
						editor.penDown=false;
						curDungeon.changeRoom(0,!editMode);
					}
				}else{
					bConsoleBox.log("Can't go off the map");
				}
			}
			if(downkey.check())
			{	
				if(curDungeon.roomY<curDungeon.getHeight()-1)
				{
					if((curDungeon.rooms[curDungeon.roomZ][curDungeon.roomX][curDungeon.roomY+1].active) ||(curDungeon.createRoom(curDungeon.roomZ,curDungeon.roomX,curDungeon.roomY+1)))
					{
						curDungeon.smartAddDoor(8,13,2);
						editor.clearConfirm();
						editor.penDown=false;
						curDungeon.changeRoom(2,!editMode);
					}
				}else
				{
					bConsoleBox.log("Can't go off the map");
				}
			}
		}else
		{
			if(letterkeys[22].check())
			{
				editor.move(0);
			}
			if(letterkeys[0].check())
			{
				editor.move(3);
			}
			if(letterkeys[18].check())
			{
				editor.move(2);
			}
			if(letterkeys[3].check())
			{
				editor.move(1);
			}
			if(editor.penDown)
			{
				if(editor.mode==editModes.Pen)
				{
					if((editor.brushType!=DungeonTileType.UpStair) && (editor.brushType!=DungeonTileType.DownStair))
					{
						curDungeon.curRoom().tiles[editor.x][editor.y].data=editor.brushType;
						for(var i=0;i<curDungeon.curRoom().stairs.length;i++)
						{
							if((curDungeon.curRoom().stairs[i].x==editor.x) &&(curDungeon.curRoom().stairs[i].y==editor.y) )
							{
								curDungeon.curRoom().stairs.splice(i,1);
							}
						}
					}else{
						bConsoleBox.log("Can't paint with stairs");
						editor.penDown=false;
					}
				}
				//addEdit(curDungeon.curRoom());
			}
		}
	}
	
	for (var h=0;h<buttons.length;h++)
	{
		buttons[h].update();
	}
	
	if(pageupkey.check())
	{
		editor.clearConfirm();
		curDungeon.changeFloor(true,!editMode);
		editor.penDown=false;
	}
	if(pagedownkey.check())
	{
		editor.clearConfirm();
		curDungeon.changeFloor(false,!editMode);
		editor.penDown=false;
	}
	 if(leftkey.check())
	 {
		editor.clearConfirm();
		curDungeon.changeRoom(3,!editMode);
		editor.penDown=false;
	 }
	 if(rightkey.check())
	 {
		editor.clearConfirm();
		curDungeon.changeRoom(1,!editMode);
		editor.penDown=false;
	 }
	 if(upkey.check())
	 {
		editor.clearConfirm();
		curDungeon.changeRoom(0,!editMode);
		editor.penDown=false;
	 }
	 if(downkey.check())
	 {
		editor.clearConfirm();
		curDungeon.changeRoom(2,!editMode);
		editor.penDown=false;
	 }

	gamepad = navigator.getGamepads && navigator.getGamepads()[0];
	
	for(var i=0;i<curDungeon.curRoom().fires.length;i++)
	{
		if(!curDungeon.curRoom().fires[i].alive)
		{
			curDungeon.curRoom().fires.splice(i,1);
			i--;
		}
	}
	
	if(logsetkey.check())
	{
		
	}	
	
	if(homekey.check())
	{
		//camera.unFollow();
		//camera.tileX=92+326;
		//camera.tileY=212;
		curDungeon.roomZ=0;
		curDungeon.roomX=7;
		curDungeon.roomY=7;
	}
	if(editkey.check())
	{
		editMode=!editMode;
		editor.clearConfirm();
		if(editMode){
			bConsoleBox.log("Welcome to edit mode. Hit H for help.");
		}
	}
		
	if ((milliseconds-lastani>WATER_RATE) &&(!isBattle))
	{
		tileani++;
		lastani=milliseconds;
		anicount=0;
		mapDirty=true;
    }
    if (tileani>3) {tileani=0} //tile animations
	camera.update();
	monsta.update();
	
	for(var i=0;i<curDungeon.curRoom().fires.length;i++)
	{
		curDungeon.curRoom().fires[i].update();
	}
	for(var i=0;i<curDungeon.curRoom().objects.length;i++) //should do adjacent rooms too, no?
	{
		curDungeon.curRoom().objects[i].update();
	}
	
	if(thyme.tock)
	{
		/*for(var i=0;i<ships.length;i++)
		{
			ships[i].update(curMap);
		}
		for(var i=0;i<caravans.length;i++)
		{
			caravans[i].update(curMap);
		}
		for(var i=0;i<farms.length;i++)
		{
			farms[i].update();
		}*/
		thyme.tock=false
	}
	
	
	
	for(var i=0;i<curDungeon.curRoom().lights.length;i++)
	{
		curDungeon.curRoom().lights[i].update();
		if(!curDungeon.curRoom().lights[i].alive)
		{
			curDungeon.curRoom().lights.splice(i,1);
			i--;
		}
	}
	
	var speeMulti=1;

	
};
merp();
var tt="Indiana Jones and the Mystery of the missing title";
var yui=Math.floor(Math.random()*10);
if (yui==0){
	tt="Indiana Jones and the Legend of the Lost Socks";
}else if (yui==1){
	tt="Indiana Jones Meets Batman & Robin";
}else if (yui==2){
	tt="Indiana Jones: Raiders of Hitler's Fridge";
}else if (yui==3){
	tt="Indiana Jones: Short Round's Revenge";
}else if (yui==4){
	tt="Indiana Jones: Back 2 Da Hood";
}else if (yui==5){
	tt="Indiana Jones and the Pyramids of Mars";
}else if (yui==6){
	tt="Indiana Jones and the Day He Just Graded Papers at the Office";
}else if (yui=7){
	tt="Indiana Jones and the Crab People";
}else if (yui==8){
	tt="Indiana Jones and the Last Sandwich";
}else if (yui==9){
	tt="Indiana Jones and Kingdom of the Silver Fork";
}else if (yui==9){
	tt="Indiana Jones and Case of the Hepatitis C";
}
document.title = tt;
//curDungeon.createRoom(curDungeon.roomZ,curDungeon.roomX,curDungeon.roomY);
curDungeon.load();
//curDungeon.loadFloor();
curDungeon.curRoom().explored=true;
//curDungeon.linkDoors();
startGame();

//console.log(curMap.tiles[Skagos.x/16][Skagos.y/16].data);
