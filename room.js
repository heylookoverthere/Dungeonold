var fogSprite=new Array();
fogSprite.push(Sprite("fog1"));
fogSprite.push(Sprite("fog2"));
fogSprite.push(Sprite("fog3"));
fogSprite.push(Sprite("fog4"));

var ROOM_WIDTH=20;
var ROOM_HEIGHT=15;
var ROOM_TILE_SIZE=32;
var xOffset = 150;
var yOffset= 150;

function imageExists(url) 
{
	return true;
   var img = new Image();
   img.src = url;
   return img.height != 0;
}

var doorSprite=new Array();

    //doorSprite.push(new Array());
	doorSprite[0]=Sprite("dungeontiles/door0");
	doorSprite[1]=Sprite("dungeontiles/door1");
	doorSprite[2]=Sprite("dungeontiles/door2");
	doorSprite[3]=Sprite("dungeontiles/door3");


var doorClosedSprite=new Array();

//doorSprite.push(new Array());
doorClosedSprite[0]=Sprite("dungeontiles/doorclosed0");
doorClosedSprite[1]=Sprite("dungeontiles/doorclosed1");
doorClosedSprite[2]=Sprite("dungeontiles/doorclosed2");
doorClosedSprite[3]=Sprite("dungeontiles/doorclosed3");

function staircase(up)
{
	this.x=0;
	this.y=0;
	this.up=up;
}
	
function door(or)
{
	if(!or){or=0;}
	this.x=0;
	this.y=0; 
	this.closed=false;
	this.locked=false; 
	//this.source=sorc;
	this.dest=null;
	this.orientation=or; //0=top, 1=right, 2= bottom, 3= left. 
	this.type=0;
	
	door.prototype.orient=function(dir)
	{
		this.orientation=dir;
		if((this.orientation==0) || (this.orientation==2))
		{
			this.x=8;
			if(this.orientation==0)
			{
				this.y=0;
			}else
			{
				this.y=17
			}
		}else
		{
			this.y=12;
			if(this.orientation==1)
			{
				this.x=17;
			}else
			{
				this.x=0;
			}
		}
	};
	
	door.prototype.draw=function(can,cam)
	{
	   //this.orient(0);
	   doorSprite[this.orientation].draw(can,(this.x-cam.tileX)*ROOM_TILE_SIZE+xOffset-10, (this.y-cam.tileY)*ROOM_TILE_SIZE+yOffset-4);
	   if(this.closed)
	   {
			doorClosedSprite[this.orientation].draw(can,(this.x-cam.tileX)*ROOM_TILE_SIZE+xOffset-10, (this.y-cam.tileY)*ROOM_TILE_SIZE+yOffset-4);
	   }
	}

}

