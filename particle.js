function particle(){
	this.shooter=null;
	this.alive=false;
	this.animated=false;
	this.aniTrack=0;
	this.aniCount=0;
	this.aniRate=2;
	this.x=0;
	this.y=0;
	this.damage=0;
	this.centerX=0;
	this.centerY=0;
	this.angle=0;
	this.collisions=false;
	this.color=bColors[Math.floor(Math.random()*8)];
	this.gravity=false;
	this.xv=0;
	this.yv=0;
	this.textured=false;
	//this.texture=
	this.size=6;
	this.speed=(Math.random()*4)+1;
	this.orbiting=false;
	this.orbx=0;
	this.orby=0;
	this.orbitDiameter=4;
	this.orbitTrack=0;
	this.orbitSpeed=1;
	this.updateRate=40;
	this.destx=0;
	this.desty=0;
	this.gotoDest=false;
	this.lastUpdateTime=0;
	this.startTime=0;
	this.durTime=2000;
	this.gravity=true;
	this.smoker=false;
	this.flicker=true;
	this.exploader=false;
	//this.startTime=
	//this.curTime=
	//this.durTime=2;
}

particle.prototype.checkCollision=function(thing)
{
	//if(((thing.x+this.x)>0) && ((thing.x+this.x)<CANVAS_WIDTH)&& ((thing.y+this.y)>0) && ((thing.y+this.y)<CANVAS_HEIGHT))
	if((this.x+8>thing.x) && (this.x-8<thing.x+thing.width) && (this.y+8>thing.y) && (this.y-8<thing.y+thing.height))
	{
			return true;
	}
	return false;
}

particle.prototype.update=function(){
		var stamp = new Date();
		var tim=stamp.getTime();
		if(this.looper)
		{
			if((this.x>MAP_WIDTH*16) || (this.y>MAP_HEIGHT*16))
			{
				this.y=0;
				this.x=Math.random()*(MAP_WIDTH*16);
				this.startTime=tim;
			}
		}else{
			if(tim-this.startTime>this.durTime) {
				this.alive=false;
			}
		}
		if(tim-this.lastUpdateTime<this.updateRate) { return;}
		if(this.animated)
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
			
		}
		if(this.orbiting)
		{
			this.orbitTrack+=this.orbitSpeed;
			//if((this.shrinking) && (this.orbitDiameter>1)) {this.orbitDiameter--;}
			if (this.orbitTrack>360){ this.orbitTrack=0;}
			this.x=this.orbx+Math.cos(this.orbitTrack* (Math.PI / 180))*this.orbitDiameter;
			this.y=this.orby+Math.sin(this.orbitTrack*(Math.PI / 180))*this.orbitDiameter;
			this.y+=this.yv;
			if(this.gotoDest)
			{
				if(this.orbx<this.destx) {this.orbx+=this.speed;}
				if(this.orbx>this.destx) {this.orbx-=this.speed;}
				if(this.orby<this.desty) {this.orby+=this.speed;}
				if(this.orby>this.desty) {this.orby-=this.speed;}
				if((Math.abs(this.orbx-this.destx)<5) && (Math.abs(this.orby-this.desty)<5)) {this.gotoDest=false;}
			}
		}else
		{
			this.x+=this.xv;
			this.y+=this.yv;
			if(this.flicker)
			{
				this.color=bColors[Math.floor(Math.random()*8)];
			}

		}
		if(this.gravity)
		{
				this.yv+=0.35;
		}
		//this.counter--;
		//time stuff
		//if (this.counter<1) this.alive=false;
		if(this.collisions)
		{
			//TODO
			for(var i=0;i<people.length;i++)
			{
				if(this.checkCollision(people[i]))
				{
					//people[i].doGesture(GestureTypes.Cower,50000);
					//console.log("hit");
					this.alive=false;
					people[i].hurt(this.damage,this.shooter);
					people[i].spurt(-this.angle,this.gravity);
				}
			}
		}

	};

function particleSystem(){
	this.particles = new Array();
	this.updateRate=1;
	this.lastUpdate=0;
}

particleSystem.prototype.start=function(dur,x,y,xv,yv,color,gravity,exploader,alight,lradius){
		var tod=new particle();
		if(!exploader) {exploader=false;}
		tod.x=x;
		tod.y=y;
		tod.xv=xv;
		tod.yv=yv;
		tod.alive=true;
		tod.flicker=false;
		tod.counter=dur;
		tod.color=color;
		tod.gravity=gravity;
		tod.exploader=exploader;
		var stamp = new Date();
		tod.startTime=stamp.getTime();
		tod.durTime=dur;
		if(alight){
			lights.push(new light(0,0,lradius,tod));
		}
		this.particles.push(tod);
	};
