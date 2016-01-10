var debugInfo=false;
var editMode=false;
var drawingPath=false;
var bullshitHack=true; //right click to link doors
var existingDungeons=new Array();
var countIndex=0;

var linksprites=new Array();
linksprites.push(Sprite("linkup"));
linksprites.push(Sprite("linkright"));
linksprites.push(Sprite("linkdown"));
linksprites.push(Sprite("linkleft"));

var bulbsprite=Sprite("bulb");
var bulboffsprite=Sprite("bulboff");

document.getElementById("mainSong").addEventListener('ended', function() { //loops music
	this.currentTime = 0;
	this.play();
    }, false);

if(checkMobile())
{
	MobileMode=true;
	yOffset= 15;
}else
{
	MobileMode=false;
}

	
	//document.addEventListener('touchmove', handleTouchMove, false);
	//document.concanvasElement.addEventListener('touchmove', handleTouchMove, false);
var xDown = null;                                                        
var yDown = null;                                                        
var downSince=new Date().getTime();	
var downLast=new Date().getTime();	

function handleTouchStart(evt) {  
	//evt.preventDefault();         
    downSince=new Date().getTime();	
    xDown = evt.touches[0].clientX;                                      
    yDown = evt.touches[0].clientY;                                      
};
function handleConTouchStart(evt) {  
	evt.preventDefault(); 
		xDown = evt.touches[0].clientX;                                      
		yDown = evt.touches[0].clientY;    
		var now=new Date().getTime();
	
			
		if(now-downLast<OPTIONS.DoubleTapThreshold)
		{
			//bConsoleBox.log("Double Tap","yellow");
			/*if(bullshitHack)
			{
				bullshitHack=false;
				for(var i=0;i<curDungeon.floors;i++)
				{
					curDungeon.linkDoors(i);
					curDungeon.linkSwitches(i);
				}
				bConsoleBox.log("Doors and switches linked!","yellow");
				return;
			}*/
			if(mode==0)
			{
	
			}else if(mode==1)
			{
				curDungeon.mapFloor=curDungeon.roomZ;
				mode=2;
				playSound("map");
			}else if (mode==2)
			{
				mode=1;
			}
		}else
		{
			//bConsoleBox.log("single tap on console");
		}
	
    downLast=new Date().getTime();	
                                
};
function handleTouchEnd(evt) {  
	//evt.preventDefault();   
	xDown = evt.touches[0].clientX;                                      
    yDown = evt.touches[0].clientY;  	
	var now=new Date.getTime();
	if(now-downSince>OPTIONS.HoldTime)
	{
		//held
		console.log("held touch");
	}else
	{
		//single
	}	
    	
                                       
};                                             

