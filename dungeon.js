//oh god I forgot about floors! add another layer 
//when changing floors, mark new room explored. - add stairs in general. 
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
	this.width.push(3);
	this.height.push(3);
	this.floors=2;

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
	this.drawMiniMap=function(can,player)
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
					if(!this.rooms[this.roomZ][i][k])
					{
						//draw black square? nothing?
						
						can.fillStyle="blue";
						canvas.fillRect(xFset+size*i,yFset+size*k,size,size);
					}else
					{
						
						if(this.rooms[this.roomZ][i][k].explored)
						{
							can.fillStyle="black";
							canvas.fillRect(xFset+size*i-1,yFset+size*k-1,size+1,size+1);
							can.fillStyle="blue";
							canvas.fillRect(xFset+size*i,yFset+size*k,size,size);
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
						}else
						{
							can.fillStyle="black";
							canvas.fillRect(xFset+size*i-1,yFset+size*k-1,size+1,size+1);
							can.fillStyle="black";
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
		can.globalAlpha=1;
	}

};