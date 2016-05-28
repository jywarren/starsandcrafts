module.exports = StarsAndCrafts.Thing.extend({

  init: function(_server) {

    var _ship = this;

    _ship.torpedo = function(xOffset, yOffset) {

      xOffset = xOffset || 10;
      yOffset = yOffset || 10;

      _torpedo = new SC.Torpedo(_server);
 
      _torpedo.mesh.position.copy(_server.camera.position);
      _torpedo.mesh.position.y -= yOffset;
      _torpedo.mesh.position.x += xOffset;
 
      server.push(_server.camera, _torpedo.mesh, 50);

    }
 
  }

});
