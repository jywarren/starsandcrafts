var THREE = require('three');

THREE.GPUParticleSystem = require('./lib/GPUParticleSystem.js');
//require('./lib/GPUParticleSystem.js')(THREE);

module.exports = Class.extend({

  // for now, Objects are just meteors
  init: function(_server) {

    var _thing = this;


    // Working from: 
    // https://github.com/mrdoob/three.js/blob/master/examples/webgl_gpu_particle_system.html

    // The GPU Particle system extends THREE.Object3D, and so you can use it
    // as you would any other scene graph component.	Particle positions will be
    // relative to the position of the particle system, but you will probably only need one
    // system for your whole scene
    _thing.particleSystem = new THREE.GPUParticleSystem({
    	maxParticles: 250000
    });
    _server.scene.add(_thing.particleSystem);

    // options passed during each spawned
    _thing.options = {
      position: new THREE.Vector3(),
      positionRandomness: .3,
      velocity: new THREE.Vector3(),
      velocityRandomness: .5,
      color: 0xffffff,
      colorRandomness: .2,
      turbulence: 0,
      lifetime: 2,
      size: 5,
      sizeRandomness: 1
    };

    _thing.options.velocity.x += 10;
    _thing.options.position.z = -20;
    _thing.options.position.x = -10;
    _thing.options.position.y = 10;

    _thing.spawnerOptions = {
      spawnRate: 15000,
      horizontalSpeed: 1.5,
      verticalSpeed: 1.33,
      timeScale: 1
    }

    _thing.tick = 0;

    _thing.animate = function() {

      var delta = _server.clock.getDelta() * _thing.spawnerOptions.timeScale;
      _thing.tick += delta;


      for (var x = 0; x < _thing.spawnerOptions.spawnRate * delta; x++) {
        // Yep, that's really it.	Spawning particles is super cheap, and once you spawn them, the rest of
        // their lifecycle is handled entirely on the GPU, driven by a time uniform updated below
        _thing.particleSystem.spawnParticle(_thing.options);
      }

      _thing.particleSystem.update(_thing.tick);

    }


 
    var s = 4;
    var cube = new THREE.BoxGeometry( s, s, s );
    var material = new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0xffffff, shininess: 50 } );

    _thing.meteors = [];

    for ( var i = 0; i < 200; i ++ ) {

      var meteor = new THREE.Mesh( cube, material );

      meteor.position.x = 100 * ( 2.0 * Math.random() - 1.0 );
      meteor.position.y = 10 * ( 2.0 * Math.random() - 1.0 );
      meteor.position.z = 100 * ( 2.0 * Math.random() - 1.0 );
      meteor.rotation.x = Math.random() * Math.PI;
      meteor.rotation.y = Math.random() * Math.PI;
      meteor.rotation.z = Math.random() * Math.PI;
/* this doesn't work, not sure why:
      meteor.velocity.x = Math.random();
      meteor.velocity.y = Math.random();
      meteor.velocity.z = Math.random();
*/
      meteor.matrixAutoUpdate = false;
      meteor.updateMatrix();

      _server.objects.push( meteor );
      _server.scene.add( meteor );

    }

    return _thing;

  }

});