particleSystem.prototype.startSmall=function(dur,x,y,xv,yv,color,gravity,exploader,looper,alight,lradius){
		var tod=new particle();
		if(!exploader) {exploader=false;}
		tod.x=x;
		tod.y=y;
		tod.xv=xv;
		tod.yv=yv;
		tod.size=3;
		tod.alive=true;
		tod.flicker=false;
		tod.counter=dur;
		tod.color=color;
		tod.gravity=gravity;
		tod.exploader=exploader;
		var stamp = new Date();
		tod.startTime=stamp.getTime();
		tod.durTime=dur;
		tod.looper=looper;
		if(alight){
			lights.push(new light(0,0,lradius,tod));
		}
		this.particles.push(tod);
	};
particleSystem.prototype.startTextured=function(dur,x,y,xv,yv,color,gravity,exploader,spt){
		var tod=new particle();
		if(!exploader) {exploader=false;}
		tod.x=x;
		tod.y=y;
		tod.xv=xv;
		tod.yv=yv;
		tod.alive=true;
		tod.textured=true;
		tod.sprite=Sprite(spt);
		tod.counter=dur;
		tod.color=color;
		tod.gravity=gravity
		tod.exploader=exploader;
		var stamp = new Date();
		tod.startTime=stamp.getTime();
		tod.durTime=dur;
		this.particles.push(tod);
	};                                        
particleSystem.prototype.shootProjectile=function(x,y,ang,spd,exploader,spt,shooter,dmg){
		var tod=new particle();
		if(!exploader) {exploader=false;}
		tod.shooter=shooter;
		tod.x=x;
		tod.y=y;
		tod.angle=ang;
		tod.damage=dmg;
		tod.xv=Math.cos(ang* (Math.PI / 180))*spd; 
		tod.yv=Math.sin(ang*(Math.PI / 180))*spd;
		tod.alive=true;
		tod.textured=true;
		tod.sprite=Sprite(spt);
		tod.counter=50000;
		tod.collisions=true;
		//tod.color=color;
		tod.gravity=true;
		tod.exploader=exploader;
		var stamp = new Date();
		tod.startTime=stamp.getTime();
		tod.durTime=50000;
		shooter.bullets.push(tod);
		this.particles.push(tod);
	};
particleSystem.prototype.spurt=function(x,y,amt,ang,grav)
{
	if(grav==null)
	{
		grav=false;
	}
	for(var i=0;i<amt;i++)
	{
		ang=270+Math.random()*35;
		if(Math.random()*10>5)
		{
			ang=270-Math.random()*35;
		}
		this.shootSmall(x+16,y+6,ang,2.5,grav);
	}
};
particleSystem.prototype.draw=function(can,cam){
		var c=1;

		for(var i=0;i<this.particles.length;i++)
		{
			if((this.particles[i].alive) && (cam.isOn(this.particles[i])))
			{
				
					
				//can.fillStyle = this.particles[i].color;
				//c= this.particles[i].color;
				if(this.particles[i].textured)
				{
					if(this.particles[i].animated)
					{
						this.particles[i].sprites[this.particles[i].aniTrack].draw(can, this.particles[i].x-cam.tileX*tileSize,this.particles[i].y-cam.tileY*tileSize);
					}else
					{
						this.particles[i].sprite.draw(can, this.particles[i].x-cam.tileX*tileSize,this.particles[i].y-cam.tileY*tileSize);
					}
				}else
				{
					c=can.fillStyle;
					can.fillStyle = this.particles[i].color;
					//can.fillStyle="red";
					can.fillRect(this.particles[i].x-cam.tileX*tileSize, this.particles[i].y-cam.tileY*tileSize, this.particles[i].size*cam.zoom, this.particles[i].size*cam.zoom);
					can.fillStyle=c;
				}
			}
		}
	};
particleSystem.prototype.update=function(){
		for(var i=0;i<this.particles.length;i++)
		{
			this.particles[i].update();
			if(!this.particles[i].alive)
			{
				if(this.particles[i].exploader)
				{
					this.explosion(6,this.particles[i].x,this.particles[i].y,4,this.exploaderLight,9);
				}	
				this.particles.splice(i,1);
			}
		}
	};
particleSystem.prototype.explosion=function(num,x,y,force,alight,lradius){
		for( var i = 0; i < num;i++) {
			var ang = Math.random()*360;
			var vel = Math.random() * 15 + 8;
			this.start(700, x, y, Math.cos(ang* (Math.PI / 180))*vel, Math.sin(ang*(Math.PI / 180))*vel,bColors[Math.floor(Math.random()*8)],true,alight,lradius);
		}
	};
