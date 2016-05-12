var THREE = require('three');

module.exports = Class.extend({

  // for now, Objects are just meteors
  init: function(_server, options) {

    var _thing = this;

    _thing.options = options = options || {};

    if (options.collidable && _thing.mesh) {

      // https://github.com/chandlerprall/Physijs/wiki/Callbacks-&-Events
      _thing.mesh.addEventListener( 'collision', function( other_object, linear_velocity, angular_velocity ) {
        // `this` is the mesh with the event listener
        // other_object is the object `this` collided with
        // linear_velocity and angular_velocity are Vector3 objects which represent the velocity of the collision
      });

    }

    return _thing;

  }

});
