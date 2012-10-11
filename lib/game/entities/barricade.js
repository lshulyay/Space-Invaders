ig.module( 
	'game.entities.barricade'
)
.requires(
	'impact.entity'
)
.defines(function(){
EntityBarricade = ig.Entity.extend({
	size: {x: 18, y:12},
    health: 5,
    frame: 0,
	
	type: ig.Entity.TYPE.B, // Player friendly group
	checkAgainst: ig.Entity.TYPE.A,
	collides: ig.Entity.COLLIDES.NEVER,
	
	animSheet: new ig.AnimationSheet( 'media/barricade.png', 18, 12 ),

	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		this.setAnimations();
		this.currentAnim = this.anims.Idle;
	},
	
	setAnimations: function() {
	    this.anims.Idle = new ig.Animation( this.animSheet, 1, [this.frame] );
	    this.currentAnim = this.anims.Idle;
	},
	
	check: function( other ) {
		if (other instanceof EntityInvaderbullet || other instanceof EntityPlayerbullet) {
			this.receiveDamage(1, other);
			this.frame++;
			this.setAnimations();
			ig.game.player.canFire = true;
			other.kill();
        }
        
 	},

	update: function() {

		// move!
		this.parent();
	}	

});
});