function akey(k) {  //represents a keyboard button
    k = k || "space";
    this.key =k;
    this.aflag=false;
    this.dflag=false;
	this.desc="A small brown mushroom.";
    this.check= function(){
       
		if (keydown[this.key]) { 
            this.aflag=true;
            return false;
        }
        if((!keydown[this.key]) && (this.aflag===true)){
            this.aflag=false;
            return true;
        }
		
    };
    this.checkDown= function(){
        if (keydown[this.key] )
		{
            return true;
        }
        return false;
    };
    return this;
}

function aPadButton(k,pad) {  //represents a keyboard button
    k = k || 0;
    this.key =k;
    this.aflag=false;
    this.dflag=false;
	this.pressedTime=0;
	this.parentPad=pad;
	this.desc="A small brown mushroom.";
    this.check= function(){
        if ((this.parentPad.buttons[this.key]) && (!this.aflag)){ 
            this.aflag=true;
			timestamp = new Date();
			this.pressedTime=timestamp.getTime();
            return false;
        }
        if((!this.parentPad.buttons[this.key]) && (this.aflag===true)){
            this.aflag=false;
			timestamp = new Date();
			var nurp=timestamp.getTime();
			if(nurp-this.pressedTime<1000)
			{	
				//console.log(nurp-this.pressedTime);
				return true;
			}else
			{
				return false;
			}
        }
		
    };
    this.checkDown= function(){
        /*if ((parentPad.buttons[this.key] )  && (!this.dflag)) { 
            this.dflag=true;
            return true;
        }
        if(!parentPad.buttons[this.key]){
            this.dflag=false;
            return false;
        }*/
		if (this.parentPad.buttons[this.key] )
		{
			return true;
		}
		return false;
    };
    return this;
}

function virtualGamePad()
{
	this.buttons=[];
	this.dpad=[];
	this.keyboard=false;
		
		this.pad = navigator.getGamepads && navigator.getGamepads()[0];
		if(navigator.getGamepads()[0]){
		//if(this.pad){
			this.keyboard=false;
			this.dpad.push(this.pad.axes[0])
			this.dpad.push(this.pad.axes[1]);
			for(var i=0;i<this.pad.buttons.length;i++)
			{
				var daisy=new aPadButton(i,this.pad);
				this.buttons.push(daisy);
			}
			console.log("Controller detected.");
		}else
		{
			this.buttons=[];
			this.keyboard=true;
			this.buttons.push(new akey("z")); //a
			this.buttons[0].desc="Remove hat";
			this.buttons.push(new akey("space")); //b
			this.buttons[1].desc="Jump";
			this.buttons.push(new akey("x")); //x
			this.buttons[2].desc="Change clothes";
			this.buttons.push(new akey("shift")); //y
			this.buttons[3].desc="Run / Pound the ground";
			this.buttons.push(new akey("n"));
			this.buttons[4].desc="Change hair";
			this.buttons.push(new akey("m"));
			this.buttons[5].desc="Change face";
			this.buttons.push(new akey("j"));
			this.buttons[6].desc="Toggle platformer mode";
			this.buttons.push(new akey("return"));
			this.buttons[7].desc="Respawn";
			this.buttons.push(new akey("tab"));
			this.buttons[8].desc="Cycle through ships";
			console.log("No controller detected, use keyboard.");
		}
	
};

virtualGamePad.prototype.switchToKeyboard=function()
{
	this.buttons=[];
	this.keyboard=true;
	this.buttons.push(new akey("z")); //a
	this.buttons[0].desc="Remove hat";
	this.buttons.push(new akey("space")); //b
	this.buttons[1].desc="Jump";
	this.buttons.push(new akey("x")); //x
	this.buttons[2].desc="Change clothes";
	this.buttons.push(new akey("shift")); //y
	this.buttons[3].desc="Run / Pound the ground";
	this.buttons.push(new akey("n"));
	this.buttons[4].desc="Change hair";
	this.buttons.push(new akey("m"));
	this.buttons[5].desc="Change face";
	this.buttons.push(new akey("j"));
	this.buttons[6].desc="Toggle platformer mode";
	this.buttons.push(new akey("return"));
	this.buttons[7].desc="Respawn";
	this.buttons[8]=new akey("tab");
	this.buttons[8].desc="Cycle through your ships";
	console.log("controller no longer detected, switching to keyboard controls");
};

