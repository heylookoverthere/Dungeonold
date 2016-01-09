var numLoots=10;
var LOAD_COUNT=0;

var lootTable={};
lootTable.Key=0;
lootTable.HeartContainer=1;
lootTable.GoldTen=2;
lootTable.GoldHundred=3;
lootTable.Map=4;
lootTable.RedPotion=5;
lootTable.GreenPotion=6;
lootTable.BluePotion=7;
lootTable.Bombs=8;
lootTable.Wallet=9;

var lootName=new Array();
lootName.push("key");
lootName.push("heart container");
lootName.push("ten rupees");
lootName.push("hundred rupees");
lootName.push("map");
lootName.push("red potion");
lootName.push("green potion");
lootName.push("blue potion");
lootName.push("bombs");
lootName.push("wallet");

var lootSprites=new Array();
lootSprites.push(Sprite("key"));
lootSprites.push(Sprite("heartcontainer"));
lootSprites.push(Sprite("tenrupee"));
lootSprites.push(Sprite("hundredrupee"));
lootSprites.push(Sprite("map"));
lootSprites.push(Sprite("redpotion"));
lootSprites.push(Sprite("greenpotion"));
lootSprites.push(Sprite("bluepotion"));
lootSprites.push(Sprite("bombpickup"));
lootSprites.push(Sprite("wallet"));
//last
lootName.push("helmet4");
lootSprites.push(Sprite("helmet4"));

var ObjectID={};
ObjectID.Lamp=0;
ObjectID.Sign=1;
ObjectID.Chest=2;
ObjectID.Key=3;
ObjectID.ToggleSwitch=4;
ObjectID.PotStand=5;
ObjectID.Pot=6;
ObjectID.Curtains=7;
ObjectID.BlueBlocker=8;
ObjectID.RedBlocker=9;
ObjectID.BlueOrb=10;
ObjectID.RedOrb=11;
ObjectID.Warp=12;
ObjectID.HeartContainer=13;
ObjectID.Feather=14;
ObjectID.Brick=15;
ObjectID.Bomb=16;
ObjectID.Bow=17;
ObjectID.Lantern=18;
ObjectID.Spikes=19;
ObjectID.Triforce=20;
ObjectID.Peg=21;
ObjectID.Hammer=22;
//ObjectID.HoldSwitch=3;
//ObjectID.Pickup=4; //maybe instead of having one for each item there's one for pickup and then it get a .type?

function object(oroom) //not a tile, not an enemy
{
	this.sprites=new Array();
	this.curSprite=0;
	this.on=false;
	this.ctype=0;
	this.room=oroom;
	this.pickupable=false;
	this.type=0;
	this.active=false;
	this.linkDescriptions=new Array();
	this.exists=true;
	this.playerUsable=true;
	this.x=2;
	this.y=2;
	this.ani=0;
	this.aniRate=30;
	this.width=32;
	this.height=32;
	this.alwaysWalkable=false;

	this.walkable=function()
	{
		if(this.alwaysWalkable)
		{
			return true;
		}
		if((this.type==ObjectID.BlueBlocker) || (this.type==ObjectID.RedBlocker)|| (this.type==ObjectID.Peg)|| (this.type==ObjectID.Spikes))
		{
			if(!this.on) {
				return true;
			}
		}
		
		return false;
	}
	this.text="";
	this.dest=new Array(); //i.e. door to be opened on activate
	this.flame=null;
	//this.setup();
}

object.prototype.move=function(x,y) //brings along what is needed (like the flame of the lamp)
{
	this.x=x;
	this.y=y;
	if(this.flame)
	{
		this.flame.x=this.x*32+xOffset;
		this.flame.y=this.y*32+yOffset-16;
		this.flame.flare.x=this.x*32+xOffset;
		this.flame.flare.y=this.y*32+yOffset-16;
	}
}

