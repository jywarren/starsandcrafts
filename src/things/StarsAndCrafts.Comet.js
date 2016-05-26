THREE.GPUParticleSystem = require('./../lib/GPUParticleSystem.js');

module.exports = StarsAndCrafts.Thing.extend({

  // for now, Objects are just mesh.
  init: function(_server) {

    var _comet = this;

    _comet._super(_server);

    // Working from: 
    // https://github.com/mrdoob/three.js/blob/master/examples/webgl_gpu_particle_system.html

    // The GPU Particle system extends THREE.Object3D, and so you can use it
    // as you would any other scene graph component.	Particle positions will be
    // relative to the position of the particle system, but you will probably only need one
    // system for your whole scene

    _comet.particleSystem = new THREE.GPUParticleSystem({
    	maxParticles: 25000
    });

    _server.scene.add(_comet.particleSystem);

    // options passed during each spawned
    _comet.options = {
      position: new THREE.Vector3(),
      positionRandomness: 0.5,
      velocity: new THREE.Vector3(),
      velocityRandomness: 0.5,
      color: 0xffffff,
      colorRandomness: 0.2,
      turbulence: 0,
      lifetime: 2,
      size: 5,
      sizeRandomness: 1
    };

    _comet.options.velocity.x += 1;
    _comet.options.position.z = 20;
    _comet.options.position.x = -10;
    _comet.options.position.y = 10;

    _comet.spawnerOptions = {
      spawnRate: 15000,
      horizontalSpeed: 1.5,
      verticalSpeed: 1.33,
      timeScale: 1
    }

    _comet.tick = 0;

    _comet.update = function() {

      var delta = _server.clock.getDelta() * _comet.spawnerOptions.timeScale;
      _comet.tick += delta;

      for (var x = 0; x < _comet.spawnerOptions.spawnRate * delta; x++) {
        // Yep, that's really it.	Spawning particles is super cheap, and once you spawn them, the rest of
        // their lifecycle is handled entirely on the GPU, driven by a time uniform updated below
        _comet.particleSystem.spawnParticle(_comet.options);
      }

      _comet.options.position.z -= 1;

      _comet.particleSystem.update(_comet.tick);

    }


    return _comet;

  }

});
