function onDocumentMouseDown( event ) {

  event.preventDefault();

  isUserInteracting = true;

  onPointerDownPointerX = event.clientX;
  onPointerDownPointerY = event.clientY;

//  onPointerDownLon = lon;
//  onPointerDownLat = lat;

}

function onDocumentMouseMove( event ) {

  if ( isUserInteracting === true ) {

//    lon = ( onPointerDownPointerX - event.clientX ) * 0.1 + onPointerDownLon;
//    lat = ( event.clientY - onPointerDownPointerY ) * 0.1 + onPointerDownLat;

  }

}

function onDocumentMouseUp( event ) {

  isUserInteracting = false;

}

function onDocumentMouseWheel( event ) {

//  camera.fov -= event.wheelDeltaY * 0.05;
//  camera.updateProjectionMatrix();

}


function onDocumentTouchStart( event ) {

  if ( event.touches.length == 1 ) {

    event.preventDefault();

    onPointerDownPointerX = event.touches[ 0 ].pageX;
    onPointerDownPointerY = event.touches[ 0 ].pageY;

    onPointerDownLon = lon;
    onPointerDownLat = lat;

  }

}

function onDocumentTouchMove( event ) {

  if ( event.touches.length == 1 ) {

    event.preventDefault();

//    lon = ( onPointerDownPointerX - event.touches[0].pageX ) * 0.1 + onPointerDownLon;
//    lat = ( event.touches[0].pageY - onPointerDownPointerY ) * 0.1 + onPointerDownLat;

  }

}
