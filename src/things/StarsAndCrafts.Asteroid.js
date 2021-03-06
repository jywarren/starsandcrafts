module.exports = StarsAndCrafts.Thing.extend({

  // for now, Objects are just mesh.
  init: function(_server) {

    var _asteroid = this;

    this._super(_server);
 
    var s = Math.random() * 3 + 1;

    // create a geometry only if it doesn't already exist; reduce redundancy
    _server.asteroidCube = _server.asteroidCube || new THREE.BoxGeometry( s, s, s );

    // create a material only if it doesn't already exist; reduce redundancy
    _server.asteroidMaterial = _server.asteroidMaterial || new THREE.MeshPhongMaterial({
      color:     0x222222, 
      specular:  0xffffff, 
      shininess: 10 
    });

    _asteroid.mesh = new Physijs.BoxMesh( _server.asteroidCube, _server.asteroidMaterial );
//    _asteroid.mesh.castShadow = true;
//    _asteroid.mesh.receiveShadow = true;

    _asteroid.mesh.position.x = 100 * ( 2.0 * Math.random() - 1.0 );
    _asteroid.mesh.position.y = 10  * ( 2.0 * Math.random() - 1.0 ) - 12; // below the ecliptic
    _asteroid.mesh.position.z = 100 * ( 2.0 * Math.random() - 1.0 );
    _asteroid.mesh.rotation.x = Math.random() * Math.PI;
    _asteroid.mesh.rotation.y = Math.random() * Math.PI;
    _asteroid.mesh.rotation.z = Math.random() * Math.PI;

    // switch to event/listener model!
    _server.scene.add(_asteroid.mesh);

    // what does this do? 
//    _asteroid.mesh.setLinearFactor(1,1,1);
//    _asteroid.mesh.setAngularFactor(1,1,1);

    _asteroid.mesh.setLinearVelocity( 
      new THREE.Vector3(
        Math.random() * 2 - 1, 
        Math.random() * 2 - 1, 
        Math.random() * 2 - 1
      )
    );
    _asteroid.mesh.setAngularVelocity(
      new THREE.Vector3(
        Math.random() * 0.2, 
        0.2, 
        0.2
      )
    );

/*
    _asteroid.update = function() {
    }
*/

  }

});
