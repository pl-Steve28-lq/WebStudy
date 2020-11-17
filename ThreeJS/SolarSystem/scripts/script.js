const scene = new THREE.Scene()
const Make = new Maker(scene)

const camera = Make.Camera(0, 19, 75)
camera.rotation.x = -35 * rad

const renderer = Make.Renderer()

Make.init(camera, renderer)

const sun = new Sun(0xff7f00, 7)
const light = new THREE.PointLight("white", 1.25);
light.position.set(0, 0, 0);
scene.add(light)

const mercury = new Planet(0.3, 0, 0.7, 15, 0x6f4f28)
const venus = new Planet(0.4, 0, 0.5, 20, 0x8b7d82)
const earth = new Planet(0.5, 0, 0.3, 26, 0x6495ed)
earth.addMoon(2, 0.25, 0.8, 0xffffff)
const mars = new Planet(0.3, 0, 0.2, 33, 0xc1440e)

Make.setOrbit()

const FPS = 60
var i = 0

function animate() {
  setTimeout(function () {
    requestAnimationFrame( animate )
  }, 1000/FPS)

  mercury.startOrbit()
  venus.startOrbit()
  earth.startOrbit()
  mars.startOrbit()

  renderer.render( scene, camera )
}

animate()