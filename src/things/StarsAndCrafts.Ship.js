module.exports = StarsAndCrafts.Thing.extend({

  init: function(_server, options) {

console.log('ship!');
    var _ship = this;
    _ship.options = options || {};

    // whether or not it's a visible object
    _ship.options.crewed = _ship.options.crewed || false;

    _ship.options.width  = _ship.options.width  || 10;
    _ship.options.height = _ship.options.height || 40;
    _ship.options.length = _ship.options.length || 80;

    _ship.interfaces = {};


    _ship.shields      = true;
    _ship.shieldPower  = 100;
    _ship.energy       = 100;
    _ship.torpedos     = 10;
    _ship.fuel = 200;


    if (_ship.options.crewed) {

      _ship.interfaces['helm'] = new SC.Interface(_server, { role: 'helm' });
      _ship.interfaces['sensors'] = new SC.Interface(_server, { role: 'sensors' });
      _ship.interfaces['tactical'] = new SC.Interface(_server, { role: 'tactical' });

    } else {

      _ship.geometry = new THREE.BoxGeometry( 
        _ship.options.width, 
        _ship.options.height, 
        _ship.options.length
      );
     
      _ship.material = new THREE.MeshLambertMaterial({
        color:       0xaaaaaa,
        opacity:     1, 
      });
     
      _ship.mesh = new Physijs.BoxMesh(
                      _ship.geometry, 
                      _ship.material
      );

      if (_ship.options.position) _ship.mesh.position.copy(_ship.options.position);

      _server.scene.add( _ship.mesh );
      _server.objects.push( _ship );

    }


    _ship.sync = function() {

      if (_ship.options.crewed) {

        // must add an "is connected" check or will error
        if (_ship.interfaces['tactical']) {
          _ship.interfaces['tactical'].send('shieldPower:' + _ship.shieldPower + '%');
          _ship.interfaces['tactical'].send('energy:' + _ship.energy + '%');
          _ship.interfaces['tactical'].send('torpedos:' + _ship.torpedos);
        }
 
        if (_ship.interfaces['helm']) {
          _ship.interfaces['helm'].send('fuel:' + _ship.fuel);
          _ship.interfaces['helm'].send('energy:' + _ship.energy + '%');
        }

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

        _ship.torpedos -= 1;
 
        xOffset = xOffset || 10;
        yOffset = yOffset || 10;
 
        _torpedo = new SC.Torpedo(_server);
  
        _torpedo.mesh.__dirtyPosition = true;
        _torpedo.mesh.position.copy(_server.camera.position);
        _torpedo.mesh.position.y -= yOffset;
        _torpedo.mesh.position.x += xOffset;
  
        _server.push(_server.camera, _torpedo.mesh, 50);

        _ship.sync();

        return true;

      } else {

        return false;

      }

    }

    _ship.sync();
 
  }

});