object.prototype.setup=function(id,par)
{
	if(id) {this.type=id;}
	if (this.type==ObjectID.Lamp) {
	    this.sprites=new Array();
		this.sprites.push(Sprite("lamp"));
	    this.name="lamp";
		this.flame=new flame(this.room.lights);
		this.flame.x=this.x*32+xOffset+2;
		this.flame.y=this.y*32+yOffset-15;
		this.flame.type=0;
		this.playerUsable=true;
		this.flame.alive=false;
		this.room.fires.push(this.flame);
		this.activate(); //oooh that's why it's backwards. 
		this.playerActivate=function()
		{
			if((!this.on)&&(!miles.has[hasID.Lantern]))
			{
				bConsoleBox.log("Need the lantern!","yellow");
				return;
			}
			this.activate();
		}
		this.activate=function()
		{
			this.on=!this.on;
			if(!this.on)
			{
				this.flame.flare.alive=false;
				this.flame.alive=false;
			}else{
				this.flame=new flame(this.room.lights);
				this.flame.x=this.x*32+xOffset;//miles.x;
				this.flame.y=this.y*32+yOffset-16;//miles.y;
				this.flame.type=0;
			}
		}
		
		
	}else if (this.type==ObjectID.Sign) {
		this.sprites=new Array();
		this.sprites.push( Sprite("sign"));
		this.name="sign";
		this.text="Snoke";
		if(par!=null){
			this.text=par;
			}
		this.messagebox=null;
		this.activate=function(){
			//display textbox with text. 
			if((!this.messagebox) || (!this.messagebox.exists))
			{
				var mancy=new textbox();
				mancy.setup();
				mancy.x=200;
				mancy.y=200;
				mancy.textLim=104;
				mancy.log(this.text);
				mancy.hasFocus=true;
				buttons.push(mancy);
				this.messagebox=mancy;
			}
		}
		this.playerActivate=this.activate;
		this.activateEdit=function()
		{
			this.text = prompt("Enter Sign Text");
		}
	}else if (this.type==ObjectID.Chest) {
		this.sprites=new Array();
		this.sprites.push( Sprite("chest"));
		this.sprites.push( Sprite("chestopen"));
		this.name="Chest";
		//this.loot=0;
		this.activate=function(){
			if(this.curSprite==1) {return;}
			this.curSprite=1;
			//give item!
			var btext="You...found a severed pig's head."
			if(this.loot==lootTable.Key)
			{
				bConsoleBox.log("You got a key!");
				btext="You got a a key!";
				miles.keys++;
			}else if(this.loot==lootTable.HeartContainer)
			{
				bConsoleBox.log("You got a heart container!");
				btext="You got a a heart container!";
				miles.maxHp+=20;
				miles.hp+=20;
			}else if(this.loot==lootTable.GoldTen)
			{
				bConsoleBox.log("You got 10 rupees!");
				btext="You got 10 rupees!";
				miles.money+=10;
				if(miles.money>miles.wallet)
				{
					miles.money=miles.wallet;
				}
			}else if(this.loot==lootTable.GoldHundred)
			{
				bConsoleBox.log("You got 100 rupees! Lucky!");
				btext="You got 100 rupees! Lucky!";
				miles.money+=100;
				if(miles.money>miles.wallet)
				{
					miles.money=miles.wallet;
				}
			}else if(this.loot==lootTable.Map)
			{
				bConsoleBox.log("You found the map! Hit G to use it.");
				btext="You found the map! Hit G to use it.";
				miles.hasMap=true;
			}else if(this.loot==lootTable.RedPotion)
			{
				bConsoleBox.log("You found a red potion!");
				btext="You found a red potion!";
				
			}else if(this.loot==lootTable.GreenPotion)
			{
				bConsoleBox.log("You found a green potion!");
				btext="You found a green potion!";
				
			}else if(this.loot==lootTable.BluePotion)
			{
				bConsoleBox.log("You found a blue potion!");
				btext="You found a blue potion!";
				
			}else if(this.loot==lootTable.Bombs)
			{
				bConsoleBox.log("You found some bombs!");
				btext="You found some bombs!";
				miles.has[hasID.Bombs]=true;
				miles.bombs+=3;
			}else if(this.loot==lootTable.Wallet)
			{
				bConsoleBox.log("You found a bigger wallet!");
				btext="You found a bigger wallet!";
				miles.wallet=miles.wallet*2;
				if(miles.wallet>999)
				{
					miles.wallet=999;
				}
			}
			var mancy=new textbox();
			mancy.setup();
			mancy.x=340;
			mancy.y=100;
			mancy.width=210;
			mancy.textLim=62;
			mancy.log(btext);
			mancy.hasFocus=true;
			buttons.push(mancy);
			this.messagebox=mancy;
		}
		this.playerActivate=this.activate;
		this.activateEdit=function(){
			editor.mode=editModes.ChestLoot;
			editor.lootFor=this;
		}
	}else if (this.type==ObjectID.Key) {
		this.sprites=new Array();
		this.sprites.push(Sprite("key"));
		this.name="Key";
		this.pickupable=true;
		this.alwaysWalkable=true;
		this.activate=function()
		{
			this.exists=false;
			bConsoleBox.log("Aquired a key!");
			miles.keys++;
		}
		this.playerActivate=this.activate;
	}else if (this.type==ObjectID.ToggleSwitch) {
		this.sprites=new Array();
		this.sprites.push( Sprite("switch"));
		this.sprites.push( Sprite("switchpressed"));
		this.name="Switch";
		this.alwaysWalkable=true;
		this.activateEdit=function(){
			editor.mode=editModes.SwitchLink
			editor.linkingFrom=this;
		}
		this.activate=function(){
			this.on=!this.on
			if(this.on)
			{
				this.curSprite= 1;
			}else
			{
				this.curSprite= 0;
			}
			for(var i=0;i<this.dest.length;i++){
				this.dest[i].activate();
				if(this.dest[i].room.z<this.room.z)
				{
					bConsoleBox.log("You hear a sound from below");
				}else if(this.dest[i].room.z>this.room.z)
				{
					bConsoleBox.log("You hear a sound from above");
				}else
				{
					if(this.dest[i].room.x<this.room.x)
					{
						bConsoleBox.log("You hear a sound from the west");
					}else if(this.dest[i].room.x>this.room.x)
					{
						bConsoleBox.log("You hear a sound from the east");
					}else if(this.dest[i].room.y<this.room.y)
					{
						bConsoleBox.log("You hear a sound from the north");
					}else if(this.dest[i].room.y>this.room.y)
					{
						bConsoleBox.log("You hear a sound from the south");
					}
				}
			}
		}
		this.playerActivate=this.activate;
	}else if (this.type==ObjectID.PotStand) {
		this.sprites=new Array();
		this.alwaysWalkable=true;
		this.sprites.push(Sprite("potstand"));
		this.name="Pot stand";
		this.playerActivate=this.activate;
	}else if (this.type==ObjectID.Pot) {
		this.sprites=new Array();
		this.sprites.push(Sprite("pot"));
		this.name="Pot";
		this.playerActivate=this.activate;
	}else if (this.type==ObjectID.Curtains) {
		this.sprites=new Array();
		this.curSprite=1;
		this.on=true;
//		console.log(this.x,this.y);
		if(this.y==1)
		{
			this.sprites.push(Sprite("curtainsopen0"));
			this.sprites.push(Sprite("curtains0"));
			this.width=64;
			this.height=44
		}else if(this.x==18)
		{
			this.sprites.push(Sprite("curtainsopen1"));
			this.sprites.push(Sprite("curtains1"));
			this.width=44;
			this.height=64
		}else if(this.y==13)
		{
			this.sprites.push(Sprite("curtainsopen2"));
			this.sprites.push(Sprite("curtains2"));
			this.width=64;
			this.height=44
		}else if(this.x==1)
		{
			this.sprites.push(Sprite("curtainsopen3"));
			this.sprites.push(Sprite("curtains3"));
			this.width=54;
			this.height=64
		}else
		{
			this.sprites.push(Sprite("curtainsopen0"));
			this.sprites.push(Sprite("curtains0"));
		}
		
	
		this.name="curtains";
		this.activate=function(){
			this.on=!this.on
			if(this.on)
			{
				this.curSprite= 1;
			}else
			{
				this.curSprite= 0;
			}
		}
		this.playerActivate=this.activate;
	}else if (this.type==ObjectID.Peg) { //blue blocker
	    this.sprites=new Array();
		this.on=true;
		this.curSprite=0;
		this.sprites.push(Sprite("pegup"));
		this.sprites.push(Sprite("pegdown"));
	    this.name="peg";
		this.activateEdit=function()
		{
			this.on=!this.on;
			if(this.on)
			{
				this.curSprite=0;
			}else
			{
				this.curSprite=1;
			}
		}
		this.playerActivate=function()
		{
			if(!miles.has[hasID.Hammer])
			{
				bConsoleBox.log("Only the hammer can destroy roadblocks!","yellow");
				return;
			}
			this.activate();
		}
		this.activate=function()
		{
			this.on=false;
			if(this.on)
			{
				this.curSprite=0;
			}else
			{
				this.curSprite=1;
			}
		}
		
	}else if (this.type==ObjectID.BlueBlocker) { //blue blocker
	    this.sprites=new Array();
		this.playerUsable=false;
		if(this.on)
		{
			this.curSprite=0;
		}else
		{
			this.curSprite=1;
		}
		this.sprites.push(Sprite("blueblocker"));
		this.sprites.push(Sprite("blueblockerdown"));
	    this.name="Blue blocker thingy";
		this.activate=function()
		{
			this.on=!this.on;
			if(this.on)
			{
				this.curSprite=0;
			}else
			{
				this.curSprite=1;
			}
		}
		curDungeon.blueBlockers.push(this);
	}else if (this.type==ObjectID.RedBlocker) { //red blocker
	    this.sprites=new Array();
		this.playerUsable=false;
		if(this.on)
		{
			this.curSprite=0;
		}else
		{
			this.curSprite=1;
		}
		this.sprites.push(Sprite("redblocker"));
		this.sprites.push(Sprite("redblockerdown"));
	    this.name="Red blocker thingy";
		this.activate=function()
		{
			this.on=!this.on;
			if(this.on)
			{
				this.curSprite=0;
			}else
			{
				this.curSprite=1;
			}
		}
		curDungeon.redBlockers.push(this);
	}else if (this.type==ObjectID.BlueOrb) { //blue orb
	    this.sprites=new Array();
		this.sprites.push(Sprite("blueorb"));
	    this.name="Blue orb";
		this.activate=function()
		{
		  //change all blue blockers ons
		  bConsoleBox.log("Blue barriers switched");
		  for(var i=0;i<curDungeon.blueBlockers.length;i++)
			{
				curDungeon.blueBlockers[i].activate();
				
			}
		}
		this.playerActivate=this.activate;
	}else if (this.type==ObjectID.RedOrb) { //red orb
	    this.sprites=new Array();
		this.sprites.push(Sprite("redorb"));
	    this.name="Red orb";
		this.activate=function()
		{
			//this.on=!this.on; //is this even needed
			//change all red blockers ons.
			bConsoleBox.log("Red barriers switched");
			for(var i=0;i<curDungeon.redBlockers.length;i++)
			{
				curDungeon.redBlockers[i].activate();
			}
		}
		this.playerActivate=this.activate;
	}else if (this.type==ObjectID.Warp) { //warp
	    this.sprites=new Array();
		this.active=false;
		this.alwaysWalkable=true;
		this.sprites.push(Sprite("warpoff"));
		this.sprites.push(Sprite("warp0"));
		this.sprites.push(Sprite("warp1"));
		this.sprites.push(Sprite("warp2"));
		this.dest=null;
	    this.name="Warp tile";
		this.activate=function()
		{
			//I dunno warp or something?
		}
		this.playerActivate=this.activate;
	}else if (this.type==ObjectID.HeartContainer) {
	    this.sprites=new Array();
		this.alwaysWalkable=true;
		this.sprites.push(Sprite("heartcontainer"));
	    this.name="Heart container";
		this.pickupable=true;
		this.activate=function()
		{
			bConsoleBox.log("You found a heart container!");
			this.exists=false;
			miles.maxHp+=20;
			miles.hp+=20;
		}
		this.playerActivate=this.activate;
	}else if (this.type==ObjectID.Feather) {
	    this.sprites=new Array();
		this.alwaysWalkable=true;
		this.sprites.push(Sprite("feather"));
	    this.name="Roc feather";
		this.pickupable=true;
		this.activate=function()
		{
			bConsoleBox.log("You found the Roc's Feather! Eventually it might let you jump.");
			this.exists=false;
			miles.has[hasID.Feather]=true;
		}
		this.playerActivate=this.activate;
	}else if (this.type==ObjectID.Brick) {
	    this.sprites=new Array();
		this.sprites.push(Sprite("brick2"));
	    this.name="Moveable brick";
	}else if (this.type==ObjectID.Bow) {
	    this.sprites=new Array();
		this.alwaysWalkable=true;
		this.sprites.push(Sprite("bow"));
	    this.name="Bow and Arrows";
		this.pickupable=true;
		this.activate=function()
		{
			bConsoleBox.log("You found the Bow! It's totally useless for now!");
			this.exists=false;
			miles.has[hasID.Bow]=true;
		}
		this.playerActivate=this.activate;
	}else if (this.type==ObjectID.Bomb) {
	    this.sprites=new Array();
		this.alwaysWalkable=true;
		this.sprites.push(Sprite("bombpickup"));
	    this.name="Bombs";
		this.pickupable=true;
		this.activate=function()
		{
			if(!miles.has[hasID.Bomb])
			{
				bConsoleBox.log("You found your first bombs!");
			}else
			{
				bConsoleBox.log("You found some bombs!");
			}
			this.exists=false;
			miles.has[hasID.Bomb]=true;
			miles.bombs+=5;
		}
		this.playerActivate=this.activate;
	}else if (this.type==ObjectID.Lantern) {
	    this.sprites=new Array();
		this.alwaysWalkable=true;
		this.sprites.push(Sprite("lantern"));
	    this.name="Lantern";
		this.pickupable=true;
		this.activate=function()
		{
			bConsoleBox.log("You found the lantern. You can light torches with it.");
			this.exists=false;
			miles.has[hasID.Lantern]=true;
		}
		this.playerActivate=this.activate;
	}else if (this.type==ObjectID.Hammer) {
	    this.sprites=new Array();
		this.alwaysWalkable=true;
		this.sprites.push(Sprite("Hammer"));
	    this.name="Hammer";
		this.pickupable=true;
		this.activate=function()
		{
			bConsoleBox.log("You found the hammer!");
			this.exists=false;
			miles.has[hasID.Hammer]=true;
		}
		this.playerActivate=this.activate;
	}else if (this.type==ObjectID.Spikes) {
	    this.sprites=new Array();
		this.alwaysWalkable=false;
		this.on=true;
		this.sprites.push(Sprite("spikes"));
		this.sprites.push(Sprite("spikeslowered"));
	    this.name="Spikes";
		
		this.activate=function()
		{
			this.on=!this.on;
			if(this.on)
			{
				this.curSprite=0;
			}else
			{
				this.curSprite=1;
			}
			//miles.hurt(5);
			
		}
		this.playerActivate=this.activate; //get hurt?
	}else if (this.type==ObjectID.Triforce) {
	    this.sprites=new Array();
		this.alwaysWalkable=true;
		this.pickupable=true;
		this.aniRate=5;
		this.active=true;
		this.width=64;
		this.height=64;
		this.sprites.push(Sprite("triforce1"));
		this.sprites.push(Sprite("triforce2"));
		this.sprites.push(Sprite("triforce3"));
	    this.name="Triforce";
		this.activate=function()
		{
			//change music
			var now=new Date().getTime();
			var timeTaken=now-curDungeon.timeStarted.getTime();
			var arecord=false;
			var difference=0
			//this.x-=1;
			//this.y-=1;
			//pickup thing
			if(timeTaken<curDungeon.bestTime)
			{
				arecord=true;
				difference=(curDungeon.bestTime-timeTaken)/1000;
			}
			var secsTaken=timeTaken/1000;//now it's in seconds.
			var mancy=new textbox();
			mancy.setup();
			mancy.x=240;
			mancy.y=100;
			//mancy.width=210;
			mancy.textLim=104;
			if(arecord)
			{
				if(curDungeon.bestTime>998000)
				{
					mancy.log("Congratulations! You have found the tri-force and beaten this dungeon! It took you "+secsTaken+" seconds, a new record!. Hit Y to exit.");
				}else
				{
					mancy.log("Congratulations! You have found the tri-force and beaten this dungeon! It took you "+secsTaken+" seconds, beating the old record by "+difference+" seconds!. Hit Y to exit.");
				}
				
				curDungeon.bestTime=timeTaken;
				bConsoleBox.log("New record!","yellow"); 
				var smoth="Dungeon/dungeons/"+curDungeon.name+"/score.txt";
				$.post("/save/", {"data": timeTaken, "path": smoth}).done(function(response) { bConsoleBox.log("Saved " +smoth); });
				
			}else
			{
				mancy.log("Congratulations! You have found the tri-force and beaten this dungeon! It took you "+secsTaken+" seconds. The current record is "+curDungeon.bestTime/1000+" seconds. Hit Y to exit.");
			}
			mancy.hasFocus=true;
			buttons.push(mancy);
			editor.confirming=true;
			editor.confirmingWhat=function() {
				editor.penDown=false;
				if(editor.confirming)
				{
					editor.clearConfirm();
				}
				bullshitHack=true;
				mode=0;
				mancy.exists=false;
			}
		}
		this.playerActivate=this.activate;
	}else if (this.type==ObjectID.RumHam) {
	    this.sprites=new Array();
		this.alwaysWalkable=true;
		this.sprites.push(Sprite("rumham"));
	    this.name="RUM HAM";
		bConsoleBox.log("You found the legendary Rum Ham!");
		//miles.has all
		this.playerActivate=this.activate;
	}
}

