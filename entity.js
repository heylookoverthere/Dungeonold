var equippedID={};
equippedID.Bomb=1;
equippedID.Bow=2;
equippedID.Boomerang=3;

var numEquippable=2;

function entity(croom)
{
	this.dir=0;
	this.hp=100;
	this.maxHp=100;
	this.keys=0;
	this.AI=0;
	this.x=4;
	this.y=3;
	this.name="Waffles";
	this.lastX=4;
	this.y=3;
	this.width=32;
	this.height=48;
	this.featherCount=0;
	this.falling=false;
	this.fallingY=0;
	this.room=null;
	this.tracker=false;
	this.tracking=null;
	this.talkBox=new textbox();
	this.getOffChest=0; //how many elemets of talkBank should be said without prompting him
	this.textBank=new Array();
	this.textTrack=0;
	this.chatterBank=new Array(); //random stuff said
	this.equippedTrack=0;
	if(croom)
	{
		this.room=croom;
	}
	this.status="not set";
	this.sprites=new Array();
	this.sprites.push(Sprite("oldman0"));
	this.sprites.push(Sprite("oldman1"));
	this.sprites.push(Sprite("oldman2"));
	this.sprites.push(Sprite("oldman3"));
	this.isPlayer=false;
	this.money=0;
	this.bombs=0;
	this.arrows=0;
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
	this.inventory=new Array();
	this.has=new Array();
	this.kill=function()
	{
		this.exists=false;
		this.alive=false;
	}
	this.getUsableInventory=function()
	{
		var snart=new Array();
		var tart=new object();
		tart.type=ObjectID.PotStand;
		tart.setup();
		tart.sprites[0]=nullSprite;
		snart.push(tart);//unequipped
		if((this.has[hasID.Bomb]) && (this.bombs>0))
		{
			//console.log("has bombs");
			var nart=new object();
			nart.type=ObjectID.Bomb;
			nart.usable=true;
			nart.sprites=new Array();
			nart.sprites.push(bombsprite);
			snart.push(nart);
		}if((this.has[hasID.Bow]) && (this.arrows>0))
		{
			var nart=new object();
			nart.type=ObjectID.Bow;
			nart.usable=true;
			nart.sprites=new Array();
			nart.sprites.push(objectSprites[ObjectID.Bow]);
			snart.push(nart);
		}
		for(var i=0;i<this.inventory.length;i++)
		{
			if(this.inventory[i].usable)
			{
				snart.push(this.inventory[i]);
			}
		}
		return snart;
	}
	this.cycleEquipped=function(up)
	{
		var mup=this.getUsableInventory();
		if(up)
		{
			this.equippedTrack++;
			if(this.equippedTrack>mup.length-1)
			{
				this.equippedTrack=mup.length-1;
			}
		}else
		{
			this.equippedTrack--;
			if(this.equippedTrack<0)
			{
				this.equippedTrack=0;
			}
		}
		
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
		
		if((this.isPlayer) && (this.holding))
		{
			this.sprites[4].draw(can,this.x*32+xOffset,this.y*32+yOffset-14-this.fallingY*2);
			this.holding.draw(can,this.x*32+xOffset,this.y*32+yOffset-14-16-this.fallingY*2);
		}else
		{
			if(this.gotHurt%2==0)
			{
				this.sprites[this.dir].draw(can,this.x*32+xOffset,this.y*32+yOffset-14-this.fallingY*2);
			}
		}
		
	}
	this.goHole=function(x,y,obj)
	{
		this.destX=x;
		this.destY=y;
		this.path=this.room.getPath(this.x,this.y,x,y,false,false);
		this.pathTrack=0;
		if(obj)
		{
			this.destObj=obj;
		}
		this.going=true;
	}
	this.go=function(x,y,obj)
	{
		this.destX=x;
		this.destY=y;
		this.path=this.room.getPath(this.x,this.y,x,y,false,true);
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
				if(this.room.tiles[this.x][this.y].data==DungeonTileType.ReallyUnstable)
				{
					playSound("landing");
					playSound("cavein");
					this.room.tiles[this.x][this.y].data=DungeonTileType.Hole;
				}
				this.falling=false;
				this.fallingY=0;
				if(this.room.tiles[this.x][this.y].data!=DungeonTileType.Hole)
				{
					playSound("landing");
				}
				
			}
			this.path=null;
			this.going=false;
			this.walkTrack=0;
			this.destObj=null;
			this.onArrival=function(){};
			
		}
		if(this.isPlayer)
		{
			//this.room=curDungeon.curRoom();
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
				}else if(this.room.objects[i].type==ObjectID.Pot)
				{
					
					if(this.isPlayer)//OPTION?
					{
						if((this.room.objects[i].curSprite==0)&&(this.room.objects[i].x==this.x) && (this.room.objects[i].y==this.y))
						{
							this.room.objects[i].playerActivate();
						}
					}
				}
			}
		}
		if(this.fallingY<1)
		{
			if(this.room.tiles[this.x][this.y].data==DungeonTileType.Unstable)
			{
				
				if((this.x!=this.lastX) || (this.y!=this.lastY))
				{
					this.room.tiles[this.x][this.y].data=DungeonTileType.ReallyUnstable;
					playSound("unstable");
					this.lastX=this.x;
					this.lastY=this.y;
					
				}
			}else if(this.room.tiles[this.x][this.y].data==DungeonTileType.ReallyUnstable)
			{
				if((this.x!=this.lastX) || (this.y!=this.lastY))
				{
					this.room.tiles[this.x][this.y].data=DungeonTileType.Hole;
					playSound("cavein");
					//this.lastX=this.x;
					//this.lastY=this.y;
				}
			}else if((this.room.tiles[this.x][this.y].data==DungeonTileType.Hole) &&(!this.falling))
			{
				
				playSound("fall");
				//console.log("you fell down a floor!")
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
						this.room.explored=true;
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
		}
		
		if((this.AI==1) && (!this.going))
		{
			//this.go(Math.floor(Math.random()*12) need function to find walkable tile.
			if((this.room.name==miles.room.name) && (this.room.z==miles.room.z))
			{
				var neddle=miles;//.room.closestAdj(miles,this);
				if((this.x!=neddle.x) || (this.y!=neddle.y))
				{
					this.go(neddle.x,neddle.y)
					this.path.pop();
					this.status="Target is in the same room!";
				}else
				{
					this.status="Arrived." 
					//if arrived at player, which we'll assume for now.
					if((this.textTrack<this.getOffChest) && (!this.talkBox.exists))
					{
						playSound("textbox");
						this.talkbox=new textbox();
						this.talkBox.setup();
						this.talkBox.x=200;
						this.talkBox.y=200;
						this.talkBox.textLim=104;
						this.talkBox.log(this.textBank[this.textTrack]);
						this.talkBox.hasFocus=true;
						buttons.push(this.talkBox);
						this.textTrack++;
						//this.textBank.splice(0,1);
					}
						
				}
				
				
			}else if(this.room.z>miles.room.z) //find stairs (or hole?) down and head there
			{	
				this.status="Target is below";
				if(this.room.hasStairs(false))
				{
					this.status+=" and there are stairs!";
					this.onArrival=function()
					{
						this.room=curDungeon.rooms[this.room.z-1][this.room.x][this.room.y]
					}
					var nex=this.room.getStairs(false);
					this.go(nex.x,nex.y);
				}
			}else if(this.room.z<miles.room.z) //find stairs up and head there
			{
				this.status="Target is above";
				if(this.room.hasStairs(true))
				{
					this.status+=" and there are stairs!";
					this.onArrival=function()
					{
						this.room=curDungeon.rooms[this.room.z+1][this.room.x][this.room.y]
					}
					var nex=this.room.getStairs(true)
					this.go(nex.x,nex.y);
				}
			}else //you have the right floor.
			{
				var nard=new Array();
				this.status="Target is on the same floor";
				if((miles.room.y<this.room.y) && (this.room.getOpenDoor(0,this)))
				{
					this.status="he's to the north and there is an open door!";
					var peg=this.room.getOpenDoor(0,this);
					nard=this.room.getPath(this.x,this.y,peg.x,peg.y+1,false,true);
					if((this.x==peg.x) &&  (this.y==peg.y+1))
					{
						nard.push(0);
					}
				}if((miles.room.x>this.room.x) && (this.room.getOpenDoor(1,this)))
				{
					this.status="he's to the east and there is an open door!";
					var peg=this.room.getOpenDoor(1,this);
					nard=this.room.getPath(this.x,this.y,peg.x-1,peg.y,false,true);
					if((this.x==peg.x-1) &&  (this.y==peg.y))
					{
						nard.push(0);
					}
				}if((miles.room.y>this.room.y) && (this.room.getOpenDoor(2,this)))
				{
					this.status="he's to the south and there is an open door!";
					var peg=this.room.getOpenDoor(2,this);
					nard=this.room.getPath(this.x,this.y,peg.x,peg.y-1,false,true);
					if((this.x==peg.x) &&  (this.y==peg.y-1))
					{
						nard.push(0);
					}
				} if((miles.room.x<this.room.x) && (this.room.getOpenDoor(3,this)))
				{
					this.status="he's to the west and there is an open door!";
					var peg=this.room.getOpenDoor(3,this);
					nard=this.room.getPath(this.x,this.y,peg.x+1,peg.y,false,true);
					if((this.x==peg.x+1) &&  (this.y==peg.y))
					{
						nard.push(0);
					}
				}
				if((nard) && (nard.length>0))
				{
								
					if(peg)
					{
						if(peg.orientation==0) 
						{
							this.onArrival=function()
							{
								//curDungeon.changeRoom(0,true);
								if(this.room.y>0){
									this.room=curDungeon.rooms[this.room.z][this.room.x][this.room.y-1]
									this.y=12;
									this.x=peg.x;
								}
							}
							this.go(peg.x,peg.y+1);
						}else if(peg.orientation==1) 
						{
							
							this.onArrival=function()
							{
								if(this.room.x<curDungeon.getWidth()-1){
									this.room=curDungeon.rooms[this.room.z][this.room.x+1][this.room.y]
									this.x=2;
									this.y=peg.y;
								}
							}
							
							this.go(peg.x-1,peg.y);
						}else if(peg.orientation==2) 
						{
							this.onArrival=function()
							{
								if(this.room.y<curDungeon.getHeight()-1){
									this.room=curDungeon.rooms[this.room.z][this.room.x][this.room.y+1]
									this.y=2;
									this.x=peg.x;
								}
							}
							this.go(peg.x,peg.y-1);
						}else if(peg.orientation==3) 
						{
							this.onArrival=function()
							{
								if(this.room.x>0){
									this.room=curDungeon.rooms[this.room.z][this.room.x-1][this.room.y]
									this.x=17;
									this.y=peg.y;
								}
							}
							this.go(peg.x+1,peg.y);
						}
					}
				}else
				{
					this.status="on same floor, but no open door";
				}
				
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
					this.lastX=this.x;
					this.lastY=this.y;
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
					if((this.AI>0) && (this.tracking))
					{
						var bup=this.room.closestAdj(this.tracking,this);
						if((this.x==bup.x) && (this.y==bup.y))
						{
							this.status="Arrived." 
							
							//if arrived at player, which we'll assume for now.
							if((this.textTrack<this.getOffChest) && (!this.talkBox.exists))
							{
								playSound("textbox");
								this.talkbox=new textbox();
								this.talkBox.setup();
								this.talkBox.x=200;
								this.talkBox.y=200;
								this.talkBox.textLim=104;
								this.talkBox.log(this.name+": "+this.textBank[this.textTrack]);
								this.talkBox.hasFocus=true;
								buttons.push(this.talkBox);
								this.textTrack++;
								//this.textBank.splice(0,1);
							}
						}
					}
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
	this.has[5]=true;

}