virtualGamePad.prototype.switchToController=function()
{
	this.buttons=[];
	this.dpad=[];
	this.keyboard=false;
	this.pad = navigator.getGamepads && navigator.getGamepads()[0];
	if((!this.keyboard) && (navigator.getGamepads()[0])){
	//if(this.pad){
		this.keyboard=false;
		this.dpad.push(this.pad.axes[0])
		this.dpad.push(this.pad.axes[1]);
		for(var i=0;i<this.pad.buttons.length;i++)
		{
			var daisy=new aPadButton(i,this.pad);
			this.buttons.push(daisy);
		}
	}
	
	console.log("controller detected, disabling keyboard controls.");
};

virtualGamePad.prototype.checkLeft=function()
{
	if(this.keyboard)
	{
		if(keydown.a)
		{
			return true;
		}else
		{
			return false;
		}
	}else
	{
		if(this.pad.axes[0]===-1)
		{
			return true;
		}else
		{
			return false;
		}
	}
};

virtualGamePad.prototype.checkRight=function()
{
	if(this.keyboard)
	{
		if(keydown.d)
		{
			return true;
		}else
		{
			return false;
		}
	}else
	{
		if(this.pad.axes[0]===1)
		{
			return true;
		}else
		{
			return false;
		}
	}
};

virtualGamePad.prototype.checkUp=function()
{
	if(this.keyboard)
	{
		if(keydown.w)
		{
			return true;
		}else
		{
			return false;
		}
	}else
	{
		if(this.pad.axes[1]===-1)
		{
			return true;
		}else
		{
			return false;
		}
	}
};

virtualGamePad.prototype.checkDown=function()
{
	if(this.keyboard)
	{
		if(keydown.s)
		{
			return true;
		}else
		{
			return false;
		}
	}else
	{
		if(this.pad.axes[1]===1)
		{
			return true;
		}else
		{
			return false;
		}
	}
};

virtualGamePad.prototype.checkUpLeft=function()
{
	if(this.keyboard)
	{
		return false;
	}else
	{
		if((this.pad.axes[1]===-1) && (this.pad.axes[0]===-1))
		{
			return true;
		}else
		{
			return false;
		}
	}
};

virtualGamePad.prototype.checkUpRight=function()
{
	if(this.keyboard)
	{
		return false;
	}else
	{
		if((this.pad.axes[1]===-1) && (this.pad.axes[0]===1))
		{
			return true;
		}else
		{
			return false;
		}
	}
};

virtualGamePad.prototype.checkDownLeft=function()
{
	if(this.keyboard)
	{
		return false;
	}else
	{
		if((this.pad.axes[1]===1) && (this.pad.axes[0]===-1))
		{
			return true;
		}else
		{
			return false;
		}
	}
};

virtualGamePad.prototype.checkDownRight=function()
{
	if(this.keyboard)
	{
		return false;
	}else
	{
		if((this.pad.axes[1]===1) && (this.pad.axes[0]===1))
		{
			return true;
		}else
		{
			return false;
		}
	}
};

virtualGamePad.prototype.update=function()
{
	this.pad = navigator.getGamepads && navigator.getGamepads()[0];
	if((!this.keyboard) && (!navigator.getGamepads()[0]))
	{
		this.switchToKeyboard();

	}else if((this.keyboard) && (navigator.getGamepads()[0]))
	{
		this.switchToController();
	}
	
};

//---------------

var edskeys=[];

