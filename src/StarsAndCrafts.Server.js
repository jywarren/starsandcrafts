StarsAndCrafts = SC = {};
module.exports = SC;

var Class         = require('resig-class'),
    $             = require('jquery'),
    THREE         = require('three');

// inject Three.js
global.Physijs = require('physijs-browserify')(THREE);
 
Physijs.scripts.worker = '../../node_modules/physijs-browserify/libs/physi-worker.js';
Physijs.scripts.ammo = 'ammo.js';

require('three-fly-controls')(THREE);

SC.Util      = require('./Util.js');
SC.Events    = require('./StarsAndCrafts.Events.js');
SC.Cosmos    = require('./StarsAndCrafts.Cosmos.js');
SC.Thing     = require('./things/StarsAndCrafts.Thing.js');
SC.Model     = require('./things/StarsAndCrafts.Model.js');
SC.Asteroid  = require('./things/StarsAndCrafts.Asteroid.js');
SC.Comet     = require('./things/StarsAndCrafts.Comet.js');
SC.Star      = require('./things/StarsAndCrafts.Star.js');
SC.Torpedo   = require('./things/StarsAndCrafts.Torpedo.js');
SC.Interface = require('./StarsAndCrafts.Interface.js');


SC.Server = Class.extend({

  init: function(container) {

    var _server = this;

    // all things here!
    _server.objects = [];
 
    container = container || document.getElementById( 'container' );
 
    _server.clock = new THREE.Clock();
 
    _server.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1100 );

    _server.events = SC.Events(_server);

    _server.key = SC.Util.getUrlHashParameter('key');
    $('#info .key').html(' | Key: ' + _server.key);

    // move to controls class 
    _server.controls = new THREE.FlyControls( _server.camera );
 
    _server.controls.movementSpeed = 0.1;
    _server.controls.domElement = container;
    _server.controls.rollSpeed = Math.PI / 360;
    _server.controls.autoForward = false;
    _server.controls.dragToLook = true;
 
    _server.scene = new Physijs.Scene();
    _server.scene.setGravity(new THREE.Vector3( 0, 0, 0 ));

    _server.cosmos = new SC.Cosmos(_server);
    _server.scene.add( _server.cosmos.mesh );
 
    _server.renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
    _server.renderer.setPixelRatio( window.devicePixelRatio );
    _server.renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( _server.renderer.domElement ); 

 
    _server.interfaces = [];

    _server.interfaces.push(
      new SC.Interface(_server, { role: 'helm' }),
      new SC.Interface(_server, { role: 'sensors' })
    );


    _server.update = function() {
  
      if (_server.cosmos) _server.cosmos.update();
  
      _server.objects.forEach(function(object) {
 
        if (object.update) object.update();
 
      });
  
      _server.controls.update( _server.clock.getDelta() );

      _server.scene.simulate();

      _server.renderer.render( _server.scene, _server.camera );

      requestAnimationFrame( _server.update );

    }

    _server.update();


  }

});
