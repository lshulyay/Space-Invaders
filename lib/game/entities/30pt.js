ig.module( 
	'game.entities.30pt'
)
.requires(
	'impact.entity'
)
.defines(function(){
Entity30pt = ig.Entity.extend({
	size: {x: 10, y:10},
    health: 1,
    direction: 5,
    points: null,
    type: '30pt',  
	
	type: ig.Entity.TYPE.A, // Player friendly group
	checkAgainst: ig.Entity.TYPE.NONE,
	collides: ig.Entity.COLLIDES.ACTIVE,
	
	animSheet: new ig.AnimationSheet( 'media/30pt.png', 10, 10 ),
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		this.anims.Die = new ig.Animation( this.animSheet, 1, [2] );
		this.setIdle();
		ig.game.invader = this;
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