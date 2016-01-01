

var ObjectID={};
ObjectID.Lamp=0;
ObjectID.Key=1;
ObjectID.ToggleSwitch=2;
ObjectID.HoldSwitch=3;
ObjectID.Pickup=4; //maybe instead of having one for each item there's one for pickup and then it get a .type?


function object() //not a tile, not an enemy
{
	this.sprite=null;
	this.on=true;
	this.pickupable=false;
	this.type=0;
	this.x=2;
	this.y=2;
	this.flame=null;
	//this.setup();
}

object.prototype.setup=function(id)
{
	if(id) {this.type=id;}
	if (this.type==0) {
	    this.sprite= Sprite("lamp");
	    this.name="lamp";
		this.flame=new flame(lights);
		this.flame.x=this.x*32+xOffset+2;//miles.x;
		this.flame.y=this.y*32+yOffset-15;//miles.y;
		this.flame.type=0;
		this.flame.alive=true;
		//fires.push(this.flame);
	}else if (this.type==1) {
	    this.sprite= Sprite("heart");
	    this.name="Heart Cointainer";
	}else if (this.type==2) {
	    this.sprite= Sprite("gold");
	    this.name="Gold Coin";
	}else if (this.type==3) {
	    this.sprite= Sprite("silver");
	    this.name="Silver Coin";
	}else if (this.type==4) {
	    this.sprite= Sprite("copper");
	    this.name="Copper Coin";
	}else if (this.type==5) {
	    this.sprite= Sprite("manapotion");
	    this.name="Mana Potion";
	}else if (this.type==6) {
	    this.sprite= Sprite("manaup");
	    this.name="Max Mana Up";
	}else if (this.type==7) {
	    this.sprite= Sprite("redkey");
	    this.name="Red Key";
	}else if (this.type==8) {
	    this.sprite= Sprite("bluekey");
	    this.name="Blue Key";
	}else if (this.type==9) {
	    this.sprite= Sprite("greenkey");
	    this.name="Green Key";
	}else if (this.type==10) {
	    this.sprite= Sprite("yellowkey");
	    this.name="Yellow Key";
	}else if (this.type==11) {
	    this.sprite= Sprite("purplekey");
	    this.name="Purple Key";
	}else if (this.type==12) {
	    this.sprite= Sprite("lightbluekey");
	    this.name="Light Blue Key";
	}else if (this.type==13) {
	    this.sprite= Sprite("woodensword");
	    this.name="Wooden Sword";
	}else if (this.type==14) {
	    this.sprite= Sprite("stonesword");
	    this.name="Stone Sword";
	}else if (this.type==15) {
	    this.sprite= Sprite("ironsword");
	    this.name="Iron Sword";
	}else if (this.type==16) {
	    this.sprite= Sprite("flippers");
	    this.name="Flippers";
	}else if (this.type==17) {
	    this.sprite= Sprite("bomb");
	    this.name="Bomb";
	}else if (this.type==18) {
	    this.sprite= Sprite("hammer");
	    this.name="Hammer";
	}else if (this.type==19) {
	    this.sprite= Sprite("book");
	    this.name="Book";
	}else if (this.type==20) {
	    this.sprite= Sprite("boots");
	    this.name="Speed Boots";
	}else if (this.type==21) {
	    this.sprite= Sprite("rumham");
	    this.name="RUM HAM";
	}else if (this.type==22) {
		this.sprite= Sprite("jumpboots");
		this.name="Doube-Jump Boots";
    }else if (this.type==23) {
		this.sprite= Sprite("feather");
		this.name="Fall Feather";
    }else if (this.type==24) {
		this.sprite= Sprite("launcher");
		this.name="Bomb Launcher";
    }else if (this.type==25) {
		this.sprite= Sprite("stuffedbear");
		this.name="Stuffed Bear";
    }else if (this.type==26) {
		this.sprite= Sprite("crate");
		this.name="Crate";
		this.collectable=false;
		this.pushable=true;
    }else if (this.type==27) {
		this.sprite= Sprite("parachutel");
		this.name="Parachute";
    }else if (this.type==28) {
		this.sprite= Sprite("shovel");
		this.name="Ed's Shovel";
    }else if (this.type==29) {
		this.sprite= Sprite("superbomb");
		this.name="Super Bombs";
    }else if (this.type==30) {
		this.sprite= Sprite("redtunic");
		this.name="Fire Shirt";
	}
}

object.prototype.activate=function()
{
	this.on=!this.on;
	if(!this.on)
	{
		this.flame.flare.alive=false;
		this.flame=null;
	}else{
		this.flame=new flame(lights);
		this.flame.x=this.x*32+xOffset+2;//miles.x;
		this.flame.y=this.y*32+yOffset-15;//miles.y;
		this.flame.type=0;
		this.flame.alive=true;
	}
	//this.flame.alive=!this.flame.alive;
	//this.flame.flare.on=!this.flame.flare.on;
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
	if(this.on)
	{
		this.flame.update();
	}
}
object.prototype.draw=function(can,cam)
{
	//this.sprite.draw(can, this.x*32+xOffset, this.y*32+xOffset);
	this.sprite.draw(can, this.x*32+xOffset, this.y*32+xOffset);
	if((this.type==0) && (this.on))
	{
		//draw fire?
		this.flame.draw(can,cam);
	}
}

function shortcut()
{
	var pleb=new object();
	pleb.type=0;
	pleb.setup();
	curDungeon.curRoom().objects.push(pleb);
	return pleb;
}
