module.exports = StarsAndCrafts.Thing.extend({

  init: function(_server, options) {

    var _ship = this;
    _ship.options = options || {};
    _ship.options.mesh = _ship.options.mesh || false;

    _ship.interfaces = [];

    _ship.interfaces.push(
      new SC.Interface(_server, { role: 'helm' }),
      new SC.Interface(_server, { role: 'sensors' }),
      new SC.Interface(_server, { role: 'tactical' })
    );


    _ship.shields      = true;
    _ship.shieldPower  = 100;
    _ship.energy       = 100;
    _ship.torpedos     = 10;
    _ship.thrusterFuel = 200;


    if (_ship.options.mesh) {

      _ship.geometry = new THREE.BoxGeometry( 1, 1, 1 );
     
      _ship.material = new THREE.MeshLambertMaterial({
        color:       0xaaaaaa,
        opacity:     1, 
      });
     
      _ship.mesh = new Physijs.BoxMesh(
                      _ship.geometry, 
                      _ship.material
      );

    }


    _ship.torpedo = function(xOffset, yOffset) {

      if (_ship.torpedos > 1) {

        _ship.torpedos += 1;
 
        xOffset = xOffset || 10;
        yOffset = yOffset || 10;
 
        _torpedo = new SC.Torpedo(_server);
  
        _torpedo.mesh.__dirtyPosition = true;
        _torpedo.mesh.position.copy(_server.camera.position);
        _torpedo.mesh.position.y -= yOffset;
        _torpedo.mesh.position.x += xOffset;
  
        server.push(_server.camera, _torpedo.mesh, 50);

        return true;

      } else {

        return false;

      }

    }
 
  }

});
