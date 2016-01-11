function entity(croom)
{
	this.dir=0;
	this.hp=100;
	this.maxHp=100;
	this.keys=0;
	this.AI=0;
	this.x=4;
	this.y=3;
	this.falling=false;
	this.fallingY=0;
	this.room=null;
	if(croom)
	{
		this.room=croom;
	}
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
	this.has=new Array();
	this.destObj=null;
	this.destX=0;
	this.destY=0;
	this.path=null; 
	this.walkTrack=0;
	this.walkSpeed=8;
	this.going=false;
	this.pathTrack=0;
	this.gotHurt=0;
	this.kill=function()
	{
		this.exists=false;
		this.alive=false;
	}
	this.onArrival=function()
	{
	}
	this.hurt=function(dmg)
	{
		if(this.gotHurt>0) {return;}
		this.hp-=dmg;
		playSound("playerhurt");
		if (this.hp<1) 
		{
			this.kill();
		}else
		{
			this.gotHurt=60;
		}
	}
	this.draw=function(can)
	{
		if(this.gotHurt%2==0)
		{
			this.sprites[this.dir].draw(can,this.x*32+xOffset,this.y*32+yOffset-14-this.fallingY*2);
		}
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
		if(this.gotHurt>0) //not so quick?
		{
			this.gotHurt--;
		}
		if(!OPTIONS.UpdateAllRooms)
		{
			if((this.room) && (this.room.name!=curDungeon.curRoom().name))
			{
				return; 
			}
		}
		
	
		if(this.falling)
		{
			this.fallingY-=5;
			if(this.fallingY<1)
			{
				this.falling=false;
				this.fallingY=0;
				
			}
			this.path=null;
			this.going=false;
			this.walkTrack=0;
			this.destObj=null;
			this.onArrival=function(){};
			
		}
		if(this.isPlayer)
		{
			this.room=curDungeon.curRoom();
		}
		for(var i=0;i<this.room.objects.length;i++)
		{
			if(this.fallingY<1)
			{
		
				if(this.room.objects[i].type==ObjectID.Spikes)
				{
					if((this.room.objects[i].on)&&(this.room.objects[i].x==this.x) && (this.room.objects[i].y==this.y))
					{
						this.hurt(10); 
					}
				}else if(this.room.objects[i].type==ObjectID.ToggleSwitch)
				{
					
					if(this.isPlayer)//OPTION?
					{
						if((!this.room.objects[i].on)&&(this.room.objects[i].x==this.x) && (this.room.objects[i].y==this.y))
						{
							this.room.objects[i].playerActivate();
						}
					}
				}	
			}
		}
		if((this.room.tiles[this.x][this.y].data==DungeonTileType.Hole) &&(!this.falling))
		{
			
			playSound("fall");
			console.log("you fell down a floor!")
			//Do better drawing?
			this.falling=true;
			this.fallingY=150;
			if(this.isPlayer)
			{
				if(curDungeon.roomZ==0)
				{
					bConsoleBox.log("can't fall any lower");
					//damage and find nearest standable point. 
				}else
				{
					curDungeon.roomZ--;
					this.room=curDungeon.curRoom();
				}
			}else if (this.roomZ>0)
			{
				this.room=curDungeon.rooms[this.roomZ-1][this.roomX][this.roomY];

			}else
			{
				bConsoleBox.log("npc can't fall any lower");
			}
			//this.room=curDungeon.rooms[curDungeon.roomZ-1][curDungeon.roomX][curDungeon.roomY];
		}
		
		
		if((this.AI==1) && (!this.going))
		{
			//this.go(Math.floor(Math.random()*12) need function to find walkable tile.
			if((this.room.name==miles.room.name) && (this.room.z==miles.room.z))
			{
				var neddle=this.room.closestAdj(miles);
				this.go(neddle.x,neddle.y)
				this.path.pop();
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