
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
	   for(i=0;i<this.width;i++)
	   {
			for (k=0;k<this.height;k++)
			{
				if(!this.rooms[i][k])
				{
					//draw black square? nothing?
				}else
				{
					if(this.rooms[i][k].explored)
					{
						
					}else
					{
					  //draw dark blue square
					  //draw doors or not? 
				    }
				}
			}
		}
	}

};