ig.module( 
	'game.main' 
)
.requires(
	'game.director.prefix',
	'impact.game',
	'impact.font',
	
	'game.levels.title',
	'game.levels.main',
	'game.levels.gameover',
	'game.entities.player',
	'game.entities.30pt',
	'game.entities.20pt',
	'game.entities.10pt',
	'game.entities.mothership',
	'game.entities.invaderbullet',
	'game.entities.barricade',
	
	'game.director.player-controller'
)
.defines(function(){

MyGame = ig.Game.extend({
	
	font: new ig.Font( 'media/04b03.font.png' ),
	guifont: new ig.Font( 'media/mainfont.png'),
	gravity: 0,
	speed: 0.9,
	direction: 5,
	proximity: 100,
	
	// Images
	healthicon: new ig.Image ( 'media/healthicon.png' ),

	init: function() {
	
  	 	// Sound effects
  	 	this.playershoot = new ig.Sound( 'media/audio/shoot.*' );
  	 	this.invaderkilled = new ig.Sound( 'media/audio/invaderkilled.*' );
  	 	this.explosion = new ig.Sound( 'media/audio/explosion.*' );
  	 	this.invadermove = new ig.Sound( 'media/audio/fastinvader4.*' );
		ig.music.add( 'media/audio/ufo.*', ['ufo'] );
		
		// Initialize 
		ig.input.bind( ig.KEY.SPACE, 'fire' );
		ig.input.bind( ig.KEY.LEFT_ARROW, 'left' );
		ig.input.bind( ig.KEY.RIGHT_ARROW, 'right' );
		
		this.speedTimer = new ig.Timer(this.speed);

		this.playerController = new ig.PlayerController();
		this.loadLevel(LevelTitle);
	},

	loadLevel: function( data ) {
		this.parent( data );
				
		this.currentLevel = data;
		if (this.currentLevel === LevelMain) {
			ig.game.playerController.spawnEnemies();
		}
	},

	update: function() {
		// Update all entities and backgroundMaps
		if (ig.game.invader && this.currentLevel === LevelMain) {
			if (this.speedTimer.delta() > 0) {
				ig.game.playerController.updateInvaders();
				for (var i=0, len=ig.game.playerController.allInvaders.length; i < len; i++) {
					var alien = ig.game.playerController.allInvaders[i];
					var fire = ig.game.playerController.randomFromTo(0,2000);
					if (fire < 1) {
						ig.game.playerController.invaderFire(alien);
					}
					alien.move();				
				}
		    this.invadermove.play();
			this.speedTimer.set( this.speed );
			}
		
		
			var rand = ig.game.playerController.randomFromTo(0,3000);	
			if (rand < 1 && this.currentLevel === LevelMain) {
				var allMotherships = ig.game.getEntitiesByType( EntityMothership );
				if (allMotherships.length === 0) {
					ig.music.stop(['ufo']);
					ig.game.spawnEntity( EntityMothership, 0, 13 );
				}
			}
		}
		this.parent();
	},
	
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
		
		var x = ig.system.width/2,
			y = ig.system.height/2;
		
		if (this.currentLevel === LevelTitle) {
			this.guifont.draw('Press SPACE to start', x, 205, ig.Font.ALIGN.CENTER);
			this.guifont.draw( '- 10', x, 113, ig.Font.ALIGN.LEFT );
			this.guifont.draw( '- 20', x, 135, ig.Font.ALIGN.LEFT );
			this.guifont.draw( '- 30', x, 158, ig.Font.ALIGN.LEFT );
			this.guifont.draw( '- ???', x, 180, ig.Font.ALIGN.LEFT );
			if (ig.input.pressed('fire')) {
				this.loadLevel(LevelMain);
			}
		}
		
		else if (this.currentLevel === LevelMain) {
			this.font.draw( 'SCORE: ' + ig.game.playerController.score, 3, 3, ig.Font.ALIGN.LEFT );
			this.font.draw( 'WAVE: ' + ig.game.playerController.wave, x, 3, ig.Font.ALIGN.CENTER);
			var healthX = ig.system.width - 16;
			for (var i = 0; i < ig.game.player.health; i++) {
				this.healthicon.draw( healthX, 2 );
				healthX -= 15;
			}
		}
		
		else if (this.currentLevel === LevelGameover) {
			this.guifont.draw('GAME OVER', x, y, ig.Font.ALIGN.CENTER);
			this.font.draw('Press SPACE to try again', x, y + 15, ig.Font.ALIGN.CENTER);
			if (ig.input.pressed('fire')) {
				ig.game.speed = 0.9;
				this.loadLevel(LevelMain);
			}
		}
	}
});


ig.main( '#canvas', MyGame, 60, 300, 220, 2 );

});
