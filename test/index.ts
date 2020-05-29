// Class for a planet
class Planet extends Vector {
  public radius: number;
  public mass: number;
  public velocity: Vector = new Vector();

  /**
   *
   */
  constructor(x: number, y: number, radius: number, velocity: Vector) {
    super(x, y);
    this.radius = radius;
    this.mass = this.radius * this.radius;
    this.velocity = velocity;
  }

  // Calculate the forces to other bodies and update the velocity accordingly
  public updateVelocity(allPlanets: Planet[], timeStep: number = 1): void {
    for (const planet of allPlanets) {
      if (planet == this) continue;

      const sqrDistance: number = Math.sqrt(Vector.sub(planet, this).length);
      const forceDirection: Vector = Vector.sub(planet, this).normalize();

      const force: Vector = Vector.divide(
        Vector.multiply(
          Vector.multiply(forceDirection, 0.4),
          (this.mass, planet.mass)
        ),
        sqrDistance
      );

      const acceleration: Vector = Vector.divide(force, this.mass);
      this.velocity.add(Vector.multiply(acceleration, timeStep));
    }
  }

  // Apply velocity to the position
  public updatePosition(timeStep: number = 1): void {
    this.add(Vector.multiply(this.velocity, timeStep));
  }

  // Render the planet with p5
  public render(center?: Vector) {
    if (center) {
      circle(
        this.x - center.x + windowWidth / 2,
        this.y - center.y + windowHeight / 2,
        this.radius * 2
      );
    } else {
      circle(this.x, this.y, this.radius * 2);
    }
  }
}

const planets: Planet[] = [];

const sun = new Planet(500, 500, 50, new Vector(0, 0));
planets.push(sun);

// Generate random planets
for (let index = 0; index < 10; index++) {
  const newPlanet = new Planet(
    Math.random() * 1000,
    Math.random() * 1000,
    Math.random() * 20,
    new Vector(Math.random() * 100 - 50, Math.random() * 100 - 50)
  );
  planets.push(newPlanet);
}

const step = 0.1;
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(200);
}

function draw() {
  background(200);

  // Update all velocities
  for (const planet of planets) {
    planet.updateVelocity(planets, step);
  }

  // Update all positions
  for (const planet of planets) {
    planet.updatePosition(step);
    planet.render(sun);
  }
}
