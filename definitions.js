var backspaced=false;
var tabbed=false;
var keydown={};
var multiplayer=false;
var holdInput=false;
var customConsole=true;
var trainTick=false;
var stayDay=true;
var graphboat=null;
var graph=null;
var shiftdown=false;
var graph=null;

var Darkness=14;

var randomPhrases=new Array();
randomPhrases.push("I dunno much about computers other than the one I got at my house.");
randomPhrases.push("You know those guitars that are like....double guitars?");
randomPhrases.push("Sometimes, cats can be afraid of cucumbers. But sometimes not.");
randomPhrases.push("Here lies some cunt.");


 var LightLevels=new Array();
LightLevels.push(0.90); //midnight
LightLevels.push(0.85); //1am
LightLevels.push(0.80); //2am
LightLevels.push(0.75); //3am
LightLevels.push(0.60); //4am
LightLevels.push(0.45); //5am
LightLevels.push(0.30); //6am
LightLevels.push(0.10); //7am
LightLevels.push(0.00); //8am
LightLevels.push(0.00); //9am
LightLevels.push(0.00); //10am
LightLevels.push(0.00); //11am
LightLevels.push(0.00); //12pm
LightLevels.push(0.00); //1pm
LightLevels.push(0.00); //2pm
LightLevels.push(0.00); //3pm
LightLevels.push(0.10); //4pm
LightLevels.push(0.20); //5pm
LightLevels.push(0.30); //6pm
LightLevels.push(0.34); //7pm
LightLevels.push(0.50); //8pm
LightLevels.push(0.60); //9pm
LightLevels.push(0.80); //10pm
LightLevels.push(0.85); //11pm

var heartsprite=Sprite("heart"); 
var emptyheartsprite=Sprite("emptyheart"); 
var halfheartsprite=Sprite("halfheart"); 
var lightcirclesprite=Sprite("lightcircle");
var middlelightcirclesprite=Sprite("innerlightcircle");
var innerlightcirclesprite=Sprite("furtherinnerlightcircle");
function drawHearts(p,can) {
	
	can.font = "14pt Calibri";
	//canvas.textAlign = "center";
	//can.textBaseline = "middle";
	can.fillStyle = "white";
	can.fillText("  --Health--", 28, 22);
	var conts=p.hp/20;
	for(var h=0;h<p.maxHp/20;h++)
	{
		if(h<7)
		{
			emptyheartsprite.draw(can,12+h*16+h*3, 24);
		}else
		{
			emptyheartsprite.draw(can,12+(h-8)*16+h*3, 39);
		}
	}
	for(var h=0;h<conts-1;h++)
	{
		if(h<7)
		{
			heartsprite.draw(can,12+h*16+h*3, 24);
		}else
		{
			heartsprite.draw(can,12+(h-8)*16+h*3, 39);
		}
	}
	
	if(p.hp%20==0)
	{
		if(h<7)
		{
			heartsprite.draw(canvas,12+h*16+h*3, 24);
		}else
		{
			heartsprite.draw(can,12+(h-8)*16+h*3, 39);
		}
	}else
    {
		if(h<7)
		{
			halfheartsprite.draw(canvas,12+h*16+h*3, 24);
		}else
		{
			halfheartsprite.draw(can,12+(h-8)*16+h*3, 39);
		}
	}
	
}



var objectSprites=new Array();
objectSprites.push(Sprite("lamp"));
objectSprites.push(Sprite("sign"));
objectSprites.push(Sprite("chest"));
objectSprites.push(Sprite("key"));
objectSprites.push(Sprite("switch"));
objectSprites.push(Sprite("potstand"));
objectSprites.push(Sprite("pot"));
objectSprites.push(Sprite("curtains"));
objectSprites.push(Sprite("blueblocker"));
objectSprites.push(Sprite("redblocker"));
objectSprites.push(Sprite("blueorb"));
objectSprites.push(Sprite("redorb"));
objectSprites.push(Sprite("warpoff"));
objectSprites.push(Sprite("heartcontainer"));
objectSprites.push(Sprite("feather"));
objectSprites.push(Sprite("brick2"));
objectSprites.push(Sprite("bombpickup"));
objectSprites.push(Sprite("bow"));
objectSprites.push(Sprite("lantern"));

