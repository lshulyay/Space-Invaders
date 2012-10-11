ig.module( 
	'game.entities.10pt'
)
.requires(
	'impact.entity'
)
.defines(function(){
Entity10pt = ig.Entity.extend({
	size: {x: 15, y:10},
    health: 1,
    direction: 5,
    points: 10,
    type: '10pt',  
	
	type: ig.Entity.TYPE.A, // Player friendly group
	checkAgainst: ig.Entity.TYPE.NONE,
	collides: ig.Entity.COLLIDES.ACTIVE,

	animSheet: new ig.AnimationSheet( 'media/10pt.png', 15, 10 ),
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		this.proximity = this.pos.y;

		// Add animations
		this.anims.Die = new ig.Animation( this.animSheet, 0.8, [2,3] );
		this.setIdle();
		ig.game.invader20pt = this;
	},
	
	move: function() {
		this.pos.x += ig.game.direction;
	},
		
	setIdle: function() {
	    this.anims.Idle = new ig.Animation( this.animSheet, ig.game.speed, [0,1] );
		this.currentAnim = this.anims.Idle;
	},

	update: function() {	
			if( this.currentAnim === this.anims.Die ) {
				ig.game.removeEntity( this );
			}

		ig.game.playerController.invaderActions(this);

		// move!
		this.parent();
	}
	
});
});