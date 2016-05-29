module.exports = Class.extend({

  init: function(h, s, l, x, y, z, _server) {

    var _star = this;

    _star.position = {
      x: x,
      y: y,
      z: z
    }
 

    // first, a light source:
 
    _star.light = new THREE.PointLight( 0xffffff, 1.5, 2000 );
    _star.light.color.setHSL( h, s, l );
    _star.light.position.set( x, y, z );

    _server.scene.add( _star.light );


    // then, some badass lens flares!

    // these textures are erroring; may need to 
    // wait until they load as in Cosmos#loadTexture,
    // or maybe don't add it to the scene until onload? 
    textureLoader = new THREE.TextureLoader();
 
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

    var flareColor = new THREE.Color( 0xffffff );
    flareColor.setHSL( h, s, l + 0.5 );

    _star.lensFlare = new THREE.LensFlare( textureFlare0, 700, 0.0, THREE.AdditiveBlending, flareColor );

    // actually not sure what this is... some sort of linear glintiness?
    _star.lensFlare.add( textureFlare2, 512, 0.0, THREE.AdditiveBlending );
    _star.lensFlare.add( textureFlare2, 512, 0.0, THREE.AdditiveBlending );
    _star.lensFlare.add( textureFlare2, 512, 0.0, THREE.AdditiveBlending );

    // floaty dots
    _star.lensFlare.add( textureFlare3, 60,  0.6, THREE.AdditiveBlending );
    _star.lensFlare.add( textureFlare3, 70,  0.7, THREE.AdditiveBlending );
    _star.lensFlare.add( textureFlare3, 120, 0.9, THREE.AdditiveBlending );
    _star.lensFlare.add( textureFlare3, 70,  1.0, THREE.AdditiveBlending );

    _star.lensFlare.customUpdateCallback = lensFlareUpdateCallback;
    _star.lensFlare.position.copy( _star.light.position );


// this delayed load didn't work, nor did simply waiting 5 seconds.
//    textureLoader.manager.onLoad = function() {
//setTimeout(function() {

//      console.log('LOADED');
//      console.log(textureLoader);
      _server.scene.add( _star.lensFlare );

//},15000);
//    };


    _star.update = function(position) {

      _star.lensFlare.position.x = position.x + _star.position.x;
      _star.lensFlare.position.y = position.y + _star.position.y;
      _star.lensFlare.position.z = position.z + _star.position.z;

      _star.light.position.x = position.x + _star.position.x;
      _star.light.position.y = position.y + _star.position.y;
      _star.light.position.z = position.z + _star.position.z;

    }

 
  }

});