var editModes={};
editModes.Pen=0;
editModes.Stamp=1;
editModes.Fill=2;
editModes.Door=3;
editModes.Objects=4;
editModes.CopyArea=5;
editModes.SwitchLink=9;

var OPTIONS={};
OPTIONS.musicOn=false;
OPTIONS.showUnexploredRooms=false;
OPTIONS.showCracks=false;
OPTIONS.showUnexploredDoors=false;
OPTIONS.skipWallTiles=true;
OPTIONS.musicVolume=0.1;
OPTIONS.confirmationPopUps=true;

var editHistory=[];

//var snake=0;

function addEdit(merp){
    //if(editHistory.length>6) {editHistory.shift();}
	var obj= {};
    obj.tiles=merp.stringifyTiles();
	//obj.walls=merp.stringifyWalls();
    editHistory.push(obj);
}
function undoEdit(mop){
    if(editHistory.length<1){ return;}
    var obj=editHistory.pop();

    if (!obj) {  alert ("Nothing to undo.");return;}
    mop.buildMapFromLoadedTiles( "name", obj.tiles);
    //maps[0].buildMapFromLoadedWalls( "name", obj.walls);
};


var graphicsLevel=3;//turn off transparency, tone down snow. less map dirties? leave map a little dirt
//less lighting?

var tileSize=16;
// Prevent the backspace key from navigating back.
$(document).unbind('keydown').bind('keydown', function (event) {
    var doPrevent = false;
    if (event.keyCode === 8) {
        var d = event.srcElement || event.target;
        if ((d.tagName.toUpperCase() === 'INPUT' && (d.type.toUpperCase() === 'TEXT' || d.type.toUpperCase() === 'PASSWORD' || d.type.toUpperCase() === 'FILE' || d.type.toUpperCase() === 'EMAIL' )) 
             || d.tagName.toUpperCase() === 'TEXTAREA') {
            doPrevent = d.readOnly || d.disabled;
        }else if(holdInput)
		{
			doPrevent = true;
			backspaced=true;
		}
        else {
            doPrevent = true;
        }
    }else  if (event.keyCode === 9) {
       
			doPrevent = true;
			tabbed=true;
    }

    if (doPrevent) {
        event.preventDefault();
    }
});

distance=function(one,two){
	return(Math.pow(one.x-two.x,2)+Math.pow(one.y-two.y,2));
};

tileDistance=function(one,two){
	return(Math.pow(one.tileX-two.tileX,2)+Math.pow(one.tileY-two.tileY,2));
};

countFPS = (function () {
  var lastLoop = (new Date()).getMilliseconds();
  var count = 1;
  var fps = 0;

  return function () {
    var currentLoop = (new Date()).getMilliseconds();
    if (lastLoop > currentLoop) {
      fps = count;
      count = 1;
    } else {
      count += 1;
    }
    lastLoop = currentLoop;
    return fps;
  };
}());


function leapYear(year)
{
	var lr=true;
	if (year%4!=0) {
		return false;
	}else
	{
		if (year%100!=0) 
		{
			return true;
		}else
		{
			if (year%400!=0)
			{
				return false;
			}else{
				return true;
			}
		}
	}
}

function theTime()
{
	this.minutes=50;
	this.hours=0;
	this.days=0;
	this.years=298;
	this.tick=0;
	this.tock=false;
	this.lastmove=0;
	
	theTime.prototype.getString=function()
	{
		var suffix="th";
		if(this.days+1==1)
		{
			suffix="st";
		}else if(this.days+1==2)
		{
			suffix="nd";
		}if(this.days+1==3)
		{
			suffix="rd";
		}
		var kevinbacon=this.minutes;
		if(kevinbacon<10)
		{
			var srtup= "0"+kevinbacon;
			kevinbacon=srtup;
		}
		return this.hours+":"+kevinbacon+" on the "+(this.days+1)+suffix+" day of the year "+this.years+" AC";
	};
	
	theTime.prototype.update=function()
	{
		var stamp = new Date();
		var milli=stamp.getTime();
		//speed=(speed * delta) * (60 / 1000);

		if(milli-this.lastmove>1000/gameSpeed)
		{
		
			
			this.tick+=1*gameSpeed;
			if(this.tick<2)
			{
				return;
			}
			this.tock=true;
			this.tick=0;
			this.minutes++;
			if(this.minutes>59)
			{
				this.minutes=0;
				this.hours++;
				if(this.hours>23)
				{
					this.hours=0;
					trainTick=true;
					this.days++;
					var cxup=363;
					if(leapYear(this.years))
					{
						cxup=364;
					}
					if(this.days>cxup)
					{
						this.years++;
						this.days=0;
//						theWatch.collectTribute();
					}
				}
			}
			this.lastmove=stamp.getTime();
		}
	};
}
var thyme=new theTime();

