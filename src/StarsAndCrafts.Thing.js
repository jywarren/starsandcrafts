var THREE = require('three');

module.exports = Class.extend({

  // for now, Objects are just meteors
  init: function(_server) {
 
    var s = 4;
    var cube = new THREE.BoxGeometry( s, s, s );
    var material = new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0xffffff, shininess: 50 } );
    var meteors = [];

    for ( var i = 0; i < 200; i ++ ) {

      var meteor = new THREE.Mesh( cube, material );

      meteor.position.x = 100 * ( 2.0 * Math.random() - 1.0 );
      meteor.position.y = 10 * ( 2.0 * Math.random() - 1.0 );
      meteor.position.z = 100 * ( 2.0 * Math.random() - 1.0 );
      meteor.rotation.x = Math.random() * Math.PI;
      meteor.rotation.y = Math.random() * Math.PI;
      meteor.rotation.z = Math.random() * Math.PI;
      meteor.matrixAutoUpdate = false;
      meteor.updateMatrix();

      _server.objects.push( meteor );
      _server.scene.add( meteor );

    }

    return meteors;

  }

});