particleSystem.prototype.explosionTextured=function(num,x,y,force,txt){
		for( var i = 0; i < num;i++) {
			var ang = Math.random()*360;
			var vel = Math.random() * 15 + 8;
			this.startTextured(700, x, y, Math.cos(ang* (Math.PI / 180))*vel, Math.sin(ang*(Math.PI / 180))*vel,bColors[Math.floor(Math.random()*8)],true,false,txt);
		}
	};
particleSystem.prototype.shoot=function(x,y,ang,vel){
		this.start(1000, x, y, Math.cos(ang* (Math.PI / 180))*vel, Math.sin(ang*(Math.PI / 180))*vel,"AA0000",true);

	};
particleSystem.prototype.shootSmall=function(x,y,ang,vel,grav){
		if(grav==null)
		{
			grav=true;
		}
		this.startSmall(1000, x, y, Math.cos(ang* (Math.PI / 180))*vel, Math.sin(ang*(Math.PI / 180))*vel,"AA0000",grav);

	};
particleSystem.prototype.shootTextured=function(x,y,ang,vel,tex){
		this.startTextured(1000, x, y, Math.cos(ang* (Math.PI / 180))*vel, Math.sin(ang*(Math.PI / 180))*vel,bColors[Math.floor(Math.random()*8)],true,false,tex);

	};
particleSystem.prototype.flyTo=function(source,dest,vel,alight,lradius){
		var tod=new particle();
		//if(!exploader) {exploader=false;}
		//compute angle from source to dest (see space!), set it up so no dur, dies on arrival. flip sprite if flying left. pre-launch sequence? fly up.
		//set up target object. of targeting, update angle in update. 
		tod.x=source.x;
		tod.y=source.y;
		tod.xv=0;
		tod.yv=0;
		tod.animated=true;
		tod.shrinking=true;
		tod.alive=true;
		tod.textured=true;
		tod.sprite=Sprite("bee");
		tod.sprites=new Array();
		tod.sprites.push(Sprite("raven0"));
		tod.sprites.push(Sprite("raven1"));
		tod.counter=dur;
		tod.color="white";
		tod.gravity=false;
		tod.exploader=false;
		tod.exploaderLight=false;
		var stamp = new Date();
		tod.startTime=stamp.getTime();
		tod.durTime=dur;
		if(alight){
			lights.push(new light(8,8,lradius,tod));
		}
		this.particles.push(tod);

	};	
particleSystem.prototype.startOrbit=function(dur,x,y,diam,spd,alight,lradius){
		var tod=new particle();
		//if(!exploader) {exploader=false;}
		tod.x=x;
		tod.y=y;
		tod.orbx=x;
		tod.orby=y;
		tod.orbiting=true;
		tod.orbitDiameter=diam;
		tod.xv=0;
		tod.yv=0;
		tod.animated=true;
		tod.shrinking=true;
		tod.alive=true;
		tod.orbitSpeed=spd
		tod.textured=true;
		tod.sprite=Sprite("bee");
		tod.sprites=new Array();
		tod.sprites.push(Sprite("raven0"));
		tod.sprites.push(Sprite("raven1"));
		tod.counter=dur;
		tod.color="white";
		tod.gravity=false;
		tod.exploader=false;
		tod.exploaderLight=false;
		var stamp = new Date();
		tod.startTime=stamp.getTime();
		tod.durTime=dur;
		if(alight){
			lights.push(new light(8,8,lradius,tod));
		}
		this.particles.push(tod);
	};
particleSystem.prototype.swarm=function(x,y){
		for(var i=0;i<this.particles.length;i++)
		{
			if(this.particles[i].orbiting)
			{
				var dx=(Math.random()*64)-32;
				var dy=(Math.random()*64)-32;
				/*this.particles[i].orbx=x+dx;
				this.particles[i].orby=y+dy;*/
				this.particles[i].gotoDest=true;
				this.particles[i].destx=x+dx;
				this.particles[i].desty=y+dy;
			}
		}
	};
particleSystem.prototype.unSwarm=function(){
		for(var i=0;i<this.particles.length;i++)
		{
			if(this.particles[i].orbiting)
			{
				this.particles[i].gotoDest=true;
				this.particles[i].destx=Math.floor(Math.random()*CANVAS_WIDTH);
				this.particles[i].desty=Math.floor(Math.random()*CANVAS_HEIGHT);
			}
		}
	};
particleSystem.prototype.colonyCollapse=function(){
		for(var i=0;i<this.particles.length;i++)
		{
			if(this.particles[i].orbiting)
			{
				this.particles[i].gravity=true;
			}
		}
	};
	
particleSystem.prototype.snow=function(density,intensity,wind){

	for(var i=0;i<density;i++)
	{
		this.startSmall(100000,Math.random()*(MAP_WIDTH*16)-600,Math.random()*(280*16)-600,Math.random()*wind,(Math.random()*6)/4+intensity,"white",false,true,true,false,50);
	}
}


var monsta= new particleSystem();
