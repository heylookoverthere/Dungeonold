//oh god I forgot about floors! add another layer 
function dungeon(path)
{
	
	this.rooms=new Array();
	this.roomX=1;
	this.roomY=2;
	this.width=3;
	this.height=3;

	for(var i=0;i<this.width;i++)
	{
		this.rooms.push(new Array());
		for(j=0;j<this.height;j++)
		{
			var edgar=new room();
			var parth=path+"/roomX"+String(i)+"Y"+String(j);
			edgar.buildRoom(parth);
			edgar.name="roomX"+String(i)+"Y"+String(j);
			this.rooms[i].push(edgar);
		}
     }
	 this.rooms[this.roomX][this.roomY].explored=true;

	this.draw=function(can,cam,player) //maybe dcam is a player variable and you pass this a playeR? 
	{ 
		//this.rooms[player.dX][player.dY].draw(can,cam);
		this.rooms[this.roomX][this.roomY].draw(can,cam);
	}
	this.drawMiniMap=function(can,player)
	{
		var xFset=600;
		var yFset=640;
		var size=18;
		can.globalAlpha=0.5;
	   for(i=0;i<this.width;i++)
	   {
			for (k=0;k<this.height;k++)
			{
				if(!this.rooms[i][k])
				{
					//draw black square? nothing?
					
					can.fillStyle="blue";
					canvas.fillRect(xFset+size*i,yFset+size*k,size,size);
				}else
				{
					
					if(this.rooms[i][k].explored)
					{
						can.fillStyle="black";
						canvas.fillRect(xFset+size*i-1,yFset+size*k-1,size+1,size+1);
						can.fillStyle="blue";
						canvas.fillRect(xFset+size*i,yFset+size*k,size,size);
						if(this.rooms[i][k].hasDoor(0))
						{
							can.fillStyle="white";
							canvas.fillRect(xFset+size*i+size/2,yFset+size*k,2,1);
						}
						if(this.rooms[i][k].hasDoor(2))
						{
							can.fillStyle="white";
							canvas.fillRect(xFset+size*i+size/2,yFset+size*k+size,2,1);
						}
						if(this.rooms[i][k].hasDoor(1))
						{
							can.fillStyle="white";
							canvas.fillRect(xFset+size*i+size,yFset+size*k+size/2,1,2);
						}
						if(this.rooms[i][k].hasDoor(3))
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
					if((i==this.roomX) && (k==this.roomY))
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