function handleTouchMove(evt) {
	evt.preventDefault();
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

	toux=Math.floor((xUp-xOffset)/32);// * Math.pow(2, 1);//curMap.zoom-1);
	touy=Math.floor((yUp-yOffset)/32);
	
	if((Math.abs(xDiff)<75) &&(Math.abs(yDiff)<75) || (!OPTIONS.EnableSwipes))
	{
		return;
	}else
	{
	if(mode==0)
	{
	
	}else if(mode==1)
	{
		if((editMode) && (false)) //+edit mode create rooms
		{
			if ( Math.abs( xDiff ) > Math.abs( yDiff ) )
			{
				if ( xDiff > 0 ) 
				{
					/* left swipe */ 
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
				} else 
				{
					/* right swipe */
					if(curDungeon.roomX<curDungeon.getWidth()-1)
					{
						if((curDungeon.rooms[curDungeon.roomZ][curDungeon.roomX+1][curDungeon.roomY].active)|| (curDungeon.createRoom(curDungeon.roomZ,curDungeon.roomX+1,curDungeon.roomY)))
						{
							curDungeon.smartAddDoor(18,6,1);
							editor.clearConfirm();
							editor.penDown=false;
							curDungeon.changeRoom(1,!editMode);
						}
					}else
					{
						bConsoleBox.log("Can't go off the map");
					}
				}                       
			} else //up or down swipe
			{
				if ( yDiff > 0 )
				{
					/* up swipe */ 
					if(curDungeon.roomY>0)
					{
						if((curDungeon.rooms[curDungeon.roomZ][curDungeon.roomX][curDungeon.roomY-1].active) ||(curDungeon.createRoom(curDungeon.roomZ,curDungeon.roomX,curDungeon.roomY-1)))
						{
							curDungeon.smartAddDoor(8,1,0);
							editor.clearConfirm();
							editor.penDown=false;
							curDungeon.changeRoom(0,!editMode);
						}
					}else
					{
						bConsoleBox.log("Can't go off the map");
					}
				} else 
				{ 
					/* down swipe */
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
			}
		}else if(editMode)
		{	
			if ( Math.abs( xDiff ) > Math.abs( yDiff ) )
			{
				if ( xDiff > 0 ) 
				{
					/* left swipe */ 
					if(curDungeon.roomX>0)
					{
						editor.clearConfirm();
						editor.penDown=false;
						curDungeon.changeRoom(3,!editMode);
					}else
					{
						bConsoleBox.log("Can't go off the map");
					}
				} else 
				{
					/* right swipe */
					if(curDungeon.roomX<curDungeon.getWidth()-1)
					{
						editor.clearConfirm();
						editor.penDown=false;
						curDungeon.changeRoom(1,!editMode);
					}else
					{
						bConsoleBox.log("Can't go off the map");
					}   
				}
			} else 
			{
				if ( yDiff > 0 )
				{
					/* up swipe */ 
					if(curDungeon.roomY>0)
					{
						editor.clearConfirm();
						editor.penDown=false;
						curDungeon.changeRoom(0,!editMode);
					}else
					{
						bConsoleBox.log("Can't go off the map");
					}
				} else
				{ 
					/* down swipe */
					if(curDungeon.roomY<curDungeon.getHeight()-1)
					{
						editor.clearConfirm();
						editor.penDown=false;
						curDungeon.changeRoom(2,!editMode);
					}else
					{
						bConsoleBox.log("Can't go off the map");
					}
				}
			}
		}else if(!editMode)
		{
			if ( Math.abs( xDiff ) > Math.abs( yDiff ) )
			{
				if ( xDiff > 0 ) 
				{
					/* left swipe */ 
					if(curDungeon.roomX>0)
					{
						if(curDungeon.rooms[curDungeon.roomZ][curDungeon.roomX-1][curDungeon.roomY].active) 
						{
							editor.clearConfirm();
							editor.penDown=false;
							curDungeon.changeRoom(3,!editMode);
						}
					}else
					{
						bConsoleBox.log("Can't go off the map");
					}
				} else 
				{
					/* right swipe */
					if(curDungeon.roomX<curDungeon.getWidth()-1)
					{
						if(curDungeon.rooms[curDungeon.roomZ][curDungeon.roomX+1][curDungeon.roomY].active)
						{
							
							editor.clearConfirm();
							editor.penDown=false;
							curDungeon.changeRoom(1,!editMode);
						}
					}else
					{
						bConsoleBox.log("Can't go off the map");
					}                      
				}
			} else 
			{
				if ( yDiff > 0 )
				{
					/* up swipe */ 
					if(curDungeon.roomY>0)
					{
						if(curDungeon.rooms[curDungeon.roomZ][curDungeon.roomX][curDungeon.roomY-1].active) 
						{
							editor.clearConfirm();
							editor.penDown=false;
							curDungeon.changeRoom(0,!editMode);
						}
					}else
					{
						bConsoleBox.log("Can't go off the map");
					}
				} else
				{ 
					/* down swipe */
					if(curDungeon.roomY<curDungeon.getHeight()-1)
					{
						if(curDungeon.rooms[curDungeon.roomZ][curDungeon.roomX][curDungeon.roomY+1].active)
						{
							editor.clearConfirm();
							editor.penDown=false;
							curDungeon.changeRoom(2,!editMode);
						}else
						{
							bConsoleBox.log("Can't go off the map");
						}
					}
				}
			}
		}
	}else if(mode==2)
	{
		if ( Math.abs( xDiff ) > Math.abs( yDiff ) )
			{
				if ( xDiff > 0 ) 
				{
					/* left swipe */ 
					
				} else 
				{
					/* right swipe */
					
				}
			} else 
			{
				if ( yDiff > 0 )
				{
					/* up swipe */ 
					curDungeon.mapFloor--;
					if(curDungeon.mapFloor<0)
					{
						curDungeon.mapFloor=0;
					}
				} else
				{ 
					/* down swipe */
					curDungeon.mapFloor++;
					if(curDungeon.mapFloor>curDungeon.floors-1)
					{
						curDungeon.mapFloor=curDungeon.floors-1;
					}
				}
			}
	}
	}
    /* reset values */
    xDown = null;
    yDown = null;                                             
};	
	
var gameOver=null;

var editor=new editCursor();

function logControls()
{

	bConsoleBox.log("CONTROLS:","yellow");
	bConsoleBox.log("Arrow Keys - Move room");
	bConsoleBox.log("Page Up/Down - Move floors");
	bConsoleBox.log("Shift + Arrow/Page keys - Make or connect room in that direction");
	bConsoleBox.log("W A S D - Move cursor");
	bConsoleBox.log("Shift + W A S D - Remove door");
	bConsoleBox.log("Delete - If an object is grabbed, deletes that object. Otherwise delete room");
	bConsoleBox.log("Shift + Delete - Delete floor");
	bConsoleBox.log("Insert - Create Room");
	bConsoleBox.log("0 - Toggle hidden room");
	bConsoleBox.log("Tab - Change selected tile/door");
	bConsoleBox.log("F - Fill entire floor");
	bConsoleBox.log("Q  - Cycle edit modes");
	bConsoleBox.log("M  - Toggle sound");
	bConsoleBox.log("K  - Save floor");
	bConsoleBox.log("L  - Load floor");
	bConsoleBox.log("I  - Save room");
	bConsoleBox.log("O  - Load room");
	bConsoleBox.log("C  - Copy room");
	bConsoleBox.log("R  - Random prefab room");
	//bConsoleBox.log("Shift+R  - Randomize objects");
	bConsoleBox.log("Shift + C  - Copy room sans doors");
	bConsoleBox.log("P  - Paste room");
	bConsoleBox.log("Space - Set Tile/Pen Down/Fill/Place Door");
	bConsoleBox.log("Left Click  - Place");
	bConsoleBox.log("Right Click  - Change mode/grab object");
	bConsoleBox.log("Mouse Wheel  - Change selected");
	bConsoleBox.log("B - Draw path between player and cursor");
	bConsoleBox.log("G  - Show map");
	//bConsoleBox.log("Z - Undo");
	bConsoleBox.log("Hit E to leave edit mode");
}

bConsoleBox=new textbox();
bConsoleBox.width=300;
bConsoleBox.height=CANVAS_HEIGHT-12;
bConsoleBox.log("Loading...");
if(checkMobile())
{
	bConsoleBox.log("Mobile Version");
	MobileMode=true;
}else
{
	bConsoleBox.log("Desktop Version");
	MobileMode=false;
}

bConsoleBox.y=18;
bConsoleBox.x=18;
bConsoleBox.lines=4;

var dungname="dungeon1";




var curDungeon= new dungeon(dungname);

var showMap=false;

var buttonX=156;

var buttons=new Array();
var timy=new button();
timy.text="Edit";
timy.x=56;
timy.y=127;
timy.height=17;
if(MobileMode)
{
	timy.height=32;
}
timy.exists=true;
timy.shiftable=false;
timy.visible=true;
timy.update=function()
{	
	if(editMode)
	{
		this.text="Play";
		
	}else
	{
		this.text="Edit";
	}
	if(this.hasFocus)
	{
		//holdInput=true;
			
			if(startkey.check())
			{
				this.doThings();
				//somehow order ship to move there.
			}
	}
}
timy.doThings=function()
{
	editMode=!editMode;
	editor.penDown=false;
	editor.clearConfirm();
	if(editMode)
	{
		this.text="Play";
	}else
	{
		this.text="Edit";
	}
}

buttons.push(timy);

//console.log(navigator.userAgent);
function checkMobile()
 { 
	 if( navigator.userAgent.match(/Android/i)
	 || navigator.userAgent.match(/webOS/i)
	 || navigator.userAgent.match(/iPhone/i)
	 || navigator.userAgent.match(/iPad/i)
	 || navigator.userAgent.match(/iPod/i)
	 || navigator.userAgent.match(/BlackBerry/i)
	 || navigator.userAgent.match(/Windows Phone/i)
	 ){
		return true;
	  }
	 else {
		return false;
	  }
}
var timy=new button();
timy.text="Save";
timy.x=188;
timy.y=10;
timy.height=22;
timy.exists=true;
timy.shiftable=false;
timy.visible=true;
timy.update=function()
{	
	if(editMode)
	{
		this.visible=true;
		
	}else
	{
		this.visible=false;;
	}
	if(this.hasFocus)
	{
		//holdInput=true;
			
			if(startkey.check())
			{
				this.doThings();
				//somehow order ship to move there.
			}
	}
}
timy.doThings=function()
{
	/*if(bullshitHack)
	{
		bConsoleBox.log("Right click to link switches first, or data may be lost.","yellow");
		return;
	}*/
	bConsoleBox.log("Saving dungeon. Existing data will be overwritten. Confirm? (Y/N)","yellow");
		editor.confirming=true;
		editor.confirmingWhat=function() {
			curDungeon.save();
		}
		if(OPTIONS.confirmationPopUps)
		{
			popQuestion("Saving dungeon. Existing data will be overwritten. Confirm? (Y/N)");
		}
	
}
buttons.push(timy);

var timy=new button();
timy.text="Load";
timy.x=188;
timy.y=41;
timy.height=22;
timy.exists=true;
timy.shiftable=false;
timy.visible=true;
timy.update=function()
{	
	if((editMode) && (curDungeon.saveExists))
	{
		this.visible=true;
		
	}else
	{
		this.visible=false;;
	}
	if(this.hasFocus)
	{
		//holdInput=true;
			
			if(startkey.check())
			{
				this.doThings();
				//somehow order ship to move there.
			}
	}
}
timy.doThings=function()
{
	return;
	editor.penDown=false;
	bConsoleBox.log("Loading dungeon from disk. Unsaved data will be overwritten. Confirm? (Y/N)","yellow");
		editor.confirming=true;
		editor.confirmingWhat=function() {
			//bullshitHack=true;
			//penis
			var index=existingDungeons.indexOf(curDungeon.name);
			LOAD_COUNTS[index]=curDungeon.numRooms; //todo problem if the number of rooms has changed. 
			curDungeon.load();
		}
		if(OPTIONS.confirmationPopUps)
		{
			popQuestion("Loading dungeon from disk. Unsaved data will be overwritten. Confirm? (Y/N)");
		}
	
}
buttons.push(timy);

var timy=new button();
timy.text="Exit";
timy.x=94;
timy.y=127;
timy.height=17;
if(MobileMode)
{
	timy.height=32;
}
timy.exists=true;
timy.shiftable=false;
timy.visible=true;
timy.update=function()
{	
	if(editMode)
	{
		this.text="Mode";
		
	}else
	{
		this.text="Exit";
	}
	if(this.hasFocus)
	{
		//holdInput=true;
			
			if(startkey.check())
			{
				this.doThings();
				//somehow order ship to move there.
			}
	}
}
timy.doThings=function()
{
	editor.penDown=false;
	if(editMode)
	{
		editor.mode++;
		editor.penDown=false;
		if(editor.mode>editor.numModes)
		{
			editor.mode=0;
		}
	}else
	{
		bConsoleBox.log("Returning to main menu. Unsaved changes will be lost. Confirm? (Y/N)","yellow");
		editor.confirming=true;
		editor.confirmingWhat=function() {
			
			$.post("/listdir/", {"path": "C:/JS/Dungeon/dungeons/"}, function(resp)
			 {
				existingDungeons=resp.split(",");
				existingDungeons.splice(0,1);
				
				/*for( var i=0;i<existingDungeons.length;i++)
				 {
					 var crmath="dungeons/"+existingDungeons[i]+"/"+"main.txt";
							$.get(crmath, function(data) 
							{	
								var bata=data.split(",");
								LOAD_COUNTS.push(Math.floor(bata[1]));
								
							});
				 }*/
				 var index=existingDungeons.indexOf(curDungeon.name);
				LOAD_COUNTS[index]=curDungeon.numRooms;
				curDungeon.cleanSlate();
			 } 
			 )
			//bullshitHack=true;
			mode=0;
			document.getElementById("mainSong").pause();
		}
		if(OPTIONS.confirmationPopUps)
		{
			popQuestion("Returning to main menu. Unsaved changes will be lost. Confirm? (Y/N)");
		}
	}
}

buttons.push(timy);


var timy=new button();
timy.text="Help";
timy.x=18;
timy.y=127;
timy.height=17;
if(MobileMode)
{
	timy.height=32;
}
timy.exists=true;
timy.shiftable=false;
timy.visible=true;
timy.doThings=function()
{
	if((this.shiftable) && (shiftdown))
	{
		logControls();
	}else
	{
		var blex="well, there not much actual gameplay yet. But you can use the arrow keys and page up/page down to navigate the dungeon. You'll be limited as a player would be, so you'll need an open door to change room and unhidden stairs to change floors";
		if(editMode)
		{
			if(editor.mode==editModes.Pen)
			{
				blex="Pen mode is pretty self explanatory. Click or press space to put the pen down or pick it up again. Then move the cursor and it will paint the tiles. It's quick, but imprecise. Some special tiles cannot be painted, like stairs.";
			}else if(editor.mode==editModes.Stamp)
			{
				blex="Stamp mode lets you place individual tiles by clicking or pressing space." ;
			}else if(editor.mode==editModes.Fill)
			{
				blex="Fill mode works like the paintbucket tool in MSPaint. Not to be confused with the fill all function, that sets all floor tiles to the selected tile (activated by hitting f)"
			}else if(editor.mode==editModes.Door)
			{
				blex="Door mode. Place a door of the selected type. A matching door in the adjacent room will be created if possible. Watch out for overlapping doors! Doors can be removed in any mode with Shift + W,A,S,D. Be warned it removes the oldest door on the indicated wall, you don't get to choose. " 
			}else if(editor.mode==editModes.Objects)
			{
				blex="Object mode. Click or hit space to place the selected object. Click an existing object to edit it's special properties (if applicable). Right click an object to pick it up and again to put it down in a new location. (Because right click has been re-purposed in this mode, you'll have to use Q to change edit modes.) Delete kill will delete a currently grabbed object."
			}else if(editor.mode==editModes.CopyArea)
			{
				blex="Copy Area mode. I have enabled this yet, so I don't know how you're seeing this message! I'm not sure if this is even a thing that is needed. Maybe make it selection/delete mode instead, and then you can delete what's selected? ";
			}else if(editor.mode==editModes.SwitchLink)
			{
				blex="Switch linking mode. May eventually become anything linking mode. But for now click a switch in object mode and then click any door or staircase to link them. (the staircase will become hidden, and only appear when the switch is activated.) There's no way to unlink at the moment, and the links aren't saved and loaded yet.";
			}else if(editor.mode==editModes.ChestLoot)
			{
				blex="Chest contents mode. Click a chest to fill it with the selected loot.";
			}
		}
	}
	var mancy=new textbox();
	mancy.setup();
	mancy.x=200;
	mancy.y=200;
	mancy.textLim=104;
	mancy.log(blex);
	mancy.hasFocus=true;
	buttons.push(mancy);
	
}
buttons.push(timy);

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
		curDungeon.changeRoom(0,!editMode);
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
				if(OPTIONS.confirmationPopUps)
				{
					popQuestion("Will create new floor. Confirm? (Y/N)");
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
var modekey=new akey("q");
var undokey=new akey("z");
var editkey=new akey("e");
var yeskey=new akey("y");
var nokey=new akey("n");
var controlkey=new akey("cntrl");
var copykey=new akey("c");
var pastekey=new akey("p");
var savefloorkey = new akey("k");
var loadfloorkey = new akey("l");
var mutekey= new akey("m");
var soundkey= new akey("f");
var randomkey= new akey("r");
var mapkey=new akey("g");

var miles=new dude();
miles.dir=0;
miles.keys=0;
miles.AI=false;
miles.money=0;
miles.bombs=0;
miles.wallet=250;
miles.tileX;//todo
miles.has=new Array();
for(var i=0;i<numHas;i++)
{
	miles.has.push(false);
}
miles.x=9;
miles.y=12;
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

function popQuestion(question)
{
	playSound("menucursor");
	var mancy=new textbox();
	mancy.setup();
	mancy.x=200;
	mancy.y=200;
	mancy.unClickable=true;
	/*mancy.optionTrack=1;
	mancy.options=2;*/
	mancy.textLim=104;
	mancy.log(question);
	/*mancy.log(" ");
	mancy.log("    No");
	mancy.log("    Yes");*/
	mancy.hasFocus=true;
	mancy.update=function(){
		if(!editor.confirming)
		{this.exists=false;}
	}
	
	buttons.push(mancy);
	
	
	var pancn=new button();
	pancn.text="  NO";
	pancn.x=mancy.x+170;
	pancn.y=mancy.y+27;
	pancn.height=29;
	pancn.width=50;
	pancn.exists=true;
	pancn.shiftable=false;
	pancn.visible=true;
	pancn.hasParent=true;
	pancn.parent=mancy;
	pancn.doThings=function()
	{
		if(editor.confirming)
		{
			playSound("menucancel");
			editor.confirming=false;
			bConsoleBox.log("No","Yellow");
		}
		this.parent.exists=false;
		this.exists=false;
	};
	
	buttons.push(pancn);
	
	pancn=new button();
	pancn.text="  Yes";
	pancn.x=mancy.x+100;
	pancn.y=mancy.y+27;
	pancn.height=29;
	pancn.width=50;
	pancn.exists=true;
	pancn.shiftable=false;
	pancn.visible=true;
	pancn.hasParent=true;
	pancn.parent=mancy;
	pancn.doThings=function()
	{
		if(editor.confirming)
		{
			playSound("menuselect");
			editor.confirmed=true;
			editor.confirming=false;
			editor.confirmingWhat();
			editor.confirmingWhat=null;
			bConsoleBox.log("Yes","Yellow");
		}
		this.parent.exists=false;
		this.exists=false;
	};
	buttons.push(pancn);
	
}


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
document.body.addEventListener("dblclick", mouseDblClick, false);
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
if(MobileMode)
{	
	canvasElement.get(0).addEventListener('touchstart', handleTouchStart, false);   
	canvasElement.get(0).addEventListener('touchend', handleTouchEnd, false);   
	concanvasElement.get(0).addEventListener('touchmove', handleTouchMove, false);
	concanvasElement.get(0).addEventListener('touchstart', handleConTouchStart, false); 
}
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

controller= new virtualGamePad();

var savekey=new akey("i"); //define the different keys
var loadkey=new akey("o");
var shiftkey=new akey("shift");

 var LOAD_COUNTS=new Array();
var gamestart=false;
var radar=true;

$.post("/listdir/", {"path": "C:/JS/Dungeon/dungeons/"}, function(resp)
 {
	existingDungeons=resp.split(",");
	existingDungeons.splice(0,1);
	LOAD_COUNTS=new Array();
	for( var i=0;i<existingDungeons.length;i++)
	 {
		 var crmath="dungeons/"+existingDungeons[i]+"/"+"main.txt";
				$.get(crmath, function(data) 
				{	
					var bata=data.split(",");
					LOAD_COUNTS.push(Math.floor(bata[1]));
					
				});
	 }
 } 
 )
 

 
 
 

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
		can.fillText(curDungeon.name + " "+curDungeon.numRooms+" rooms",8,22);
		can.fillText("Floor: "+curDungeon.roomZ+"/"+(curDungeon.floors-1),8,44);
		can.fillText("Room: "+curDungeon.rooms[curDungeon.roomZ][curDungeon.roomX][curDungeon.roomY].name,8,62);
		if(!curDungeon.curRoom().lampLighting)
		{
			bulbsprite.draw(can,812,110);
		}else
		{
			bulboffsprite.draw(can,812,110);
		}
		var cont=0;
		can.globalAlpha=1;
	}else
	{	
		drawHearts(miles,can);
		objectSprites[3].draw(can,-6,58);
		can.fillText("x"+miles.keys,18,85);
		moneysprite.draw(can,84,58);
		can.fillText("x"+miles.money,84+24,85);
		bombsprite.draw(can,42,58);
		can.fillText("x"+miles.bombs,42+24,85);
	}
}