object.prototype.activate=function()
{
	this.on=!this.on;
	if(!this.on)
	{
		this.flame.flare.alive=false;
		this.flame.alive=false;
	}else{
		this.flame=new flame(this.room.lights);
		this.flame.x=this.x*32+xOffset;//miles.x;
		this.flame.y=this.y*32+yOffset-16;//miles.y;
		this.flame.type=0;
	}

}

object.prototype.activateEdit=function()
{
	this.activate();
}
/*object.prototype.tileX=function()
{
	return Math.floor((this.x-xOffset)/32));
}
object.prototype.tileY=function()
{
	return Math.floor((this.x-xOffset)/32));
}*/
object.prototype.update=function()
{
	if((this.type==0)&&(this.on))
	{
		this.flame.update();
	}
	if(((this.type==ObjectID.Warp) ||(this.type==ObjectID.Triforce) ) && (this.active))
	{
		this.ani++;
		if(this.ani>this.aniRate)
		{
			this.ani=0;
			this.curSprite++
			if(this.curSprite>this.sprites.length-1)
			{
				this.curSprite=1;
			}
		}
	}
}
object.prototype.draw=function(can,cam,xOffh,yOffh)
{
	if(!xOffh) {xOffh=0;}
	if(!yOffh) {yOffh=0;}
	this.sprites[this.curSprite].draw(can, this.x*32+xOffh, this.y*32+yOffh);
	//this.sprite.draw(can, this.x*32+xOffset, this.y*32+yOffset);
	if((this.type==0) && (this.on))
	{
		if((this.room.x==curDungeon.roomX)&& (this.room.y==curDungeon.roomY))
		{
			//draw fire?
			this.flame.draw(can,cam,xOffh,yOffh);
		}else
		{
			this.flame.sprites[this.flame.aniTrack].draw(can, this.x*32+xOffh, this.y*32+yOffh-16);
		}
	}else if(this.type==ObjectID.Chest)
	{
		if ((this.messagebox) && (this.messagebox.exists))
		{
			lootSprites[this.loot].draw(can, this.x*32+xOffh, this.y*32+yOffh-20);
		}
	}
}

