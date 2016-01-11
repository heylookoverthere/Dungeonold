function entity()
{
	this.dir=0;
	this.keys=0;
	this.AI=0;
	this.room=null;
	this.sprites=new Array();
	this.sprites.push(Sprite("oldman0"));
	this.sprites.push(Sprite("oldman1"));
	this.sprites.push(Sprite("oldman2"));
	this.sprites.push(Sprite("oldman3"));
	this.isPlayer=false;
	this.money=0;
	this.bombs=0;
	this.wallet=250;
	this.exists=true; 
	this.tileX;//todo
	this.has=new Array();
	this.destObj=null;
	this.destX=0;
	this.destY=0;
	this.path=null; 
	this.walkTrack=0;
	this.walkSpeed=6;
	this.going=false;
	this.pathTrack=0;
	this.onArrival=function()
	{
	}
	this.go=function(x,y,obj)
	{
		this.destX=x;
		this.destY=y;
		this.path=curDungeon.curRoom().getPath(this.x,this.y,x,y,false);
		this.pathTrack=0;
		if(obj)
		{
			this.destObj=obj;
		}
		this.going=true;
	}

	this.update=function()
	{
		if(!OPTIONS.UpdateAllRooms)
		{
			if((this.room) &&(this.room.name!=curDungeon.curRoom().name))
			{
				return; 
			}
		}
		if(this.isPlayer)
		{
			this.room=curDungeon.curRoom();
		}
		
		if((this.AI==1) && (!this.going))
		{
			//this.go(Math.floor(Math.random()*12) need function to find walkable tile.
			if(this.room.name==miles.room.name)
			{
				this.go(miles.x,miles.y)
			}else
			{
				
			}
		}
		if(this.going)
		{
			this.walkTrack++;
			if((this.walkTrack>this.walkSpeed) && (this.path)) //if path. length==0, you're there. do function. 
			{
				if(this.path.length>0)
				{
					this.walkTrack=0;
					if(this.path[this.pathTrack].x>this.x) //facing east
					{
						this.dir=1;
					}
					if(this.path[this.pathTrack].x<this.x) //facing west
					{
						this.dir=3;
					}
					if(this.path[this.pathTrack].y>this.y) //facing south
					{
						this.dir=2;
					}
					if(this.path[this.pathTrack].y<this.y) //facing north
					{
						this.dir=0;
					}
					this.x=this.path[this.pathTrack].x;
					this.y=this.path[this.pathTrack].y;
					this.pathTrack++;
				}
				if(this.pathTrack==this.path.length)
				{
					this.going=false;
					this.walkTrack=0;
					this.pathTrack=0;
					this.path=null;
					if(this.destObj)
					{
						if(this.destObj.x>this.x)
						{
							this.dir=1;
						}else if(this.destObj.x<this.x)
						{
							this.dir=3;
						}else if(this.destObj.y>this.y)
						{
							this.dir=2;
						}else if(this.destObj.y<this.y)
						{
							this.dir=0;
						}
						if(this.destObj.playerUsable)
						{
							this.destObj.playerActivate();
						}
						this.destObj=null;
					}
					this.onArrival();
					this.onArrival=function()
					{
					}
				}
			}
		}

	}

	for(var i=0;i<numHas;i++)
	{
		this.has.push(false);
	}

}