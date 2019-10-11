# `<fabric-canvas>`

[![npm version](https://badgen.net/npm/v/fabric-canvas?color=009688)](https://www.npmjs.com/package/fabric-canvas)

<!--
[![Published on Vaadin Directory](https://img.shields.io/badge/Vaadin%20Directory-published-009688.svg)](https://vaadin.com/directory/component/vaadin-component-factoryfabric-canvas)
-->

`<fabric-canvas>` is a Web Component wrapper for the popular javascript library [fabric.js](https://github.com/fabricjs/fabric.js).

- [x] Declarative API
- [x] Responsive canvas size
- [x] fabric.js ES module

[Live demo ↗](https://fabric-canvas.netlify.com)
|
[API documentation ↗](https://fabric-canvas.netlify.com/api/#/elements/FabricCanvas)

![screenshot](https://user-images.githubusercontent.com/3392815/66313780-9bdf4400-e91b-11e9-96c8-096cd17d6b7a.png)
![carbon](https://user-images.githubusercontent.com/3392815/66313774-98e45380-e91b-11e9-9659-605f432179fc.png)

## Installation

Install `fabric-canvas`:

```sh
npm i fabric-canvas --save
```

## Usage

Import the web component in your application:

```js
import 'fabric-canvas';
```

Or import the static version:

```js
import 'fabric-canvas/src/fabric-static-canvas';
```

Add the `<fabric-canvas>` element to the page.

```html
<fabric-canvas></fabric-canvas>
```

## Adding Shapes

### `HTML` API

```html
<fabric-canvas>
  <fabric-rect top="100" left="100" width="200" height="200" fill="red"></fabric-rect>
</fabric-canvas>
```

### `JS` API

```js
const rect = new fabric.Rect({
  top: 100,
  left: 100,
  width: 200,
  height: 200,
  fill: 'red'
});

document.querySelector('fabric-canvas').add(rect);
```

In order to use the [fabric.js API](http://fabricjs.com/docs/fabric.Canvas.html#add) to create shapes, you must import the `fabric` module along with the web component:

```js
import { fabric } from 'fabric-canvas';
```

## Running demo

1. Fork the `fabric-canvas` repository and clone it locally.

1. Make sure you have [npm](https://www.npmjs.com/) installed.

1. When in the `fabric-canvas` directory, run `npm install` to install dependencies.

1. Run `npm start` to open the demo.

## [License](LICENSE)

This project is licensed under the MIT License.
