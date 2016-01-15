//Mouse stuff.
$(document).bind("contextmenu",function(e){
	
	/*if(bullshitHack)
	{
		bullshitHack=false;
		for(var i=0;i<curDungeon.floors;i++)
		{
			curDungeon.linkDoors(i);
			curDungeon.linkSwitches(i);
		}
		bConsoleBox.log("Doors and switches linked!","yellow");
	}*/
	if(mode==2)
	{
	 //console.log("fucl");
	}
	if((mode==1) && (!editMode)) //non-edit right click
	{
		if(miles.getEquipped()==ObjectID.Bomb)
		{
			miles.placeBomb();
		}else if (miles.getEquipped()==ObjectID.Poo)
		{
			//remove poop, make new poop object
			miles.has[hasID.Poo]=false;
			console.log("poop");
			miles.removeItem(ObjectID.Poo); 
			if(miles.dir==0)
			{
				var hio= makeObject(miles.x,miles.y-1,curDungeon.curRoom(),ObjectID.Poo);
			}else if(miles.dir==1)
			{
				var hio= makeObject(miles.x+1,miles.y,curDungeon.curRoom(),ObjectID.Poo);
			}else if(miles.dir==2)
			{
				var hio= makeObject(miles.x,miles.y+1,curDungeon.curRoom(),ObjectID.Poo);
			}else if(miles.dir==3)
			{
				var hio= makeObject(miles.x-1,miles.y,curDungeon.curRoom(),ObjectID.Poo);
			}
			hio.on=true;
		}
		return false; 
	}
	if(true)//(mode==1)
	{
		mX = e.pageX - canvasElement.get(0).offsetLeft;
		mY = e.pageY - canvasElement.get(0).offsetTop;
		//lights.push(new light(mX+camera.x,mY+camera.y,80));
		tx=Math.floor((mX-xOffset)/32);// * Math.pow(2, 1);//curMap.zoom-1);
		ty=Math.floor((mY-yOffset)/32);// * Math.pow(2, 1);//curMap.zoom-1);
		
		if((tx>1) && (tx<18) &&(ty>1)&&(ty<13) )
		{
			
			if(editMode)
			{
				if(editor.mode==editModes.Objects)
				{
					if(editor.grabbed)
					{
						editor.grabbed=null;
					}else
					{
						var meg=isOverTiledList(curDungeon.curRoom().objects,32);
						if(meg)
						{
							editor.grabbed=meg;
						}
					}
				}else if(editor.mode==editModes.ChestLoot)
				{
					var meg=isOverTiledList(curDungeon.curRoom().objects,32);
				
					if((meg)&&(meg.type==ObjectID.Chest))
					{
						meg.hidden=!meg.hidden;
						if(meg.hidden)
						{
							bConsoleBox.log("Hid chest at "+meg.x+","+meg.y);
						}else
						{
							bConsoleBox.log("Unhid chest at "+meg.x+","+meg.y);
						}
					}
				}else if(MobileMode)
				{
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
					return;
				}else
				{
					editor.mode++;
					editor.penDown=false;
					if(editor.mode>editor.numModes)
					{
						editor.mode=0;
					}
				}
			}else
			{
				//monsta.startOrbit(40000,mX+camera.x,mY+camera.y,60,8,false,12);
			}
		}else
		{
			shiftdown=!shiftdown;		
		}
		
	}
    return false;
});

