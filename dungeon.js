var snake=0;
function dungeon()
{
	this.rooms=new Array();
	
	this.draw=function(can,cam,player) //maybe dcam is a player variable and you pass this a playeR? 
	{ 
		//this.rooms[player.dX][player.dY].draw(can,cam);
		this.rooms[snake].draw(can,cam);
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