# `<fabric-canvas>`

[![npm version](https://badgen.net/npm/v/fabric-canvas?color=009688)](https://www.npmjs.com/package/fabric-canvas)

<!--
[![Published on Vaadin Directory](https://img.shields.io/badge/Vaadin%20Directory-published-009688.svg)](https://vaadin.com/directory/component/fabric-canvas)
-->

`<fabric-canvas>` is a Web Component wrapper for the popular javascript library [fabric.js](https://github.com/fabricjs/fabric.js).

- [x] Declarative API
- [x] Responsive canvas size
- [x] fabric.js ES module

[Live demo ↗](https://fabric-canvas.netlify.com)
|
[API documentation ↗](https://fabric-canvas.netlify.com/api/#/elements/FabricCanvas)

![rect](https://user-images.githubusercontent.com/3392815/66719537-ee2bd380-edf9-11e9-803d-d5e6cac2783d.png)
![carbon](https://user-images.githubusercontent.com/3392815/66719531-d6544f80-edf9-11e9-9093-aab0f6c13663.png)

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

In order to use the [fabric](http://fabricjs.com/docs/) API to create shapes, you must import the `fabric` module along with the web component:

```js
import { fabric } from 'fabric-canvas';
```

Add the `<fabric-canvas>` element to the page:

```html
<fabric-canvas></fabric-canvas>
```

## Adding Shapes

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

### `HTML` API

```html
<fabric-canvas>
  <fabric-rect top="100" left="100" width="200" height="200" fill="red"></fabric-rect>
</fabric-canvas>
```

## Running demo

1. Fork the `fabric-canvas` repository and clone it locally.

1. Make sure you have [npm](https://www.npmjs.com/) installed.

1. When in the `fabric-canvas` directory, run `npm install` to install dependencies.

1. Run `npm start` to open the demo.

## [License](LICENSE)

This project is licensed under the MIT License.
