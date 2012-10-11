ig.module(
    'game.director.prefix'
).requires(
    'impact.image',
    'impact.sound'
).defines( function() {
    ig.prefix = window.igprefix || '';
    ig.path = function(p) {
        return this.prefix + p;
    }
 
    ig.Image.inject({
        staticInstantiate: function(path) {
            return this.parent(ig.path(path));
        },
 
        init:function(path) {
            return this.parent(ig.path(path));
        }
    });
 
    ig.Sound.inject({
        init: function(path, multiChannel) {
            this.parent(ig.path(path), multiChannel);
        }
    });
 
    ig.Music.inject({
        add:function(path) {
            this.parent(ig.path(path));
        }
    });
 
});