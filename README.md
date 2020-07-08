# 2dv — Vector calculation package written in TypeScript

![build](https://github.com/wetterben/2dv/workflows/build/badge.svg)

Very useful small class to perform vector calculations. Very practical as basis for all kinds of simulations and games where objects move through a two-dimensional space.

## Get started

```
npm i 2dv
```

Use in your JavaScript/Typescript project

```js
import { Vector } from '2dv';
// OR
const { Vector } = require('2dv');

const myVector = new Vector(10, 20);

myVector.add(100);
…

const newVector = Vector.add(myVector, 10);
…

```

## Overview

Detailed documentation: [wetterben.github.io/2dv/](https://wetterben.github.io/2dv/classes/_index_.vector.html)

### Properties

- x
- y

### Accessors

- angle
- length
- magnitude
- max
- min

### Methods

#### Instance

- add
- angleTo
- clone
- crossProduct
- divide
- dotProduct
- equals
- inverse
- multiply
- normalize
- set
- sub
- toArray

### Static

- add
- angleBetween
- closestPointBetween
- crossProduct
- distance
- divide
- dotProduct
- equals
- fromArray
- inverse
- isOnLine
- multiply
- normalize
- pointBetween
- sub

## Documentation

You can find a detailed documentation of all methods here:
[wetterben.github.io/2dv/](https://wetterben.github.io/2dv/classes/_index_.vector.html)

## Roadmap

- [ ] Automated tests
- [ ] Visual Demo
- [ ] More methods

## Contribute

Feel free to add missing functions or fix things. Just do a PR.
