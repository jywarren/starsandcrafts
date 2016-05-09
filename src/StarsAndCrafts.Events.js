module.exports = function(_server) {

    // events

/* 
    document.addEventListener( 'mousedown', onDocumentMouseDown, false );
    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    document.addEventListener( 'mouseup', onDocumentMouseUp, false );
    document.addEventListener( 'mousewheel', onDocumentMouseWheel, false );
 
    document.addEventListener( 'touchstart', onDocumentTouchStart, false );
    document.addEventListener( 'touchmove', onDocumentTouchMove, false );
*/ 
    //

    onWindowResize = function() {
 
      _server.camera.aspect = window.innerWidth / window.innerHeight;
      _server.camera.updateProjectionMatrix();
  
      _server.renderer.setSize( window.innerWidth, window.innerHeight );
 
    }
 
    window.addEventListener( 'resize', onWindowResize, false );

}