function mouseWheel(e){
	var delta = 0;
	if (e.wheelDelta)
	{
			delta = e.wheelDelta/120;
	} else if (event.detail) 
	{ /** Mozilla case. */
			delta = -e.detail/3;
	}
	mX = e.pageX - canvasElement.get(0).offsetLeft;
	mY = e.pageY - canvasElement.get(0).offsetTop;
	//if (delta)
	if(true)//this is all world map stuff. 
	{ //&& (!isMenu)){
	
		var targ=bConsoleBox;
		if((mX>CANVAS_WIDTH) && (mX<(CANVAS_WIDTH+400)) )//&&(mY>targ.y) &&(mY<(targ.y+targ.height))) 
		{
			if(delta>0)
				bConsoleBox.scroll--;
			if(delta<0)
				bConsoleBox.scroll++;
				//bConsoleBox.log("wANADDA");

				if(bConsoleBox.scroll<0) {bConsoleBox.scroll=0;}
				if(bConsoleBox.scroll>bConsoleBox.msg.length) {bConsoleBox.scroll=bConsoleBox.msg.length-1;}
		}else
		{
			if(editMode)
			{
				if(delta>0)
				{
					if(editor.mode==editModes.Door)
					{
						editor.doorType++;
						if(editor.doorType>numDoorTypes)
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
					}else if(editor.mode==editModes.ChestLoot)
					{
						editor.lootType++;
						if(editor.lootType>numLoots-1)
						{
							editor.lootType=0;
						}
					}else
					{
						editor.brushType++;
						//console.log(editor.brushType);
						if(editor.brushType>editor.numBrushTypes)
						{
							editor.brushType=0;
						}else if(editor.brushType==34)
						{
							editor.brushType=43;
							//console.log("changed to "+editor.brushType);
						}else if(editor.brushType==21)//skip water animation tiles
						{
							editor.brushType=24;
							//console.log("changed to "+editor.brushType);
						}else if(editor.brushType==25)//skip lava animation tiles.
						{
							editor.brushType=33;
							//console.log("changed to "+editor.brushType);
						}else if((editor.brushType==10) && (OPTIONS.skipWallTiles))//skip wall animation tiles.
						{
							editor.brushType=18;
							//console.log("changed to "+editor.brushType);
						}
					}
				}else if(delta<0)
				{
					if(editor.mode==editModes.Door)
					{
						editor.doorType--;
						if(editor.doorType<0)
						{
							editor.doorType=numDoorTypes;
						}
					}else if(editor.mode==editModes.Objects)
					{
						editor.objectType--;
						if(editor.objectType<0)
						{
							editor.objectType=editor.numObjectTypes;
						}
					}else if(editor.mode==editModes.ChestLoot)
					{
						editor.lootType--;
						if(editor.lootType<0)
						{
							editor.lootType=numLoots-1;
						}
					}else
					{
						editor.brushType--;
						//console.log(editor.brushType);
						if(editor.brushType<0)
						{
							editor.brushType=editor.numBrushTypes;
							//console.log("changed to "+editor.brushType);
						}else if(editor.brushType==42)//skip water animation tiles
						{
							editor.brushType=33;
							//console.log("changed to "+editor.brushType);
						}else if(editor.brushType==24)//skip water animation tiles
						{
							editor.brushType=20;
							//console.log("changed to "+editor.brushType);
						}else if(editor.brushType==32)//skip lava animation tiles.
						{
							editor.brushType=25;
							//console.log("changed to "+editor.brushType);
						}else if((editor.brushType==17) && (OPTIONS.skipWallTiles))//skip wall animation tiles.
						{
							editor.brushType=9;
							console.log("changed to "+editor.brushType);
						}
					}
				}
				
			}else //non-edit mousewheel stuff
			{
				if(delta>0)
				{
					miles.cycleEquipped(true);
				}else if(delta<0)
				{
					miles.cycleEquipped(false);
				}
			}
		}
		
	}
	if (e.preventDefault)
			e.preventDefault();
	e.returnValue = false;
};

function mouseDblClick(e) {  //represents the mouse
	e.preventDefault();    
	mX = e.pageX - canvasElement.get(0).offsetLeft;
	mY = e.pageY - canvasElement.get(0).offsetTop;
	tx=Math.floor((mX-xOffset)/32);// 
	ty=Math.floor((mY-yOffset)/32);// 
	if(MobileMode)
	{	
		bConsoleBox.log("double tap","yellow");  
	}
}

var mylatesttap = new Date().getTime();

