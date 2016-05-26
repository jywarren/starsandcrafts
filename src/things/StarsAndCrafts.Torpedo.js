module.exports = StarsAndCrafts.Thing.extend({

  init: function(_server, options) {

    var _torpedo = this;

    _torpedo.options = options || {};

    // _torpedo._super(_server);

    var h = 0,
        s = 1,
        l = 0.1;

    // create a geometry only if it doesn't already exist; reduce redundancy
    _server.torpedoCube = _server.torpedoCube || new THREE.BoxGeometry( 1, 1, 1 );

    _server.transparentMaterial = _server.transparentMaterial || new THREE.MeshLambertMaterial({
      color:       0xaaaa00,
      opacity:     0, 
      transparent: true 
    });
    _server.transparentMaterial.depthWrite = false; 

    _torpedo.mesh = new Physijs.BoxMesh(
                      _server.torpedoCube, 
                      _server.transparentMaterial
    );

    _torpedo.mesh.position.set( 0, 0, -10 );

    _server.scene.add( _torpedo.mesh );
/*
    _torpedo.mesh.setLinearVelocity( 
      new THREE.Vector3(
        Math.random() * 2 - 1, 
        Math.random() * 2 - 1, 
        Math.random() * 2 - 2
      )
    );
*/
 
    var textureLoader = new THREE.TextureLoader();
 
    var textureFlare0 = textureLoader.load( "../images/textures/lensflares/lensflare0.png" );
    var textureFlare2 = textureLoader.load( "../images/textures/lensflares/lensflare2.png" );
    var textureFlare3 = textureLoader.load( "../images/textures/lensflares/lensflare3.png" );
 
    function lensFlareUpdateCallback( object ) {
 
      var f, fl = object.lensFlares.length;
      var flare;
      var vecX = -object.positionScreen.x * 2;
      var vecY = -object.positionScreen.y * 2;
 
      for( f = 0; f < fl; f++ ) {
        flare = object.lensFlares[ f ];
        flare.x = object.positionScreen.x + vecX * flare.distance;
        flare.y = object.positionScreen.y + vecY * flare.distance;
        flare.rotation = 0;
      }
 
      object.lensFlares[ 2 ].y += 0.025;
      object.lensFlares[ 3 ].rotation = object.positionScreen.x * 0.5 + THREE.Math.degToRad( 45 );
 
    }
 
 
    _torpedo.light = new THREE.PointLight( 0xffffff, 1.5, 2000 );
    _torpedo.light.color.setHSL( h, s, l );
    _torpedo.light.position.copy( _torpedo.mesh );

    _server.scene.add( _torpedo.light );


    var flareColor = new THREE.Color( 0xffffff );
    flareColor.setHSL( h, s, l + 0.5 );

    _torpedo.lensFlare = new THREE.LensFlare( textureFlare0, 700, 0.0, THREE.AdditiveBlending, flareColor );

    _torpedo.lensFlare.add( textureFlare2, 512, 0.0, THREE.AdditiveBlending );
    _torpedo.lensFlare.add( textureFlare2, 512, 0.0, THREE.AdditiveBlending );
    _torpedo.lensFlare.add( textureFlare2, 512, 0.0, THREE.AdditiveBlending );
    _torpedo.lensFlare.add( textureFlare3, 60,  0.6, THREE.AdditiveBlending );
    _torpedo.lensFlare.add( textureFlare3, 70,  0.7, THREE.AdditiveBlending );
    _torpedo.lensFlare.add( textureFlare3, 120, 0.9, THREE.AdditiveBlending );
    _torpedo.lensFlare.add( textureFlare3, 70,  1.0, THREE.AdditiveBlending );
    _torpedo.lensFlare.customUpdateCallback = lensFlareUpdateCallback;
    _torpedo.lensFlare.position.copy( _torpedo.light.position );

    _server.scene.add( _torpedo.lensFlare );


    _server.objects.push( _torpedo );


    _torpedo.update = function(position) {

      _torpedo.lensFlare.position.copy( _torpedo.mesh.position );
      _torpedo.light.position.copy( _torpedo.mesh.position );

    }

  }

});
