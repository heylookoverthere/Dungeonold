var debugInfo=true;
var fires=[];
var gameOver=null;

bConsoleBox=new textbox();
bConsoleBox.width=400;
bConsoleBox.height=CANVAS_HEIGHT-12;
bConsoleBox.log("Loading...");
bConsoleBox.y=18;
bConsoleBox.x=18;
bConsoleBox.lines=4;



var showMap=false;

//lights.push(new light(7092,3748,14));
//lights.push(new light(7208,3777,14));


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

var concanvasElement = $("<canvas width='" + 432 + "' height='" + CANVAS_HEIGHT + "'></canvas");
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

var curRoom = new room();
curRoom.clear();

controller= new virtualGamePad();

var ksavekey=new akey("o"); //define the different keys
var loadkey=new akey("l");

var gamestart=false;
var radar=true;

function drawGUI(can)
{
	can.globalAlpha=0.75;
	can.fillStyle="blue";
	canvas.fillRect(6,6,221,22);
	can.fillStyle="yellow";
	can.fillText("<3: ",8,25);
	var cont=0;
	/*can.fillText("Men at Wall: "+theWatch.men.length,8,41);
	
	can.fillText("Men in training: "+theWatch.recruits.length,8,57);//+camera.x+","+camera.y,25,57);
	can.fillText("Food: "+theWatch.getFood()+ " (~"+theWatch.timeToStarve()+" days)",8,73);
	can.fillText(thyme.years+" AC "+thyme.days+ " days, "+thyme.hours+":"+thyme.minutes ,8,91);
	can.fillText("Meals Per Day: "+theWatch.mealsPerDay,8,107);
	can.fillText("Health: "+theWatch.health,8,125);
	can.fillText("Gold: "+theWatch.gold,8,143);//+camera.x+","+camera.y,25,57);
	//can.fillText(": "+Math.floor(miles.numJumps-miles.jumpTrack),755,55);*/
	can.globalAlpha=1;
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
	//setTimeout(computePortPaths(curMap,true),1000);
	//build whole dungeon. 
	curRoom.buildRoom("dungeon1/room2")
	/*var enDoor=new door();
	var benDoor=new door();
	benDoor.orient(1);
	curRoom.entities.push(enDoor);
	curRoom.entities.push(benDoor);*/
	camera.tileX=0;
	camera.tileY=0;
	
	graphboat = mapToGraph(curRoom,true);
	graph = mapToGraph(curRoom,false);
	starter();

}

function starter()
{		
	gamestart=true;	
	//bees=true;
	bConsoleBox.log("started");
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
	curRoom.draw(canvas,camera);
	if(customConsole)
	{
		bConsoleBox.draw(concanvas);
	}else
	{
		concanvas.clearRect(0,0,432,CANVAS_HEIGHT);
	}
	if(!gamestart) {return;}
		
	monsta.draw(canvas,camera);

	if(false)//(!stayDay)
	{
		canvas.globalAlpha=LightLevels[thyme.hours];
		canvas.fillStyle="black";
		canvas.fillRect(0,0,CANVAS_WIDTH, CANVAS_HEIGHT);
	}

	for(var i=0;i<lights.length;i++)
	{
		//lights[i].draw(canvas,camera);
		lightenGradient(canvas,camera,lights[i], lights[i].radius)
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
	drawGUI(canvas);
	drawDebug(canvas);
	
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
	controller.update();
	//mel.x=miles.x;
	//mel.y=miles.y-26+miles.headHeight;
	var tick=0;	
    lasttime=milliseconds;
    timestamp = new Date();
    milliseconds = timestamp.getTime();
    tick++;
	thyme.update();
	

	gamepad = navigator.getGamepads && navigator.getGamepads()[0];
	
	for(var i=0;i<fires.length;i++)
	{
		if(!fires[i].alive)
		{
			fires.splice(i,1);
			i--;
		}
	}
	
	if(logsetkey.check())
	{
		console.log(settlements[trackTown].name);
		console.log("coords: "+settlements[trackTown].tileX,settlements[trackTown].tileY);
		console.log("Port: "+settlements[trackTown].portTileX,settlements[trackTown].portTileY);
		console.log("Entrance: "+settlements[trackTown].entranceTileX(),settlements[trackTown].entranceTileY());
	}	
	
	if(homekey.check())
	{
		//camera.unFollow();
		//camera.tileX=92+326;
		//camera.tileY=212;
	}
	if(debugkey.check())
	{
		//platformer=!platformer;
		//debugInfo=!debugInfo;
		//allPoint(miles);
		//miles.equip(helmetList[Math.floor(Math.random()*helmetList.length)]);
		/*for(var i=0;i<people.length;i++)
		{
			people[i].setDestination(75,26,curMap);
		}*/
		//mode=2;
		//monsta.startOrbit(40000,Math.floor(Math.random()*CANVAS_WIDTH),Math.floor(Math.random()*CANVAS_HEIGHT),60);
		//monsta.snow(10000,4,1);
		//console.log(Math.floor(ships[0].x/16),Math.floor(ships[0].y/16));
		//console.log(curMap.tiles[69][11].data);
		//ships[0].setDestination(Math.floor(Skagos.x/16),Math.floor(Skagos.y/16),curMap);
		for(var i=1;i<people.length;i++)
		{
		
			//people[i].setDestination(settlements[0].tileX,settlements[0].tileY-5,curMap);
		}
		bees=true;
		//camera.follow(ships[0]);
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
	
	for(var i=0;i<fires.length;i++)
	{
		fires[i].update();
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
	
	
	
	for(var i=0;i<lights.length;i++)
	{
		lights[i].update();
		if(!lights[i].alive)
		{
			lights.splice(i,1);
			i--;
		}
	}
	
	var speeMulti=1;

};
merp();
startGame();
//console.log(curMap.tiles[Skagos.x/16][Skagos.y/16].data);
