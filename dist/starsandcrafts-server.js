// based on https://github.com/mrdoob/three.js/blob/master/examples/canvas_geometry_panorama.html

var camera, controls, scene, renderer, clock, cosmos;

var texture_placeholder,
isUserInteracting = false,
onMouseDownMouseX = 0, onMouseDownMouseY = 0,
lon = 90, onMouseDownLon = 0,
lat = 0, onMouseDownLat = 0,
phi = 0, theta = 0,
target = new THREE.Vector3(),
meteors = [];

init();
animate();

function init() {

  var container;

  container = document.getElementById( 'container' );

  clock = new THREE.Clock();

  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1100 );

  controls = new THREE.FlyControls( camera );

  controls.movementSpeed = 10;
  controls.domElement = container;
  controls.rollSpeed = Math.PI / 12;
  controls.autoForward = false;
  controls.dragToLook = true;

  scene = new THREE.Scene();

  texture_placeholder = document.createElement( 'canvas' );
  texture_placeholder.width = 128;
  texture_placeholder.height = 128;

  var context = texture_placeholder.getContext( '2d' );
  context.fillStyle = 'rgb( 200, 200, 200 )';
  context.fillRect( 0, 0, texture_placeholder.width, texture_placeholder.height );

  var materials = [

    loadTexture( '../images/starmap_g4k-cube/px.png' ), // right
    loadTexture( '../images/starmap_g4k-cube/nx.png' ), // left
    loadTexture( '../images/starmap_g4k-cube/py.png' ), // top
    loadTexture( '../images/starmap_g4k-cube/ny.png' ), // bottom
    loadTexture( '../images/starmap_g4k-cube/pz.png' ), // back
    loadTexture( '../images/starmap_g4k-cube/nz.png' )  // front

  ];

  cosmos = new THREE.Mesh( new THREE.BoxGeometry( 500, 500, 500, 7, 7, 7 ), new THREE.MultiMaterial( materials ) );
  cosmos.scale.x = - 1;
  scene.add( cosmos );

  // stuff

  renderer = new THREE.CanvasRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  container.appendChild( renderer.domElement );

  // events

  document.addEventListener( 'mousedown', onDocumentMouseDown, false );
  document.addEventListener( 'mousemove', onDocumentMouseMove, false );
  document.addEventListener( 'mouseup', onDocumentMouseUp, false );
  document.addEventListener( 'mousewheel', onDocumentMouseWheel, false );

  document.addEventListener( 'touchstart', onDocumentTouchStart, false );
  document.addEventListener( 'touchmove', onDocumentTouchMove, false );

  //

  window.addEventListener( 'resize', onWindowResize, false );



  // scene
  // not working: 

  scene.fog = new THREE.Fog( 0x000000, 3500, 15000 );
  scene.fog.color.setHSL( 0.51, 0.4, 0.01 );

  // world

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
    meteors.push( meteor );
    scene.add( meteor );
  }


  // lights

  var dirLight = new THREE.DirectionalLight( 0xffffff, 0.05 );
  dirLight.position.set( 0, 0.2, 0 ).normalize();
  scene.add( dirLight );

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

  function addLight( h, s, l, x, y, z ) {

    var light = new THREE.PointLight( 0xffffff, 1.5, 2000 );
    light.color.setHSL( h, s, l );
    light.position.set( x, y, z );
    scene.add( light );
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
    scene.add( lensFlare );

  }

}

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

}

function loadTexture( path ) {

  var texture = new THREE.Texture( texture_placeholder );
  var material = new THREE.MeshBasicMaterial( { map: texture, overdraw: 0.5 } );

  var image = new Image();
  image.onload = function () {

    texture.image = this;
    texture.needsUpdate = true;

  };
  image.src = path;

  return material;

}

function animate() {

  requestAnimationFrame( animate );
  update();

}

function update() {

  /*
  if ( isUserInteracting === false ) {

    lon += 0.1;

  }

  lat = Math.max( - 85, Math.min( 85, lat ) );
  phi = THREE.Math.degToRad( 90 - lat );
  theta = THREE.Math.degToRad( lon );

  target.x = 500 * Math.sin( phi ) * Math.cos( theta );
  target.y = 500 * Math.cos( phi );
  target.z = 500 * Math.sin( phi ) * Math.sin( theta );

  camera.lookAt( target );
  */

  if (cosmos) {
    cosmos.position.x = camera.position.x;
    cosmos.position.y = camera.position.y;
    cosmos.position.z = camera.position.z;
  }

  meteors.forEach(function(meteor) {

    meteor.rotation.y += 0.005;
    meteor.updateMatrix();

  });

  controls.update( clock.getDelta() );

  renderer.render( scene, camera );

}
