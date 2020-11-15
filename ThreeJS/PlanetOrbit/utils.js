const Maker = function (scene) {
  this.scene = scene

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

  this.Mesh = function (clr, x, y, z, xl, yl, zl) {
    const mesh = new THREE.Mesh( 
      new THREE.BoxGeometry( xl, yl, zl ), 
      new THREE.MeshStandardMaterial({ color: clr })
    )
    mesh.position.set(x, y, z)
    this.scene.add ( mesh );

    return mesh
  }

  this.Sphere = function (clr, x, y, z, r) {
    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(r, 30, 30),
      new THREE.MeshStandardMaterial({
        color: clr
      })
    )
    sphere.position.set(x, y, z)
    this.scene.add(sphere)

    return sphere
  }

  return this
}
