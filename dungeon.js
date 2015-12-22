
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
			edgar.buildRoom(parth)
			edgar.name="roomX"+String(i)+"Y"+String(j);
			this.rooms[i].push(edgar);
		}
     }
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
		can.globalAlpha=0.75;
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
					if((i==this.roomX) && (k==this.roomY))
					{
						can.fillStyle="black";
						canvas.fillRect(xFset+size*i-1,yFset+size*k-1,size+1,size+1);
						can.fillStyle="yellow";
						canvas.fillRect(xFset+size*i,yFset+size*k,size,size);
					}else if(this.rooms[i][k].explored)
					{
						can.fillStyle="black";
						canvas.fillRect(xFset+size*i-1,yFset+size*k-1,size+1,size+1);
						can.fillStyle="blue";
						canvas.fillRect(xFset+size*i,yFset+size*k,size,size);
					}else
					{
					  //draw dark blue square
					  //draw doors or not? 
				    }
					//draw doors
					if(this.rooms[i][k].hasDoor(0))
					{
						can.fillStyle="white";
						canvas.fillRect(xFset+size*i+size/2,yFset+size*k,2,1);
					}
					if(this.rooms[i][k].hasDoor(2))
					{
						can.fillStyle="white";
						canvas.fillRect(xFset+size*i+size/2,yFset+size*k+size-1,2,1);
					}
					if(this.rooms[i][k].hasDoor(1))
					{
						can.fillStyle="white";
						canvas.fillRect(xFset+size*i+size-1,yFset+size*k+size/2,2,1);
					}
					if(this.rooms[i][k].hasDoor(3))
					{
						can.fillStyle="white";
						canvas.fillRect(xFset+size*i,yFset+size*k+size/2,2,1);
					}
				}
			}
		}
		can.globalAlpha=1;
	}

};