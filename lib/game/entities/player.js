ig.module( 
	'game.entities.player'
)
.requires(
	'impact.entity'
)
.defines(function(){
EntityPlayer = ig.Entity.extend({
	size: {x: 16, y:10},
	offset: {x: 0, y: 0},
	flip: false,
	angle: 0,
	maxVel: {x: 400, y: 0},
	speed: 200,
    health: 3,
    canFire: true,
    proximity: 100,
	    
	type: ig.Entity.TYPE.A, // Player friendly group
	checkAgainst: ig.Entity.TYPE.NONE,
	collides: ig.Entity.COLLIDES.PASSIVE,
	
	animSheet: new ig.AnimationSheet( 'media/player.png', 16, 10 ),
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );

		// Add animations
		this.addAnim( 'idle', 1, [0] );
		this.addAnim( 'Die', 1, [1] );
		
		ig.game.player = this;
	},
	
	update: function() {
		// move left or right
		if( ig.input.state('left') ) {
			this.pos.x += -3;
		}
		else if( ig.input.state('right') ) {
			this.pos.x += 3;
		}
		else {
			this.vel.x = 0;
		}
		
		if (ig.input.pressed('fire') && this.canFire ) {
			ig.game.spawnEntity( EntityPlayerbullet, this.pos.x + this.size.x / 2, this.pos.y - 1 );
        	ig.game.playershoot.play();
		}
				
		if( this.pos.x <= ig.game.screen.x ){
			this.pos.x = ig.game.screen.x + 1;
		}
		if( this.pos.x + this.size.x >= ig.system.width){
		   this.pos.x = ig.system.width - this.size.x + 1;
		}		// move!
		
		if (this.health < 1) {
			ig.game.playerController.death();
		}
		
		if( this.currentAnim === this.anims.Die ) {
			if (ig.game.speedTimer.delta() > -0.32) {
			this.currentAnim = this.anims.idle;
			this.pos.x = ig.system.width / 2 - this.size.x / 2;
			}
		}

		this.parent();
	}
});

EntityPlayerbullet = ig.Entity.extend({
	size: {x: 1, y: 6},
	maxVel: {x: 0, y: -300},
	damage: 1,

	type: ig.Entity.TYPE.A,
	checkAgainst: ig.Entity.TYPE.A, // Check Against A - player's group
	collides: ig.Entity.COLLIDES.LITE,

	animSheet: new ig.AnimationSheet( 'media/playerbullet.png', 1, 6 ),

	init: function( x, y, settings ) {
		this.parent(x, y, settings);
		this.addAnim( 'idle', 1, [0] );	
		this.vel.y = this.maxVel.y;
		ig.game.player.canFire = false;

	},
	
	collideWith: function( other ) {
		if (other instanceof Entity30pt ||
			other instanceof Entity20pt ||
			other instanceof Entity10pt ||
			other instanceof EntityMothership) {
			var fire = ig.game.playerController.randomFromTo(0,5);
			if (fire < 1) {
				ig.game.playerController.invaderFire(other);
			}
			other.currentAnim = other.anims.Die;
        	ig.game.invaderkilled.play();
        	ig.game.player.canFire = true;
        	ig.game.playerController.score += other.points;
			this.kill();
        }
	},

	update: function() {
		// Get the array of all Pit1 entities
		if (this.pos.y < 0 + this.size.y) {
			ig.game.player.canFire = true;
			this.kill();
			
		}
		this.parent();
	}
	
});
});