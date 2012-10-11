ig.module(
	'game.director.player-controller'
)
.requires(
	'impact.impact'
)
.defines(function(){

ig.PlayerController = ig.Class.extend({

	score: 0,
	wave: 1,
	height: 0,
	startSpeed: 0.9,
	proximity: 50,
	invaderCanAttack: true,
 	
	init: function(){
    	this.defaults = {lives: this.lives, score: this.score};
	},
  
  	// Damage calculation
	damage: function (damage) {
		var player = ig.game.getEntitiesByType( EntityPlayer )[0];
	  	player.receiveDamage( damage, this );
	    ig.game.explosion.play();

	  	if (player.health < 1) {
	  		this.death();
	  	}
	},
	
	invaderFire: function(invader) {
			ig.game.spawnEntity( EntityInvaderbullet, invader.pos.x + invader.size.x / 2, invader.pos.y - 1 );
	},
	
	// Death
	death: function() {
		this.score = 0;	
		this.wave = 1;
		this.proximity = 50;
		ig.game.loadLevel(LevelGameover);
	},
	
	invaderActions: function(thisinvader) {
		// move left or right
		if (thisinvader.pos.x + thisinvader.size.x > ig.system.width - 1){
			if (ig.game.speed > 0.1) {
				ig.game.speed -= 0.05;
			}
			for (var i=0; i < this.allInvaders.length; i++) {
				var alien = this.allInvaders[i];
				ig.game.direction = -5;
				alien.pos.x -= 5;
				alien.pos.y += 5;
				alien.setIdle();
			}

		}

		else if (thisinvader.pos.x < ig.game.screen.x + 1) {
			if (ig.game.speed > 0.1) {
				ig.game.speed -= 0.05;
			}
			for (var i=0, len=this.allInvaders.length; i < len; i++) {
				var alien = this.allInvaders[i];
				ig.game.direction = 5;
				alien.pos.x += 5;						
				alien.pos.y += 5;
				alien.setIdle();
			}
		}
	
		else if (thisinvader.pos.y > ig.system.height) {
			this.death();
		}
		
		if (thisinvader.pos.y > ig.system.height - 50) {
			this.invaderCanAttack = false;
		}
	},
	
	updateInvaders: function() {
		this.allRow1 = ig.game.getEntitiesByType( Entity30pt );
		this.allRow2 = ig.game.getEntitiesByType( Entity20pt );
		this.allRow4 = ig.game.getEntitiesByType( Entity10pt );
		this.allInvaders = this.allRow1.concat(this.allRow2,this.allRow4);
		if (this.allInvaders.length === 0 && ig.game.currentLevel === LevelMain) {
			this.wave++;
			if (this.wave > 1) {
				if (this.wave % 10 === 0){
					this.proximity = 50;
				}
				
				else {
					this.proximity += 10;
				}
				if (ig.game.speed > 0.1) {
					this.startSpeed -= 0.1;
					ig.game.speed = this.startSpeed;
				}
			}
			else {
				ig.game.speed = 0.9;
			}
			this.spawnEnemies();
		}
	},
	
	randomFromTo: function(from, to){
       return Math.floor(Math.random() * (to - from + 1) + from);
    },

	spawnEnemies: function() {
		this.invaderCanAttack = true;
		var proximity = this.proximity;
		ig.game.spawnEntity( Entity30pt, 5, proximity);
		for (var i = 0; i < 10; i++) {
			this.updateInvaders();
			var prevAlien = this.allRow1[this.allRow1.length - 1];
			
			ig.game.spawnEntity( Entity30pt, prevAlien.pos.x + 17.3, proximity);
		}
		proximity += 15
		// row 2
		ig.game.spawnEntity( Entity20pt, 5, proximity);
		for (var n = 0; n < 10; n++) {
			this.updateInvaders();
			var prevAlien2 = this.allRow2[this.allRow2.length - 1];
			
			ig.game.spawnEntity( Entity20pt, prevAlien2.pos.x + 17, proximity );
		}
		proximity += 15
		// row 3
		ig.game.spawnEntity( Entity20pt, 5, proximity);
		for (var n = 0; n < 10; n++) {
			this.updateInvaders();
			var prevAlien3 = this.allRow2[this.allRow2.length - 1];
			ig.game.spawnEntity( Entity20pt, prevAlien3.pos.x + 17, proximity );
		}
		proximity += 15
		// row 4
		ig.game.spawnEntity( Entity10pt, 5, proximity);
		for (var n = 0; n < 10; n++) {
			this.updateInvaders();
			var prevAlien4 = this.allRow4[this.allRow4.length - 1];
			
			ig.game.spawnEntity( Entity10pt, prevAlien4.pos.x + 16.9, proximity );
		}
		proximity += 15
		// row 5
		ig.game.spawnEntity( Entity10pt, 5, proximity);
		for (var n = 0; n < 10; n++) {
			this.updateInvaders();
			var prevAlien5 = this.allRow4[this.allRow4.length - 1];
			ig.game.spawnEntity( Entity10pt, prevAlien5.pos.x + 16.9, proximity );
		}
		this.updateInvaders();

	}
  
});

});