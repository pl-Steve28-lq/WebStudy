const rad = Math.PI / 180

const Maker = function (scene) {
  this.scene = scene
  this.camera = null
  this.renderer = null
  
  this.init = function (cam, render) {
    this.camera = cam
    this.renderer = render
  }
  
  this.setOrbit = function () {
    if (this.camera && this.renderer) {
      const control = new THREE.OrbitControls(this.camera, this.renderer.domElement)
      
      control.update()
    }
  }
  
  this.Camera = function (x, y, z) {
    const camera = new THREE.PerspectiveCamera(
        30,
        window.innerWidth/window.innerHeight,
       0.1,
       1000
    )
    camera.position.set(x, y, z)
    
    return camera
  }
  
  this.Renderer = function () {
    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        preserveDrawingBuffer: true
    })
    renderer.setSize(
      window.innerWidth,
      window.innerHeight
    )
    document.body.appendChild( renderer.domElement )
    
    return renderer
  }

  this.Light = function (clr, x, y, z) {
    const light = new THREE.PointLight(
      clr,
      1,
      100
    )
    light.position.set(x, y, z)
    this.scene.add(light)

    return light
  }

  this.DirectLight = function (clr, x, y, z) {
    const light = new THREE.DirectionalLight(clr)
    light.castShadow = true
    light.position.set(x, y, z)
    this.scene.add(light)

    return light
  }

  this.Mesh = function (clr, x, y, z, xl, yl, zl) {
    const mesh = new THREE.Mesh( 
      new THREE.BoxGeometry( xl, yl, zl ), 
      new THREE.MeshStandardMaterial({ color: clr })
    )
    mesh.position.set(x, y, z)
    this.scene.add ( mesh );

    return mesh
  }

  this.Sphere = function (clr, x, y, z, r, texture) {
    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(r, 30, 30),
      new THREE.MeshStandardMaterial({
        color: clr,
        map: texture
      })
    )
    sphere.position.set(x, y, z)
    this.scene.add(sphere)

    return sphere
  }

  this.Torus = function (clr, x, y, z, r) {
    const torus = new THREE.Mesh(
      new THREE.TorusGeometry(r, 0.1, 2, 50),
      new THREE.MeshStandardMaterial({
        color: clr,
      })
    )
    torus.position.set(x, y, z)
    this.scene.add(torus)

    return torus
  }

  this.createSpotlight = function (dist) {
    const color = 0xffffff;
    const intensity = 8;
    const angle = Math.PI/7;

    new Array(6).fill('').forEach((item, i) => {
      var spotlight = new THREE.SpotLight(color, intensity, dist, angle);
      var value = i % 2 === 0 ? dist : -dist;

      spotlight.position.set(
        i < 2 ? value : 0,
        i >= 2 && i < 4 ? value : 0,
        i >= 4 ? value : 0
      );
      this.scene.add(spotlight);
    });
  }

  return this
}