function Tile() { //the Map is made of a 2D array of tiles.
    this.x = 0;
    this.y = 0;
    this.data =  0;
}
Tile.prototype.width = ROOM_TILE_SIZE;
Tile.prototype.height = ROOM_TILE_SIZE;
Tile.prototype.draw = function(can,cam) { 
    if(this.data==DungeonTileType.Grass){
        tileSprite[DungeonTileType.Grass].draw(can, (this.x-cam.tileX)*ROOM_TILE_SIZE, (this.y-cam.tileY)*ROOM_TILE_SIZE);
    }else if(this.data==DungeonTileType.Stone){
		tileSprite[DungeonTileType.Stone].draw(can, (this.x-cam.tileX)*ROOM_TILE_SIZE, (this.y-cam.tileY)*ROOM_TILE_SIZE);
    }else if(this.data==DungeonTileType.OrangeBrick){
        tileSprite[DungeonTileType.OrangeBrick].draw(can, (this.x-cam.tileX)*ROOM_TILE_SIZE, (this.y-cam.tileY)*ROOM_TILE_SIZE);
    }else if(this.data==DungeonTileType.GreenBrick){
        tileSprite[DungeonTileType.GreenBrick].draw(can, (this.x-cam.tileX)*ROOM_TILE_SIZE, (this.y-cam.tileY)*ROOM_TILE_SIZE); 
    }else if(this.data==DungeonTileType.Water){
        tileSprite[DungeonTileType.Water+tileani].draw(can, (this.x-cam.tileX)*ROOM_TILE_SIZE, (this.y-cam.tileY)*ROOM_TILE_SIZE);
    }else if(this.data==DungeonTileType.Lava){
        tileSprite[DungeonTileType.Lava+tileani].draw(can, (this.x-cam.tileX)*ROOM_TILE_SIZE, (this.y-cam.tileY)*ROOM_TILE_SIZE);
    }else if(this.data==DungeonTileType.BirdHead){
        tileSprite[DungeonTileType.BirdHead].draw(can, (this.x-cam.tileX)*ROOM_TILE_SIZE, (this.y-cam.tileY)*ROOM_TILE_SIZE);
    }else if(false){//this.data==DungeonTileType.Ice){
        tileSprite[DungeonTileType.Ice].draw(can, (this.x-cam.tileX)*ROOM_TILE_SIZE, (this.y-cam.tileY)*ROOM_TILE_SIZE);
    }else if(this.data==DungeonTileType.GreenFloor){
        tileSprite[DungeonTileType.GreenFloor].draw(can, (this.x-cam.tileX)*ROOM_TILE_SIZE, (this.y-cam.tileY)*ROOM_TILE_SIZE);
    }else if(this.data==DungeonTileType.Ocean){
        //tileSprite[DungeonTileType.Ocean+tileani].draw(canvas, (this.x-cam.tileX)*ROOM_TILE_SIZE, (this.y-cam.tileY)*ROOM_TILE_SIZE);
    }else if(this.data==42){
        //watersprite.draw(canvas, (this.x-cam.tileX)*ROOM_TILE_SIZE, (this.y-cam.tileY)*ROOM_TILE_SIZE);
    }else{  //if strange data, draw a solid color
        can.fillStyle = bColors[0]; 
        can.fillRect((this.x-cam.tileX)*this.width, (this.y-cam.tileY)*this.height, this.width, this.height);
    }
    if(this.cracked==1){
        crackedsprite.draw(can, (this.x-cam.tileX)*ROOM_TILE_SIZE, (this.y-cam.tileY)*ROOM_TILE_SIZE);
    }
    if(this.platform==1){
        platformsprite.draw(can, (this.x-cam.tileX)*ROOM_TILE_SIZE, (this.y-cam.tileY)*ROOM_TILE_SIZE);
    }
    
};

function tileToCost(data, canSwim) {
	if(canSwim)
	{
		if( data == TileType.Ocean ) return 2;
		if( data == TileType.Bridge ) return 2;
		if(/*(canSwim.navigateRivers )*/(true) && ( data == TileType.Water )) return 2;
		return 0;
	}else
	{
		//if(sqd.getFlightHeight()>2) {return 2;}
		if(( data == TileType.Mountains ) ||( data == TileType.Ocean )) return 0;
		//if(sqd.getFlightHeight()>1) {return 2;}
		//if(( data == TileType.Water ) && sqd.canSwim()){ return 2;}
		if( data == TileType.Water ) {return 0;}
		if( data == TileType.Swamp  ) return 4;
		if( data == TileType.Forest  ) return 3;
		if( data == TileType.Sand  ) return 2;
		if( data == TileType.Road  ) return 1;
		//if( data == TileType.Grass  ) return 4;
		return 2;
	}
};

function mapToGraph(map, canSwim) { 
    var tilesArray = [];
    for( var i=0; i<map.width; ++i ) {
        var rowArray = [];
        for( var j=0; j<map.height; ++j ) {
            var tile = map.tiles[i][j];
            var data = tileToCost(tile.data, canSwim);
            for( var ii=-1; ii<2; ++ii ) {
                for( var jj=-1; jj<2; ++jj) {
                    if( i+ii < 0 || i+ii >= ROOM_WIDTH || j+jj < 0 || j+jj >= ROOM_WIDTH ) {
                        continue;
                    }
                    var adjTile = map.tiles[i+ii][j+jj];
                    if( !adjTile ) continue;
                    adjData = tileToCost(adjTile.data,canSwim);
                    if( data == 0 || adjData == 0 ) { data = 0; } else {
                        data = Math.max(data, adjData);
                    }
                }
            }
            rowArray.push(data);
        }
        tilesArray.push(rowArray);
    }
    return new Graph(tilesArray);
}

