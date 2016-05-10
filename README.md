Stars and Crafts
====

A spacemaker for kids and their fellow officers in interstellar space


****

Demo: http://jywarren.github.io/starsandcrafts/

**Server:** Open this first; once loaded, someone else _anywhere on the internet_ can open the client and drive the spaceship. 

**Client:** Enter the code from the server screen.


![screenshot](https://raw.githubusercontent.com/jywarren/starsandcrafts/master/screenshot.png)

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

### Panoramas

I'm using hi-res NASA panos to make 3d texture cubes for our background. Resources:

* http://stackoverflow.com/questions/29678510/convert-21-equirectangular-panorama-to-cube-map
* https://github.com/dariomanesku/cmftStudio
* starting with NASA Deep Star Maps: https://svs.gsfc.nasa.gov/cgi-bin/details.cgi?aid=3895
* Also check out http://apod.nasa.gov/apod/ap110903.html
* Flash-based online version: http://gonchar.me/panorama/


## Development

Requirements: NodeJS (https://nodejs.org)

1. Clone the repository
2. Run `npm install`, then `bower install`
3. Run `grunt build` to build, or `grunt` to watch files in src/ and build continuously.
4. Run `./run` and navigate to http://localhost:8000 to use locally.
