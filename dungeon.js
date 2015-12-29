//TODO
//maybe draw up or down arrows in middle of rooms with stairs to represent them? what about multiples?

//way to delete doors and place/delete stars!

function dungeon(path)
{
	
	this.rooms=new Array();
	this.roomX=7;
	this.roomY=7;
	this.roomZ=0;
	this.name=path;
	this.entranceFloor=0;
	this.width=new Array();
	this.height=new Array();
	this.depth=0; //254;
	
	this.floors=4;
	for(var i=0;i<this.floors;i++)
	{
		this.width.push(15);
		this.height.push(8);
	}


	for(var p=this.depth;p<this.floors;p++)
	{
		this.rooms.push(new Array());
		for(var i=0;i<this.width[p];i++)
		{
			this.rooms[p].push(new Array());
			for(j=0;j<this.height[p];j++)
			{
				var edgar=new room();
				var parth=path+"/floor"+String(p)+"/roomX"+String(i)+"Y"+String(j);
				edgar.buildRoom(parth);
				edgar.name="roomX"+String(i)+"Y"+String(j);
				this.rooms[p][i].push(edgar);
			}
		 }
	}
	 this.rooms[this.roomZ][this.roomX][this.roomY].explored=true;

	this.curRoom=function(player)
	{
		return this.rooms[this.roomZ][this.roomX][this.roomY];
	}
	
	this.changeRoom=function(dir,limited) //used for arrowing through rooms rather than player movement limited determines if you can go through walls/closed doors/ into inactive rooms
	{
		//either way, check map boundries to prevent errors. then if limited, check that a player could actually go that way. 
		if(dir==0) //going north
		{
			if(this.roomY<1)
			{	
				bConsoleBox.log("That would take you off the map");
				return;
			}
			
			if((!this.rooms[this.roomZ][this.roomX][this.roomY-1].active) && (limited))
			{
				bConsoleBox.log("No valid room in that direction.");
				return; 
			}
			
			if((this.curRoom().hasDoor(0)) || (!limited))
			{
				this.roomY--;
				this.curRoom().explored=true;
			}else
			{
				bConsoleBox.log("No door!");
			}
		}else if(dir==2) //going south
		{
			if(this.roomY>this.getHeight()-2)
			{	
				bConsoleBox.log("That would take you off the map");
				return;
			}
			
			if((!this.rooms[this.roomZ][this.roomX][this.roomY+1].active) && (limited))
			{
				bConsoleBox.log("No valid room in that direction.");
				return; 
			}
			
			if((this.curRoom().hasDoor(2)) || (!limited))
			{
				this.roomY++;
				this.curRoom().explored=true;
			}else
			{
				bConsoleBox.log("No door!");
			}
		}else if(dir==1) //going east
		{
			if(this.roomX>this.getWidth()-2)
			{	
				bConsoleBox.log("That would take you off the map");
				return;
			}
			
			if((!this.rooms[this.roomZ][this.roomX+1][this.roomY].active) && (limited))
			{
				bConsoleBox.log("No valid room in that direction.");
				return; 
			}
			
			if((this.curRoom().hasDoor(1)) || (!limited))
			{
				this.roomX++;
				this.curRoom().explored=true;
			}else
			{
				bConsoleBox.log("No door!");
			}
		}else if(dir==3) //going west
		{
			if(this.roomX<1) 
			{	
				bConsoleBox.log("That would take you off the map");
				return;
			}
			
			if((!this.rooms[this.roomZ][this.roomX-1][this.roomY].active) && (limited))
			{
				bConsoleBox.log("No valid room in that direction.");
				return; 
			}
			
			if((this.curRoom().hasDoor(3)) || (!limited))
			{
				this.roomX--;
				this.curRoom().explored=true;
			}else
			{
				bConsoleBox.log("No door!");
			}
		}
	}
	
	this.useDoor=function(which) //link to other doors
	{
		
	}
	this.getWidth=function()
	{
		//return(this.width[this.roomZ]);
		return 15;
	}
	 this.getHeight=function()
	{
		//return(this.height[this.roomZ]);
		return 8;
	}
	this.stringifyFloor=function()
	{
		var tempstring= "";
		for (i=0;i<this.getWidth(this.roomZ); i++)
		{
			for (j=0;j<this.getHeight(this.roomZ); j++)
			{
				if(this.rooms[this.roomZ][i][j].active)
				{
					tempstring = tempstring +"1"
					tempstring += ","
				}else
				{
					tempstring = tempstring +"0"
					tempstring += ","
				}
			}
		}
		return tempstring;
	}
	
	this.saveFloor=function()
	{
		smath="Dungeon/dungeons/"+this.name+"/"+"floor"+this.roomZ+"/"+"map.txt";
			$.post("/save/", {"data": this.stringifyFloor(), "path": smath}).done(function(response) { bConsoleBox.log("Saved " +smath); });
	}
	
	dungeon.prototype.blank=function()
	{
		this.rooms=new Array();
		for(var p=this.depth;p<this.floors;p++)
		{
			this.rooms.push(new Array());
			for(var i=0;i<this.width[p];i++)
			{
				this.rooms[p].push(new Array());
				for(j=0;j<this.height[p];j++)
				{
					var edgar=new room();
					//var parth=path+"/floor"+String(p)+"/roomX"+String(i)+"Y"+String(j);
					//edgar.buildRoom(parth);
					//edgar.name="roomX"+String(i)+"Y"+String(j);
					edgar.fillAll(1);
					edgar.active=false;
					this.rooms[p][i].push(edgar);
				}
			 }
		}
	}
	
	dungeon.prototype.load=function() // maybe done wipe rooms? just clear all rooms / set to inactive? 
	{
		var dung=this;
		dung.blank();
		for(var i=dung.depth;i<dung.floors-1;i++)
		{
			pmath="dungeons/"+dung.name+"/"+"floor"+i+"/map.txt";
			$.get(pmath, function(data) 
			{
				for(var p=0;p<dung.getWidth();p++)
				{
					for(var q=0;q<dung.getHeight();q++)
					{
						if(data[p+q*dung.getWidth()]==1)//load room
						{
							smath="dungeons/"+dung.name+"/"+"floor"+i+"/"+"roomX"+p+"Y"+q+".txt";
							$.get(smath, function(datap) 
							{ 
								console.log("Loading room at Floor "+i+" X: "+p+" Y: "+q); //NO WTF IT's NOT
								dung.rooms[i][p][q].buildMapFromLoadedTiles("whatever",datap);  
								dung.rooms[i][p][q].active=true;
							});
						}else //no room
						{
							//shouldn't really have to do anything since I blanked the map before
						}
					}
				}
				
			});  
		}
	}
	
	this.changeFloor=function(up,limited)
	{
		if(up)
		{
			if(this.roomZ>this.floors-1)
			{
				bConsoleBox.log("Already on top floor");
				return;
			}
			
			if((this.roomX>this.width[this.roomZ+1]-1) || (this.roomY>this.height[this.roomZ+1]-1))
			{
				bConsoleBox.log("would be off that floor's map boundaries");
				return;
			}
			
			if(!this.rooms[this.roomZ+1][this.roomX][this.roomY].active){
				bConsoleBox.log("No active room above");
				return;
			}
			if((this.curRoom().hasStairs(true)) || (!limited))
			{
				this.roomZ++;
				this.rooms[this.roomZ][this.roomX][this.roomY].explored=true;
			}else
			{
				bConsoleBox.log("No stairs going up.");
			}
	
		}else
		{
			if(this.roomZ<1) 
			{
				bConsoleBox.log("Already on lowest floor");
				return
			}
			
			if((this.roomX>this.width[this.roomZ-1]-1) || (this.roomY>this.height[this.roomZ-1]-1))
			{
				bConsoleBox.log("would be off that floor's map boundaries");
				return;
			}
			
			if(!this.rooms[this.roomZ-1][this.roomX][this.roomY].active)
			{
				bConsoleBox.log("No active room below");
				return;
			}
			
			if((this.curRoom().hasStairs(false)) || (!limited))
			{
				this.roomZ--;
				this.rooms[this.roomZ][this.roomX][this.roomY].explored=true;
			}else
			{
				bConsoleBox.log("No stairs going down.");
			}

	
		}
	}
	
	this.drawAdjacent=function(can,cam)
	{
		var tyOffset=-331; //top
		if((this.roomY>0) && (this.rooms[this.roomZ][this.roomX][this.roomY-1].active) && (!this.rooms[this.roomZ][this.roomX][this.roomY-1].hidden))
		{
			for (i=0;i<ROOM_WIDTH; i++)
			{
				for (j=ROOM_HEIGHT-4;j<ROOM_HEIGHT; j++)
				{
					var aTile=this.rooms[this.roomZ][this.roomX][this.roomY-1].tiles[i][j];
					if(aTile && aTile.data <20)
					{
						//HACK to get rid of error
						if(dungeonTileSprite[aTile.data])
						{
							dungeonTileSprite[aTile.data].draw(can, (i-0)*32+xOffset, (j-0)*32+tyOffset);
						}
					}else if(aTile&& aTile<24)
					{
						dungeonTileSprite[20+tileani].draw(can, (i-0)*32+xOffset, (j-0)*32+tyOffset);
					}else if (aTile&& aTile<28) 
					{
						dungeonTileSprite[24+tileani].draw(can, (i-0)*32+xOffset, (j-0)*32+tyOffset);
					}else 
					{
						dungeonTileSprite[DungeonTileType.Lava+tileani].draw(can,(i-0)*32+xOffset, (j-0)*32+tyOffset);
					}
				}
			}
			if(this.rooms[this.roomZ][this.roomX][this.roomY-1].hasDoor(2))
			{
				var aDoor=this.rooms[this.roomZ][this.roomX][this.roomY-1].getDoor(2);
				aDoor.getSprite().draw(can,(aDoor.x-cam.tileX)*ROOM_TILE_SIZE+xOffset-30, (aDoor.y-cam.tileY)*ROOM_TILE_SIZE+tyOffset-30);
				
			}
		}
	
		
		var tyOffset=631;//bottom
		if((this.roomY<this.getHeight()-1) && (this.rooms[this.roomZ][this.roomX][this.roomY+1].active)&& (!this.rooms[this.roomZ][this.roomX][this.roomY+1].hidden))
		{
			for (i=0;i<ROOM_WIDTH; i++)
			{
				for (j=0;j<4; j++)
				{
					var aTile=this.rooms[this.roomZ][this.roomX][this.roomY+1].tiles[i][j];
					if(aTile && aTile.data <20)
					{
						//HACK to get rid of error
						if(dungeonTileSprite[aTile.data])
						{
							dungeonTileSprite[aTile.data].draw(can, (i-0)*32+xOffset, (j-0)*32+tyOffset);
						}
					}else if(aTile&& aTile<24)
					{
						dungeonTileSprite[20+tileani].draw(can, (i-0)*32+xOffset, (j-0)*32+tyOffset);
					}else if (aTile&& aTile<28) 
					{
						dungeonTileSprite[24+tileani].draw(can, (i-0)*32+xOffset, (j-0)*32+tyOffset);
					}else 
					{
						dungeonTileSprite[DungeonTileType.Lava+tileani].draw(can,(i-0)*32+xOffset, (j-0)*32+tyOffset);
					}
				}
			}
			if(this.rooms[this.roomZ][this.roomX][this.roomY+1].hasDoor(0))
			{
				var aDoor=this.rooms[this.roomZ][this.roomX][this.roomY+1].getDoor(0);
				aDoor.getSprite().draw(can,(aDoor.x-cam.tileX)*ROOM_TILE_SIZE+xOffset-30, (aDoor.y-cam.tileY)*ROOM_TILE_SIZE+tyOffset-30);
			}
		}
	var txOffset=-491;//left
		if((this.roomX>0) && (this.rooms[this.roomZ][this.roomX-1][this.roomY].active)&& (!this.rooms[this.roomZ][this.roomX-1][this.roomY].hidden))
		{
			for (i=ROOM_WIDTH-4;i<ROOM_WIDTH; i++)
			{
				for (j=0;j<ROOM_HEIGHT; j++)
				{
					var aTile=this.rooms[this.roomZ][this.roomX-1][this.roomY].tiles[i][j];
					if(aTile && aTile.data <20)
					{
						//HACK to get rid of error
						if(dungeonTileSprite[aTile.data])
						{
							dungeonTileSprite[aTile.data].draw(can, (i-0)*32+txOffset, (j-0)*32+yOffset);
						}
					}else if(aTile&& aTile<24)
					{
						dungeonTileSprite[20+tileani].draw(can, (i-0)*32+txOffset, (j-0)*32+yOffset);
					}else if (aTile&& aTile<28) 
					{
						dungeonTileSprite[24+tileani].draw(can, (i-0)*32+txOffset, (j-0)*32+yOffset);
					}else 
					{
						dungeonTileSprite[DungeonTileType.Lava+tileani].draw(can,(i-0)*32+txOffset, (j-0)*32+yOffset);
					}
				}
			}
			if(this.rooms[this.roomZ][this.roomX-1][this.roomY].hasDoor(1))
			{
				var aDoor=this.rooms[this.roomZ][this.roomX-1][this.roomY].getDoor(1);
				aDoor.getSprite().draw(can,(aDoor.x-cam.tileX)*ROOM_TILE_SIZE+txOffset-30, (aDoor.y-cam.tileY)*ROOM_TILE_SIZE+yOffset-30);
			}
		}
		var txOffset=791;//right
		if((this.roomX<this.getWidth()-1) && (this.rooms[this.roomZ][this.roomX+1][this.roomY].active)&& (!this.rooms[this.roomZ][this.roomX+1][this.roomY].hidden))
		{
			for (i=0;i<4; i++)
			{
				for (j=0;j<ROOM_HEIGHT; j++)
				{
					var aTile=this.rooms[this.roomZ][this.roomX+1][this.roomY].tiles[i][j];
					if(aTile && aTile.data <20)
					{
						//HACK to get rid of error
						if(dungeonTileSprite[aTile.data])
						{
							dungeonTileSprite[aTile.data].draw(can, (i-0)*32+txOffset, (j-0)*32+yOffset);
						}
					}else if(aTile&& aTile<24)
					{
						dungeonTileSprite[20+tileani].draw(can, (i-0)*32+txOffset, (j-0)*32+yOffset);
					}else if (aTile&& aTile<28) 
					{
						dungeonTileSprite[24+tileani].draw(can, (i-0)*32+txOffset, (j-0)*32+yOffset);
					}else 
					{
						dungeonTileSprite[DungeonTileType.Lava+tileani].draw(can,(i-0)*32+txOffset, (j-0)*32+yOffset);
					}
				}
			}
			if(this.rooms[this.roomZ][this.roomX+1][this.roomY].hasDoor(3))
			{
				var aDoor=this.rooms[this.roomZ][this.roomX+1][this.roomY].getDoor(3);
				aDoor.getSprite().draw(can,(aDoor.x-cam.tileX)*ROOM_TILE_SIZE+txOffset-30, (aDoor.y-cam.tileY)*ROOM_TILE_SIZE+yOffset-30);
			}
		}
	}
	 
	this.findNearestRoom=function()
	{
		//do better
		this.roomX=0;
		this.roomY=0;
	}
	 
	this.createRoom=function(z,x,y,clone)
	{
		if(x>this.getWidth()-1)
		{
			//his.width=x;
			return false;
		}
		if(y>this.getHeight()-1)
		{
			//this.height=y;
			return false;
		}
		if(z>this.floors-1)
		{
			//this.floors=z;
			return false;
		}
		if((z<0) || (x<0) || (y<0)) 
		{
			return false;
		}
		if(clone)
		{
			//var kitchen=new room(clone);
			return false;
		}else
		{
		
			var kitchen=new room();
			kitchen.x=x;
			kitchen.y=y;
			kitchen.fillAll(DungeonTileType.GreenFloor);
			for(var i=0;i<kitchen.width;i++)
			{
				kitchen.tiles[i][0].data=14;
				kitchen.tiles[i][1].data=14;
				
				kitchen.tiles[i][14].data=17;
				kitchen.tiles[i][13].data=17;
			}
			for(var i=1;i<kitchen.height-1;i++)
			{
				kitchen.tiles[0][i].data=15;
				kitchen.tiles[1][i].data=15;
				
				kitchen.tiles[18][i].data=16;
				kitchen.tiles[19][i].data=16;
			}
			
			
			kitchen.tiles[0][0].data=10;
			kitchen.tiles[1][1].data=10;
			kitchen.tiles[0][14].data=12;
			kitchen.tiles[1][13].data=12;
			kitchen.tiles[19][0].data=11;
			kitchen.tiles[18][1].data=11;
			kitchen.tiles[19][14].data=13;
			kitchen.tiles[18][13].data=13;
		}
		bConsoleBox.log("Room created at " +z+","+x+","+y);
		kitchen.name="roomX"+String(x)+"Y"+String(y);
		this.rooms[z][x][y]=kitchen;
		return true;
	}
	 

	this.draw=function(can,cam,player) //maybe dcam is a player variable and you pass this a playeR? 
	{ 
		//this.rooms[player.dX][player.dY].draw(can,cam);
		this.drawAdjacent(can,cam);
		this.rooms[this.roomZ][this.roomX][this.roomY].draw(can,cam);
	}
	this.drawMiniMap=function(can,player) //should also draw stairs, exit door in different color, goal/boss. 
	{
		var xFset=620;
		var yFset=609;
		var size=18;
		
		canvas.font = "16pt Calibri";
		can.fillStyle="white";
		var suffix="Who knows";
		if(this.roomZ==0)
		{
			suffix="Basement";
		}else if(this.roomZ==1)
		{
			suffix="Ground Floor";
		}else if(this.roomZ==2)
		{
			suffix="Second Floor";
		}else if(this.roomZ==3)
		{
			suffix="Third Floor";
		}else if(this.roomZ==4)
		{
			suffix="Fourth Floor";
		}
		else if(this.roomZ==5)
		{
			suffix="Fifth Floor";
		}
		else if(this.roomZ==6)
		{
			suffix="Sixth Floor";
		}
		else if(this.roomZ==7)
		{
			suffix="Seventh Floor";
		}
		else if(this.roomZ==8)
		{
			suffix="Eighth Floor";
		}
		else if(this.roomZ==9)
		{
			suffix="Ninth Floor";
		}else 
		{
			suffix=String(this.roomZ)+"th Floor";
		}
		can.fillText(suffix,xFset,yFset-6);
		can.globalAlpha=0.5;
		   for(i=0;i<this.width[this.roomZ];i++)
		   {
				for (k=0;k<this.height[this.roomZ];k++)
				{
					if((!this.rooms[this.roomZ][i][k].active))
					{
						//draw black square? nothing?
						
						can.fillStyle="black";
						canvas.fillRect(xFset+size*i,yFset+size*k,size,size);
					}else
					{
						
						if(((this.rooms[this.roomZ][i][k].explored) && (!this.rooms[this.roomZ][i][k].hidden)) || (editMode))
						{
							can.fillStyle="black";
							canvas.fillRect(xFset+size*i-1,yFset+size*k-1,size+1,size+1);
							can.fillStyle="blue";
							canvas.fillRect(xFset+size*i,yFset+size*k,size,size);
							
						}else 
						{
							can.fillStyle="black";
							canvas.fillRect(xFset+size*i-1,yFset+size*k-1,size+1,size+1);
							can.fillStyle="black";
							if((OPTIONS.showUnexploredRooms) && (!this.rooms[this.roomZ][i][k].hidden))
							{
								can.fillStyle="grey";
							}							
							canvas.fillRect(xFset+size*i,yFset+size*k,size,size);
						}
						
							
					}
					if((i==this.roomX) && (k==this.roomY)) //todo and right floor?
					{
						can.fillStyle="yellow";
						canvas.fillRect(xFset+size*i+3,yFset+size*k+3,size-6,size-6); //todo: scalig issues.
					}	
				}
			}
			for(i=0;i<this.width[this.roomZ];i++)
		    {
				for (k=0;k<this.height[this.roomZ];k++)
				{
					if(((this.rooms[this.roomZ][i][k].explored) || (OPTIONS.showUnexploredDoors)) && (!this.rooms[this.roomZ][i][k].hidden) || (editMode)) 
					{
						if(this.rooms[this.roomZ][i][k].hasDoor(0))
						{
							can.fillStyle="white";
							canvas.fillRect(xFset+size*i+size/2,yFset+size*k,2,1);
						}
						if(this.rooms[this.roomZ][i][k].hasDoor(2))
						{
							can.fillStyle="white";
							canvas.fillRect(xFset+size*i+size/2,yFset+size*k+size,2,1);
						}
						if(this.rooms[this.roomZ][i][k].hasDoor(1))
						{
							can.fillStyle="white";
							canvas.fillRect(xFset+size*i+size,yFset+size*k+size/2,1,2);
						}
						if(this.rooms[this.roomZ][i][k].hasDoor(3))
						{
							can.fillStyle="white";
							canvas.fillRect(xFset+size*i,yFset+size*k+size/2,1,2);
						}
						for(var g=0;g<this.rooms[this.roomZ][i][k].stairs.length;g++)
						{
							can.fillStyle="orange";
							if(this.rooms[this.roomZ][i][k].stairs[g].up)
							{
								can.fillStyle="pink";
							}
							canvas.fillRect(xFset+size*i+this.rooms[this.roomZ][i][k].stairs[g].x,yFset+size*k+this.rooms[this.roomZ][i][k].stairs[g].y,1,1);
						}
					}
				}
			}
		can.globalAlpha=1;
	}

};