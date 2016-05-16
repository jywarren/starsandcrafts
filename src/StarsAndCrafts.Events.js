module.exports = function(_server) {

  onWindowResize = function() {
 
    _server.camera.aspect = window.innerWidth / window.innerHeight;
    _server.camera.updateProjectionMatrix();
  
    _server.renderer.setSize( window.innerWidth, window.innerHeight );
 
  }
 
  window.addEventListener( 'resize', onWindowResize, false );

}
