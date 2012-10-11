ig.module( 
	'game.entities.mothership'
)
.requires(
	'impact.entity'
)
.defines(function(){
EntityMothership = ig.Entity.extend({
	size: {x: 27, y:12},
    health: 1,
    direction: 10,
    points: 500,
	
	type: ig.Entity.TYPE.A,
	checkAgainst: ig.Entity.TYPE.NONE,
	collides: ig.Entity.COLLIDES.ACTIVE,
	
	animSheet: new ig.AnimationSheet( 'media/mothership.png', 27, 12 ),

	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		ig.music.play(['ufo']);
	    this.anims.Idle = new ig.Animation( this.animSheet, 1, [0] );
		this.anims.Die = new ig.Animation( this.animSheet, 1, [1] );
		this.currentAnim = this.anims.Idle;
		var dir = ig.game.playerController.randomFromTo(0,3);
		if (dir < 1) {
			this.pos.x = 0
			this.direction = 30;
		}
		
		else {
			this.pos.x = ig.system.width - this.size.x;
			this.direction = -30;
		}
		
		if (dir === 0) {
			this.points = 50;
		}
		
		else if (dir === 1) {
			this.points = 100;
		}
		
		else if (dir === 2) {
			this.points = 150;
		}
		
		else if (dir === 3) {
			this.points = 300;
		}

	},

	update: function() {
			if( this.currentAnim === this.anims.Die ) {
				ig.music.stop(['ufo']);
				ig.game.removeEntity( this );
			}
			
			if (this.pos.x > ig.system.width || this.pos.x < -27) {
				ig.music.stop(['ufo']);
				this.kill();
			}
	
		this.vel.x = this.direction;

		// move!
		this.parent();
	}	

});
});