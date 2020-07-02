# human readable duration

[![license](https://img.shields.io/npm/l/human-readable-duration)](https://github.com/juliosampaio/humanize-duration/blob/master/LICENCE)

Translate a duration to a human friendly format in any language\* (eg. 2 weeks ago)

<small>_\* since you provide the translation_</small>

## Install

Pick your flavor:

NPM

```sh
npm install human-readable-duration
```

YARN

```sh
yarn add human-readable-duration
```

## Import it

Browser

```html
<script src="./path/to/human-readable-duration.js"></script>
<script>
  console.log(humanize().translate(date));
</script>
```

ES6

```js
import { humanize } from 'human-readable-duration';
console.log(humanize().translate(date));
```

AMD/NODE

```js
const { humanize } = require('human-readable-duration');
console.log(humanize().translate(date));
```

## Use it

```js
const dateInfuture = new Date();
dateInfuture.setTime(dateInfuture.getTime() + 120000);
const translation = humanize().translate(dateInfuture);
expect(translation).toBe('in 2 minutes');

const dateInPast = new Date();
dateInPast.setTime(dateInPast.getTime() - 120000);
const translation = humanize().translate(dateInPast);
expect(translation).toBe('2 minutes ago');
```

## API

- [`humanize()`](#humanize)

  - [.asMinutes()](#humanizeasminutes)

### `humanize()`

```js
humanize(
    locale: Object
): Object
```

### `humanize().asMinutes()`

```js
humanize.asMinutes(
    date: Date
): String
```
