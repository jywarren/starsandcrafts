var Peer = require('peerjs');

module.exports = SC.Interface = Class.extend({

  // for now, Objects are just meteors
  init: function(_server, options) {

    var _interface = this;

    _interface.options = options = options || {};
    _interface.options.role = _interface.options.role || ""; // usually "helm"

    $('#info').append('<span class="' + _interface.options.role + '">*</span>');
    _interface.dot = $('#info .' + _interface.options.role);
    _interface.dot.css('color', 'red');

    // peer connecting

    _interface.peer = new Peer(
      _server.key + "-server-" + _interface.options.role, 
      { key: 'wapghotvz0s2x1or' }
    );
 
    _interface.peer.on('connection', function(conn) {

      _interface.dot.css('color', 'green');

      var rot = _server.controls.rotationVector,
          mov = _server.controls.moveVector;
 
      conn.on('data', function(data){
 
        console.log(data);

        // this API should reflect that at:
        // https://github.com/jywarren/starsandcrafts/wiki

        var namespace = data.split(':')[0];
        var command = data.split(':')[1];

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

        }

      });

    });
    

    return _interface;

  }

});
