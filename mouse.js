//Mouse stuff.
$(document).bind("contextmenu",function(e){
	
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
				monsta.startOrbit(40000,mX+camera.x,mY+camera.y,60,8,false,12);
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
					}else
					{
						editor.brushType--;
						if(editor.brushType<0)
						{
							editor.brushType=33;
						}else if(editor.brushType==24)//skip water animation tiles
						{
							editor.brushType=20;
						}else if(editor.brushType==32)//skip lava animation tiles.
						{
							editor.brushType=25;
						}else if((editor.brushType==17) && (OPTIONS.skipWallTiles))//skip lava animation tiles.
						{
							editor.brushType=9;
						}
					}
				}
				
			}
		}
		
	}
	if (e.preventDefault)
			e.preventDefault();
	e.returnValue = false;
};

function mouseClick(e) {  //represents the mouse
	e.preventDefault();    
	mX = e.pageX - canvasElement.get(0).offsetLeft;
	mY = e.pageY - canvasElement.get(0).offsetTop;
	var tm=new Date();
	var mili=tm.getTime();
	tx=Math.floor((mX-xOffset)/32);// * Math.pow(2, 1);//curMap.zoom-1);
	ty=Math.floor((mY-yOffset)/32);// * Math.pow(2, 1);//curMap.zoom-1);
	if(e.which==2)
	{
		editMode=!editMode;
	}
	
	if((editMode))
	{
		if((tx>1) && (tx<18) && (ty>1) &&(ty<13))
		{
			//editor.penDown=false;
			editor.x=tx;
			editor.y=ty;
			if(editor.mode==editModes.SwitchLink)
			{
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
				pork=curDungeon.curRoom().getSpecificDoor(editor.x-1,editor.y,2)
				if(pork)
				{
					dork=pork;
				}
				//curDungeon.curRoom().exits[0];
				if(dork)
				{
					editor.linkingTo=dork;
					//editor.mode=0;
					editor.linkingFrom.dest.push(editor.linkingTo);
					bConsoleBox.log("Linked switch to door");
				}else
				{
					for(var i=0;i<curDungeon.curRoom().stairs.length;i++)
					{
						if((curDungeon.curRoom().stairs[i].x==editor.x) && (curDungeon.curRoom().stairs[i].y==editor.y))
						{
							editor.linkingTo=curDungeon.curRoom().stairs[i];
							//editor.mode=0;
							editor.linkingFrom.dest.push(editor.linkingTo);
							bConsoleBox.log("Linked switch to stairs at "+curDungeon.curRoom().stairs[i].x+","+curDungeon.curRoom().stairs[i].y);
							curDungeon.curRoom().stairs[i].hidden=true;
						}
					}
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
				}else
				{
					var text=randomPhrases[Math.floor(Math.random()*randomPhrases.length)]
					makeObject(tx,ty,curDungeon.curRoom(),editor.objectType,text);
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
				bConsoleBox.log("Learn to fucking click, cuntface.","Yellow");
			} 
		}
	}else // non-edit mode mouse stuff.
	{
		for(var i=0;i<buttons.length;i++)
		{
			if(buttons[i].hasFocus)
			{
				buttons[i].hasFocus=false;
				buttons[i].exists=false;
			}
		}
		
		var meg=isOverTiledList(curDungeon.curRoom().objects,32);
		if(meg)
		{
			meg.activate();
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



isOverTiled= function(targ,cam,tileSize){ //is the mouse over the player/object 
    if((mX>(targ.tileX-cam.tileX)*tileSize) && (mX<((targ.tileX-cam.tileX)*tileSize+targ.width)) &&(mY>((targ.tileY-cam.tileY)*tileSize)) &&(mY<((targ.tileY-cam.tileY)*tileSize+targ.height))) {return true;}
    return false;
};

isOverTiledList= function(targs,tileSize){ //is the mouse over the player/object 
	tx=Math.floor((mX-xOffset)/32);// * Math.pow(2, 1);//curMap.zoom-1);
	ty=Math.floor((mY-yOffset)/32);// * Math.pow(2, 1);//curMap.zoom-1);
	for(var i=0;i<targs.length;i++)
	{
		/*if((mX>targs[i].tileX*tileSize) && (mX<targs[i].tileX*tileSize+targs[i].width) &&(mY>targs[i].tileY*tileSize) &&(mY<targs[i].tileY*tileSize+targs[i].height))*/
		if((tx==targs[i].x) && (ty==targs[i].y))
		{
			return targs[i];
		}
	}
    return null;
};