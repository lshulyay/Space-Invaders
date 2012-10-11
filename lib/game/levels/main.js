ig.module( 'game.levels.main' )
.requires( 'impact.image','game.entities.player','game.entities.barricade' )
.defines(function(){
LevelMain=/*JSON[*/{"entities":[{"type":"EntityPlayer","x":136,"y":208},{"type":"EntityBarricade","x":236,"y":184},{"type":"EntityBarricade","x":36,"y":184},{"type":"EntityBarricade","x":104,"y":184},{"type":"EntityBarricade","x":172,"y":184}],"layer":[{"name":"main","width":15,"height":11,"linkWithCollision":false,"visible":1,"tilesetName":"media/bg.png","repeat":false,"preRender":true,"distance":"1","tilesize":20,"foreground":false,"data":[[1,1,1,1,1,1,1,1,1,1,1,0,0,0,0],[1,1,1,1,1,1,1,1,1,1,1,0,0,0,0],[1,1,1,1,1,1,1,1,1,1,1,0,0,0,0],[1,1,1,1,1,1,1,1,1,1,1,0,0,0,0],[1,1,1,1,1,1,1,1,1,1,1,0,0,0,0],[1,1,1,1,1,1,1,1,1,1,1,0,0,0,0],[1,1,1,1,1,1,1,1,1,1,1,0,0,0,0],[1,1,1,1,1,1,1,1,1,1,1,0,0,0,0],[1,1,1,1,1,1,1,1,1,1,1,0,0,0,0],[1,1,1,1,1,1,1,1,1,1,1,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]}]}/*]JSON*/;
LevelMainResources=[new ig.Image('media/bg.png')];
});