object.prototype.stringify=function()
{
	var tempstring= "";
	tempstring+=this.x;
	tempstring+=";";
	tempstring+=this.y;
	tempstring+=";";
	tempstring+=this.type;
	if(this.type==1)
	{
		tempstring+=";";
		tempstring+=this.text;
	}else if(this.type==2)
	{
		tempstring+=";";
		tempstring+=this.loot;
	}else if(this.type==ObjectID.Lamp)
	{
		tempstring+=";";
		tempstring+=this.on;
	}else if((this.type==ObjectID.BlueBlocker) || (this.type==ObjectID.RedBlocker))
	{
		tempstring+=";";
		tempstring+=this.on;
	}else if (this.type==ObjectID.ToggleSwitch)
	{
		tempstring+=";";
		tempstring+=this.dest.length;
		for(var i=0;i<this.dest.length;i++)
		{
			tempstring+=";";
			tempstring+=this.dest[i].room.z;
			tempstring+=";";
			tempstring+=this.dest[i].room.x;
			tempstring+=";";
			tempstring+=this.dest[i].room.y;
			tempstring+=";";
			tempstring+=this.dest[i].x;
			tempstring+=";";
			tempstring+=this.dest[i].y;
			tempstring+=";";
			tempstring+=this.dest[i].type;
			tempstring+=";";
			tempstring+=this.dest[i].ctype;
		}
	}
	return tempstring;
}


function makeObject(x,y,broom,t,par)
{
	var pleb=new object(broom);
	if(!t){t=0;}
	if(!par){par=0;}
	pleb.type=t;
	if(pleb.type==ObjectID.Chest)
	{
		pleb.loot=Math.floor(Math.random()*numLoots);
	}
	pleb.x=x;
	pleb.y=y;
	pleb.setup(t,par);
	broom.objects.push(pleb);
	return pleb;
}
