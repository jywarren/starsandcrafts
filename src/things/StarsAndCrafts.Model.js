THREE.STLLoader = require('three-stl-loader')(THREE);

module.exports = StarsAndCrafts.Model = StarsAndCrafts.Thing.extend({

  init: function(src, _server, _callback) {

    var _model = this;
    _model.src = src || '../models/COMET_67P_C-G.stl';
    _model.callback = _callback;


    var manager = new THREE.LoadingManager();
    manager.onProgress = function ( item, loaded, total ) {
      //console.log( item, loaded, total );
    };

    var loader = new THREE.STLLoader( manager );
    loader.load( _model.src, function ( geometry ) {

      _model.material = new THREE.MeshPhongMaterial({
        color:     0xaaaaaa, 
        specular:  0xffffff, 
        shininess: 0 
      });

      _model.mesh = new Physijs.BoxMesh( geometry, _model.material );
      _model.mesh.castShadow = true;
      _model.mesh.receiveShadow = true;

      _server.scene.add( _model.mesh );
      _server.objects.push( _model );

      _model.mesh.position.set( 50, 30, -130 );
      _model.mesh.__dirtyPosition = true;

      _model.mesh.setLinearVelocity( 
        new THREE.Vector3(
          0.1, 0, 0
        )
      );

      _model.mesh.setAngularVelocity(
        new THREE.Vector3(
          Math.random() * 0.2, 
          0.2, 
          0.2
        )
      );

      if (_model.callback) _model.callback();

    });


  }

}); 
