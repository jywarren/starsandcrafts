Stars and Crafts
====

A spacemaker for kids and their fellow officers in interstellar space


****

Demo: http://jywarren.github.io/starsandcrafts/

**Server:** Open this first; once loaded, someone else _anywhere on the internet_ can open the client and drive the spaceship. 

**Client:** Enter the code from the server screen.


![screenshot](https://raw.githubusercontent.com/jywarren/starsandcrafts/master/screenshot.png)

****


## Scenarios

Stars and Crafts environments are built from `Scenarios` which fill the scene with objects, ships, and storylines. To start a scenario, run it by it's name:

````js
SC.Scenarios['asteroids'](server);
````

Scenarios are listed in `/dist/starsandcrafts-scenarios.js` and don't need to be compiled like the rest of the server code (see below). To add one, you just need a unique name, like "12 Parsecs: the Kessel Run" and you can write your scenario using basic S&C components, or loading in your own models via the `SC.Model` importer. Optionally return the things you create if your scnario can be used as a subplot in other scenarios:

````js

  // makes 200 asteroids
  "asteroids": function(server) {

    var asteroids = [];

    for ( var i = 0; i < 200; i ++ ) {

      asteroids.push(new SC.Asteroid(server));

    }

    server.objects = server.objects.concat(asteroids);

    return asteroids;

  },

````

Once you've added it, you can load it as shown in [the server index.html](https://github.com/jywarren/starsandcrafts/blob/master/server/index.html), or from the browser JavaScript console, as shown above. 


## Development

Requirements: NodeJS (https://nodejs.org)

Stars and Crafts has two main codebases: the host "server" and the client (like helm, sensors, etc). 


### Client

The client is just a webpage with a peer to peer connection to the server page. To develop a client, all you need to do is make a new "role" in the `roles/` directory, with the `index.html` (copy it from the Helm client, for example). Clients just bind events in the client page to commands sent to the server. An API of available commands will be published soon at https://github.com/jywarren/starsandcrafts/wiki.

````js

var client = new SC.Client('helm');

// on button press:
client.onClick('.up', 'up');
client.onClick('.down', 'down');

// on key press:
client.onKey('Up', 'up');
client.onKey('Down', 'down');
client.onKey('W', 'forward');
client.onKey('S', 'backward');

````


### Server

The server is more complex than the client, as it includes the graphics and physics engines. Its code is split up among various class files in the `/src/` directory. To compile a new version to `/dist/starsandcrafts-server.js`, you'll need to get a development environment set up:

1. Clone the repository
2. Run `npm install`, then `bower install`
3. Run `grunt build` to build, or `grunt` to watch files in src/ and build continuously. You may need to first run `npm install -g grunt-cli` to get grunt. 
4. Run `./run` and navigate to http://localhost:8000 to use locally.


****

## Resources

http://www.html5rocks.com/en/tutorials/casestudies/100000stars/

http://threejs.org/examples/#webgl_lensflares

https://github.com/mrdoob/three.js/blob/master/examples/webgl_geometry_terrain_fog.html

https://github.com/mrdoob/three.js/blob/master/examples/canvas_geometry_panorama.html

http://threejs.org/docs/#Reference/Extras.Helpers/BoxHelper

https://github.com/jeromeetienne/threex.planets

http://learningthreejs.com/blog/2013/09/16/how-to-make-the-earth-in-webgl/

http://www.instructables.com/id/Instructables-Universe-in-Threejs/

http://www.threejsgames.com/extensions/

http://learningthreejs.com/data/2014-01-10-flying-spaceship-minigame/slides/slides/

Physics! https://chandlerprall.github.io/Physijs/

http://www.inkfood.com/spacedebris/ - game with engines, explosions, asteroids

Handle dramatic size differences with logarithmic z-buffer: http://threejs.org/examples/#webgl_camera_logarithmicdepthbuffer

Depth of field (for zooming): http://threejs.org/examples/#webgl_postprocessing_dof

Vectors: http://threejs.org/docs/#Reference/Math/Vector3

### Models

Comet 67P/Churyumov-Gerasimenko - via Rosetta/ESA: http://www.thingiverse.com/thing:490245
Ida: http://www.thingiverse.com/thing:56511
Vesta: http://www.thingiverse.com/thing:42888
Phobos, Deimos, Eros: http://www.thingiverse.com/thing:4046


### Panoramas

I'm using hi-res NASA panos to make 3d texture cubes for our background. Resources:

* http://stackoverflow.com/questions/29678510/convert-21-equirectangular-panorama-to-cube-map
* https://github.com/dariomanesku/cmftStudio
* starting with NASA Deep Star Maps: https://svs.gsfc.nasa.gov/cgi-bin/details.cgi?aid=3895
* Also check out http://apod.nasa.gov/apod/ap110903.html
* Flash-based online version: http://gonchar.me/panorama/
