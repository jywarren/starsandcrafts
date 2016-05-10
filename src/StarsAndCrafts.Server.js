StarsAndCrafts = SC = {};
module.exports = SC;

var Peer          = require('peerjs'),
    Class         = require('resig-class'),
    THREE         = require('three');

require('three-fly-controls')(THREE);

SC.Cosmos = require('./StarsAndCrafts.Cosmos.js');


SC.Server = Class.extend({

  init: function(container) {

    var _server = this;
 
//        target = new THREE.Vector3();

// cool for viewscreen zooming:
//  camera.fov -= event.wheelDeltaY * 0.05;
//  camera.updateProjectionMatrix();


    // all things here!
    _server.objects = [];

 
    container = container || document.getElementById( 'container' );
 
    _server.clock = new THREE.Clock();
 
    _server.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1100 );


    // very primitive for the moment:
    _server.events = require('./StarsAndCrafts.Events.js'); // returns a function
    _server.events(_server); // run it


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

 
    // stuff
 
    _server.renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
    _server.renderer.setPixelRatio( window.devicePixelRatio );
    _server.renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( _server.renderer.domElement ); 
 
 
    // scene
    // not working: 
 
    _server.scene.fog = new THREE.Fog( 0x000000, 3500, 15000 );
    _server.scene.fog.color.setHSL( 0.51, 0.4, 0.01 );

 
    // meteors -- subclass!
 
    var s = 4;
    var cube = new THREE.BoxGeometry( s, s, s );
    var material = new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0xffffff, shininess: 50 } );

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
 

    _server.lighting = require('./StarsAndCrafts.Lighting.js')(_server);


    // move to Interface class, pass server so interface instance can move server.camera 
    // or pass Ship so interface can send commands to Ship
    // peer connecting
 
    var peer = new Peer('starsandcrafts-server', {key: 'wapghotvz0s2x1or'});
 
    peer.on('connection', function(conn) {
 
      console.log('Peer connection established');
 
      conn.on('data', function(data){
 
        console.log(data);
 
        if (data == "left")        _server.camera.rotation.y += 0.01;
        if (data == "right")       _server.camera.rotation.y -= 0.01;
        if (data == "up")          _server.camera.rotation.x += 0.01;
        if (data == "down")        _server.camera.rotation.x -= 0.01;
        if (data == "tiltleft")    _server.camera.rotation.z += 0.01;
        if (data == "tiltright")   _server.camera.rotation.z -= 0.01;
        
      });
    });


    _server.animate = function() {

      requestAnimationFrame( _server.animate );
      _server.update();

    }


    _server.update = function() {

      /*
  
      lat = Math.max( - 85, Math.min( 85, lat ) );
      phi = THREE.Math.degToRad( 90 - lat );
      theta = THREE.Math.degToRad( lon );
  
      target.x = 500 * Math.sin( phi ) * Math.cos( theta );
      target.y = 500 * Math.cos( phi );
      target.z = 500 * Math.sin( phi ) * Math.sin( theta );
  
      _server.camera.lookAt( target );
      */
  
      if (_server.cosmos) _server.cosmos.update(_server.camera.position);
  
      _server.objects.forEach(function(meteor) {
  
        meteor.rotation.y += 0.005;
        meteor.updateMatrix();
  
      });
  
      _server.controls.update( _server.clock.getDelta() );
  
      _server.renderer.render( _server.scene, _server.camera );

    }

  }

});
