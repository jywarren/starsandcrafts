SC = SC || {};
SC.Scenarios = {


  // fire a torpedo on space key
  "torpedo": function(server) {

    torpedo = new SC.Torpedo(server);

    torpedo.mesh.position.copy(server.camera.position);
    torpedo.mesh.position.y -= 10;
    torpedo.mesh.position.x += 10;

    server.push(server.camera, torpedo.mesh, 50);

    return torpedo;

  },


  // the planetoid/asteroid
  "eros": function(server) {

    eros = new SC.Model('../models/eros.stl', server, function() {

      // models must load first, so we pass a callback function 
      eros.mesh.setLinearVelocity({ x: -3, y: -2, z: 3});

      eros.mesh.addEventListener( 'collision', function( other_object, linear_velocity, angular_velocity ) {
        // `this` is the mesh with the event listener
        // other_object is the object `this` collided with
        // linear_velocity and angular_velocity are Vector3 objects which represent the velocity of the collision
        console.log('Bump!');
      });

    });

    return eros;

  },


  // makes 200 asteroids
  "asteroids": function(server) {

    var asteroids = [];

    for ( var i = 0; i < 200; i ++ ) {

      var asteroid = new SC.Asteroid(server);

      asteroids.push(asteroid);

      server.objects.push(asteroid);

    }

    return asteroids;

  },


  // the planetoid/asteroid
  "comet": function(server) {

    // needs debugging in size, trajectory, particle size, cone shape, turbulence on mobile
    var comet = new SC.Comet(server);
    server.objects.push(comet);

    return comet;

  },


  "fog": function(server) {

    // not working: 
 
//    server.scene.fog = new THREE.Fog( 0x000000, 3500, 15000 );
//    server.scene.fog.color.setHSL( 0.51, 0.4, 0.01 );
 
  }

}