function mouseClick(e) {  //represents the mouse
	e.preventDefault();    
	mX = e.pageX - canvasElement.get(0).offsetLeft;
	mY = e.pageY - canvasElement.get(0).offsetTop;
	var tm=new Date();
	var mili=tm.getTime();
	tx=Math.floor((mX-xOffset)/32);// * Math.pow(2, 1);//curMap.zoom-1);
	ty=Math.floor((mY-yOffset)/32);// * Math.pow(2, 1);//curMap.zoom-1);'
	if(mode==0)//menu
	{
		if(isLoading)
		{
			return;
		}
		console.log(mX,mY);
		if((mX>239) && (mX<383) && (mY>294) && (mY<451))
		{
			startGame(false);
		}else if((mX>549) &&(mX<681) && (mY>294)&&(mY<451))
		{
			startGame(true);
		}else if((mX>367) &&(mX<533) && (mY>60)&&(mY<216))
		{
			showMapList();
		}else if((mX>449) &&(mX<470) && (mY>463)&&(mY<482))
		{
			if(!OPTIONS.SafeMode)
			{
				bConsoleBox.log("Why are you touching his balls?","red");
				//I should probably think of a good reason. 
			}
			return;
		}
		if((mX>99) && (mX<175) && (mY>195))
		{
			if(mY<216) //new 
			{
				mmcur=0;
				startGame(false);
				
			}else if((mY>220) && (mY<240) && (mY>195)) 
			{
				mmcur=1;
				startGame(true);
			}else if((mY>240) && (mY<260))
			{
				mmcur=2;
				showMapList()
			}
		}
		return;
	}else if(mode==3)
	{
		var bup=Math.floor((mY-75)/25);
	
		if(bup==0)
		{
			OPTIONS.musicOn=!OPTIONS.musicOn;
			if(OPTIONS.musicOn)
			{
				document.getElementById("mainSong").volume=OPTIONS.musicVolume;
				document.getElementById("mainSong").play();
			}else
			{
				document.getElementById("mainSong").pause();
			}
		}else if(bup==1)
		{
			OPTIONS.SFX=!OPTIONS.SFX;
		
		}else if(bup==2)
		{
			OPTIONS.LightingOn=!OPTIONS.LightingOn;
		
		}else if(bup==3)
		{
			OPTIONS.UpdateAllRooms=!OPTIONS.UpdateAllRooms;
		
		}else if(bup==4)
		{
			OPTIONS.showUnexploredRooms=!OPTIONS.showUnexploredRooms;
			
		}else if(bup==5)
		{
			OPTIONS.showCracks=!OPTIONS.showCracks;
		
		}else if(bup==6)
		{
			OPTIONS.showUnexploredDoors=!OPTIONS.showUnexploredDoors;
		
		}else if(bup==7)
		{
			OPTIONS.SafeMode=!OPTIONS.SafeMode;
		
		}else if(bup==8)
		{
			OPTIONS.confirmationPopUps=!OPTIONS.confirmationPopUps;
		
		}else if(bup==9)
		{
			OPTIONS.UnsafeWalking=!OPTIONS.UnsafeWalking;
		
		}
		return;


	}else if(mode==2)
	{
		if(editMode)
		{
			var bobxFset=218;
			var bobyFset=20;
			var bobsize=28;
			var miniMapX=0;
			var miniMapY=0;
			//console.log(mX,mY);
			if((mX>217) && (mY>19)&& (mX<640)&& (mY<245))//and less than width and height. 
			{ 
				miniMapx=Math.round((mX+bobxFset)/bobsize)-16;
				miniMapy=Math.round((mY+bobyFset)/bobsize)-2;
				//console.log(miniMapx,miniMapy);
				if((miniMapx>-1) && (miniMapy>-1) && (miniMapx<15) &&( miniMapy<8))
				{
					curDungeon.setRoom(curDungeon.mapFloor,miniMapx,miniMapy);
				}else
				{
					//console.log("Learn to click!");
				} 
			}else if((curDungeon.mapFloor+1<curDungeon.floors)&& (mX>217) && (mY>265)&& (mX<640)&& (mY<490))//and less than width and height. 
			{ 
				miniMapx=Math.round((mX+bobxFset)/bobsize)-16;
				miniMapy=Math.round((mY+bobyFset)/bobsize)-11;
				if((miniMapx>-1) && (miniMapy>-1) && (miniMapx<15) &&( miniMapy<8))
				{
					curDungeon.setRoom(curDungeon.mapFloor+1,miniMapx,miniMapy);
				}else
				{
					//console.log("Learn to click!");
				} 
			}else if((curDungeon.mapFloor+2<curDungeon.floors)&& (mX>217) && (mY>509)&& (mX<640)&& (mY<735))//and less than width and height. 
			{ 
				miniMapx=Math.round((mX+bobxFset)/bobsize)-16;
				miniMapy=Math.round((mY+bobyFset)/bobsize)-19;
				console.log(mX,mY);
				console.log(miniMapx,miniMapy);
				if((miniMapx>-1) && (miniMapy>-1) && (miniMapx<15) &&( miniMapy<8))
				{
					curDungeon.setRoom(curDungeon.mapFloor+2,miniMapx,miniMapy);
				}else
				{
					//console.log("Learn to click!");
				} 
			}
		}
		return;
	}
	
	
		
	
	if(e.which==2)
	{
		//editMode=!editMode;
		//editor.penDown=false;
		//editor.clearConfirm();
	}
	for(var i=0;i<buttons.length;i++)
	{
		if(buttons[i].hasFocus)
		{
			if((!buttons[i].unClickable))
			{
				buttons[i].hasFocus=false;
				buttons[i].exists=false;
				return;
			}else
			{
				//bConsoleBox.log("Choose!","yellow");
			}
			//hacky
			/*if(isOver(buttons[i]))
			{
			
			}else
			{
				if(buttons[i].optionOne)
				{
					buttons[i].optionOne();
				}
			}*/
		}
	}
	for(var i=0;i<buttons.length;i++)
	{
		if((isOver(buttons[i]))  && (buttons[i].visible))
		{
			if((!buttons[i].greyed) && (!buttons[i].decorative)){
				//clearFocus();
				
				
				//buttons[i].on=!buttons[i].on;
				for(var k=0;k<buttons[i].linked.length;k++)
				{
					buttons[i].linked[k].on=false;
				}
				buttons[i].doThings();
				//console.log(buttons[i].object.name);
			}

			return;
		}
	}
//	console.log(curDungeon.curRoom().objects.length);
	//console.log(curDungeon.curRoom().objects);
	if((editMode))
	{
		if((tx>1) && (tx<18) && (ty>1) &&(ty<13))
		{
			//editor.penDown=false;
			editor.x=tx;
			editor.y=ty;
			if((MobileMode) && (!curDungeon.curRoom().active))
			{
				curDungeon.createRoom(curDungeon.roomZ,curDungeon.roomX,curDungeon.roomY);
				return;
			}
			if(editor.mode==editModes.SwitchLink)
			{
				var glork=null;
				for(var k=0;k<curDungeon.curRoom().objects.length;k++)
				{
					if((editor.x==curDungeon.curRoom().objects[k].x) && (editor.y==curDungeon.curRoom().objects[k].y))
					{
						glork=curDungeon.curRoom().objects[k];
						if(glork.type==ObjectID.Chest)
						{
							glork.hidden=true;
						}
					}
				}
				//if over door
				var dork=null;
				var pork=curDungeon.curRoom().getSpecificDoor(editor.x,editor.y-1,0)
				if(pork)
				{
					dork=pork;
				}
				pork=curDungeon.curRoom().getSpecificDoor(editor.x+1,editor.y,1)
				if(pork)
				{
					dork=pork;
				}
				pork=curDungeon.curRoom().getSpecificDoor(editor.x,editor.y+1,2)
				if(pork)
				{
					dork=pork;
				}
				pork=curDungeon.curRoom().getSpecificDoor(editor.x-1,editor.y,3)
				if(pork)
				{
					dork=pork;
				}
				//curDungeon.curRoom().exits[0];
				if(dork)
				{
					editor.linkingTo=dork;
					editor.mode=editModes.Objects;
					editor.linkingFrom.dest.push(editor.linkingTo);
					bConsoleBox.log("Linked switch to door");
				}else if((glork) && (glork.type!=ObjectID.ToggleSwitch))//is over an object
				{
					editor.linkingTo=glork;
					editor.mode=editModes.Objects;
					editor.linkingFrom.dest.push(editor.linkingTo);
					bConsoleBox.log("Linked switch to "+glork.name);
				}else
				{
					for(var i=0;i<curDungeon.curRoom().stairs.length;i++)
					{
						if((curDungeon.curRoom().stairs[i].x==editor.x) && (curDungeon.curRoom().stairs[i].y==editor.y))
						{
							editor.linkingTo=curDungeon.curRoom().stairs[i];
							editor.mode=editModes.Objects;
							editor.linkingFrom.dest.push(editor.linkingTo);
							bConsoleBox.log("Linked switch to stairs at "+curDungeon.curRoom().stairs[i].x+","+curDungeon.curRoom().stairs[i].y);
							curDungeon.curRoom().stairs[i].hidden=true;
						}
					}
				}
			}else if(editor.mode==editModes.ChestLoot)
			{
				var meg=isOverTiledList(curDungeon.curRoom().objects,32);
			
				if((meg)&&(meg.type==ObjectID.Chest))
				{
					meg.loot=editor.lootType;
					bConsoleBox.log("Filled chest at "+meg.x+","+meg.y+" with "+lootName[editor.lootType]);
				}
			}else if(editor.mode==editModes.Stamp)
			{
				curDungeon.curRoom().tiles[editor.x][editor.y].data=editor.brushType; 
				editor.penDown=false;
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
					editor.penDown=false;
					curDungeon.curRoom().setStairs();
				}else
				{
					bConsoleBox.log("Can't fill with stairs");
				}
			}else if(editor.mode==editModes.Objects)
			{
			
				var meg=isOverTiledList(curDungeon.curRoom().objects,32);
				if(meg)
				{
					meg.activateEdit();
					return;
				}else
				{
					var text=randomPhrases[Math.floor(Math.random()*randomPhrases.length)]
					if(editor.objectType==7)//curtains
					{
						if(editor.x==2) //left
						{
							makeObject(1,editor.y,curDungeon.curRoom(),editor.objectType);
							return;
						}else if(editor.x==17) //right
						{
							makeObject(18,editor.y,curDungeon.curRoom(),editor.objectType);
							return;
						}else if(editor.y==2) //top
						{
							makeObject(editor.x,1,curDungeon.curRoom(),editor.objectType);
							return;
						}else if(editor.y==12) //bottom
						{
							makeObject(editor.x,13,curDungeon.curRoom(),editor.objectType);
							return;
						}else
						{
							bConsoleBox.log("Not the best spot for curtains");
							return;
						}
					}else if(editor.objectType==ObjectID.Warp)
					{
						var mikey =makeObject(tx,ty,curDungeon.curRoom(),editor.objectType,text);
						if(editor.warpOpen)
						{
							editor.warpOpen.dest=mikey;
							editor.warpOpen.curSprite=1;
							editor.warpOpen.active=true;
							mikey.dest=editor.warpOpen;
							mikey.active=true;
							mikey.curSprite=1;
							editor.warpOpen=null;
						}else
						{
							editor.warpOpen=mikey;
						}
					}else
					{
						//console.log("making object");
						makeObject(tx,ty,curDungeon.curRoom(),editor.objectType,text);
					}
				}
			}else if(editor.mode==editModes.Pen)
			{
				editor.penDown=!editor.penDown;
			}if(editor.mode==editModes.Door)
			{
				editor.penDown=false;
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
		}	
		
		var bobxFset=620;
		var bobyFset=609;
		var bobsize=18;
		var miniMapX=0;
		var miniMapY=0;
		if((mX>bobxFset) && (mY>bobyFset))
		{ //they're clicking the fucking minimap. Those cunts. 
			
			miniMapx=Math.floor((mX+bobxFset)/bobsize)-69;
			miniMapy=Math.floor((mY+bobyFset)/bobsize)-68;
			if((miniMapx>-1) && (miniMapy>-1) && (miniMapx<15) &&( miniMapy<8))
			{
				curDungeon.setRoom(curDungeon.roomZ,miniMapx,miniMapy);
			}else
			{
				if(!OPTIONS.SafeMode)
				{
					bConsoleBox.log("Learn to fucking click, cuntface.","Yellow");
				}
			} 
		}
		if((mX>25) && (mX<151) && (mY>68) &&(mY<113))
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
				if(editor.brushType>editor.numBrushTypes)
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
		if((mX>812) && (mY>110) && (mX<812+32) &&(mY<110+32)) //clicked the bulb
		{
			curDungeon.curRoom().lampLighting=!curDungeon.curRoom().lampLighting
			if(curDungeon.curRoom().lampLighting)
			{
				bConsoleBox.log("Light turned off. Room requires lamp light.")
			}else
			{
				bConsoleBox.log("Light turned on.")
			}
		}
		
	}else // non-edit mode mouse stuff.
	{
		if ($("#dialogBox").length > 0) 
		{
			$("#dialogBox").remove();
			return;
		} else 
		{
		
		} 
		for(var i=0;i<entities.length;i++)//don't include miles
		{
			if((entities[i].room.z==curDungeon.roomZ)&&(entities[i].room.x==curDungeon.roomX)&&(entities[i].room.y==curDungeon.roomY)&&(isOverTiled(entities[i],32)))
			{//and next to player!
				if(entities[i].isPlayer) {continue;}
				entities[i].say();
				return;
			}
		}
		if(miles.holding)
		{
			miles.holding=false;
		}
		if(miles.going)
		{
			miles.going=false;
			miles.path=null;
			miles.onArrival=function(){};
			miles.destObj=null;
			bConsoleBox.log("stopped.");
			return;
				
		}
		var meg=isOverTiledList(curDungeon.curRoom().objects,32,true);
		if(meg)
		{	
			var nard=new Array();
			if(meg.y<curDungeon.curRoom().height-3)
			{
				nard.push(curDungeon.curRoom().getPath(miles.x,miles.y,meg.x,meg.y+1,false,true));
			}
			if(meg.x<curDungeon.curRoom().width-3)
			{
				nard.push(curDungeon.curRoom().getPath(miles.x,miles.y,meg.x+1,meg.y,false,true));
			}
			if(meg.x>3)
			{
				nard.push(curDungeon.curRoom().getPath(miles.x,miles.y,meg.x-1,meg.y,false,true));
			}
			if(meg.y>3)
			{
				nard.push(curDungeon.curRoom().getPath(miles.x,miles.y,meg.x,meg.y-1,false,true));
			}
			if((meg.type!=ObjectID.Chest)&&(meg.type!=ObjectID.Sign))
			{
				nard.sort(function (a, b) {
				  if (a.length<b.length) {
					return -1;
				  }
				  if (a.length>b.length) {
					return 1;
				  }
				  // a must be equal to b
				  return 0;
				});
			}
			
			for(var i=0;i<nard.length;i++)
			{
				var abort=false;
				if((miles.x==meg.x) &&  (miles.y==meg.y))
				{
					nard[i].push(0);
					abort=true;
				}
				if(nard[i].length>0)
				{
					miles.go(nard[i][nard[i].length-1].x,nard[i][nard[i].length-1].y,meg);
					/*if(!abort)
					{
						miles.x=nard[i][nard[i].length-1].x;
						miles.y=nard[i][nard[i].length-1].y;
					}
					if(meg.playerUsable)
					{
						meg.playerActivate();
					}
					if(miles.x>meg.x)
					{
						miles.dir=3;
					}else if(miles.x<meg.x)
					{
						miles.dir=1;
					}
					if(miles.y>meg.y)
					{
						miles.dir=0;
					}else if(miles.y<meg.y)
					{
						miles.dir=2;
					}*/
					return;
				}
			}
				bConsoleBox.log("cannot reach that object!");
				playSound("error");
		}
		//if clicking stairs, try to use them
		if((tx>1) && (tx<18) && (ty>1) &&(ty<13)) //check for path!
		{
			var nard=curDungeon.curRoom().getPath(miles.x,miles.y,tx,ty,false,true);
			if(curDungeon.curRoom().tiles[tx][ty].data==DungeonTileType.Hole)
			{
				nard=curDungeon.curRoom().getPath(miles.x,miles.y,tx,ty,false,false);
			}
			if(!nard) {nard=new Array();}
			if((miles.x==tx) &&  (miles.y==ty))
			{
				nard.push(0);
			}
			if(nard.length>0)
			{
				if(curDungeon.curRoom().tiles[tx][ty].data==DungeonTileType.UpStair)
				{
					miles.onArrival=function()
					{
						curDungeon.changeFloor(true,!editMode);
					}/*
					if(miles.x>tx)
					{
						miles.dir=3;
					}else if(miles.x<tx)
					{
						miles.dir=1;
					}
					if(miles.y>ty)
					{
						miles.dir=0;
					}else if(miles.y<ty)
					{
						miles.dir=2;
					}
					miles.x=tx;
					miles.y=ty;*/
					miles.go(tx,ty);
				}else if(curDungeon.curRoom().tiles[tx][ty].data==DungeonTileType.DownStair)
				{
					miles.onArrival=function()
					{
						curDungeon.changeFloor(false,!editMode);
					}
					/*
					if(miles.x>tx)
					{
						miles.dir=3;
					}else if(miles.x<tx)
					{
						miles.dir=1;
					}
					if(miles.y>ty)
					{
						miles.dir=0;
					}else if(miles.y<ty)
					{
						miles.dir=2;
					}
					miles.x=tx;
					miles.y=ty;*/
					miles.go(tx,ty);
					return;
				}else if(curDungeon.curRoom().tiles[tx][ty].data==DungeonTileType.Hole)
				{
					miles.onArrival=function(){};
					if((miles.x!=tx) ||  (miles.y!=ty))
					{
						miles.goHole(tx,ty);
					}
					return;
				}else if(curDungeon.curRoom().walkable(tx,ty))
				{
					miles.onArrival=function(){};
					if((miles.x!=tx) ||  (miles.y!=ty))
					{
						miles.go(tx,ty);
					}
					return;
					/*if(miles.x>tx)
					{
						miles.dir=3;
					}else if(miles.x<tx)
					{
						miles.dir=1;
					}
					if(miles.y>ty)
					{
						miles.dir=0;
					}else if(miles.y<ty)
					{
						miles.dir=2;
					}
					miles.x=tx;
					miles.y=ty;*/
				}
			}else
			{
				bConsoleBox.log("cannot get there from here.");	
				playSound("error");
			}

		}
		var peg=isOverTiledList(curDungeon.curRoom().exits,32);
		if(peg)
		{	
			var nard;
			if(peg.orientation==0) 
			{
				nard=curDungeon.curRoom().getPath(miles.x,miles.y,peg.x,peg.y+1,false,true);
				if((miles.x==peg.x) &&  (miles.y==peg.y+1))
				{
					nard.push(0);
				}
			}else if(peg.orientation==1) 
			{
				nard=curDungeon.curRoom().getPath(miles.x,miles.y,peg.x-1,peg.y,false,true);
				if((miles.x==peg.x-1) &&  (miles.y==peg.y))
				{
					nard.push(0);
				}
			}else if(peg.orientation==2) 
			{
				nard=curDungeon.curRoom().getPath(miles.x,miles.y,peg.x,peg.y-1,false,true);
				if((miles.x==peg.x) &&  (miles.y==peg.y-1))
				{
					nard.push(0);
				}
			}else if(peg.orientation==3) 
			{
				nard=curDungeon.curRoom().getPath(miles.x,miles.y,peg.x+1,peg.y,false,true);
				if((miles.x==peg.x+1) &&  (miles.y==peg.y))
				{
					nard.push(0);
				}
			}

			
			if(nard.length>0)
			{
				
				
				if((tx>0) && (tx<20)&&(ty>0) && (ty<14))
				{
				if(peg.orientation==0) 
				{
					miles.onArrival=function()
					{
						curDungeon.changeRoom(0,true);
					}
					miles.go(tx,ty+1);
				}else if(peg.orientation==1) 
				{
					miles.onArrival=function()
					{
						curDungeon.changeRoom(1,true);
					}
					miles.go(tx-1,ty);
				}else if(peg.orientation==2) 
				{
					miles.onArrival=function()
					{
						curDungeon.changeRoom(2,true);
					}
					miles.go(tx,ty-1);
				}else if(peg.orientation==3) 
				{
					miles.onArrival=function()
					{
						curDungeon.changeRoom(3,true);
					}
					miles.go(tx+1,ty);
				}
				/*if((peg.orientation==0) || (peg.orientation==2))
				{
					if((tx>1) && (tx<18))
					{
						miles.x=tx;
					}
				}else
				{
					if((ty>1) && (ty<12))
					{
						miles.y=ty;
					}
				}
				curDungeon.changeRoom(peg.orientation,true);*/
				}
			}else
			{
				bConsoleBox.log("cannot reach that door!");	
				playSound("error");
			}
		}
		
	}
	
		//clearFocus();
	
		/*switch (e.which)
		{
			case 1:
				//alert('Left mouse button pressed');
				//console.log(mX+camera.x,mY+camera.y);
				lights.push(new light(mX+camera.x,mY+camera.y,12));
			    break;
			case 2:
				lights.push(new light(mX+camera.x,mY+camera.y,80));
				break;
			case 3:
				//alert('Right mouse button pressed');
				lights.push(new light(mX+camera.x,mY+camera.y,80));
				break;
			default:
				//alert('You have a strange mouse');
		}*/
};

