module.exports = StarsAndCrafts.Thing.extend({

  init: function(_server, options) {

    var _ship = this;
    _ship.options = options || {};
    _ship.options.mesh = _ship.options.mesh || false;

    _ship.interfaces = {};

    _ship.interfaces['helm'] = new SC.Interface(_server, { role: 'helm' }),
    _ship.interfaces['sensors'] = new SC.Interface(_server, { role: 'sensors' }),
    _ship.interfaces['tactical'] = new SC.Interface(_server, { role: 'tactical' })


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


    _ship.sync = function() {

      if (_ship.interfaces['tactical']) {
        _ship.interfaces['tactical'].send('shields:' + _ship.shields + '%');
      }

    }


    _ship.shake = function(count, delay, intensity) {

      count     = count     || 10;
      delay     = delay     || 20;
      intensity = intensity || 1;
      var dir = 1,
          interval = setInterval( function() {

        _server.camera.rotateX(intensity * Math.random() * 0.01 * dir);
        _server.camera.rotateY(intensity * Math.random() * 0.01 * dir);
        _server.camera.rotateZ(intensity * Math.random() * 0.01 * dir);

        dir *= -1;
        count -= 1;

        if (count <= 0) clearInterval(interval);

      }, delay);

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
