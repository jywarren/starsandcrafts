var THREE = require('three');

module.exports = StarsAndCrafts.Thing.extend({

  // for now, Objects are just mesh.
  init: function(_server) {

    var _meteor = this;

    this._super(_server);
 
    var s = Math.random() * 3 + 1;

    // create a geometry only if it doesn't already exist; reduce redundancy
    _server.meteorCube = _server.meteorCube || new THREE.BoxGeometry( s, s, s );

    // create a material only if it doesn't already exist; reduce redundancy
    _server.meteorMaterial = _server.meteorMaterial || new THREE.MeshPhongMaterial({
      color:     0x222222, 
      specular:  0xffffff, 
      shininess: 10 
    });

    var mesh = new THREE.Mesh( _server.meteorCube, _server.meteorMaterial );

    mesh.position.x = 100 * ( 2.0 * Math.random() - 1.0 );
    mesh.position.y = 10  * ( 2.0 * Math.random() - 1.0 ) - 12; // below the ecliptic
    mesh.position.z = 100 * ( 2.0 * Math.random() - 1.0 );
    mesh.rotation.x = Math.random() * Math.PI;
    mesh.rotation.y = Math.random() * Math.PI;
    mesh.rotation.z = Math.random() * Math.PI;

/* this doesn't work; Meshes don't have velocity
    mesh.velocity.x = Math.random();
    mesh.velocity.y = Math.random();
    mesh.velocity.z = Math.random();
*/

    mesh.matrixAutoUpdate = false;
    mesh.updateMatrix();

    _server.objects.push(mesh);
    _server.scene.add(mesh);


    _meteor.update = function() {

      mesh.rotation.y += 0.005;
      mesh.updateMatrix();

    }

  }

});
