Stars and Crafts
====

A spacemaker for kids and their fellow officers in interstellar space


****

Demo: https://jywarren.github.io/starsandcrafts/

**Server:** Open this first; once loaded, someone else _anywhere on the internet_ can open the client and drive the spaceship. 

**Client:** Enter the code from the server screen.


![screenshot](https://raw.githubusercontent.com/jywarren/starsandcrafts/master/screenshot.png)

****

## Resources

https://github.com/mrdoob/three.js/blob/master/examples/webgl_lensflares.html

http://threejs.org/examples/#webgl_lensflares

http://www.html5rocks.com/en/tutorials/casestudies/100000stars/

https://github.com/mrdoob/three.js/blob/master/examples/webgl_geometry_terrain_fog.html

https://github.com/mrdoob/three.js/blob/master/examples/canvas_geometry_panorama.html

http://webrtc.github.io/samples/src/content/datachannel/datatransfer/

https://github.com/webrtc/adapter


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
