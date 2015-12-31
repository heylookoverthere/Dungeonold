//Mouse stuff.
$(document).bind("contextmenu",function(e){
	
	if(true)//(mode==1)
	{
		mX = e.pageX - canvasElement.get(0).offsetLeft;
		mY = e.pageY - canvasElement.get(0).offsetTop;
		//lights.push(new light(mX+camera.x,mY+camera.y,80));
		
		for (var p=0;p<1;p++) //why isn't this mapdirtying.
		{
					monsta.startOrbit(40000,mX+camera.x,mY+camera.y,60,8,false,12);
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
	if((mode==null))//this is all world map stuff. 
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
			if(curMap.zoom>2) {curMap.zoom=2;}
			if(curMap.zoom<1) {curMap.zoom=1;}
			if((delta<0) && (curMap.zoom<2))
			{
				bConsoleBox.log("Best not to try and zoom yet.");
				curMap.setZoom(camera);
				camera.check();
			}else if((delta>0) && (curMap.zoom>1)){
				bConsoleBox.log("Best not to try and zoom yet.");
				curMap.minusZoom(camera);
				var blob=[];
				blob.x=Math.floor(mX/16) * Math.pow(2, curMap.zoom-1)+camera.tileX;
				blob.y=Math.floor(mY/16) * Math.pow(2, curMap.zoom-1)+camera.tileY;
				//camera.center(blob);
				camera.check();
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
	
	if(editMode)
	{
		if((tx>-1) && (tx<20) && (ty>-1) &&(ty<15))
		{
			editor.x=tx;
			editor.y=ty;
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
			console.log("some shit I dunno fuck you who put you in charge."+miniMapx+","+miniMapy);
			curDungeon.setRoom(curDungeon.roomZ,miniMapx,miniMapy);
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

isOverTiled= function(targ,cam){ //is the mouse over the player/object 
    if((mX>(targ.tileX-cam.tileX)*16/curMap.zoom) && (mX<((targ.tileX-cam.tileX)*16+targ.width*curMap.zoom)/curMap.zoom) &&(mY>((targ.tileY-cam.tileY)*16)/curMap.zoom) &&(mY<((targ.tileY-cam.tileY)*16+targ.height)/curMap.zoom)) {return true;}
    return false;
};