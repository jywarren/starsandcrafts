var THREE = require('three'),
    Class = require('resig-class');

module.exports = Class.extend({

  init: function(_server, options) {

    var _cosmos = this;

    options = options || {};
    // path to folder containing:
    // px.png, nx.png, py.png, ny.png, pz.png, nz.png 
    options.texture = options.texture || "../images/starmap_g4k-cube/";
    _cosmos.options = options;

    // SUNS
    _cosmos.lights = [];
    // h, s, l, x, y, z
//    _cosmos.lights.push( new SC.Star( 0.55, 0.1, 0.5,  90, 30, -50, _server) );
    _cosmos.lights.push( new SC.Star( 0.15, 0.1, 0.5,  20, 0,  -100 , _server) );


    // we create a hidden 2d canvas to generate/manipulate textures: 

    var texture_placeholder = document.createElement( 'canvas' );
    texture_placeholder.width = 128;
    texture_placeholder.height = 128;
 
    var context = texture_placeholder.getContext( '2d' );
    context.fillStyle = 'rgb( 200, 200, 200 )';
    context.fillRect( 0, 0, texture_placeholder.width, texture_placeholder.height );

    var loadTexture = function(path) {

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
 
    var materials = [
 
      loadTexture( options.texture + 'px.png' ), // right
      loadTexture( options.texture + 'nx.png' ), // left
      loadTexture( options.texture + 'py.png' ), // top
      loadTexture( options.texture + 'ny.png' ), // bottom
      loadTexture( options.texture + 'pz.png' ), // back
      loadTexture( options.texture + 'nz.png' )  // front
 
    ];

    _cosmos.mesh = new THREE.Mesh( 
                     new THREE.BoxGeometry( 500, 500, 500, 7, 7, 7 ), 
                     new THREE.MultiMaterial( materials )
                   );

    _cosmos.mesh.scale.x = - 1;


    _cosmos.update = function() {

      _cosmos.mesh.position.copy(_server.camera.position);

      _cosmos.lights.forEach(function(light) {
        light.update(_server.camera.position);
      });

    }

    return _cosmos;

  }

});