mouseXY= function(e) {
    if (!e) var e = event;
    mX = e.pageX - canvasElement.get(0).offsetLeft;
    mY = e.pageY - canvasElement.get(0).offsetTop;
	tx=Math.floor((mX-xOffset)/32);// * Math.pow(2, 1);//curMap.zoom-1);
	ty=Math.floor((mY-yOffset)/32);// * Math.pow(2, 1);//curMap.zoom-1);
	if((tx>1) &&(tx<18) &&(ty>1)&&(ty<13))
	{
		editor.x=tx;
		editor.y=ty;
	}
    if(editor.mode==editModes.Pen)
	{
		if((editor.penDown) &&(tx>1) &&(tx<18) &&(ty>1)&&(ty<13))
		{
			if((editor.brushType!=DungeonTileType.UpStair) && (editor.brushType!=DungeonTileType.DownStair))
			{
				//set tile to brushtype.
				curDungeon.curRoom().tiles[tx][ty].data=editor.brushType;
			}else{
				bConsoleBox.log("Can't paint with stairs");
				editor.penDown=false;
			}
		}
	}else if((editor.grabbed) &&(tx>1) &&(tx<18) &&(ty>1)&&(ty<13))
	{
		editor.grabbed.move(tx,ty);
	}
};

function drawMouseText(can,targ,cam) { //draws unit status info
	//if(!targ.alive) {return;}
	return;//
	can.save();
    can.font = "12pt Calibri";
    can.textAlign = "center";
    can.textBaseline = "middle";
    if(targ.dude)
	{

	}else if(targ.boat)
	{
	
	}else if(targ.caravan)
	{
	
	}else if(targ.civilization)
	{
	
	}
	
	canvas.fillStyle="black";

    tempstr = targ.name;
    can.fillText(tempstr, (targ.x-cam.x), (targ.y-cam.y)+targ.height+8);
    
    can.restore();
}

