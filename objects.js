

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
//ObjectID.HoldSwitch=3;
//ObjectID.Pickup=4; //maybe instead of having one for each item there's one for pickup and then it get a .type?

function object(oroom) //not a tile, not an enemy
{
	this.sprites=new Array();
	this.curSprite=0;
	this.on=false;
	this.room=oroom;
	this.pickupable=false;
	this.type=0;
	this.active=false;
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
		if((this.type==ObjectID.BlueBlocker) || (this.type==ObjectID.RedBlocker))
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
		this.activate();
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
		this.activateEdit=function()
		{
			this.text = prompt("Enter Sign Text");
		}
	}else if (this.type==ObjectID.Chest) {
		this.sprites=new Array();
		this.sprites.push( Sprite("chest"));
		this.sprites.push( Sprite("chestopen"));
		this.name="Chest";
		this.loot="uuh...GEMS!";
		this.activate=function(){
			this.curSprite=1;
			//give item!
		}
		this.activateEdit=function(){
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
			}
		}
	}else if (this.type==ObjectID.PotStand) {
		this.sprites=new Array();
		this.alwaysWalkable=true;
		this.sprites.push(Sprite("potstand"));
		this.name="Pot stand";
	}else if (this.type==ObjectID.Pot) {
		this.sprites=new Array();
		this.sprites.push(Sprite("pot"));
		this.name="Pot";
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
	}else if (this.type==ObjectID.HeartContainer) {
	    this.sprites=new Array();
		this.alwaysWalkable=true;
		this.sprites.push(Sprite("heartcontainer"));
	    this.name="Heart container";
		this.pickupable=true;
		this.activate=function()
		{
			this.exists=false;
			miles.maxHp+=20;
		}
	}else if (this.type==ObjectID.Feather) {
	    this.sprites=new Array();
		this.alwaysWalkable=true;
		this.sprites.push(Sprite("feather"));
	    this.name="Roc feather";
		this.pickupable=true;
		this.activate=function()
		{
			this.exists=false;
			//miles.hasItem[ObjectID.Feather]
		}
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
			this.exists=false;
			//miles.hasItem[ObjectID.Bow]
		}
	}else if (this.type==ObjectID.Bomb) {
	    this.sprites=new Array();
		this.alwaysWalkable=true;
		this.sprites.push(Sprite("bombpickup"));
	    this.name="Bombs";
		this.pickupable=true;
		this.activate=function()
		{
			this.exists=false;
			//miles.hasItem[ObjectID.Bomb]
			//miles.bombs+=5;
		}
	}else if (this.type==ObjectID.Lantern) {
	    this.sprites=new Array();
		this.alwaysWalkable=true;
		this.sprites.push(Sprite("lantern"));
	    this.name="Lantern";
		this.pickupable=true;
		this.activate=function()
		{
			this.exists=false;
			//miles.hasItem[ObjectID.Lantern]
		}
	}else if (this.type==ObjectID.RumHam) {
	    this.sprites=new Array();
		this.alwaysWalkable=true;
		this.sprites.push(Sprite("rumham"));
	    this.name="RUM HAM";
		//miles.has all
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
	if((this.type==ObjectID.Warp) && (this.active))
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
		//draw fire?
		this.flame.draw(can,cam,xOffh,yOffh);
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
	}else if((this.type==ObjectID.BlueBlocker) || (this.type==ObjectID.RedBlocker))
	{
		tempstring+=";";
		tempstring+=this.on;
	}else if (false)//(this.type==ObjectID.ToggleSwitch)
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
	pleb.x=x;
	pleb.y=y;
	pleb.setup(t,par);
	broom.objects.push(pleb);
	return pleb;
}
