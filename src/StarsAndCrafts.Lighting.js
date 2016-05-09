var THREE = require('three');

module.exports = function(_server) {

  // lights

  var dirLight = new THREE.DirectionalLight( 0xffffff, 0.05 );
  dirLight.position.set( 0, 0.2, 0 ).normalize();
  _server.scene.add( dirLight );

  dirLight.color.setHSL( 0.1, 0.7, 0.5 );

  // lens flares
  // Not visible for some reason. Maybe they're outside the cosmos?

  var textureLoader = new THREE.TextureLoader();

  var textureFlare0 = textureLoader.load( "../images/textures/lensflares/lensflare0.png" );
  var textureFlare2 = textureLoader.load( "../images/textures/lensflares/lensflare2.png" );
  var textureFlare3 = textureLoader.load( "../images/textures/lensflares/lensflare3.png" );

  addLight( 0.55, 0.9, 0.5, 5000, 0, -1000 );
  addLight( 0.08, 0.8, 0.5,    0, 0, -1000 );
  addLight( 0.995, 0.5, 0.9, 5000, 5000, -1000 );

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

  function addLight( h, s, l, x, y, z ) {

    var light = new THREE.PointLight( 0xffffff, 1.5, 2000 );
    light.color.setHSL( h, s, l );
    light.position.set( x, y, z );
    _server.scene.add( light );
    var flareColor = new THREE.Color( 0xffffff );
    flareColor.setHSL( h, s, l + 0.5 );
    var lensFlare = new THREE.LensFlare( textureFlare0, 700, 0.0, THREE.AdditiveBlending, flareColor );
    lensFlare.add( textureFlare2, 512, 0.0, THREE.AdditiveBlending );
    lensFlare.add( textureFlare2, 512, 0.0, THREE.AdditiveBlending );
    lensFlare.add( textureFlare2, 512, 0.0, THREE.AdditiveBlending );
    lensFlare.add( textureFlare3, 60, 0.6, THREE.AdditiveBlending );
    lensFlare.add( textureFlare3, 70, 0.7, THREE.AdditiveBlending );
    lensFlare.add( textureFlare3, 120, 0.9, THREE.AdditiveBlending );
    lensFlare.add( textureFlare3, 70, 1.0, THREE.AdditiveBlending );
    lensFlare.customUpdateCallback = lensFlareUpdateCallback;
    lensFlare.position.copy( light.position );

    _server.scene.add( lensFlare );

  }

}