var starting=false;
var bColors = ["#008000","#006400", "#FF4500", "#000080", "#696969", "#800080", "#808000", "#A52A2A", "#8B4513", "#FFDEAD", "#FFFF40","#000080" , "#FFFF80"]; //list of colors for radar/a few other things

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


function hdgDiff (h1, h2) { // angle between two headings
   var diff = fmod(h1 - h2 + 3600, 360);
   return diff <= 180 ? diff : 360 - diff;
}

function isTurnCCW(hdg, newHdg) { // should a new heading turn left ie. CCW?
   var diff = newHdg - hdg;        // CCW = counter-clockwise ie. left
   return diff > 0 ? diff > 180 : diff >= -180;
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

function textbox() 
 {  //draws a text box
	this.exists=false;
	this.x=140;
	this.y=370;
	this.scroll=0;
	this.width=600;
	this.textLim=44;
	this.label=false;
	this.height=55;
	this.options=0;
	this.unClickable=false;
	this.object=null;
	this.target=null;
	this.choicesStart=1;
	this.optionTrack=0;//draw the liitle -
	this.colors=[];
	this.msg=[];
	this.displayMsg=[];
	this.optionOne=function(object,target)
	{
		holdEverything=false;
	};
	this.optionTwo=function(object,target)
	{
		holdEverything=false;
	};
	this.optionThree=function(object,target)
	{
		holdEverything=false;
	};
	this.optionTwo=null;
	this.optionThree=null;
	this.response=function()
	{
		console.log("CONSEQUENCES HAVE HAPPENED");
	};
	this.log=function(text,col)
	{
		//this.textLim=Math.floor(this.width/6);
		if(!col){col="white";}
		if(!text) {return;}
		if(customConsole)
		{
			if(text.length>this.textLim)
			{
				var fext=text.substring(0,this.textLim);
				var dext=text.substring(this.textLim,text.length);
				this.msg.push(fext);
				this.colors.push(col);
				this.log(dext);
				if(this.msg.length>41)
				{
					this.scroll++;
				}
			}else
			{
				this.msg.push(text);
				this.colors.push(col);
				if(this.msg.length>41)
				{
					this.scroll++;
				}
			}
		}else
		{
			console.log(text);
		}
	};
	
	this.setup=function(firsttext,x,y)
	{
		//this.msg.push(firsttext);
		this.exists=true;
		holdEverything=true;
		//this.colors.push("white");
		this.x=x;
		this.y=y;
	};
	this.update=function()
	{
		//return;
		if(upkey.check())
		{
			if(this.optionTrack>this.choicesStart)
			{
				this.optionTrack--;
			}
		}else if(downkey.check())
		{
			if(this.optionTrack<this.msg.length-1)
			{
				this.optionTrack++;
			}
		}else if(startkey.check())
		{
			//this.response();
			if(this.optionTrack-this.choicesStart===0)
			{
				this.optionOne();
			}else if(this.optionTrack-this.choicesStart==1)
			{
				this.optionTwo();
			}else if(this.optionTrack-this.choicesStart==2)
			{
				this.optionThree();
			}else{
				holdEverything=false;
			}
			this.exists=false;
		}
	};
	this.draw=function(can)
	{
		can.save();
		can.globalAlpha=0.80;
		can.fillStyle = "#DCDCDC";
		var hight=this.msg.length*16;
		can.fillRect(this.x-10,this.y-10,this.width+10,this.height+10+hight);
		
		can.fillStyle = "#483D8B ";
		can.fillRect(this.x,this.y,this.width-10,this.height-10+hight);
		
		can.font = "10pt Calibri";
		can.textAlign = "left";
		can.textBaseline = "middle";
		can.fillStyle = "white";

		//todo if text is too long put it on next line
		if(this.label)
		{
			can.fillText(this.label,this.x+4,this.y+9);
		}
		
		this.displayMsg=this.msg.slice(this.scroll, this.msg.length);
		this.displayColor=this.colors.slice(this.scroll,this.colors.length);
		for(var i=0;i<this.displayMsg.length;i++)
		{
			//if (i>bConsoleStr.length) {break;}
			can.fillStyle=this.displayColor[i];
			can.fillText(this.displayMsg[i], this.x+6,this.y-5+(18*(i+1)));
			if((this.options>0) && (this.optionTrack==i))
			{
				can.fillText("-", this.x+10,this.y+12+(18*(i+1)));
			}
		}	
		
		can.restore();
	};
}


var TileType={};
TileType.Grass=0;
TileType.Plains=1;
TileType.Swamp=2;
TileType.Hills=7;
TileType.Snow=5;
TileType.Ice=11;
TileType.IceMountains=12;
TileType.DeepSnow=6;
TileType.Mountains=4;
TileType.RedMountains=19;
TileType.Water=20;
TileType.Ocean=24;
TileType.Lava=28;
TileType.Forest=3;
TileType.Road=8;
TileType.Bridge=18;
TileType.Sand=9;

var numDoorTypes=4;

var DungeonTileType={};
DungeonTileType.GreenFloor=1;
DungeonTileType.Ice=2;
DungeonTileType.Water=20;
DungeonTileType.Lava=24; 
DungeonTileType.Door=38;
DungeonTileType.ClosedDoor=39;
DungeonTileType.LockedDoor=40;
DungeonTileType.BombableDoor=41;
DungeonTileType.BombedDoor=42;
DungeonTileType.Unstable=7;
DungeonTileType.Hole=8;
DungeonTileType.GreenBrick=0;
DungeonTileType.OrangeBrick=3;
DungeonTileType.BirdHead=33;
DungeonTileType.Grass=4;
DungeonTileType.Sand=5;
DungeonTileType.Stone=6;
DungeonTileType.GreenWall=9;
DungeonTileType.WallCornerA=10;
DungeonTileType.WallCornerB=11;
DungeonTileType.WallCornerC=12;
DungeonTileType.WallCornerD=13;
DungeonTileType.WallTop=14;
DungeonTileType.WallLeft=15;
DungeonTileType.WallRight=16;
DungeonTileType.WallBottom=17;
DungeonTileType.UpStair=18;
DungeonTileType.DownStair=19;

var lastEventX=0;
var lastEventY=0;

var selBox=[];
selBox.point1=[];
selBox.point2=[];
selBox.tX=0;
selBox.tY=0;
selBox.exists=false;
selBox.p1=false;
selBox.p2=false;
selBox.width=0;
selBox.height=0;

function drawSelBox(can){
	if(!selBox.exists) {return;}
	if(selBox.p1) {flagsprite.draw(can,selBox.point1.x,selBox.point1.y);}
	var w =selBox.point1.x-selBox.point2.x;
	var h =selBox.point1.y-selBox.point2.y;
	can.strokeStyle="#FFFF00";
	can.lineWidth=1;
	can.beginPath();
	if(!selBox.p2)
	{

		can.moveTo(selBox.point1.x,selBox.point1.y);
		console.log(mX,mY);
		can.lineTo(mX,selBox.point1.y);
		can.lineTo(mX,mY);
		can.lineTo(selBox.point1.x,mY);
		can.lineTo(selBox.point1.x,selBox.point1.y);
	}else
	{
		can.moveTo(selBox.point1.x,selBox.point1.y);
		can.lineTo(selBox.point2.x,selBox.point1.y);
		can.lineTo(selBox.point2.x,selBox.point2.y);
		can.lineTo(selBox.point1.x,selBox.point2.y);
		can.lineTo(selBox.point1.x,selBox.point1.y);
	}
    can.stroke();
	can.closePath();
};
function rectOverlap(r1,r2){
	
	if(r1.x> r2.x+2) {return false;}
	if(r1.x+r1.width< r2.x) {return false;}
	if(r1.y> r2.y+2) {return false;}
	if(r1.y+r1.height< r2.y) {return false;}

	return true;
};

var FPS=0;
var numMapPoints=6;
var mmcur=1;
//var bConsoleStr=new Array();
var bConsoleClr=new Array();
var bConsoleBox;
var bMenuBox;
var lastExplosion=0;
var EXPLOSION_RATE=500;
var radarBitmap=[];
var mapBitmap=[];
var CANVAS_WIDTH = 900;
var CANVAS_HEIGHT = 768;
var wind=Math.floor(Math.random()*2)+1;
var MAP_WIDTH = 1600;
var MAP_HEIGHT = 1600;
var CRIT_CHANCE=100;
var FPS = 30;
var LAVA_RATE=2000;
var WATER_RATE=2000;
var BURN_RATE=100;
var CHARANI_RATE= 200;
var SPAWN_X=22;
var SPAWN_Y=19;
var GRAVITY_RATE=5;
var TEAM_SIZE = 12;
var SELECTED=0;
var MSELECTED=0;
var MUSELECTED=0;
var BSELECTED=0;
var NUM_STATUS=5;
var NUM_CLASSES=19;
var ENCOUNTER_RATE=25000;
var TAME_CHANCE=40;
var preBattle=0;
var preBattleLength=100;
var MAPNAME ="map3";
var pageCount=0;
var cardUsed=false;
var gameSpeed=1000;
var maxGameSpeed=100;
var isBattle=false;
var isMenu=0;
var battlelength=15;
var combatants=new Array(2);
var battledelay=10;
var battletick=0;
var battleenddelay=10;
var battleendtick=0;
var numMaps=5;
var mapSelected=0;
var winmode=0;
var mode=0;
var looseX=0;
var looseY=0;
var mapDirty=true;
var victoryCount=0;
var victoryLap=200;
var victoryReport=200;
var victoryReporting=false;
var victory=false;
var projectionCount=0;
var projectionLength=200;
//var keychart = ["w","a","d","s","up","right","down","left","m","n","shift"];
var names= new Array (2);
names[0]=new Array(120);
names[1]=new Array(120);
var mX=120;
var mY=320;

names[0]= ["Eddard", "Theon","Baelor", "Aerys", "Aemon", "Aemond", "Fletcher Dick", "Beardless Dick", "Valarr", "Hot Pie", "Lommy", "Jon", "Matarys", "Dunk", "Egg", "Aerion","Bran","Bronn","Robb","Tyrion","Jaime","Tywin","Jeor","Jorah","Mero","Stannis","Gendrey","Yoren","Rickard","Drogo","Brandon","Gregor","Sandor","Polliver","Allister","Barristan","Jeoffery","Robert","Symon","Dolorous Edd","Podrick","Renly","Illyn","Aurane","Regular Ed","Merret","Walder","HODOR","Luwin","Cressen","Janos","Tytos","Gerion","Willas","Garlan","Viserys","Loras","Willem","Martyn","Illyrio","Xaro Xhoan Ducksauce","Cleon","Aegon","Emmon","Skahaz","Cleos","Tygett","Vargo","Pono","Nimble Dick","Iron Emmett","Mance","Tormund","Varamyr","Orell","Jaquen","Wease","The Tickler","Dareon","Morroqo","Marwyn","Pate","Davos","Axel","Wyman","Pyter","Varys","Arnolf","Sigorn","Hoster","Tion","Helman","Torrhen","Yohn","Lyn","Nestor","Doran","Oberyn","Qyburn","Howland","Daario","Xhondo","Yellow Dick","Zachery","Zekko","Zollo","Will","Willbert","Wendel","Wendamyr","The Weeper","Wat","Walton","Vardis","Urrigon","Ulmer","Tobho","Timett","Syrio","Styr"];
names[1]= ["Alysane", "Lyra", "Naerys", "Pia", "Lynesse", "Maege", "Rhaenyra", "Kyra", "Rhae", "Tanselle", "Daena", "Elaena", "Myriah", "Aelinor","Arya","Sansa","Shae","Meera","Mina","Gilly","Ygritte","Ami","Cersei","Tanda","Lollys","Mya","Alayne","Myrcella","Lyanna","Lemore","Jayne","Talisa","Ros","Margery", "Catlyen", "Brienne", "Olenna", "Roslin", "Lysa", "Taena","Senelle","Falyse","Barra","Bella","Joanna","Joy","Janei","Dorna","Ashara","Allyria","Asha","Osha","Rhonda","Rhea","Alerie","Alysanne","Malora","Daenerys","Irri","Rhaella","Ellia","Illyrio","Quaithe", "Missandei", "Shireen","Mezzara","Kezmya","Qezza","Jhezene","Miklaz","Arianne","Shella","Mellario","Obara","Nymeria","Tyene","Obella","Dorea","Loreza","Myranda","Thistle","Alannys","Alla ","Alia","Alyce","Minisa","Meris","Wenda","Anya","Doreah","Horma","Weasel","Tysha","Sarella","Maggi","Jenny","Barbrey","Bethany","Wylla","Leona","Alys","Amarei","Old Nan","Yna","Ysilla","Victaria","Visenya","Val","The Waif","Tya","Tysane","Tansey","Talla","Taela","Squirrel","Shiera","Sharna","Scolera","Sarra","Sallei","S'vrone","Rhea","Rhialta"];
var namesused=new Array(2);
namesused[0]=new Array(120);
namesused[1]=new Array(120);
for( var i=0; i<120; i++ ){ namesused[0][i]=false;namesused[1][i]=false; }

var tileSprite=new Array(39);
tileSprite[TileType.Grass] = Sprite("grass");
tileSprite[TileType.Forest] = Sprite("darkgrass"); 
tileSprite[TileType.Snow] = Sprite("snow"); 
tileSprite[TileType.Ice] = Sprite("ice"); 
tileSprite[TileType.IceMountains] = Sprite("icemountain");
tileSprite[TileType.RedMountains] = Sprite("redmountain");
tileSprite[TileType.Bridge] = Sprite("road");  
tileSprite[TileType.Ocean] = Sprite("ocean");
tileSprite[TileType.Ocean+1] = Sprite("ocean1");
tileSprite[TileType.Ocean+2] = Sprite("ocean2");
tileSprite[TileType.Ocean+3] = Sprite("ocean3");
tileSprite[TileType.Water] = Sprite("water");
tileSprite[TileType.Water+1] = Sprite("water");
tileSprite[TileType.Water+2] = Sprite("water");
tileSprite[TileType.Water+3] = Sprite("water");
tileSprite[TileType.Lava] = Sprite("lava0");
tileSprite[TileType.Lava+1] = Sprite("lava1");
tileSprite[TileType.Lava+2] = Sprite("lava2");
tileSprite[TileType.Lava+3] = Sprite("lava3");
tileSprite[TileType.Lava+4] = Sprite("lava4");
tileSprite[TileType.Mountains] = Sprite("stone");
tileSprite[TileType.Hills] = Sprite("hills");
tileSprite[TileType.Swamp] = Sprite("swamp");
tileSprite[TileType.Plains] = Sprite("dirt");
tileSprite[TileType.Road] = Sprite("road");
tileSprite[TileType.Sand] = Sprite("sand");

var dungeonTileSprite=new Array(49);
dungeonTileSprite[DungeonTileType.Grass] = Sprite("dungeontiles/grass");
dungeonTileSprite[DungeonTileType.GreenBrick] = Sprite("dungeontiles/brick2"); 
//dungeonTileSprite[DungeonTileType.Snow] = Sprite("snow"); 
dungeonTileSprite[DungeonTileType.OrangeBrick] = Sprite("dungeontiles/wall"); 
dungeonTileSprite[DungeonTileType.Ice] = Sprite("dungeontiles/ice"); 
dungeonTileSprite[DungeonTileType.BirdHead] = Sprite("dungeontiles/dungeonthing");
//dungeonTileSprite[DungeonTileType.RedMountains] = Sprite("redmountain");
dungeonTileSprite[DungeonTileType.Unstable] = Sprite("dungeontiles/unstable");
dungeonTileSprite[DungeonTileType.Hole] = Sprite("dungeontiles/hole");
dungeonTileSprite[DungeonTileType.Wall] = Sprite("dungeontiles/wall");
dungeonTileSprite[DungeonTileType.GreenWall] = Sprite("dungeontiles/wall");   
dungeonTileSprite[DungeonTileType.LockedDoor] = Sprite("dungeontiles/doortile");
dungeonTileSprite[DungeonTileType.ClosedDoor] = Sprite("dungeontiles/doortile");
dungeonTileSprite[DungeonTileType.BombableDoor] = Sprite("dungeontiles/doortile");
dungeonTileSprite[DungeonTileType.BombedDoor] = Sprite("dungeontiles/doortile");
dungeonTileSprite[DungeonTileType.Door] = Sprite("dungeontiles/doortile");
dungeonTileSprite[DungeonTileType.UpStair]= Sprite("dungeontiles/stairsup");
dungeonTileSprite[DungeonTileType.DownStair]= Sprite("dungeontiles/stairsdown");
dungeonTileSprite[DungeonTileType.WallCornerA] = Sprite("dungeontiles/wall1");
dungeonTileSprite[DungeonTileType.WallCornerB] = Sprite("dungeontiles/wall2");
dungeonTileSprite[DungeonTileType.WallCornerC] = Sprite("dungeontiles/wall3");
dungeonTileSprite[DungeonTileType.WallCornerD] = Sprite("dungeontiles/wall4");
dungeonTileSprite[DungeonTileType.WallTop] = Sprite("dungeontiles/wall1a");
dungeonTileSprite[DungeonTileType.WallBottom] = Sprite("dungeontiles/wall3a");
dungeonTileSprite[DungeonTileType.WallLeft] = Sprite("dungeontiles/wall2b");
dungeonTileSprite[DungeonTileType.WallRight] = Sprite("dungeontiles/wall1b");
//dungeonTileSprite[DungeonTileType.Ocean] = Sprite("ocean");
//dungeonTileSprite[DungeonTileType.Ocean+1] = Sprite("ocean1");
//dungeonTileSprite[DungeonTileType.Ocean+2] = Sprite("ocean2");
//dungeonTileSprite[DungeonTileType.Ocean+3] = Sprite("ocean3");
dungeonTileSprite[DungeonTileType.Water] = Sprite("dungeontiles/ocean");
dungeonTileSprite[DungeonTileType.Water+1] = Sprite("dungeontiles/ocean1");
dungeonTileSprite[DungeonTileType.Water+2] = Sprite("dungeontiles/ocean2");
dungeonTileSprite[DungeonTileType.Water+3] = Sprite("dungeontiles/ocean3");
dungeonTileSprite[DungeonTileType.Lava] = Sprite("dungeontiles/lava0");
dungeonTileSprite[DungeonTileType.Lava+1] = Sprite("dungeontiles/lava1");
dungeonTileSprite[DungeonTileType.Lava+2] = Sprite("dungeontiles/lava2");
dungeonTileSprite[DungeonTileType.Lava+3] = Sprite("dungeontiles/lava3");
dungeonTileSprite[DungeonTileType.Lava+4] = Sprite("dungeontiles/lava4");
dungeonTileSprite[DungeonTileType.Stone] = Sprite("dungeontiles/stone");
dungeonTileSprite[DungeonTileType.GreenFloor] = Sprite("dungeontiles/greenfloor");
//dungeonTileSprite[DungeonTileType.Swamp] = Sprite("swamp");
//dungeonTileSprite[DungeonTileType.Plains] = Sprite("dirt");
//dungeonTileSprite[DungeonTileType.Road] = Sprite("road");
dungeonTileSprite[DungeonTileType.Sand] = Sprite("dungeontiles/sand");

var tileColors=new Array(39);
tileColors[TileType.Grass] = "#008000";
tileColors[TileType.Forest] = "#003300";
tileColors[TileType.Ocean] = "#0000FF";

tileColors[TileType.Snow] = "#F0FFFF";
tileColors[TileType.Ice] = "#3399FF";
tileColors[TileType.Bridge] = "#CCCCCC";
tileColors[TileType.IceMountains] = "#99CCFF";
tileColors[TileType.RedMountains] = "#580000";
tileColors[TileType.Water] = "#0066CC";
tileColors[TileType.Mountains] = "#330000";
tileColors[TileType.Hills] = "#996666";
tileColors[TileType.Swamp] = "#669900";
tileColors[TileType.Plains] = "#FF9966";
tileColors[TileType.Road] = "#CCCCCC";
tileColors[TileType.Sand] = "#999966";
tileColors[TileType.Lava] = "#FF0000";



var selector2 = Sprite("newcursor");
var titlesprite = Sprite("title");
//var troopScreensprite = Sprite("troopsscreen");
var RGB_THRESHOLD=5;

var explosionsprite=new Array(4);
explosionsprite[0] =Sprite("explosion0");
explosionsprite[1] =Sprite("explosion1");
explosionsprite[2] =Sprite("explosion2");
explosionsprite[3] =Sprite("explosion3");

var numClouds=44;

function cloud(){
	this.x=Math.floor(Math.random()*3520)+100;
	this.y=Math.floor(Math.random()*4480)+300;
	this.layer=Math.floor(Math.random()*2)+1;
	this.sprite=Sprite("cloud1");
	this.ang=Math.floor(Math.random()*90);
	var rnd=Math.floor(Math.random()*9);
	if(rnd>1){
		this.sprite=Sprite("cloud2");
	}	if(rnd>2){
		this.sprite=Sprite("cloud3");
	}	if(rnd>3){
		this.sprite=Sprite("cloud4");
	}	if(rnd>4){
		this.sprite=Sprite("cloud5");
	}	if(rnd>5){
		this.sprite=Sprite("cloud6");
	}	if(rnd>6){
		this.sprite=Sprite("cloud7");
	}   if(rnd>7){
		this.sprite=Sprite("cloud8");
	}   if(rnd>8){
		this.sprite=Sprite("cloud9");
	}
}
cloud.prototype.update = function() {
    this.y-=this.layer*wind/2;
    if (this.y<-200) {
	this.y=Math.floor(Math.random()*300)+4480;
	this.x=Math.floor(Math.random()*3420)+100;
    }
};
var clouds=new Array(numClouds);
for(var i=0;i<numClouds;i++)
{
	clouds[i]=new cloud();
}
var tileani=0;
  
 


var anicount=0;
var anirate=4000;
var lastani=0;
var gotall=false;
var BATTLE_REPORT_LENGTH=400;
var numsounds=0;
var soundsplaying ="";
var timestamp = new Date(); 
var milliseconds = timestamp.getTime();
var lasttime=0;
var enemyDeployCount=1;
var deployRate=200;
var battlespeed=100;
var battleRate=2;
var paused=false;
var mappause=false;
var battleReport=false;
var battlePause=false;
var unitinfo=false;
var lastClick=0;
var dblClickRate=350;
var healcount=0;
var healrate=140;
//var numTowns=6;
var CSELECTED=0;
var maps=new Array(6);
var mapIconWidth=32;
var mapIconHeight=45;

Math.radians = function(degrees) {
  return degrees * Math.PI / 180;
};
 


function equipment() {
    this.name="none";
    this.hitAll=false;
    this.slot=0;
	this.classes=new Array();
    this.value=0;
    this.attack=0;
    this.def=0;
    this.mdef=0;
    this.evade=0;
    this.speed=0;
    this.mag=0;
    this.prefix="Shitty ";
    this.sprite=null;
    this.haste=false;
    this.slow=false;
    this.beserk=false;
    this.posion=false;
    this.mute=false;
    this.reflect=false;
    this.protect=false;
    this.regen=false;
    this.imp=false;
    this.HIV=false;
    this.tooltip = "";
	this.allClasses=function(){
		for(i=0;i<NUM_CLASSES;i++)
		{
			this.classes.push(i);
		}
	};
}

var unarmed = new equipment();
var noarmor = new equipment();
noarmor.slot=1;
var noaccessory = new equipment();
noaccessory.slot=2;

function romanize(num) {
	var str=" ";
	if(num===0)
	{
		str=" Prime";
	}else if(num==1)
	{
		str=" I ";
	}else if(num==2)
	{
		str=" II ";
	}else if(num==3)
	{
		str=" III ";
	}else if(num==4)
	{
		str=" IV ";
	}else if(num==5)
	{
		str=" V ";
	}else if(num==6)
	{
		str=" VI ";
	}else if(num==7)
	{
		str=" VII ";
	}else if(num==8)
	{
		str=" VIII ";
	}else if(num==9)
	{
		str=" IX ";
	}else if(num==10)
	{
		str=" X ";
	}else if(num==11)
	{
		str=" XI ";
	}else if(num==12)
	{
		str=" XII ";
	}else if(num==13)
	{
		str=" XIII ";
	}else
	{
		str=" Omega ";
	}
	
	return str;
}