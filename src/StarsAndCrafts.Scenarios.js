SC = SC || {};
SC.Scenarios = {


  // the planetoid/asteroid
  "eros": function() {

    var eros = new SC.Model('../models/eros.stl', server)
    server.objects.push(eros);

    return eros;

  },


  // makes 200 asteroids
  "asteroids": function() {

    var asteroids = [];

    for ( var i = 0; i < 200; i ++ ) {

      asteroids.push(new SC.Asteroid(server));

    }

    server.objects = server.objects.concat(asteroids);

    return asteroids;

  },


  // the planetoid/asteroid
  "comet": function() {

    // needs debugging in size, trajectory, particle size, cone shape, turbulence on mobile
    var comet = new SC.Comet(server);
    server.objects.push(comet);

    return comet;

  },


}
