function elipseString(str,limit){
	if(str.length>limit)
	{
		var pr="";
		for(var i=0;i<limit-3;i++)
		{
			pr+=str[i];
		}
		pr+="...";
		return pr;
	}else
	{
		return str;
	}
}

var buttons=[];

function button(pt)
{
	this.x=0;
	this.y=0;
	this.font= "8pt Calibri";
	if(pt){
	this.parent=pt;
	}
	this.ID=0;
	this.onlink=false;
	this.center=false;
	this.hasFocus=false;
	this.visible=false;
	this.greyed=false;
	this.decorative=false;
	this.yCenter=true;
	this.yTop=false
	this.object=null;
	this.width=30;
	this.onoff=false;
	this.height=24;
	this.blinkRate=30;
	this.blink=false;
	this.textLimit=20;
	this.choice=null;
	this.text="Go!";
	this.blinkTrack=0;
	this.backColor="green";
	this.borderSize=2;
	this.linked=[]; //turn these off when this goes on.
	this.doThings=function()
	{
		this.on=!this.on;
	};
	this.update=function()
	{
		
		if(this.hasFocus)
		{
			//holdInput=true;
			
			if(startkey.check())
			{
				this.doThings();
				//somehow order ship to move there.
			}
	}	

	};
}

	button.prototype.draw=function(can,cam,nerf)
	{
		if((!nerf) && (!this.visible)) {return;}
		can.save();
		can.font=this.font;
		can.fillStyle="white";
		if(this.hasFocus)
		{
			can.fillStyle="yellow";
		}
		if((this.object) && (this.onlink))
		{
			this.on=this.object.systems[this.ID].on;
		}
		if(this.onoff)
		{
			if(this.on)
			{
				this.backColor="green";
			}else
			{
				this.backColor="red";
			}
		
		}
		can.fillRect(this.x,this.y,this.width+this.borderSize,this.height+this.borderSize);
		if(this.greyed)
		{
			can.fillStyle="grey";
		}else
		{
			can.fillStyle=this.backColor;
		}
		can.fillRect(this.x+this.borderSize,this.y+this.borderSize,this.width-this.borderSize,this.height-this.borderSize);
		can.fillStyle="white";
		if(this.center)
		{
			can.fillText(this.text,this.x+this.width/2-8,this.y+this.height-8);
		}else if(this.yTop)
		{
			var peek=elipseString(this.text,this.textLimit);
			can.fillText(peek,this.x+4,this.y+10);
		}else if(this.yCenter)
		{
			var peek=elipseString(this.text,this.textLimit);
			can.fillText(peek,this.x+4,this.y+14);
		}else
		{
			var peek=elipseString(this.text,this.textLimit);
			can.fillText(peek,this.x+4,this.y+10);
		}
		can.restore();
	};
	button.prototype.specialDraw=function(can,cam,thing)
	{
		//if(!this.visible) {return;} //todo, right now visibe means clickible and not visible.
		can.save();
		can.font=this.font;
		can.fillStyle="white";
		if(this.hasFocus)
		{
			can.fillStyle="yellow";
		}
		if((this.object) && (this.onlink))
		{
			this.on=this.object.systems[this.ID].on;
		}
		if(this.onoff)
		{
			if(this.on)
			{
				this.backColor="green";
			}else
			{
				this.backColor="red";
			}
		
		}
		can.fillRect(this.x,this.y,this.width+this.borderSize,this.height+this.borderSize);
		if(this.greyed)
		{
			can.fillStyle="grey";
		}else
		{
			can.fillStyle=this.backColor;
		}
		can.fillRect(this.x+this.borderSize,this.y+this.borderSize,this.width-this.borderSize,this.height-this.borderSize);
		can.fillStyle="white";
		if(this.yCenter)
		{
			var peek=elipseString(this.text,this.textLimit);
			can.fillText(peek,this.x+4,this.y+14);
		}else if(this.center)
		{
			can.fillText(this.text,this.x+this.width/2-8,this.y+this.height-8);
		}else
		{
			var peek=elipseString(this.text,this.textLimit);
			can.fillText(peek,this.x+4,this.y+10);
		}
		can.restore();
	};
	
	function screenBox(obj)
{
	this.object=obj;
	this.x=20;
	this.y=350;
	this.scale=1;
	this.height=180;
	this.width=80;
	this.page=0;
	this.visible=false;
	this.targetScreen=false;
	this.awayTeamScreen=false;
	this.pages=6;
	this.tabs=[];
	this.type=0;
	this.backColor="blue";
	this.borderSize=4;
	for(var i=0;i<this.pages;i++)
	{
		var smurt="";
		if(i==0) {smurt="Main";}
		if(i==1) {smurt="Crew";}
		if(i==2) {smurt="Helm";}
		if(i==3) {smurt="Combat";} //tactical?
		if(i==4) {smurt="Systems";}
		if(i==5) {smurt="Orders";}
		if(i==6) {smurt="???";}
		dilly=new boxTab(this,i,smurt);
		dilly.width=this.width/this.pages; //really suprised if this works
		boxTabs.push(dilly);
		this.tabs.push(dilly);
	}
	
	if(this.object.ship)
	{
		this.sysButtons=[];
		var ip=0;
		for(var g=0;((g<3)&&(ip<this.object.systems.length));g++)
		{
			for(var h=0;((h<7)&&(ip<this.object.systems.length));h++)
			{
				var liddle=new button(this);
				liddle.object=this.object;
				liddle.parent=this;
				liddle.ID=ip;
				liddle.on=this.object.systems[ip].on;
				liddle.x=this.x+8+g*85;
				liddle.y=this.y+40+h*32;
				liddle.width=80;
				liddle.text=this.object.systems[ip].name;
				liddle.onoff=true;
				//liddle.onlink=true;
				if((this.object.civ) &&(this.object.civ!=civs[playerCiv]))
				{
					liddle.decorative=true;
				}
				
				liddle.doThings=function()
				{
					if(this.parent.damageControlScreen)
					{
						//repair?!
					}else
					{
						if(this.object.systems[this.ID].installed)//also check power!
						{
							
							if(this.object.systems[this.ID].on)
							{
								this.object.systems[this.ID].turnOff();
								//this.on=false
							}else
							{
								if(this.object.systems[this.ID].turnOn())
								{
									//this.on=true;
								}
							}
							this.on=this.object.systems[this.ID].on;
							//this.object.systems[this.ID].on=!this.object.systems[this.ID].on;
						}
					}
				};
				if(!liddle.object.systems[liddle.ID].installed)
				{
					liddle.greyed=true;
				}
				this.sysButtons.push(liddle);
				ip++;
			}
		}
	}
	
	this.damageControlButton=new button(this);
	this.damageControlButton.x=this.x+10+205;
	this.damageControlButton.y=this.y+8;
	this.damageControlButton.width+=15;
	this.damageControlButton.text="Damage";
	this.damageControlButton.object=this.object;
	this.damageControlButton.parent=this;
	this.damageControlButton.doThings=function()
	{
	
		this.parent.damageControlScreen=!this.parent.damageControlScreen;
		if(this.parent.damageControlScreen)
		{
			//do damage shit?
			this.text="Power";
		}else
		{
			this.text="Damage";
		}
	};
	buttons.push(this.damageControlButton);
		
	if((this.object.ship) && (this.object.civ) &&(this.object.civ==civs[playerCiv]))
	{
		this.targButtons=[];
		var ip=0;
		for(var g=0;((g<3)&&(ip<this.object.systems.length));g++)
		{
			for(var h=0;((h<7)&&(ip<this.object.systems.length));h++)
			{
				var liddle=new button(this);
				liddle.object=this.object;
				liddle.parent=this;
				liddle.ID=ip;
				liddle.on=false;
				liddle.x=this.x+8+g*85;
				liddle.y=this.y+40+h*32;
				liddle.width=80;
				liddle.greyed=true;
				liddle.text=this.object.systems[ip].name;
				liddle.onoff=true;
				//liddle.onlink=true;
				liddle.update=function()
				{
					if(this.object.torpedoTarget)
					{
						if(this.object.torpedoTarget.systems[this.ID].installed)
						{
							this.greyed=false;
	
							
						}else
						{
							this.greyed=true;
						}
					}else
					{
						this.greyed=true;
					}
				};
				liddle.doThings=function()
				{
					if(this.object.torpedoTarget)
					{
						if(this.object.torpedoTarget.systems[this.ID].installed)
						{
							this.greyed=false;
							if(!this.on)
							{
								this.on=true
								//do targeting!
							}else
							{
								this.on=false;	
							}
							
						}else
						{
							this.greyed=true;
						}
					}else
					{
						this.greyed=false
					}

				};

				this.targButtons.push(liddle);
				ip++;
			}
		}
		this.headingBox=new textBox(this);
		this.nameBox=new textBox(this);
		this.nameBox.object=this.object;
		this.nameBox.width=120;
		this.nameBox.type=0;
		this.nameBox.visibleOnlyFocus=true;
		this.nameBox.text=this.object.name;
		this.nameBox.limit=21;
		this.nameBox.enter=function()
		{
			this.finalText=this.text;
			this.hasFocus=false;
			this.object.name=this.text;
		};
		this.headingBox.object=this.object;
		this.headingBox.limit=3;
		this.systemBox=new textBox(this);
		this.systemBox.type=1;
		this.systemBox.width=150;
		this.planetBox=new textBox(this);
		this.planetBox.type=1;
		this.planetBox.colorText=true;
		this.systemBox.colorText=true;
		//this.planetBox.hasFocus=true;
		this.planetBox.width=150;
		//this.planetBox.list=civs[playerCiv].knownWorlds;
		this.systemBox.list=stars;
		this.planetBox.list=this.systemBox.list[this.systemBox.listTrack].planets;
		this.raceBox=new textBox(this);
		this.raceBox.type=1;
		this.raceBox.width=150;
		this.shipBox=new textBox(this);
		this.shipBox.type=1;
		//this.planetBox.hasFocus=true;
		this.shipBox.width=150;
		//this.planetBox.list=civs[playerCiv].knownWorlds;
		this.raceBox.list=civs;

		this.shipBox.list=this.raceBox.list[this.raceBox.listTrack].ships;
		textBoxes.push(this.headingBox);
		textBoxes.push(this.systemBox);
		textBoxes.push(this.planetBox);
		textBoxes.push(this.raceBox);
		textBoxes.push(this.shipBox);
		textBoxes.push(this.nameBox);
		
		this.backButton=new button(this);
		this.backButton.x=this.x+10+214;
		this.backButton.y=this.y+8;
		this.backButton.width+=6;
		this.backButton.text="Target";
		this.backButton.object=this.object;
		this.backButton.parent=this;
		this.backButton.doThings=function()
		{
			this.parent.targetScreen=!this.parent.targetScreen;
			if(this.parent.targetScreen)
			{
				this.text="Back";
			}else
			{
				this.text="Target";
			}
		};
		buttons.push(this.backButton);
		
		this.awayTeamButton=new button(this);
		this.awayTeamButton.x=this.x+10+210;
		this.awayTeamButton.y=this.y+8;
		this.awayTeamButton.width+=10;
		this.awayTeamButton.text="Away";
		this.awayTeamButton.object=this.object;
		this.awayTeamButton.parent=this;
		this.awayTeamButton.doThings=function()
		{
			this.on=!this.on;
			this.parent.awayTeamScreen=!this.parent.awayTeamScreen;
			if(this.parent.awayTeamScreen)
			{
				this.text="Back";
			}else
			{
				this.text="Away";
			}
		};
		buttons.push(this.awayTeamButton);
		
		this.evacButton=new button(this);
		this.evacButton.x=this.x+10+210;
		this.evacButton.y=this.y+240;
		this.evacButton.width+=10;
		this.evacButton.text="Evac";
		this.evacButton.object=this.object;
		this.evacButton.parent=this;
		this.evacButton.update=function()
		{
			
			
			if((!this.object.evacDone) && (this.object.systems[SystemIDs.EscapePods].functional()))
			{
				this.greyed=false;
			}else
			{
				this.greyed=true;
			}
		};
		this.evacButton.doThings=function()
		{
			selectedShip.Evac(selectedShip.civ.homeworld);
			//captain?
		};
		buttons.push(this.evacButton);
		
		
		
		this.awayBeamButton=new button(this);
		this.awayBeamButton.x=this.x+10+210;
		this.awayBeamButton.y=this.y+240;
		this.awayBeamButton.width+=10;
		this.awayBeamButton.text="Beam";
		this.awayBeamButton.object=this.object;
		this.awayBeamButton.parent=this;
		this.awayBeamButton.update=function()
		{
			
			
			if((this.object.awayTeam.length>0) && (this.object.systems[SystemIDs.Transporter].functional()) && (this.object.beamTarget))
			{
				this.greyed=false;
			}else
			{
				this.greyed=true;
			}
		};
		this.awayBeamButton.doThings=function()
		{
			//beam back!, if no target, retur
			if(this.object.awayTeamAt!==null)
			{
				this.object.beamUpAwayTeam();
			}else if(this.object.beamTarget)
			{
				this.object.beamDown(this.object.beamTarget);
			}
			if(this.object.awayTeamAt)
			{
				this.text="Recall";
			}else
			{
				this.text="Beam";
			}
		};
		buttons.push(this.awayBeamButton);
		
		this.awayFormButton=new button(this);
		this.awayFormButton.x=this.x+10+160;
		this.awayFormButton.y=this.y+8;
		this.awayFormButton.width+=10;
		this.awayFormButton.text="Form";
		this.awayFormButton.object=this.object;
		this.awayFormButton.parent=this;
		this.awayFormButton.update=function()
		{
			if((this.object.awayTeamAt))
			{
				this.greyed=true;
			}else
			{
				this.greyed=false;
			}
		};
		this.awayFormButton.doThings=function()
		{
			
			//console.log(this.object.awayTeam.length);
			if((!this.object.awayTeam)||(this.object.awayTeam.length<1))
			{
				console.log("forming away team");
				if(this.object.prepareAwayTeam(this.object.men.length-2))
				{
					this.text="Disband";
				}
			}else
			{
				if(this.object.awayTeam)
				{
					this.object.recallAwayTeam();
					console.log("disbanding away team");
				}
				this.text="Form";
			}
		};
		buttons.push(this.awayFormButton);
		
		this.mapShowButton=new button(this);
		this.mapShowButton.x=this.x+10+210;
		this.mapShowButton.y=this.y+45;
		this.mapShowButton.object=this.object;
		this.mapShowButton.text="Map";
		this.mapShowButton.parent=this;
		this.mapShowButton.center=true;
		this.mapShowButton.doThings=function()
		{
			Map.visible=true;
		};
		buttons.push(this.mapShowButton);
		
		this.manualControlButton=new button(this);
		this.manualControlButton.x=this.x+10+205;
		this.manualControlButton.width+=15;
		this.manualControlButton.y=this.y+75;
		this.manualControlButton.object=this.object;
		this.manualControlButton.text="Manual";
		this.manualControlButton.parent=this;
		//this.manualControlButton.center=true;
		this.manualControlButton.doThings=function()
		{
			this.object.manualHelm();
		};
		buttons.push(this.manualControlButton);
		
		this.goPlanetButton=new button(this);
		this.goPlanetButton.x=this.x+10+120;
		this.goPlanetButton.y=this.y+145;
		this.goPlanetButton.object=this.object;
		this.goPlanetButton.parent=this;
		this.goPlanetButton.center=true;
		this.goPlanetButton.doThings=function()
		{
			
			if(!this.parent.planetBox) {return;}
			if(!this.parent.planetBox.list) {return;}
			var sally=this.parent.planetBox.list[this.parent.planetBox.listTrack];
			if(!sally) {return;}
			/*this.object.orderOrbit(sally);
			this.object.destination=null;
			console.log(this.object.name+" heading to "+sally.name);*/
			this.object.setDestination(sally,this.object.crusingSpeed);
		};
		buttons.push(this.goPlanetButton);
		this.goShipButton=new button(this);
		this.goShipButton.x=this.x+10+120;
		this.goShipButton.y=this.y+145;
		this.goShipButton.object=this.object;
		this.goShipButton.parent=this;
		this.goShipButton.center=true;
		this.goShipButton.doThings=function()
		{
			console.log(this.object.name,this.visible,this.parent.visible);
			if(!this.parent.shipBox) {return;}
			if(!this.parent.shipBox.list) {return;}
			var sally=this.parent.shipBox.list[this.parent.shipBox.listTrack];
			if(!sally) {return;}
			if(this.object.orbiting)
			{
				this.object.orderLeaveOrbit();
			}
			this.object.setDestination(sally,this.object.crusingSpeed);
		};
		buttons.push(this.goShipButton);

		this.speedPlusButton=new button(this);
		this.speedPlusButton.x=this.x+10+120;
		this.speedPlusButton.y=this.y+86;
		this.speedPlusButton.width=12;
		this.speedPlusButton.height=12;
		this.speedPlusButton.text="+";
		this.speedPlusButton.object=this.object;
		this.speedPlusButton.parent=this;
		this.speedPlusButton.yCenter=false;
		this.speedPlusButton.update=function()
		{
			if((this.object.orbiting) || (!this.object.systems[SystemIDs.Engines].functional()) || (this.object.desiredSpeed==this.object.maxSpeed))
			{
				this.greyed=true;
			}else
			{
				this.greyed=false;
			}
		}
		this.speedPlusButton.doThings=function()
		{
			this.object.desiredSpeed+=0.5;
			if(this.object.desiredSpeed>this.object.maxSpeed)
			{
				this.object.desiredSpeed=this.object.maxSpeed;
			}
		};
		buttons.push(this.speedPlusButton);
		
		this.speedMinusButton=new button(this);
		this.speedMinusButton.x=this.x+10+46;
		this.speedMinusButton.y=this.y+86;
		this.speedMinusButton.text="-";
		this.speedMinusButton.width=12;
		this.speedMinusButton.height=12;
		this.speedMinusButton.object=this.object;
		this.speedMinusButton.parent=this;
		this.speedMinusButton.yCenter=false;
		
		this.speedMinusButton.update=function()
		{
			if((this.object.orbiting) || (!this.object.systems[SystemIDs.Engines].functional()) ||(this.object.desiredSpeed===0))
			{
				this.greyed=true;
			}else
			{
				this.greyed=false;
			}
		}
		this.speedMinusButton.doThings=function()
		{
			this.object.desiredSpeed-=0.5;
			if(this.object.desiredSpeed<1)
			{
				this.object.desiredSpeed=0;
			}
		};
		
		buttons.push(this.speedMinusButton);
		
		for(var i=0;i<this.sysButtons.length;i++)
		{
			for(var j=0;j<this.targButtons.length;j++) //only for radio buttons!
			{
				if(i!=j)
				{
					this.targButtons[i].linked.push(this.targButtons[j]);
				}
			}
			buttons.push(this.sysButtons[i]);
			buttons.push(this.targButtons[i]);
		}
	}
}
	screenBox.prototype.update=function()
	{
		if((this.visible) && (showShipMenu)){
			for(var i=0;i<this.tabs.length;i++)
			{
				this.tabs[i].visible=true;
			}
			if((this.headingBox) && (this.systemBox) &&(this.planetBox))
			{
				this.planetBox.list=this.systemBox.list[this.systemBox.listTrack].planets;
				this.shipBox.list=this.raceBox.list[this.raceBox.listTrack].ships;
				if((this.page==2)&&(this.object==selectedShip)&&(this.object.systems[SystemIDs.Navigation].functional()))
				{
					this.headingBox.visible=true;
					this.systemBox.visible=true;
					this.planetBox.visible=true;
					this.goPlanetButton.visible=true;
					this.raceBox.visible=true;
					this.shipBox.visible=true;
					this.speedPlusButton.update();
					this.speedMinusButton.update();
					this.goShipButton.visible=true;
					this.speedPlusButton.visible=true;
					this.speedMinusButton.visible=true;
					this.mapShowButton.visible=true;
					this.manualControlButton.visible=true;
				}else
				{
					this.headingBox.visible=false;
					this.systemBox.visible=false;
					this.planetBox.visible=false;
					this.goPlanetButton.visible=false;
					this.mapShowButton.visible=false;
					this.raceBox.visible=false;
					this.shipBox.visible=false;
					this.speedPlusButton.visible=false;
					this.speedMinusButton.visible=false;
					this.goShipButton.visible=false;
					this.manualControlButton.visible=false;
				}
				if((this.page===0)&&(this.object==selectedShip))
				{
					this.nameBox.visible=true;
				}else
				{
					this.nameBox.visible=false;
				}
				if((this.page==4) && (this.object==selectedShip)) //yaar?
				
				{
					for(var i=0;i<this.sysButtons.length;i++)
					{
						this.sysButtons[i].visible=true;
						this.sysButtons[i].update();
					}
					this.damageControlButton.visible=true;
				}else
				{
					for(var i=0;i<this.sysButtons.length;i++)
					{
						this.sysButtons[i].visible=false;
					}
					this.damageControlButton.visible=false;
				}
				if((this.page==3) && (this.object==selectedShip)) //yaar?
				
				{
					for(var i=0;i<this.targButtons.length;i++)
					{
						this.targButtons[i].visible=true;
						this.targButtons[i].update();
					}
					this.backButton.visible=true;
				}else
				{
					for(var i=0;i<this.targButtons.length;i++)
					{
						this.targButtons[i].visible=false;
					}
					this.backButton.visible=false;
				}
				if((this.page==1) && (this.object==selectedShip)) //yaar?
				{
					this.awayTeamButton.visible=true;
					if(this.awayTeamScreen)
					{
						this.awayBeamButton.visible=true;
						this.awayBeamButton.update();
						this.awayFormButton.visible=true;
						this.awayFormButton.update();
						this.evacButton.visible=false;
					}else
					{
						this.awayBeamButton.visible=false;
						this.awayFormButton.visible=false;
						this.evacButton.visible=true;
						this.evacButton.update();
					}
				}else
				{
					this.awayTeamButton.visible=false;
					this.awayFormButton.visible=false;
					this.awayBeamButton.visible=false;
					this.evacButton.visible=false;
				}
				this.headingBox.update();
				var emily=this.systemBox.listTrack;
				this.systemBox.update();
				if(this.systemBox.listTrack!=emily)
				{
					this.planetBox.list=this.systemBox.list[this.systemBox.listTrack].planets;	
					this.planetBox.listTrack=0;
				}

				emily=this.raceBox.listTrack;
				this.raceBox.update();
				if(this.raceBox.listTrack!=emily)
				{
					this.shipBox.list=this.raceBox.list[this.raceBox.listTrack].ships;	
					this.shipBox.listTrack=0;
				}
				this.shipBox.update();
				this.planetBox.update();
				this.nameBox.update();
			}
		}else
		{
			for(var i=0;i<this.tabs.length;i++)
			{
				this.tabs[i].visible=false;
			}
			if((this.headingBox) && (this.systemBox) &&(this.planetBox))
			{
				this.headingBox.visible=false;
				this.systemBox.visible=false;
				this.planetBox.visible=false;
				this.goPlanetButton.visible=false;
				this.mapShowButton.visible=false;
				this.raceBox.visible=false;
				this.shipBox.visible=false;
				this.speedPlusButton.visible=false;
				this.speedMinusButton.visible=false;
				this.goShipButton.visible=false;
				
				this.nameBox.visible=false;
		
				for(var i=0;i<this.sysButtons.length;i++)
				{
					this.sysButtons[i].visible=false;
				}
				this.damageControlButton.visible=false;
				
				for(var i=0;i<this.targButtons.length;i++)
				{
					this.targButtons[i].visible=false;
				}
				this.backButton.visible=false;
		
				this.awayTeamButton.visible=false;
				this.awayFormButton.visible=false;
				this.awayBeamButton.visible=false;
				this.evacButton.visible=false;
				this.manualControlButton.visible=false;
			}
		}
		
	};
	screenBox.prototype.turnPage=function(back)
	{
		if(!back)
		{
			this.page++;
			if(this.page>this.pages-1)
			{
				//this.page=this.pages-1;
				this.page=0;
			}
		}else
		{
			this.page--;
			if(this.page<0)
			{
				//this.page=0;
				this.page=this.pages-1;
			}
		}

	};
	screenBox.prototype.draw=function(can,cam)
	{
		if(!this.visible){return;}
		can.save();
		can.font = "12pt Calibri";
		can.fillStyle="white";
		can.globalAlpha=0.75;
		can.fillRect(this.x,this.y,this.width+this.borderSize,this.height+this.borderSize);
		can.fillStyle=this.backColor;
		can.globalAlpha=0.65;
		can.fillRect(this.x+this.borderSize,this.y+this.borderSize,this.width-this.borderSize,this.height-this.borderSize);
		can.fillStyle="white";
		if(this.object.ship)
		{
			for(var i=0;i<this.tabs.length;i++)
			{
				//if(this.page==this.tabs[i].page)
				//{
					this.tabs[i].draw(can,cam);
				//}
			}
			if(this.page===0)
			{
				
				if(this.object.civ==civs[playerCiv])
				{
					can.fillText(this.object.prefix+" "+this.object.name,this.x+10,this.y+2+16);
					this.nameBox.x=this.x+50;
					this.nameBox.y=this.y+4;
					this.nameBox.draw(can,cam);
				}else
				{
					can.fillText(this.object.prefix+" "+this.object.name,this.x+10,this.y+2+16);
				}
				can.fillText(this.object.civ.name+ " Lanch Date: " +this.object.launchDate,this.x+10,this.y+2+32);
				var reek=elipseString(this.object.actionText,38);
				can.fillText(reek,this.x+10,this.y+2+48);
				can.fillText("HP: "+this.object.hp+"/"+this.object.maxHp,this.x+10,this.y+2+64);
				can.fillText("Shields: "+this.object.shields+"/"+this.object.maxShields,this.x+10,this.y+2+80);
				
				can.fillText("Phasers:"+this.object.phaserBanks.length+" Torpedos: "+this.object.numTorpedos+" Mines: "+this.object.numMines,this.x+10,this.y+2+96);
				if(this.object.systems[SystemIDs.Targeting].functional())
				{
					if(this.object.torpedoTarget)
					{
						can.fillText("Targeting: "+this.object.torpedoTarget.name,this.x+10,this.y+2+112);
					}else
					{
						can.fillText("No Weapons Lock",this.x+10,this.y+2+112);
					}
				}else
				{
					can.fillStyle="red";
					can.fillText("Weapons Offline!",this.x+10,this.y+2+112);
					can.fillStyle="white";
				}
				var gt=can.font;
				can.font== "8pt Calibri";
				if(this.object.awayTeamAt)
				{
					can.fillText("Away team on "+this.object.awayTeamAt.name,this.x+10,this.y+2+262);
				}
				can.font=gt;
			}else if(this.page==1)
			{
				can.fillText(this.object.prefix+" "+this.object.name,this.x+10,this.y+2+16);
				
				if(!this.awayTeamScreen)
				{
					can.fillText("O2:"+(this.object.oxygen/10)+"%",this.x+10,this.y+2+32);
					for(var i=0;i<this.object.men.length;i++)
					{
						can.fillText(this.object.men[i].title+" "+this.object.men[i].name+" Lvl: "+this.object.men[i].level,this.x+10,this.y+2+46+i*32);
						can.fillText("   "+this.object.men[i].hp+"/"+this.object.men[i].maxHp,this.x+10,this.y+2+46+i*32+16);
					}
					if(this.evacButton)
					{
						this.evacButton.draw(can,cam);
					}
				}else
				{
					if(!this.object.systems[SystemIDs.Transporter].functional())
					{	
						can.fillStyle="red";
						can.fillText("Transporter Offline!",this.x+10,this.y+2+260);
						can.fillStyle="white";
					}else
					{
						var gt=can.font;
						can.font== "8pt Calibri";
						can.fillText("hit "+beamtargetkey.key.toUpperCase()+" to choose a target",this.x+10,this.y+2+242);
						if(this.object.beamTarget)
						{
							can.fillText("Targeting "+this.object.beamTarget.name,this.x+10,this.y+2+262);
						}
						can.font=gt;
					}
					for(var i=0;i<this.object.awayTeam.length;i++)
					{
						var poole="ship.";
						var snoole=(this.object.oxygen/10)+"%";
						if(this.object.awayTeamAt)
						{
							poole=this.object.awayTeamAt.name+".";
							if(this.object.awayTeamAt.ship) 
							{
								snoole=this.object.awayTeamAt.oxygen/10+"%";
							}else if(this.object.awayTeamAt.planet) 
							{
								snoole=this.object.awayTeamAt.oxygen/10+"%";
							}else
							{
								snoole="110%";
							}
						}
						can.fillText("Away team on "+poole,this.x+10,this.y+2+32);
						can.fillText("O2: "+snoole,this.x+10,this.y+2+48);
						can.fillText(this.object.awayTeam[i].title+" "+this.object.awayTeam[i].name+" Lvl: "+this.object.awayTeam[i].level,this.x+10,this.y+2+64+i*32);
						can.fillText("   "+this.object.awayTeam[i].hp+"/"+this.object.awayTeam[i].maxHp,this.x+10,this.y+2+64+i*32+16);
					}
				}
				if(!this.object.systems[SystemIDs.LifeSupport].functional())
				{
					can.fillStyle="red";
					can.fillText("LIFE SUPORT OFFLINE",this.x+128,this.y+2+32);
					can.fillStyle="white";
				}
				if(this.object.civ==civs[playerCiv])
				{
					this.awayTeamButton.draw(can,cam);
					this.awayBeamButton.draw(can,cam);
					this.awayFormButton.draw(can,cam);
				}
			}else if(this.page==2)//navigation
			{
				can.fillText(this.object.prefix+" "+this.object.name,this.x+10,this.y+2+16);
				can.fillText("Navigation: ",this.x+10,this.y+2+32);
				var cindy=Math.floor(this.object.heading);
				if(cindy>360) {cindy-=360;}
				can.fillText("Heading: "+cindy,this.x+10,this.y+2+48);
				var destext="Nowhere";
				var destdist=0;
				if(this.object.destination) 
				{
					destext="Starship "+this.object.destination.name;
					destdist=Math.floor(distance(this.object,this.object.destination));
				}
				if(this.object.desiredOrbitTarg) 
				{
					destext="Destination: "+this.object.desiredOrbitTarg.name+","+this.object.desiredOrbitTarg.sun.name+ " system";
					destext=elipseString(destext,37);
					destdist=Math.floor(distance(this.object,this.object.desiredOrbitTarg));
				}
				can.fillText(destext,this.x+10,this.y+2+64);
				can.fillText("Distance: "+destdist+" AU",this.x+10,this.y+2+80);
				var neeep=Math.round(this.object.speed*10)/10;
				can.fillText("Speed:      "+neeep+"/"+this.object.maxSpeed,this.x+10,this.y+2+96); //todo add decimal place
				
				if(this.object.civ==civs[playerCiv])
				{
					this.speedPlusButton.draw(can,cam);
					this.speedMinusButton.draw(can,cam);
				}
				
				if((this.object.civ==civs[playerCiv]) && (this.object.systems[SystemIDs.Navigation].functional()) &&(!this.object.manualControl))
				{
					can.fillStyle="white";
					can.fillText("Enter Heading:",this.x+10,this.y+2+122);
					this.headingBox.x=this.x+10+110;
					this.headingBox.y=this.y+112;
					this.headingBox.draw(can,camera);
					
					can.fillText("System:",this.x+10,this.y+2+144);
					this.systemBox.x=this.x+10+50;
					this.systemBox.y=this.y+132;
					this.systemBox.draw(can,camera);
					
					can.fillText("Planet:",this.x+10,this.y+2+160);
					this.planetBox.x=this.x+10+50;
					this.planetBox.y=this.y+152;
					this.planetBox.draw(can,camera);
					
					this.goPlanetButton.x=this.x+10+208;
					this.goPlanetButton.y=this.y+136;
					this.goPlanetButton.draw(can,camera);
					
					this.mapShowButton.draw(can,camera);
					this.manualControlButton.draw(can,camera);
					
					can.fillText("Civ:",this.x+10,this.y+2+184);
					this.raceBox.x=this.x+10+50;
					this.raceBox.y=this.y+174;
					this.raceBox.draw(can,camera);
					
					can.fillText("Ship:",this.x+10,this.y+2+204);
					this.shipBox.x=this.x+10+50;
					this.shipBox.y=this.y+194;
					this.shipBox.draw(can,camera);
					
					this.goShipButton.x=this.x+10+208;
					this.goShipButton.y=this.y+182;
					this.goShipButton.draw(can,camera);
				}else if((this.object.civ==civs[playerCiv]) && (!this.object.systems[SystemIDs.Navigation].functional()))
				{
					can.fillStyle="red";
					can.fillText("NAVIGATION OFFLINE",this.x+10,this.y+2+122);
					can.fillStyle="white";
				}else if(this.object.manualControl)
				{
					can.fillText("Manual Control, use Arrow keys.",this.x+10,this.y+2+140);
					can.fillText(firekey.key.toUpperCase()+" to fire",this.x+10,this.y+2+153);
					if(this.mapShowButton){
						this.mapShowButton.draw(can,camera);
					}
					if(this.manualControlButton)
					{
						this.manualControlButton.draw(can,camera);
					}
				}
			}else if(this.page==3)//combat //somehow add list of nearby hostile ships.
			{
				can.fillText(this.object.prefix+" "+this.object.name,this.x+10,this.y+2+16);
				
				if((this.object.systems[SystemIDs.Targeting].functional()) && (this.object.civ==civs[playerCiv]))
				{
					this.backButton.draw(can,cam);
					if(this.targetScreen)
					{
						
						if(this.object.torpedoTarget)
						{
							can.fillText("Targeting "+this.object.torpedoTarget.name,this.x+10,this.y+2+32);
						}else
						{
							can.fillText(this.object.nearbyHostiles.length+" enemy ships in sensor range.",this.x+10,this.y+2+32);
						}
						
						for(var i=0;i<this.targButtons.length;i++)
						{
							this.targButtons[i].draw(can,cam);
						}
					}else if(this.object.torpedoTarget)
					{
						can.fillText(this.object.nearbyHostiles.length+" enemy ships in sensor range.",this.x+10,this.y+2+32);
						can.fillText("Targeting: "+this.object.torpedoTarget.name,this.x+10,this.y+2+64);
						can.fillText(this.object.torpedoTarget.civ.name+" "+this.object.torpedoTarget.class.name +" Starship",this.x+10,this.y+2+80); //todo class!
						can.fillText("Target HP: "+this.object.torpedoTarget.hp+"/"+this.object.torpedoTarget.maxHp,this.x+10,this.y+2+96);
						can.fillText("Target Shields: "+this.object.torpedoTarget.shields+"/"+this.object.torpedoTarget.maxShields,this.x+10,this.y+2+112);
						can.fillText("Target Crew: "+this.object.torpedoTarget.men.length,this.x+10,this.y+2+124);
						//todo, list whats systems are offline
				
					}else
					{
						can.fillText(this.object.nearbyHostiles.length+" enemy ships in sensor range.",this.x+10,this.y+2+32);
						can.fillText("No Weapons Lock",this.x+10,this.y+2+64);
						can.fillText("Hit "+ targetkey.key.toUpperCase()+" to choose a target",this.x+10,this.y+2+80);
						if(!this.object.systems[SystemIDs.Weapons].functional())
				{
					can.fillStyle="red";
					can.fillText("Weapons Offline!",this.x+10,this.y+2+150);
					can.fillStyle="white";
				}
				if((this.object.systems[SystemIDs.Shields].installed) && (!this.object.systems[SystemIDs.Shields].functional()))
				{
					can.fillStyle="red";
					can.fillText("Shields Offline!",this.x+10,this.y+2+166);
					can.fillStyle="white";
				}
				if(this.object.breaches>0)
				{
					can.fillStyle="red";
				
					if(this.object.breaches>1)
					{
						can.fillText("Multiple Hull Breaches!",this.x+10,this.y+2+178);
					
					}else
					{
						can.fillText("Hull Breached!",this.x+10,this.y+2+178);
					
					}
					
					can.fillStyle="white";
				}
					}
				}else if(this.object.civ===civs[playerCiv])
				{
					can.fillStyle="red";
					can.fillText("Targeting System Offline!",this.x+10,this.y+2+64);
					can.fillStyle="white";
				}
				
			}else if(this.page==4)//Systems
			{
				can.fillText(this.object.prefix+" "+this.object.name,this.x+10,this.y+2+16);
				this.damageControlButton.visible=true;
				this.damageControlButton.draw(can,camera);
				if(!this.damageControlScreen)
				{
					can.fillText("Power Managment  Power: "+this.object.power+"/"+this.object.maxPower,this.x+10,this.y+2+32);
				}else
				{
					can.fillText("Damage Control  Power: "+this.object.power+"/"+this.object.maxPower,this.x+10,this.y+2+32);
				}
				if(true)//(this.object.civ==civs[playerCiv])
				{
					for(var i=0;i<this.sysButtons.length;i++)
					{
						if(this.damageControlScreen)
						{
							this.sysButtons[i].specialDraw(can,cam,false);
						
						}else
						{
							this.sysButtons[i].draw(can,cam,true);
						}
					}
				}
			}else if(this.page==5)
			{
				can.fillText(this.object.prefix+" "+this.object.name,this.x+10,this.y+2+16);
				can.fillText("Orders & Policies: ",this.x+10,this.y+2+32);
			}else if(this.page==6) //unused
			{
				can.fillText(this.object.prefix+" "+this.object.name,this.x+10,this.y+2+16);
				can.fillText("????",this.x+10,this.y+2+32);
			}
		}else if(this.object.planet)
		{
			can.fillText(this.object.name,this.x+10,this.y+2+16);
			if(!this.object.civ)
			{
				can.fillText("Unclaimed planet",this.x+10,this.y+2+32);
			}
			else if(this.object==this.object.civ.homeworld)
			{
				can.fillText(this.object.civ.name+" Homeworld",this.x+10,this.y+2+32);
			}else
			{
				can.fillText(this.object.civ.name+" Colony",this.x+10,this.y+2+32);
			}
			can.fillText(this.object.sun.name+" system",this.x+10,this.y+2+48);
			can.fillText("HP: "+this.object.hp+"/"+this.object.maxHp,this.x+10,this.y+2+65);
			can.fillText("Shields: "+this.object.shields+"/"+this.object.maxShields,this.x+10,this.y+2+80);
			
			can.fillText("Production: "+this.object.getProduction()+" Research: "+this.object.getResearch(),this.x+10,this.y+2+96);
			
			can.fillText("Buildings: ",this.x+10,this.y+2+112);
			for(var i=0;i<this.object.buildings.length;i++)
			{
				can.fillText(this.object.buildings[i].name,this.x+10,this.y+2+128+i*16);
			}
		}else if(this.object.platform)
		{
			can.fillText(this.object.name,this.x+10,this.y+2+16);
			can.fillText(this.object.civ.name,this.x+10,this.y+2+32);
			can.fillText("HP: "+this.object.hp+"/"+this.object.maxHp,this.x+10,this.y+2+48);
			can.fillText("Shields: "+this.object.shields+"/"+this.object.maxShields,this.x+10,this.y+2+64);
			
			can.fillText("Torpedos: "+this.object.numTorpedos+" Mines: "+this.object.numMines,this.x+10,this.y+2+80);
			if(this.object.torpedoTarget)
			{
				can.fillText("Targeting: "+this.object.torpedoTarget.name,this.x+10,this.y+2+96);
			}else
			{
				can.fillText("No Weapons Lock",this.x+10,this.y+2+96);
			}
		}

		can.restore();
	};

function fuckoff()
{
	selectedShip.items.push(new shopItem(Item.RedShirt));
	selectedShip.items.push(new shopItem(Item.HandPhaser));
	var goat=new buyScreen(selectedShip,true);
	goat.setup();
	goat.defaultItemList();
	civs[playerCiv].messages.push(goat);
}

function progressBar()
{
	this.x=0;
	this.y=0;
	this.maxVal=100;
	this.scale=1;
	this.height=15;
	this.val=100;
	this.color="green";
	this.backColor="black";
	this.label="Wangs: ";
}
	progressBar.prototype.draw=function(can,cam)
	{
		can.save();
		can.font = "12pt Calibri";
		this.fillStyle="white";
		var xoff=7*this.label.length;
		can.fillRect(this.x+xoff,this.y,104,this.height+4);
		can.fillText(this.label,this.x,this.y+13);
		
		can.fillStyle=this.backColor;
		can.fillRect(this.x+xoff+2,this.y+2,100,this.height);
		can.fillStyle=this.color;
		var percent=this.val/this.maxVal*100;
		can.fillRect(this.x+xoff+3,this.y+3,percent,this.height-2);
		can.restore();
	};