// based on https://github.com/mrdoob/three.js/blob/master/examples/canvas_geometry_panorama.html

var camera, scene, renderer;

var texture_placeholder,
isUserInteracting = false,
onMouseDownMouseX = 0, onMouseDownMouseY = 0,
lon = 90, onMouseDownLon = 0,
lat = 0, onMouseDownLat = 0,
phi = 0, theta = 0,
target = new THREE.Vector3();

init();
animate();

function init() {

  var container, mesh;

  container = document.getElementById( 'container' );

  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1100 );

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

  mesh = new THREE.Mesh( new THREE.BoxGeometry( 300, 300, 300, 7, 7, 7 ), new THREE.MultiMaterial( materials ) );
  mesh.scale.x = - 1;
//  mesh.scale.y =   1;
//  mesh.scale.z =   1;
  scene.add( mesh );

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

  scene.fog = new THREE.Fog( 0x000000, 3500, 15000 );
  scene.fog.color.setHSL( 0.51, 0.4, 0.01 );

  // world

  var s = 4;
  var cube = new THREE.BoxGeometry( s, s, s );
  var material = new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0xffffff, shininess: 50 } );
  for ( var i = 0; i < 200; i ++ ) {
    var mesh = new THREE.Mesh( cube, material );
    mesh.position.x = 100 * ( 2.0 * Math.random() - 1.0 );
    mesh.position.y = 10 * ( 2.0 * Math.random() - 1.0 );
    mesh.position.z = 100 * ( 2.0 * Math.random() - 1.0 );
    mesh.rotation.x = Math.random() * Math.PI;
    mesh.rotation.y = Math.random() * Math.PI;
    mesh.rotation.z = Math.random() * Math.PI;
    mesh.matrixAutoUpdate = false;
    mesh.updateMatrix();
    scene.add( mesh );
  }


  // lights

  var dirLight = new THREE.DirectionalLight( 0xffffff, 0.05 );
  dirLight.position.set( 0, 0.2, 0 ).normalize();
  scene.add( dirLight );
  dirLight.color.setHSL( 0.1, 0.7, 0.9 );



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

  renderer.render( scene, camera );

}
