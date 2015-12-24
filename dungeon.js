//TODO
//maybe draw up or down arrows in middle of rooms with stairs to represent them? what about multiples?

//oh god I forgot about floors! add another layer - sorta done

function dungeon(path)
{
	
	this.rooms=new Array();
	this.roomX=1;
	this.roomY=2;
	this.roomZ=0;
	this.entranceFloor=0;
	this.width=new Array();
	this.height=new Array();
	this.width.push(3);
	this.height.push(3);
	this.width.push(4);
	this.height.push(3);
	this.width.push(8);
	this.height.push(7);
	this.floors=3;

	for(var p=0;p<this.floors;p++)
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
			
			if(!this.rooms[this.roomZ][this.roomX][this.roomY-1].active)
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
			
			if(!this.rooms[this.roomZ][this.roomX][this.roomY+1].active)
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
			
			if(!this.rooms[this.roomZ][this.roomX+1][this.roomY].active)
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
			
			if(!this.rooms[this.roomZ][this.roomX-1][this.roomY].active)
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
	
	this.changeFloor=function(up,limited)
	{
		if(up)
		{
			if(this.roomZ>this.floors-2)
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
	 
	this.getWidth=function()
	{
		return(this.width[this.roomZ]);
	}
	 this.getHeight=function()
	{
		return(this.height[this.roomZ]);
	}
	this.draw=function(can,cam,player) //maybe dcam is a player variable and you pass this a playeR? 
	{ 
		//this.rooms[player.dX][player.dY].draw(can,cam);
		this.rooms[this.roomZ][this.roomX][this.roomY].draw(can,cam);
	}
	this.drawMiniMap=function(can,player) //should also draw stairs, exit door in different color, goal/boss. 
	{
		var xFset=600;
		var yFset=655;
		var size=18;
		can.globalAlpha=0.5;
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
		can.fillText(suffix,xFset,yFset-6);
		   for(i=0;i<this.width[this.roomZ];i++)
		   {
				for (k=0;k<this.height[this.roomZ];k++)
				{
					if(!this.rooms[this.roomZ][i][k].active)
					{
						//draw black square? nothing?
						
						can.fillStyle="black";
						canvas.fillRect(xFset+size*i,yFset+size*k,size,size);
					}else
					{
						
						if(this.rooms[this.roomZ][i][k].explored)
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
						
						if((i==this.roomX) && (k==this.roomY)) //todo and right floor?
						{
							can.fillStyle="yellow";
							canvas.fillRect(xFset+size*i+3,yFset+size*k+3,size-6,size-6); //todo: scalig issues.
						}					
					}
				}
			}
			for(i=0;i<this.width[this.roomZ];i++)
		    {
				for (k=0;k<this.height[this.roomZ];k++)
				{
					if((this.rooms[this.roomZ][i][k].explored) || ((OPTIONS.showUnexploredDoors) && (!this.rooms[this.roomZ][i][k].hidden)) )
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