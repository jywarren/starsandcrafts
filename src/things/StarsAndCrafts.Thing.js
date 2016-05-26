module.exports = StarsAndCrafts.Thing = Class.extend({

  // for now, Objects are just meteors
  init: function(_server, options) {

    var _thing = this;

    _thing.options = options = options || {};
    _thing.options.collidable = true;

    if (_thing.options.collidable && _thing.mesh) {

      console.log('listening for collisions');

      // https://github.com/chandlerprall/Physijs/wiki/Callbacks-&-Events
      _thing.mesh.addEventListener( 'collision', function( other_object, linear_velocity, angular_velocity ) {
        // `this` is the mesh with the event listener
        // other_object is the object `this` collided with
        // linear_velocity and angular_velocity are Vector3 objects which represent the velocity of the collision
        console.log('Bump!');
      });

    }

    return _thing;

  }

});
