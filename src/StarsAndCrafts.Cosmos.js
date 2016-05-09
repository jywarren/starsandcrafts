var THREE = require('three');

module.exports = {

  construct: function() {

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
 
      loadTexture( '../images/starmap_g4k-cube/px.png' ), // right
      loadTexture( '../images/starmap_g4k-cube/nx.png' ), // left
      loadTexture( '../images/starmap_g4k-cube/py.png' ), // top
      loadTexture( '../images/starmap_g4k-cube/ny.png' ), // bottom
      loadTexture( '../images/starmap_g4k-cube/pz.png' ), // back
      loadTexture( '../images/starmap_g4k-cube/nz.png' )  // front
 
    ];


    var cosmos = new THREE.Mesh( 
                       new THREE.BoxGeometry( 500, 500, 500, 7, 7, 7 ), 
                       new THREE.MultiMaterial( materials )
                     );

    cosmos.scale.x = - 1;

    return cosmos;

  }

}