isOver= function(targ){ //is the mouse over the player/object 
    if((mX>targ.x) && (mX<(targ.x+targ.width)) && (mY>(targ.y)) && (mY<(targ.y+targ.height))) {return true;}
    return false;
};



isOverTiled= function(targ,tileSize){ //is the mouse over the player/object 
 	if((mX-xOffset>targ.x*tileSize) && (mX-xOffset<targ.x*tileSize+targ.width) &&(mY-yOffset>targ.y*tileSize) &&(mY-yOffset<targ.y*tileSize+targ.height)) {return true;}
    return false;
};

isOverTiledList= function(targs,tileSize,selective){ //is the mouse over the player/object 
	tx=Math.floor((mX-xOffset)/32);// * Math.pow(2, 1);//curMap.zoom-1);
	ty=Math.floor((mY-yOffset)/32);// * Math.pow(2, 1);//curMap.zoom-1);
	if(!selective)
	{
		for(var i=0;i<targs.length;i++)
		{
			if((mX-xOffset>targs[i].x*tileSize) && (mX-xOffset<targs[i].x*tileSize+targs[i].width) &&(mY-yOffset>targs[i].y*tileSize) &&(mY-yOffset<targs[i].y*tileSize+targs[i].height))
			{
				return targs[i];
			}
			/*if((tx==targs[i].x) && (ty==targs[i].y))
			{
				return targs[i];
			}*/
		}
	}else
	{
		for(var i=targs.length-1;i>-1;i--)
		{
			if((mX-xOffset>targs[i].x*tileSize) && (mX-xOffset<targs[i].x*tileSize+targs[i].width) &&(mY-yOffset>targs[i].y*tileSize) &&(mY-yOffset<targs[i].y*tileSize+targs[i].height)&&(targs[i].playerUsable))
			{
				return targs[i];
			}
		
		}
	}
    return null;
};