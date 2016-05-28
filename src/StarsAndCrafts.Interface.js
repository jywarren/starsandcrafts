var Peer  = require('peerjs');

module.exports = SC.Interface = Class.extend({

  // for now, Objects are just meteors
  init: function(_server, options) {

    var _interface = this;

    _interface.options = options = options || {};
    _interface.options.role = _interface.options.role || ""; // usually "helm"

    var markers = {
      "helm":           "H",
      "sensors":        "S",
      "engineering":    "E",
      "communications": "C",
      "tactical":       "T"
    }

    var rot = _server.controls.rotationVector,
        mov = _server.controls.moveVector;

    $('#info').append('<span class="' + _interface.options.role + '">' + markers[_interface.options.role] + '</span>');
    _interface.dot = $('#info .' + _interface.options.role);
    _interface.dot.css('color', 'red');

    // peer connecting

    _interface.peer = new Peer(
      _server.key + "-server-" + _interface.options.role, 
      { key: 'wapghotvz0s2x1or' }
    );
 
    _interface.peer.on('connection', function(conn) {

      _interface.dot.css('color', 'green');
 
      conn.on('data', function(data){
 
        console.log(data);
        _interface.run(data);

      });


      conn.on('close', function() {
 
        console.log('connection closed');
 
        _interface.dot.css('color', 'red');
 
        // _interface.peer.reconnect();
 
      });

    });


    _interface.peer.on('close', function() {

      console.log('peer disconnected');

      _interface.dot.css('color', 'red');

      // _interface.peer.reconnect();

    });


    // this API should reflect that at:
    // https://github.com/jywarren/starsandcrafts/wiki
    _interface.run = function(data) {

      var namespace = data.split(':')[0];
      var command = data.split(':')[1];
      var args = data.split(':');

      _interface.dot.css('color', 'yellow');
      setTimeout(function() {
        _interface.dot.css('color', 'green');
      }, 50);

      if (namespace == "helm") {
 
        if (command == "left")      rot.y += 0.02;
        if (command == "right")     rot.y -= 0.02;
        if (command == "up")        rot.x += 0.02;
        if (command == "down")      rot.x -= 0.02;
        if (command == "tiltleft")  rot.z += 0.02;
        if (command == "tiltright") rot.z -= 0.02;
        if (command == "forward")   mov.z -= 0.1;
        if (command == "backward")  mov.z += 0.1;

      } else if (namespace == "sensors") {

        // viewscreen zooming:
        if (command == "zoom") {

          if (args[2] == "in")      _server.camera.fov -= 20;
          if (args[2] == "out")     _server.camera.fov += 20;
          if (args[2] == "default") _server.camera.fov = 85;
          if (_server.camera.fov > 85) _server.camera.fov = 85;
          if (_server.camera.fov < 10) _server.camera.fov = 10;
          _server.camera.updateProjectionMatrix();

        }

        if (command == "grid") {

          _interface.grid = _interface.grid || new THREE.Mesh( 
            new THREE.PlaneGeometry( 10000, 10000 ),
            new THREE.MeshBasicMaterial( { color: 0xaaaaaa } )
          );
          _interface.grid = new THREE.GridHelper(400, 40);
          _interface.grid.position.y = -10;

          if (args[2] == "on")  _server.scene.add(_interface.grid);
          if (args[2] == "off") _server.scene.remove(_interface.grid);

        }

      } else if (namespace == "tactical") {

        if (command == "torpedo") _server.ship.torpedo();

      }
    }
    

    return _interface;

  }

});
