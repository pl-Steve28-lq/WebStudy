const Planet = function (r, z, speed, dist, clr, orbit) {
  orbit = orbit != undefined ? orbit : true
  this.planet = Make.Sphere(clr, dist, 0, z, r)
  this.rad = 0
  this.moon = Array()

  if (orbit) {
    this.orbit = Make.Torus(clr, 0, 0, 0, dist)
    this.orbit.rotation.x = 90 * rad
  } else { this.orbit = null }
  
  this.startOrbit = function () {
    this.planet.position.x = dist*Math.cos(this.rad)
    this.planet.position.z = dist*Math.sin(this.rad)
    
    this.rad += 0.05*speed
    if (this.rad > 2*Math.PI) this.rad = 0
    
    for (let m of this.moon) {
      let O = m.moon
      O.position.x = m.dist*Math.cos(m.rad) + this.planet.position.x
      O.position.z = m.dist*Math.sin(m.rad) + this.planet.position.z

      let R = m.orbit
      if (R) {
        R.position.x = this.planet.position.x
        R.position.z = this.planet.position.z
      }
      m.rad += 0.1*m.speed
      if (m.rad > 2*Math.PI) m.rad = 0
    }
  }
  
  this.addMoon = function (dist, r, speed, clr) {
    const m = new Moon(this, dist, r, speed, clr, orbit)
    this.moon.push(m)
  }
  
  return this
}

const Sun = function (clr, rad) {
  const loader = new THREE.TextureLoader()
  const suntexture = loader.load("../assets/sun.jpg")

  this.sun = Make.Sphere(clr, 0, 0, 0, rad, suntexture)
  Make.createSpotlight(17)
  return this
}

const Moon = function (planet, dist, r, speed, clr, orbit) {
  this.planet = planet
  this.moon = Make.Sphere(clr, this.planet.r+dist, 0, 0, r)
  this.rad = 0
  this.dist = dist
  this.speed = speed
  
  orbit = orbit != undefined ? orbit : true
  if (orbit) {
    this.orbit = Make.Torus(clr, this.planet.r+dist, 0, 0, dist)
    this.orbit.rotation.x = 90 * rad
  } else { this.orbit = null }

  return this
}