var pausekey=new akey("space");
pausekey.desc="Pause";
edskeys.push(pausekey);
var debugkey=new akey("l");
debugkey.desc="Debug key";

var logstoreskey=new akey("i");
debugkey.desc="Log Supplies";

var logshipskey=new akey("h");
debugkey.desc="Log Sships";

var logmenkey=new akey("p");
debugkey.desc="Log Men";

var homekey=new akey("home");
debugkey.desc="home key";


var troopskey=new akey("t");
troopskey.desc="Debug key";

edskeys.push(debugkey);
var escapekey=new akey("esc");
escapekey.desc="Pause and bring up menu";
edskeys.push(escapekey);
var pageupkey=new akey("pageup");
pageupkey.desc="Nothing yet."
edskeys.push(pageupkey);
var pagedownkey=new akey("pagedown");
pagedownkey.desc="Nothing yet."
edskeys.push(pagedownkey);
var serversavekey=new akey("i");
serversavekey.desc="Server save, eventually."
edskeys.push(serversavekey);
var serverloadkey=new akey("k");
serverloadkey.desc="Server load, eventually."
edskeys.push(serverloadkey);
var upkey=new akey("up");
upkey.desc="Move camera"
edskeys.push(upkey);
var rightkey=new akey("right");
rightkey.desc="Move camera."
edskeys.push(rightkey);
var downkey=new akey("down");
downkey.desc="Move camera."
edskeys.push(downkey);
var leftkey=new akey("left");
leftkey.desc="Move camera."
edskeys.push(leftkey);

var zoomkey=new akey("z");
zoomkey.desc="Zoom";
edskeys.push(zoomkey);
var helpkey=new akey("h");
helpkey.desc="You just pressed it."
edskeys.push(helpkey);

var tabtownkey =new akey("q");
tabtownkey.desc="Cycle through settlements";
edskeys.push(tabtownkey);

var tabcaravankey =new akey("1"); //192/`
tabcaravankey.desc="Cycle through caravans";
edskeys.push(tabcaravankey);

var consolekey=new akey("c");
consolekey.desc="Toggle custom console.";
edskeys.push(consolekey);

var outfitkey=new akey("o");
outfitkey.desc="change into a random outfit."
edskeys.push(outfitkey);

var startkey=new akey("return");
startkey.desc="It's the fucking enter button."
edskeys.push(startkey);

var logsetkey=new akey("v");
logsetkey.desc="debug"
edskeys.push(logsetkey);

var letterkeys=[];
letterkeys.push(new akey("a"));
letterkeys.push(new akey("b"));
letterkeys.push(new akey("c"));
letterkeys.push(new akey("d"));
letterkeys.push(new akey("e"));
letterkeys.push(new akey("f"));
letterkeys.push(new akey("g"));
letterkeys.push(new akey("h"));
letterkeys.push(new akey("i"));
letterkeys.push(new akey("j"));
letterkeys.push(new akey("k"));
letterkeys.push(new akey("l"));
letterkeys.push(new akey("m"));
letterkeys.push(new akey("n"));
letterkeys.push(new akey("o"));
letterkeys.push(new akey("p"));
letterkeys.push(new akey("q"));
letterkeys.push(new akey("r"));
letterkeys.push(new akey("s"));
letterkeys.push(new akey("t"));
letterkeys.push(new akey("u"));
letterkeys.push(new akey("v"));
letterkeys.push(new akey("w"));
letterkeys.push(new akey("x"));
letterkeys.push(new akey("y"));
letterkeys.push(new akey("z"));

var numberkeys=[];
numberkeys.push(new akey("0"));
numberkeys.push(new akey("1"));
numberkeys.push(new akey("2"));
numberkeys.push(new akey("3"));
numberkeys.push(new akey("4"));
numberkeys.push(new akey("5"));
numberkeys.push(new akey("6"));
numberkeys.push(new akey("7"));
numberkeys.push(new akey("8"));
numberkeys.push(new akey("9"));