function reversePath(path)
{
	var spath=new Array();
	for(var i=0;i<path.list;i++)
	{
		spath.push(path.pop());
	}
	return spath;
}

function room(I) { //room object
    I = I || {};
    var i = 0;
    var j = 0;
	I.fogOfWar=false;
	I.x=0;
	I.y=0;
	I.miniMapX=0;
	I.miniMapY=0;
	I.explored=false;//TODO
	I.hidden=false;
	I.log=new Array();
	I.log.push("Constructed at "+thyme.getString());
	I.name=""; //simple string of it's coords? 
	I.tiledBackground=true;
	//eventually give tiles backgrounds random elements like rocks or cobwebs
	I.backgroundImage=null; // could be 32x32 tiles or whatever x whatever .png image. 
	I.exits=new Array(); //of doors, ladders and stairs
	I.stairs=new Array();
	//I.exits.push(new door(null,0));
	I.windows=new Array();
	I.lights=new Array();
	I.enemies=new Array();
	I.entities=new Array(); //comprising all the others
	//list of towns
	//story file?
	//enemy unit file
    I.active = true;
    I.color = "#00A";
    I.tiles = new Array(ROOM_WIDTH);
    for( i=0; i<ROOM_WIDTH; i++ ) { I.tiles[i] = new Array(ROOM_HEIGHT);  }
    for (i=0;i<ROOM_WIDTH; i++){
        for (j=0;j<ROOM_HEIGHT; j++){
            I.tiles[i][j]= new Tile();
            I.tiles[i][j].x=i;
            I.tiles[i][j].y=j;
        }
    }
    I.width = ROOM_WIDTH;
    I.height = ROOM_HEIGHT;
	I.seenMap=new Array();
	for (i=0;i<ROOM_WIDTH; i++){
		I.seenMap[i]=new Array();
        for (j=0;j<ROOM_HEIGHT; j++){
            I.seenMap[i][j]= false;
        }
    }
    I.getPath = function(startX, startY, endX, endY,booat) {
		//var snerd=I.getSubMap(0,0,ROOM_WIDTH,ROOM_HEIGHT);//(startX,startY,endX,endY);
		if(booat){
			if(graphboat==null)
			{
				var graphboat = mapToGraph(I,booat);
			}
			return astar.search(graphboat.nodes, graphboat.nodes[startX][startY], graphboat.nodes[endX][endY]);
		}else
		{
			if(graph==null)
			{
				var graph = mapToGraph(I,booat);
			}
			return astar.search(graph.nodes, graph.nodes[startX][startY], graph.nodes[endX][endY]);
		}
        
    };
	
	I.hasDoor=function(dir)
	{
		for(var i=0;i<4;i++)
		{
			if((I.exits[i]) && (I.exits[i].orientation==dir))
			{
				return true;
			}
		}
		return false;
	};
	
	I.getDoor=function(dir)
	{
		if(!I.hasDoor(dir))		{return null;}
		for(var i=0;i<4;i++)
		{
			if((I.exits[i]) && (I.exits[i].orientation==dir))
			{
				return I.exits[i];
			}
		}
		return null;
	};
	
	I.addDoor=function(dir)
	{
		//if(I.hasDoor(dir))	{return false;}
		if(dir==0)
		{
			var mindy= new door(0);
			mindy.x=8;
			mindy.y=0;
			I.exits.push(mindy);
		}else if (dir==1)
		{
			var mindy= new door(1);
			mindy.x=18;
			mindy.y=6;
			I.exits.push(mindy);
		}else if(dir==3)
		{
			var mindy= new door(3);
			mindy.x=0;
			mindy.y=6;
			I.exits.push(mindy);
		}else if(dir==2)
		{
			var mindy= new door(2);
			mindy.x=8;
			mindy.y=13;
			I.exits.push(mindy);
		}
	};
	
	I.hasStairs=function(up)
	{
		for(var i=0;i<I.stairs.length;i++)
		{
			if((I.stairs[i]) && (I.stairs[i].up==up))
			{
				return true;
			}
		}
		return false;
	};
	
	I.fill=function(id)
	{
		for(var i=2;i<I.width-2;i++)
		{
			for(var j=2;j<I.height-2;j++)
			{
				I.tiles[i][j].data=id;
			}
			
		}
	};
	
	I.sailable=function(x,y){//,b){
		if((I.tiles[x][y].data==TileType.Ocean)) {return true;}
		if(true)//(b.navigateRivers)
		{
			if((I.tiles[x][y].data==TileType.Water)) {return true;}
		}
		return false;
	}
	
	I.walkable=function(x,y){
		
			//console.log(I.tiles[x][y].data);
			if((I.tiles[x][y].data!=TileType.Mountains) &&(I.tiles[x][y].data!=TileType.RedMountains)&&(I.tiles[x][y].data!=TileType.IceMountains)&& (I.tiles[x][y].data!=TileType.Ice)&& (I.tiles[x][y].data!=TileType.Ocean)&&(I.tiles[x][y].data!=TileType.Water)) {return true;}
			return false;
	}
	
		
	I.stringifyTiles = function(name) {
		var tempstring= "";
		for (i=0;i<ROOM_WIDTH; i++){
			for (j=0;j<ROOM_HEIGHT; j++){
			tempstring = tempstring +I.tiles[i][j].data;
			tempstring += ","
			}
		}
		return tempstring;
	};
	
	I.loadTiles = function (name) {
	var hempstring=localStorage.getItem(name);
		I.buildMapFromLoadedTiles(name, hempstring);
    };
	
	I.buildMapFromLoadedTiles = function(name, hempstring) {
		tempstring=hempstring.split(",");
		I.exits=new Array();
		I.stairs=new Array();
		for (i=0;i<ROOM_WIDTH; i++){
			for (j=0;j<ROOM_HEIGHT; j++)
			{
				I.tiles[i][j].data = tempstring[j+ROOM_HEIGHT*i];
				if(I.tiles[i][j].data==DungeonTileType.Door)
				{
					if((i==18))
					{
						var mindy= new door(1);
						mindy.x=i;
						mindy.y=j-1;
						I.exits.push(mindy);
					}else if((i==1))
					{
						var mindy= new door(3);
						mindy.x=0;
						mindy.y=6;
						I.exits.push(mindy);
					}else if((j==0))
					{
						var mindy= new door(0);
						mindy.x=i-1;
						mindy.y=j;
						I.exits.push(mindy);
					}else// if((xPos==9) && (yPos==18))
					{
						var mindy= new door(2);
						mindy.x=i-1;
						mindy.y=j;
						I.exits.push(mindy);
					}
				}else if(I.tiles[i][j].data==DungeonTileType.UpStair)
				{
					var mindy= new staircase(true);
					mindy.x=i;
					mindy.y=j;
					I.stairs.push(mindy);
				}else if(I.tiles[i][j].data==DungeonTileType.DownStair)
				{
					var mindy= new staircase(false);
					mindy.x=i;
					mindy.y=j;
					I.stairs.push(mindy);
				}
			}
		}
    };
	
	I.saveTiles = function (name) {
		var tempstring = I.stringifyTiles(name);
		localStorage.setItem(name, tempstring);
	
    };
	
    
    I.drawPath = function(x,y,xx,yy) {
        var path = I.getPath(x, y, xx, yy);
        for( var i=0; i<path.length; ++i ) {
            I.setTile(path[i].x, path[i].y, 1);
        }
    };
    

    I.draw = function(can,cam) {
		if(!this.active){return;}
		//if(!mapDirty) {return;}
		//var cam={tileX:0,tileY:0,width:20,height:15};
		var poopx=cam.tileX+cam.width;//*Math.pow(2, I.zoom-1);
		var poopy=cam.tileY+cam.height;//*Math.pow(2, I.zoom-1);
		if(poopx>ROOM_WIDTH)
		{
			//poopx=ROOM_WIDTH-(cam.tileX+cam.width);
		}
		if(poopy>ROOM_HEIGHT)
		{
			poopy=ROOM_HEIGHT-(cam.tileY+cam.height);
		}
		I.zoom=1;

        for (i=0;i<ROOM_WIDTH; i++){
            for (j=0;j<ROOM_HEIGHT; j++){
                var DungeonTileTypes = {};
                for( var ii=0; ii<I.zoom; ii+=1 ) {
                    if ((i+ii>=ROOM_WIDTH)) { continue;}
                    for( var jj=0; jj<I.zoom; jj+=1 ) {
                        if ((j+jj>=ROOM_HEIGHT)) {continue;}

                        var data = I.tiles[i+ii][j+jj];
                        if( data ) {
                            if( !DungeonTileTypes[data.data] ) { DungeonTileTypes[data.data] = 1; }
                            else{ DungeonTileTypes[data.data] += 1; }
                        }
                    }
                }
                var dominantType = {type: null, occurs: 0};

                for( var type in DungeonTileTypes ) {
                    if( DungeonTileTypes[type] && DungeonTileTypes[type] > dominantType.occurs ) {
                        dominantType.occurs = DungeonTileTypes[type];
                        dominantType.type = type;
                    }
                }
				if((!this.fogOfWar) || (this.seenMap[i][j])|| (true))
				{
					if(dominantType.type && dominantType.type <20) {
					//HACK to get rid of error
						if(dungeonTileSprite[dominantType.type])
						{
							dungeonTileSprite[dominantType.type].draw(can, (i-cam.tileX)*32/Math.pow(2,I.zoom-1)+xOffset, (j-cam.tileY)*32/Math.pow(2,I.zoom-1)+yOffset);
						}
					}else if(dominantType.type&& dominantType.type<24){
						dungeonTileSprite[20+tileani].draw(can, (i-cam.tileX)*32/Math.pow(2,I.zoom-1)+xOffset, (j-cam.tileY)*32/Math.pow(2,I.zoom-1)+yOffset);
					}else if (dominantType.type&& dominantType.type<28) {
						dungeonTileSprite[24+tileani].draw(can, (i-cam.tileX)*32/Math.pow(2,I.zoom-1)+xOffset, (j-cam.tileY)*32/Math.pow(2,I.zoom-1)+yOffset);
					}else 
					{
						dungeonTileSprite[DungeonTileType.Lava+tileani].draw(can, (i-cam.tileX)*32/Math.pow(2,I.zoom-1)+xOffset, (j-cam.tileY)*32/Math.pow(2,I.zoom-1)+yOffset);
					}
				}else
				{
					fogSprite[tileani].draw(can, (i-cam.tileX)*32/Math.pow(2,I.zoom-1)+xOffset, (j-cam.tileY)*32/Math.pow(2,I.zoom-1)+yOffset);
				}
            }
        }
		mapDirty=false;
		for(var p=0;p<this.exits.length;p++)
		{
			this.exits[p].draw(can,cam);
		}
	  };
    I.clear =function(){
        for (i=0;i<ROOM_WIDTH; i++){
            for (j=0;j<ROOM_HEIGHT; j++){
                I.tiles[i][j]= new Tile();
                I.tiles[i][j].x=i;
                I.tiles[i][j].y=j;
            }
        }
    };
    

    I.setTile = function (x,y,data) {
        I.tiles[x][y].data = data;
    };
    
	closeEnough=function(dba,tgb){
		if(Math.abs(dba[0]-tgb[0])>RGB_THRESHOLD)
		{
			return false;
		}
		if(Math.abs(dba[1]-tgb[1])>RGB_THRESHOLD)
		{
			return false;
		}
		if(Math.abs(dba[2]-tgb[2])>RGB_THRESHOLD)
		{
			return false;
		}
		return true;
	};

	I.buildRoom= function(name){
       // setTimeout(function() {
		if(!imageExists("images/"+name+".png"))
		{
			console.log("No "+"images/"+name+".png");
			I.active=false;
			return;
		}
		var imageObj = new Image();
		imageObj.onerror= function()
		{
			console.log("No "+"images/"+name+".png, creating null room");
			I.active=false;
			//return;
		};
		imageObj.onload = function()
		{
			mapCanvas.drawImage(imageObj, 0, 0);
			//ROOM_WIDTH=imageObj.width;
			//ROOM_HEIGHT=imageObj.height;	
			I.width=ROOM_WIDTH;
			I.height=ROOM_HEIGHT;
			mapBitmap = mapCanvas.getImageData(0, 0, ROOM_WIDTH, ROOM_HEIGHT);

			for( var i=0; i<ROOM_WIDTH * ROOM_HEIGHT * 4; i+=4 )
			{//TODO/PROBLEMMAPWIDTH?
			  var rgba = [mapBitmap.data[i], mapBitmap.data[i+1], mapBitmap.data[i+2], mapBitmap.data[i+3]];
			  var greenfloorrgb =[60,0,64,0];
			  var birdheadrgb =[128,128,0,0];
			  var oceanrgb =[0,0,255,0];
			  var greenwallrgb =[0,0,0,0];
			  var sandrgb =[255,255,0,0];
			  var doorrgb =[128,128,128,0];
			  var wallcornerargb = [64,64,0,0];
			  var wallcornerbrgb =[0,0,64,0];
			  var wallcornercrgb= [0,50,0,0];
			  var wallcornerdrgb= [50,50,0,0];
			  var walltoprgb = [30,30,0,0];
			  var wallbottomrgb= [30,0,0,0];
			  var wallleftrgb= [0,30,0,0];
			  var wallrightrgb=[0,0,30,0];
			  var greenbrickrgb =[0,128,0,0];
			  var swamprgb =[0,255,64,0];
			  var plainsrgb =[128,64,64,0];
			  var stonergb =[230,230,230,0];
			  var hillrgb =[0,75,75,0];
			  var icergb =[120,64,53,7];
			  var icemountainrgb=[205,205,205,0]
			  var orangebrickrgb=[20,205,20,0]
			  var waterrgb =[0,100,255,0];
			  var lavargb =[255,0,0,0];
			  var grassrgb=[0,165,0,0];
			  var upstairrgb =[240,240,240,0];
			  var downstairrgb=[220,245,220,0];
			  var yPos = Math.floor(i / 4 / ROOM_WIDTH);
			  var xPos = (i / 4) % ROOM_WIDTH;
			if(closeEnough(rgba,stonergb)) {
				I.setTile(xPos, yPos, DungeonTileType.Stone);
			  }else if (closeEnough(rgba,icergb)) {
				I.setTile(xPos, yPos, DungeonTileType.Ice);
			  }else if (closeEnough(rgba,greenfloorrgb)){
				I.setTile(xPos, yPos, DungeonTileType.GreenFloor);
			  }else if (closeEnough(rgba,orangebrickrgb)){
				I.setTile(xPos, yPos, DungeonTileTypeOrangeBrick);
			  } else if (closeEnough(rgba,birdheadrgb)){
				I.setTile(xPos, yPos, DungeonTileType.BirdHead);
			  } else if (closeEnough(rgba,sandrgb)){
				I.setTile(xPos, yPos, DungeonTileType.Sand);
			  } else if (closeEnough(rgba,waterrgb)){
				I.setTile(xPos, yPos, DungeonTileType.Water);
			  } else if (closeEnough(rgba,greenbrickrgb)){
				I.setTile(xPos, yPos, DungeonTileType.GreenBrick);
			  } else if (closeEnough(rgba,lavargb)){
				I.setTile(xPos, yPos, DungeonTileType.Lava);
			  }else if (closeEnough(rgba,grassrgb)) {
				I.setTile(xPos, yPos, DungeonTileType.Grass);
			  }else if (closeEnough(rgba,greenwallrgb)) {
				I.setTile(xPos, yPos, DungeonTileType.GreenWall);
			  }else if (closeEnough(rgba,upstairrgb)) {
				I.setTile(xPos, yPos, DungeonTileType.UpStair);
				var mindy= new staircase(true);
				mindy.x=xPos;
				mindy.y=yPos;
				I.stairs.push(mindy);
			  }else if (closeEnough(rgba,downstairrgb)) {
				I.setTile(xPos, yPos, DungeonTileType.DownStair);
				var mindy= new staircase(false);
				mindy.x=xPos;
				mindy.y=yPos;
				I.stairs.push(mindy);
			  }else if (closeEnough(rgba,doorrgb)) {
				I.setTile(xPos, yPos, DungeonTileType.Door);
				if((xPos==18) && (yPos==7))
				{
					var mindy= new door(1);
					mindy.x=18;
					mindy.y=6;
					I.exits.push(mindy);
				}else if((xPos==1) && (yPos==7))
				{
					var mindy= new door(3);
					mindy.x=0;
					mindy.y=6;
					I.exits.push(mindy);
				}else if((xPos==9) && (yPos==0))
				{
					var mindy= new door(0);
					mindy.x=8;
					mindy.y=0;
					I.exits.push(mindy);
				}else// if((xPos==9) && (yPos==18))
				{
					var mindy= new door(2);
					mindy.x=8;
					mindy.y=13;
					I.exits.push(mindy);
				}
			  }else if (closeEnough(rgba,wallcornerargb)) {
				I.setTile(xPos, yPos, DungeonTileType.WallCornerA);
			  }else if (closeEnough(rgba,wallcornerbrgb)){
				I.setTile(xPos, yPos, DungeonTileType.WallCornerB);
			  } else if (closeEnough(rgba,wallcornercrgb)){
				I.setTile(xPos, yPos, DungeonTileType.WallCornerC);
			  } else if (closeEnough(rgba,wallcornerdrgb)){
				I.setTile(xPos, yPos, DungeonTileType.WallCornerD);
			  }else if (closeEnough(rgba,walltoprgb)){
				I.setTile(xPos, yPos, DungeonTileType.WallTop);
			  } else if (closeEnough(rgba,wallbottomrgb)){
				I.setTile(xPos, yPos, DungeonTileType.WallBottom);
			  } else if (closeEnough(rgba,wallleftrgb)){
				I.setTile(xPos, yPos, DungeonTileType.WallLeft);
			  } else if (closeEnough(rgba,wallrightrgb)){
				I.setTile(xPos, yPos, DungeonTileType.WallRight);
			  }else{
				I.setTile(xPos, yPos, DungeonTileType.Sand);
			  }
			}

        };
		imageObj.src = "images/"+name+".png";
		//}, 2000);
    };
	
	I.addDoor=function(dir)
	{
		if(I.hasDoor(dir)) {return;}
		if(dir==0)
		{
			var mindy= new door(0);
			mindy.x=8;
			mindy.y=0;
			I.exits.push(mindy);
		}else if (dir==1)
		{
			var mindy= new door(1);
			mindy.x=18;
			mindy.y=6;
			I.exits.push(mindy);
		}else if(dir==3)
		{
			var mindy= new door(3);
			mindy.x=0;
			mindy.y=6;
			I.exits.push(mindy);
		}else if(dir==2)
		{
			var mindy= new door(2);
			mindy.x=8;
			mindy.y=13;
			I.exits.push(mindy);
		}
	};
	
	I.getSubMap=function(tilex1,tiley1,tilex2,tiley2)
	{
		var x=x2=y=y2=0;
		if(tilex1>tilex2)
		{
			x=tilex2;
			x2=tilex1;
		}else
		{
			x=tilex1;
			x2=tilex2;
		}
		
		if(tiley1>tiley2)
		{
			y=tiley2;
			y2=tiley1;
		}else
		{
			y=tiley1;
			y2=tiley2;
		}
		var snookle=new Map();
		snookle.width=x2-x;
		snookle.height=y2-y;
		snookle.tiles=new Array()
		for(var i=0;i<x2;i++)
		{
			snookle.tiles[i]=new Array();
			for(var j=0;j<y2;j++)
			{
				snookle.tiles[i][j]=this.tiles[x+i][y+j];
			}
		}
		return snookle;
	};
    return I;
}

function editCursor()
{
	this.x=9;
	this.y=7; 
	this.sprite=Sprite("cursor");
	this.brush=0;
	this.brushType=0;
	this.penDown=false;
	this.penDownMode=false;
	this.mode=0;
	this.numModes=2;
}

editCursor.prototype.draw=function(can)
{
	this.sprite.draw(can,this.x*32+xOffset,this.y*32+yOffset);
}

editCursor.prototype.getTile=function(cRoom)
{
	return cRoom.tiles[this.x][this.y];
}

editCursor.prototype.move=function(dir)
{
	if(dir==0) //up 
	{
		if(this.y>2)
		{
			this.y--;
		}
	}else if(dir==2) //down
	{
		if(this.y<12)
		{
			this.y++;
		}
	}else if(dir==3) //right
	{
		if(this.x>2)
		{
			this.x--;
		}
	}else if(dir==1) //left
	{
		if(this.x<17)
		{
			this.x++;
		}
	}
	
};