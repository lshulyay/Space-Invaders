ig.module( 
	'game.entities.invaderbullet'
)
.requires(
	'impact.entity'
)
.defines(function(){
EntityInvaderbullet = ig.Entity.extend({
	size: {x: 2, y: 6},
	maxVel: {x: 0, y: 200},
	damage: 1,
	type: null,

	type: ig.Entity.TYPE.A,
	checkAgainst: ig.Entity.TYPE.A, // Check Against A - player's group
	collides: ig.Entity.COLLIDES.NEVER,

	animSheet: new ig.AnimationSheet( 'media/invaderbullet.png', 2, 6 ),

	init: function( x, y, settings ) {
		this.parent(x, y, settings);
		this.addAnim( 'IdleStraight', 0.1, [0,1,2,3,2,1] );	
		this.addAnim( 'IdleSquiggly', 0.2, [4,5]);
		
		var rand = ig.game.playerController.randomFromTo(0,2);
		if (rand === 0) {
			this.maxVel.y = 100;
			this.currentAnim = this.anims.IdleStraight;
		}
		
		else if (rand === 1) {
			this.maxVel.y = 150;
			this.currentAnim = this.anims.IdleStraight;
		}
		
		else if (rand === 2) {
			this.maxVel.y = 200;
			this.currentAnim = this.anims.IdleSquiggly;
		}
		
		this.vel.y = this.maxVel.y;

	},
		
	check: function( other ) {
		if (other instanceof EntityPlayer) {
			if (ig.game.playerController.invaderCanAttack = true) { 
				other.currentAnim = other.anims.Die;
				ig.game.playerController.damage(1);
				this.kill();
        	}
        	
        	else {
        		this.kill();
        	}
        }
	},

	update: function() {
		if (this.pos.y > ig.system.height + this.size.y) {
			this.kill();
		}
		this.parent();
	}
	

});
});