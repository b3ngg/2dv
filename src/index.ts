interface Point {
  x: number;
  y: number;
}

/** The main Vector class */
export class Vector implements Point {
  constructor(public x: number = 0, public y: number = 0) {}

  /* 
    Instance Methods
  */

  /** Get the magnitude of the vector */
  public get magnitude(): number {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
  }

  /** Get the length of the vector (alias for magnitude) */
  public get length(): number {
    return this.magnitude;
  }

  /** Add a Vector or scalar to the instance */
  public add(addend: Vector | number): Vector {
    if (addend instanceof Vector) {
      this.x += addend.x;
      this.y += addend.y;
    } else {
      this.x += addend;
      this.y += addend;
    }
    return this;
  }

  /** Subtract a Vector or scalar from the instance */
  public sub(subtrahend: Vector | number): Vector {
    if (subtrahend instanceof Vector) {
      this.x -= subtrahend.x;
      this.y -= subtrahend.y;
    } else {
      this.x -= subtrahend;
      this.y -= subtrahend;
    }
    return this;
  }

  /** Multiply the instance with a Vector or scalar */
  public multiply(factor: Vector | number): Vector {
    if (factor instanceof Vector) {
      this.x *= factor.x;
      this.y *= factor.y;
    } else {
      this.x *= factor;
      this.y *= factor;
    }
    return this;
  }

  /** Divide the instance with a Vector or scalar */
  public divide(divisor: Vector | number): Vector {
    if (divisor instanceof Vector) {
      if (divisor.x != 0) this.x /= divisor.x;
      if (divisor.y != 0) this.y /= divisor.y;
    } else {
      if (divisor != 0) {
        this.x /= divisor;
        this.y /= divisor;
      }
    }
    return this;
  }

  /** Inverse the instance Vector */
  public inverse(): Vector {
    this.x = -this.x;
    this.y = -this.y;
    return this;
  }

  /** Normalize the instance Vector */
  public normalize(): Vector {
    return this.divide(this.magnitude);
  }

  /** Get min scalar */
  public get min(): number {
    return Math.min(this.x, this.y);
  }

  /** Get max scalar */
  public get max(): number {
    return Math.max(this.x, this.y);
  }

  /** Get the angle of the instance Vector in radiants */
  public get angle(): number {
    return -Math.atan2(-this.y, this.x);
  }

  /** Get the angle from the instance to another Vector in radians */
  public angleTo(b: Vector): number {
    return Math.acos(this.dotProduct(b) / (this.magnitude * b.magnitude));
  }

  /** Scalar product of the instance and some Vector or Point */
  public dotProduct(b: Vector | Point): number {
    return this.x * b.x + this.y * b.y;
  }

  /** Cross product of the instance and some Vector or Point */
  public crossProduct(b: Vector | Point): number {
    return this.x * b.y - this.y * b.x;
  }

  /** Checks if an Vector or Point is equal to the instance */
  public equals(b: Vector | Point): boolean {
    return this.x == b.x && this.y == b.y;
  }

  /** Get new instance of the Vector */
  public clone(): Vector {
    return new Vector(this.x, this.y);
  }

  /** Set the scalars of the Vector */
  public set(x: number, y: number): Vector {
    this.x = x;
    this.y = y;
    return this;
  }

  /**  Return a array with the scalars of the instance Vector */
  public toArray(): number[] {
    return [this.x, this.y];
  }

  /* 
    Static Methods
  */

  /** Add an Vector or scalar to a Vector or Point */
  public static add(augend: Vector | Point, addend: Vector | number): Vector {
    if (addend instanceof Vector) {
      return new Vector(augend.x + addend.x, augend.y + addend.y);
    } else {
      return new Vector(augend.x + addend, augend.y + addend);
    }
  }

  /** Subtract an Vector or scalar from a Vector or Point */

  public static sub(
    minuend: Vector | Point,
    subtrahend: Vector | number
  ): Vector {
    if (subtrahend instanceof Vector) {
      return new Vector(minuend.x - subtrahend.x, minuend.y - subtrahend.y);
    } else {
      return new Vector(minuend.x - subtrahend, minuend.y - subtrahend);
    }
  }

  /** Multiply a Vector or Point with a Vector or scalar */
  public static multiply(
    factor1: Vector | Point,
    factor2: Vector | number
  ): Vector {
    if (factor2 instanceof Vector) {
      return new Vector(factor1.x * factor2.x, factor1.y * factor2.y);
    } else {
      return new Vector(factor1.x * factor2, factor1.y * factor2);
    }
  }

  /** Divide a Vector or Point with a Vector or scalar */
  public static divide(
    dividend: Vector | Point,
    divisor: Vector | number
  ): Vector {
    if (divisor instanceof Vector) {
      return new Vector(dividend.x / divisor.x, dividend.y / divisor.y);
    } else {
      return new Vector(dividend.x / divisor, dividend.y / divisor);
    }
  }

  /** Inverse a vector */
  public static inverse(vector: Vector): Vector {
    return new Vector(-vector.x, -vector.y);
  }

  /** Divide a vector with his magnitude */
  public static normalize(vector: Vector) {
    return vector.clone().normalize();
  }

  /** Get the angle between two vectors in radiants */
  public static angleBetween(a: Vector, b: Vector): number {
    return Math.acos(a.dotProduct(b) / (a.magnitude * b.magnitude));
  }

  /** Get the scalar product of two Vectors or Points */
  public static dotProduct(a: Vector | Point, b: Vector | Point): number {
    return a.x * b.x + a.y * b.y;
  }

  /** Get the cross product of two Vectors or Points */
  public static crossProduct(a: Vector | Point, b: Vector | Point): number {
    return a.x * b.y - a.y * b.x;
  }

  /** Checks if two Vectors or Points are equal to each other */
  public static equals(a: Vector | Point, b: Vector | Point): boolean {
    return a.x === b.x && a.y === b.y;
  }

  /** Get the distance between to Vectors */
  public static distance(a: Vector, b: Vector): number {
    return Vector.sub(a, b).magnitude;
  }

  /** Calculate a Vector, that is on a line between two points */
  public static pointBetween(a: Vector, b: Vector, distance: Vector): Vector {
    return Vector.add(a, Vector.sub(b, a).normalize().multiply(distance));
  }

  /** Calculate a Vector, that is the closest to the point, on a line between two vectors */
  public static closestPointBetween(
    start: Vector,
    end: Vector,
    point: Vector
  ): Vector {
    // Vector representing the line from start of the line to the point
    const startToLine = Vector.sub(point, start);

    // Vector representing the line
    const line = Vector.sub(start, end);

    // The angle between the two lines
    const theta = Vector.angleBetween(startToLine, line);

    line.normalize();
    line.multiply(startToLine.magnitude * Math.cos(theta));

    return Vector.add(start, line);
  }

  /** Check, if a Vector is on a line between two Vectors */
  public static isOnLine(a: Vector, b: Vector, v: Vector): boolean {
    return (
      Vector.distance(a, v) + Vector.distance(v, b) === Vector.distance(a, b)
    );
  }

  /** Create a Vector from the first two values of a array */
  public static fromArray(array: number[]): Vector {
    return new Vector(array[0], array[1]);
  }
}
