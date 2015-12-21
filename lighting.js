var lights=[];
var COCKS=false;
//TODO give each light it's own gradient track.
function lightenGradient(ctx,cam,source, radius) {
	if(!source.on) {return;}
	var x=source.x-cam.tileX*tileSize+source.offSetX;//17; //campfire
	var y=source.y-cam.tileY*tileSize+source.offSetY;//23; 
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    var rnd = 0.05 * Math.sin(1.1 * (Math.random()*1000+(Date.now() / 1000)));
    radius = radius * (1 + rnd);
    var radialGradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
	if(COCKS)
	{
    radialGradient.addColorStop(0.0, '#AB9');
    radialGradient.addColorStop(0.1 + rnd, '#AA8');
    radialGradient.addColorStop(0.4 + rnd, '#330');
    radialGradient.addColorStop(0.70, '#110');
    radialGradient.addColorStop(1, '#000');
	}else{
	    radialGradient.addColorStop(0.0, '#BB9');
		radialGradient.addColorStop(0.1 + rnd, '#AA8');
		radialGradient.addColorStop(0.4 + rnd, '#330');
		radialGradient.addColorStop(0.70, '#110');
		radialGradient.addColorStop(1, '#000');
	}
    ctx.fillStyle = radialGradient;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * 3.14);
    ctx.fill();
    ctx.restore();
}

function light(x,y,rad,obj)
{
	this.x=x || 0;
	this.y=y || 0;
	//this.tileX=0;
	//this.tileY=0;
	this.offSetX=0;
	this.offSetY=0;
	this.color="white";
	this.on=true;
	this.alive=true;
	this.nightTimer=false; //turn on when dark.
	this.radius=rad||9;
	this.object=null;
	if(obj)
	{	
		this.object=obj;
		this.x=this.object.x//+x;
		this.y=this.object.y//+y;
		this.offSetX=x;
		this.offSetY=y;
	}
	
}

light.prototype.update=function()
{
	if(this.object)
	{
		if(!this.object.alive)
		{
			this.on=false;
			this.alive=false;
		}
		this.x=this.object.x;//+this.offSetX
		this.y=this.object.y;//+this.offSetY;
	}
}

light.prototype.draw=function(ctx,cam) {
	var x=this.x-cam.tileX*tileSize+17; //campfire
	var y=this.y.y-cam.tileY*tileSize+23; 
    ctx.save();
	//ctx.scale(-cam.zoom,-cam.zoom);
    ctx.globalCompositeOperation = 'lighter';
    var rnd = 0.05 * Math.sin(1.1 * Date.now() / 1000);
    radius = this.radius * (1 + rnd);
    var radialGradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
    radialGradient.addColorStop(0.0, '#BB9');
    radialGradient.addColorStop(0.1 + rnd, '#AA8');
    radialGradient.addColorStop(0.4 + rnd, '#330');
    radialGradient.addColorStop(0.70, '#110');
    radialGradient.addColorStop(1, '#000');
    ctx.fillStyle = radialGradient;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * 3.14);
    ctx.fill();
    ctx.restore();
};


flameTypes=[];
flameTypes.Campfire=1;
flameTypes.loose=0;
flameTypes.Torch=3;
flameTypes.wallTorch=4;
flameTypes.Wildfire=5;

var torchSprite=Sprite("torch");

function flame(lightlist,type)
{
	this.type=1;
	this.luminosity=12;
	var offx=0;
	var offy=0;
	if(this.type==flameTypes.Campfire)
	{
		this.luminosity=70;
		offx=17;
		offy=23;
	}else if((this.type==flameTypes.Torch) || (this.type==flameTypes.Torch))
	{
		this.luminosity=10;
	}else if(this.type==flameTypes.Wildfire)
	{
		this.luminosity=440;
	}
	this.sprites=[];
	this.supportSprite=Sprite("campfire");
	this.x=0;
	this.y=0;
	this.xV=0;
	this.yV=0;
	this.alive=true;
	this.aniRate=5;
	this.aniTrack=0;
	this.aniCount=0;
	this.sprites.push(Sprite("fire0"));
	this.sprites.push(Sprite("fire1"));
	this.sprites.push(Sprite("fire2"));
	this.sprites.push(Sprite("fire3"));
	this.flare=new light(offx,offy,this.luminosity,this);
	lightlist.push(this.flare);
	
}

flame.prototype.update=function()
{
	this.aniCount++;
	if(this.aniCount>this.aniRate)
	{
		this.aniCount=0;
		this.aniTrack++;
		if(this.aniTrack>this.sprites.length-1)
		{
			this.aniTrack=0;
		}
		
	}
};

flame.prototype.draw=function(can,cam)
{
	if(!this.alive) {return;}
	can.save();
	can.globalAlpha=0.6;
	can.scale(cam.zoom,cam.zoom);
	if(this.type>0)
	{
		this.supportSprite.draw(can, this.x-cam.tileX*tileSize+1,this.y-cam.tileY*tileSize+4);
	}
	this.sprites[this.aniTrack].draw(can, this.x-cam.tileX*tileSize,this.y-cam.tileY*tileSize);
	can.restore();
};