function convertSaves() //no effin clue if this will work. I suspect not. 
{
	for(var i=0;i<existingDungeons.length;i++)
	{
		curDungeon.name=existingDungeos[i];
		curDungeon.load();
		curDungeon.save();
	}
}

function showMapList()
{
	bConsoleBox.log("Existing Maps:","yellow");
	for(var i=0;i<existingDungeons.length;i++)
	{
		bConsoleBox.log(existingDungeons[i]);
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
		mapUpdate();
		mapDraw();
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

function mainMenuDraw(){
	canvas.fillStyle = "black";
	canvas.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
	titlesprite.draw(canvas,0,0);
	canvas.fillStyle = "white";
	canvas.font = "16pt Calibri";
	//canvas.fillText("Press Enter",200,500);
	canvas.fillText("  New Map",80,210);
	//canvas.fillStyle = "grey";
	canvas.fillText("  Load Map",80,235);
	
	canvas.fillText("  View Map List",80,260);

	if(mmcur==0){
		canvas.fillText("-",78,210);
	}else if(mmcur==1)	{
		canvas.fillText("-",78,235);

	}else if(mmcur==2)	{
		canvas.fillText("-",78,260);
	}
	bConsoleBox.draw(concanvas);
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

var bannedchars=new Array();
bannedchars.push("/");
//bannedchars.push();
bannedchars.push("!");
bannedchars.push("@");
bannedchars.push("#");
bannedchars.push("$");
bannedchars.push("%");
bannedchars.push("^");
bannedchars.push("&");
bannedchars.push("*");
bannedchars.push("(");
bannedchars.push(")");
bannedchars.push(".");
bannedchars.push(";");
bannedchars.push("'");
bannedchars.push(",");
bannedchars.push("/");


function acceptableName(attempt,ld)
{
	//check for illegal characters, used names
	if(attempt==null) {return true;}
	if(attempt.length<3) {return false;}
	for(var i=0;i<bannedchars.length;i++)
	{
		if(attempt.indexOf(bannedchars[i])!=-1)
		{
			console.log("contains a banned character");
			return false;
		}
	}
	if(!ld) //check that the name isn't already used. 
	{
		for(var i=0;i<existingDungeons.length;i++)
		{
			if(attempt==existingDungeons[i])
			{
				return false;
			}
		}
		return true;
	}else if(ld) //check that the name is already used. 
	{
		for(var i=0;i<existingDungeons.length;i++)
		{
			if(attempt==existingDungeons[i])
			{
				return true;
			}
		}
		return false;
	}
	
}

function actuallyStartGame()
{
	mode=1;
	curDungeon.timeStarted=new Date();
	miles.x=9;
	miles.y=12;
	miles.dir=0;
	camera.tileX=0;
	camera.tileY=0;
	miles.keys=0;
	miles.AI=false;
	miles.money=0;
	miles.bombs=0;
	miles.wallet=250;
	miles.has=new Array();
	if(OPTIONS.musicOn)
	{
		document.getElementById("mainSong").play();
	}
	
	//curDungeon.loadFloor();
	curDungeon.curRoom().explored=true;
	graphboat = mapToGraph(curDungeon.rooms[curDungeon.roomZ][curDungeon.roomX][curDungeon.roomY],true);
	graph = mapToGraph(curDungeon.rooms[curDungeon.roomZ][curDungeon.roomX][curDungeon.roomY],false);
	if(OPTIONS.musicOn){
		document.getElementById("mainSong").volume=OPTIONS.musicVolume;
		document.getElementById("mainSong").play(); //starts music
	}
	starter();
	for(var i=0;i<curDungeon.floors;i++)
	{
		curDungeon.linkDoors(i);
		curDungeon.linkSwitches(i);
	}
	bConsoleBox.log("Doors and switches linked!","yellow");
}

function startGame(goolp)
{

	if(!goolp)
	{
		
		var lordCromp=prompt("Enter new dungeon name");
		if(lordCromp==null) {return;}
		while (!acceptableName(lordCromp,false))
		{
			lordCromp=prompt("Try again.");
			if(lordCromp==null) {return;}
		}
		curDungeon.name=lordCromp;
		curDungeon.floors=1;
		curDungeon.numRooms=0;
		curDungeon.saveExists=false;
		curDungeon.createRoom(curDungeon.roomZ,curDungeon.roomX,curDungeon.roomY);
		editMode=true;
		actuallyStartGame();
		//curDungeon.addFloor();
	}else
	{
		pungname=prompt("Enter name of dungeon to load","dungeon1");
		if(pungname==null) {return;}
		while (!acceptableName(pungname,true)) //doesn't exist
		{
			pungname=prompt("No dungeon called "+pungname,"dungeon1");
			if(pungname==null) {return;}
		}
		curDungeon.name=pungname;
		editMode=false;
		/*var crmath="dungeons/"+curDungeon.name+"/"+"main.txt";
		$.get(crmath, function(data) 
		{	
			var bata=data.split(",");
			LOAD_COUNT=Math.floor(bata[1]);
			console.log(LOAD_COUNT);
			
		});*/
		
		/*function checkLoadCount() 
		{ 
			if (LOAD_COUNT > 0)
			{ 
				curDungeon.load();
			}else 
			{ 	
				console.log("waiting for load count to be > 0");
				window.setTimeout(checkLoadCount, 1000); 
			}
		}
		checkLoadCount();*/
		countIndex=existingDungeons.indexOf(curDungeon.name);
		console.log(LOAD_COUNTS[countIndex]);
		curDungeon.load();
		
		console.log(LOAD_COUNTS[countIndex]);
		
		function checkIfLoaded() 
		{ 
			if (LOAD_COUNTS[countIndex] == 0)
			{ 
				actuallyStartGame();
			}else 
			{ 
				//console.log("waiting for load count to be 0");
				window.setTimeout(checkIfLoaded, 1000); 
			}
		}
		checkIfLoaded();
		
		
	}
		
	
}

function starter()
{		
	gamestart=true;	
	//bees=true;
	
	bConsoleBox.log("started");
	bConsoleBox.log("Hit E for Edit Mode");
}

function inventoryScreenUpdate(){

	var tick=0;
	lasttime=milliseconds;
    timestamp = new Date();
    milliseconds = timestamp.getTime();
    tick++;
	monsta.update();
	if(soundkey.check())
	{
		OPTIONS.SFX=!OPTIONS.SFX;
		if(OPTIONS.SFX)
		{
			bConsoleBox.log("Sound effects turned on.");
		}else
		{
			bConsoleBox.log("Sound effects turned off.");
		}
	}
	 if(mutekey.check()) {
		OPTIONS.musicOn=!OPTIONS.musicOn;
		
		if(OPTIONS.musicOn)
		{
			bConsoleBox.log("Music turned on.");
		}else
		{
			bConsoleBox.log("Music turned off.");
		}
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

function mainMenuUpdate()
{
	var tick=0;
	lasttime=milliseconds;
    timestamp = new Date();
    milliseconds = timestamp.getTime();
    tick++;
	
	monsta.update();
	 if(mutekey.check()) {
		OPTIONS.musicOn=!OPTIONS.musicOn;
		document.getElementById("titleAudio").pause();
		//monsta.startOrbit(40000,Math.floor(Math.random()*CANVAS_WIDTH),Math.floor(Math.random()*CANVAS_HEIGHT),60);
	 }

	
	
	
	gamepad = navigator.getGamepads && navigator.getGamepads()[0];
	if(false)//(controller.buttons[7].check())
	{
		if(mmcur==0)
		{
			startGame(false);
		}else if(mmcur==1)
		{
			startGame(true);
		}else if(mmcur==2)
		{
			showMapList();
		}
	}else if(startkey.check()){
		if(mmcur==0)
		{
			startGame(false);
		}else if(mmcur==1)
		{
			startGame(true);
		}else if(mmcur==2)
		{
			showMapList();
		}
	}
	if(downkey.check()){
		mmcur++;
		if(mmcur>2) {mmcur=0;}
	}
	if(upkey.check()){
		mmcur--;
		if(mmcur<0) {mmcur=2;}
	}
	bConsoleBox.update();
};

function mapUpdate()
{
	if((mapkey.check()) ||(escapekey.check()))
	{
		curDungeon.mapFloor=curDungeon.roomZ;
		mode=1;
	}
	if(upkey.check())
	{
		curDungeon.mapFloor--;
		if(curDungeon.mapFloor<0)
		{
			curDungeon.mapFloor=0;
		}
	}
	if(downkey.check())
	{
		curDungeon.mapFloor++;
		if(curDungeon.mapFloor>curDungeon.floors-1)
		{
			curDungeon.mapFloor=curDungeon.floors-1;
		}
	}
	
}
function mapDraw() {
	//SHOULDN'T
	canvas.fillStyle = "black";
	canvas.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);

	curDungeon.draw(canvas,camera);
	curDungeon.drawLargeMap(canvas)
}

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
		/*canvas.globalAlpha=LightLevels[Darkness];
		canvas.fillStyle="black";
		canvas.fillRect(0,0,CANVAS_WIDTH, CANVAS_HEIGHT);*/
		//canvas.fillRect(0,0,CANVAS_WIDTH/3, CANVAS_HEIGHT);
		//canvas.fillRect((CANVAS_WIDTH/3)*2,0,CANVAS_WIDTH/3, CANVAS_HEIGHT);
		curDungeon.curRoom().darken(canvas,miles.x,miles.y);
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
		if(MobileMode)
		{
			canvas.fillText("Edit Mode",380,25);
		}else
		{
			canvas.fillText("Edit Mode",380,125);
		}
		canvas.font = "16pt Calibri";
		if(curDungeon.curRoom().hidden)
		{
			canvas.fillText("Hidden Room",580,145);
		}
		
		
		if(editor.mode==editModes.Pen)
		{
			if(editor.penDown)
			{	
				canvas.fillText("Pen Down",18,120);
			}else
			{
				canvas.fillText("Pen Up",18,120);
			}
			
		}
		else if(editor.mode==editModes.Stamp){
			canvas.fillText("Stamp mode",18,120);
		}else if(editor.mode==editModes.SwitchLink){
			canvas.fillText("Linking mode",18,120);
		}else if(editor.mode==editModes.ChestLoot){
			canvas.fillText("Chest mode",18,120);
		}else if(editor.mode==editModes.Fill){
			canvas.fillText("Fill mode",18,120);
		}else if(editor.mode==editModes.Objects){
			canvas.fillText("Object mode",18,120);
		}else if (editor.mode==editModes.Door)
		{
			canvas.fillText("Door Mode",18,120);
		}else
		{
			canvas.fillText("Pen Mode",18,120);
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
		}else if(editor.mode==editModes.ChestLoot)
		{
			canvas.fillText("Selected: ",18,96);
			if(lootSprites[editor.lootType])
			{
				lootSprites[editor.lootType].draw(canvas,110,73);
			}else
			{
				console.log("no sprite for "+editor.lootType);
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
	if(editMode) 
	{
		if(curDungeon.curRoom().active)
		{
			editor.draw(canvas);
		}
	}else
	{
		//miles.draw(canvas,camera);
		/*var ploj=canvas.fillStyle;
		canvas.fillStyle="blue";
        canvas.fillRect(miles.x*32+xOffset,miles.y*32+yOffset,32,32);
		canvas.fillStyle=ploj*/
		linksprites[miles.dir].draw(canvas,miles.x*32+xOffset,miles.y*32+yOffset-14);
	}
	for(var i=0;i<curDungeon.curRoom().fires.length;i++)
	{
		curDungeon.curRoom().fires[i].draw(canvas,camera);
	}
	
	drawGUI(canvas);
	for (var h=0;h<buttons.length;h++)
	{
		buttons[h].draw(canvas);
	}
	
	
	if(drawingPath)
	{
		curDungeon.curRoom().drawPath(canvas,miles.x,miles.y,editor.x,editor.y);
	}
	//curDungeon.curRoom().drawPath(canvas,9,11,9,3);//curDungeon.curRoom().getOpenDoor(0).x,curDungeon.curRoom().getOpenDoor(0).y+2)
	
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
		if(OPTIONS.confirmationPopUps)
		{
			popQuestion("Existing room save will be overwritten. Confirm? (Y/N)");
		}
	}
	if((editMode) && (loadkey.check()))
	{
		bConsoleBox.log(curDungeon.curRoom().name +" will be overwritten. Confirm? (Y/N)","yellow");
		editor.confirming=true;
		editor.confirmingWhat=function() {
			curDungeon.curRoom().load("dungeons/"+curDungeon.name+"/"+"floor"+curDungeon.roomZ+"/");
			curDungeon.curRoom().z=curDungeon.roomZ;
			curDungeon.curRoom().x=curDungeon.roomX;
			curDungeon.curRoom().y=curDungeon.roomY;
			curDungeon.curRoom().loadObjects("dungeons/"+curDungeon.name+"/"+"floor"+curDungeon.roomZ+"/");
		}
		if(OPTIONS.confirmationPopUps)
		{
			popQuestion(curDungeon.curRoom().name +" will be overwritten. Confirm? (Y/N)");
		}
	}
		
	if((editMode) && (savefloorkey.check()))
	{
		bConsoleBox.log("Existing floor save will be overwritten. Confirm? (Y/N)","yellow");
		editor.confirming=true;
		editor.confirmingWhat=function() {
			curDungeon.saveFloor(curDungeon.roomZ);
		}
		if(OPTIONS.confirmationPopUps)
		{
			popQuestion("Existing floor save will be overwritten. Confirm? (Y/N)");
		}
	}
	if((editMode) && (loadfloorkey.check()))
	{
		bConsoleBox.log("Unsaved data will be lost. Confirm? (Y/N)","yellow");
		editor.confirming=true;
		editor.confirmingWhat=function() {
			curDungeon.loadFloor();
		}
		if(OPTIONS.confirmationPopUps)
		{
			popQuestion("Unsaved data will be lost. Confirm? (Y/N)");
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
		if(randomkey.check())
		{	
			//randomize objects
		}
	}else if(editMode)
	{
		if(randomkey.check())
		{	
			//randomize tiles
			bConsoleBox.log("Existing room will be overwritten. Confirm? (Y/N)","yellow");
			editor.confirming=true;
			editor.confirmingWhat=function()
			{
				curDungeon.curRoom().randomizeTiles();
			}
			if(OPTIONS.confirmationPopUps)
			{
				popQuestion("Existing room will be overwritten. Confirm? (Y/N)");
			}
		}
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
			if(OPTIONS.confirmationPopUps)
			{
				popQuestion(curDungeon.rooms[curDungeon.roomZ][curDungeon.roomX][curDungeon.roomY].name +" will be overwritten.Confirm? (Y/N)");
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
			if(editor.objectType>editor.numObjectTypes)
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
					i--;
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
	if(soundkey.check())
	{
		OPTIONS.SFX=!OPTIONS.SFX;
		if(OPTIONS.SFX)
		{
			bConsoleBox.log("Sound effects turned on.");
		}else
		{
			bConsoleBox.log("Sound effects turned off.");
		}
	}
	 if(mutekey.check()) {
		OPTIONS.musicOn=!OPTIONS.musicOn;
		
		if(OPTIONS.musicOn)
		{
			bConsoleBox.log("Music turned on.");
			document.getElementById("mainSong").volume=OPTIONS.musicVolume;
			document.getElementById("mainSong").play();
		}else
		{
			bConsoleBox.log("Music turned off.");
			document.getElementById("mainSong").pause();
		}
		document.getElementById("titleAudio").pause();
		//monsta.startOrbit(40000,Math.floor(Math.random()*CANVAS_WIDTH),Math.floor(Math.random()*CANVAS_HEIGHT),60);
	 }
		
	if(yeskey.check())
		{
			if(editor.confirming)
			{
				playSound("menuselect");
				editor.confirmed=true;
				editor.confirming=false;
				editor.confirmingWhat();
				editor.confirmingWhat=null;
				bConsoleBox.log("Yes","Yellow");
			}
		}
		if(nokey.check())
		{
			if(editor.confirming)
			{
				playSound("menucancel");
				editor.confirming=false;
				bConsoleBox.log("No","Yellow");
			}
		}
	if(mapkey.check())
	{
		//console.log("look");
		curDungeon.mapFloor=curDungeon.roomZ;
		mode=2;
		playSound("map");
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
			logControls();

		}
		if(numberkeys[0].check())
		{
			curDungeon.curRoom().hidden=!curDungeon.curRoom().hidden
		}
		
		if(deletekey.check())
		{	
			if(editor.mode==editModes.Objects)
			{
				if(shiftkey.checkDown())
				{
					bConsoleBox.log("All objects in this room will be deleted. Confirm? (Y/N)","yellow");
					editor.confirming=true;
					editor.confirmingWhat=function()
					{
						for(var i=0;i<curDungeon.curRoom().objects.length;i++)
						{
							curDungeon.curRoom().objects[i].exists=false;
						}
						curDungeon.curRoom().objects=new Array();
					}
					if(OPTIONS.confirmationPopUps)
					{
						popQuestion("All objects in this room will be deleted. Confirm? (Y/N)");
					}
				}
				if(editor.grabbed)
				{
					bConsoleBox.log(editor.grabbed.name+" will be deleted. Confirm? (Y/N)","yellow");
					editor.confirming=true;
					editor.confirmingWhat=function()
					{
						for(var i=0;i<curDungeon.curRoom().objects.length;i++)
						{
							if(curDungeon.curRoom().objects[i]==editor.grabbed)
							{
								editor.grabbed.exists=false;
								curDungeon.curRoom().objects.splice(i,1);
								i--;
								editor.grabbed=null;
							}
						}
					}
					if(OPTIONS.confirmationPopUps)
					{
						popQuestion(editor.grabbed.name +" will be deleted. Confirm? (Y/N)");
					}
				}
			}else
			{
				if(shiftkey.checkDown())
				{
					bConsoleBox.log("Entire floor will be deleted. Confirm? (Y/N)","yellow");
					editor.confirming=true;
					editor.confirmingWhat=function(){curDungeon.wipeFloor(curDungeon.roomZ);}
					if(OPTIONS.confirmationPopUps)
					{
						popQuestion("Entire floor will be deleted. Confirm? (Y/N)");
					}
				}
				else
				{
					bConsoleBox.log(curDungeon.rooms[curDungeon.roomZ][curDungeon.roomX][curDungeon.roomY].name +" will be deleted. Confirm? (Y/N)","yellow");
					editor.confirming=true;
					editor.confirmingWhat=function(){curDungeon.rooms[curDungeon.roomZ][curDungeon.roomX][curDungeon.roomY]=new room();
					curDungeon.rooms[curDungeon.roomZ][curDungeon.roomX][curDungeon.roomY].active=false;}
					if(OPTIONS.confirmationPopUps)
					{
						popQuestion(curDungeon.rooms[curDungeon.roomZ][curDungeon.roomX][curDungeon.roomY].name +" will be deleted. Confirm? (Y/N)");
					}
				}
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
					if(OPTIONS.confirmationPopUps)
					{
						popQuestion("Will create new floor. Confirm? (Y/N)");
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
								i--;
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
	
	if(escapekey.check()){
		editor.penDown=false;
		if(editor.confirming)
		{
			editor.clearConfirm();
		}else
		{
			bConsoleBox.log("Returning to main menu. Unsaved changes will be lost. Confirm? (Y/N)","yellow");
			editor.confirming=true;
			editor.confirmingWhat=function() {
				
				$.post("/listdir/", {"path": "C:/JS/Dungeon/dungeons/"}, function(resp)
				 {
					existingDungeons=resp.split(",");
					existingDungeons.splice(0,1);
					var index=existingDungeons.indexOf(curDungeon.name);
					LOAD_COUNTS[index]=curDungeon.numRooms;
					curDungeon.cleanSlate();
					/*LOAD_COUNTS=new Array();
					for( var i=0;i<existingDungeons.length;i++)
					 {
						 var crmath="dungeons/"+existingDungeons[i]+"/"+"main.txt";
								$.get(crmath, function(data) 
								{	
									var bata=data.split(",");
									LOAD_COUNTS.push(Math.floor(bata[1]));
									
								});
					 }*/
				 } 
				 )
				bullshitHack=true;
				mode=0;
				document.getElementById("mainSong").pause();
			}
			console.log(OPTIONS.confirmationPopUps)
			if(OPTIONS.confirmationPopUps)
			{
				popQuestion("Returning to main menu. Unsaved changes will be lost. Confirm?");
			}
		}
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
		editor.penDown=false;
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
	for(var a=0;a<curDungeon.getWidth();a++)
	{
		for(var b=0;b<curDungeon.getHeight();b++)
		{
			for(var i=0;i<curDungeon.rooms[curDungeon.roomZ][a][b].objects.length;i++) //should do adjacent rooms too, no?
			{
				curDungeon.rooms[curDungeon.roomZ][a][b].objects[i].update();
				if(!curDungeon.rooms[curDungeon.roomZ][a][b].objects[i].exists)
				{
					curDungeon.rooms[curDungeon.roomZ][a][b].objects.splice(i,1);
					i--;
				}
			}
		}
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
	
	 if(debugkey.check()) {
		drawingPath=!drawingPath;
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

//curDungeon.linkDoors();
//startGame(true);

//console.log(curMap.tiles[Skagos.x/16][Skagos.y/16].data);
