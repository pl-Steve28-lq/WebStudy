const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth/window.innerHeight,
  0.1,
  1000
)
camera.position.set(0, 7, 9)
camera.rotation.x = -35 * ( Math.PI / 180 );


const renderer = new THREE.WebGLRenderer({
  antialias: true,
  preserveDrawingBuffer: true
})
renderer.setSize(
  window.innerWidth,
  window.innerHeight
)
document.body.appendChild( renderer.domElement )


const Make = Maker(scene)

Make.Light(0xffffff, 0, 8, 0)
Make.Light(0xffffff, 0, -8, 0)
Make.Light(0xffffff, 8, 0, 0)
Make.Light(0xffffff, -8, 0, 0)
Make.Light(0xffffff, 0, 0, 8)
Make.Light(0xffffff, 0, 0, -8)

Make.Sphere(0xffffff, 0, 0, 0, 2)
const planet = Make.Sphere(0x6495ed, 3, 0, 0, 0.5)



var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.update();

const FPS = 60
var i = 0
var planetspeed = 0.3

function animate() {
  setTimeout(function () {
    requestAnimationFrame( animate )
  }, 1000/FPS)

  planet.position.x = 3*Math.cos(i)
  planet.position.y = 3*Math.sin(i)
  i += 0.1*planetspeed
  if (i > 2*Math.PI) i = 0

  renderer.render( scene, camera )
}

animate()
