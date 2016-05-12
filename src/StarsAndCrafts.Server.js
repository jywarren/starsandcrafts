StarsAndCrafts = SC = {};
module.exports = SC;

var Peer          = require('peerjs'),
    Class         = require('resig-class'),
    $             = require('jquery'),
    THREE         = require('three');

require('three-fly-controls')(THREE);

SC.Util      = require('./Util.js');
SC.Events    = require('./StarsAndCrafts.Events.js');
SC.Cosmos    = require('./StarsAndCrafts.Cosmos.js');
SC.Thing     = require('./things/StarsAndCrafts.Thing.js');
SC.Asteroid  = require('./things/StarsAndCrafts.Asteroid.js');
SC.Comet     = require('./things/StarsAndCrafts.Comet.js');
SC.Star      = require('./things/StarsAndCrafts.Star.js');


SC.Server = Class.extend({

  init: function(container) {

    var _server = this;
 
// target = new THREE.Vector3();

// cool for viewscreen zooming:
//  camera.fov -= event.wheelDeltaY * 0.05;
//  camera.updateProjectionMatrix();

    // all things here!
    _server.objects = [];
 
    container = container || document.getElementById( 'container' );
 
    _server.clock = new THREE.Clock();
 
    _server.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1100 );

    _server.events = SC.Events(_server);

    // move to controls class 
    _server.controls = new THREE.FlyControls( _server.camera );
 
    _server.controls.movementSpeed = 0.1;
    _server.controls.domElement = container;
    _server.controls.rollSpeed = Math.PI / 360;
    _server.controls.autoForward = false;
    _server.controls.dragToLook = true;
 
    _server.scene = new THREE.Scene();

    _server.cosmos = new SC.Cosmos(_server);
    _server.scene.add( _server.cosmos.mesh );
 
    _server.renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
    _server.renderer.setPixelRatio( window.devicePixelRatio );
    _server.renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( _server.renderer.domElement ); 
 
 
    // not working: 
 
//    _server.scene.fog = new THREE.Fog( 0x000000, 3500, 15000 );
//    _server.scene.fog.color.setHSL( 0.51, 0.4, 0.01 );


    // needs debugging in size, trajectory, particle size, cone shape, turbulence on mobile
    //_server.objects.push(new SC.Comet(_server));


    for ( var i = 0; i < 200; i ++ ) {

      _server.objects.push(new SC.Asteroid(_server));

    }


    /*

    _server.interfaces = [];

    _server.interfaces.push(
      new SC.Interface(_server);
    );

    */

    // move to Interface class, pass server so interface instance can move server.camera 
    // or pass Ship so interface can send commands to Ship
    // peer connecting

    _server.key = SC.Util.getUrlHashParameter('key');
    $('#info .key').html(' | Key: ' + _server.key);

    var peer = new Peer(_server.key, {key: 'wapghotvz0s2x1or'});
 
    peer.on('connection', function(conn) {
 
      $('#info .crew').html('Helm connected.');
 
      conn.on('data', function(data){
 
        console.log(data);
 
        if (data == "left")        _server.camera.rotation.y += 0.02;
        if (data == "right")       _server.camera.rotation.y -= 0.02;
        if (data == "up")          _server.camera.rotation.x += 0.02;
        if (data == "down")        _server.camera.rotation.x -= 0.02;
        if (data == "tiltleft")    _server.camera.rotation.z += 0.02;
        if (data == "tiltright")   _server.camera.rotation.z -= 0.02;
        if (data == "forward")    _server.camera.position.z += 1;
        if (data == "backward")   _server.camera.position.z -= 1;
        
      });
    });


    _server.animate = function() {

      requestAnimationFrame( _server.animate );
      _server.update();
  
    }


    _server.update = function() {
  
      if (_server.cosmos) _server.cosmos.update();
  
      _server.objects.forEach(function(object) {
 
        if (object.update) object.update();
 
      });
  
      _server.controls.update( _server.clock.getDelta() );
  
      _server.renderer.render( _server.scene, _server.camera );

    }


  }

});
