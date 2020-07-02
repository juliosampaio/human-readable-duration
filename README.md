# human readable duration

[![version](https://img.shields.io/github/package-json/v/juliosampaio/human-readable-duration)](https://img.shields.io/github/package-json/v/juliosampaio/human-readable-duration) [![license](https://img.shields.io/npm/l/human-readable-duration)](https://github.com/juliosampaio/humanize-duration/blob/master/LICENCE)

Translate a duration to a human friendly format in any language\* (eg. 2 weeks ago)

Think of _moment.duration().humanize()_ but lightweight (only 3.5k).

<small>_\* since you provide the translation_</small>

## TOC

- [Install](#install)
- [Import](#import)
- [Usage](#usage)
- [API](#api)
- [Locales](#locales)

## Install

Pick your flavor:

| Package manager | Command                               |
| --------------- | ------------------------------------- |
| npm             | `npm install human-readable-duration` |
| yarn            | `yarn add human-readable-duration`    |

## Import

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

## Usage

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

The library uses the current date as starting point, it means that all translations are relative to Date.now(). eg. if you add two minutes to the current time and call the `translate()` function, the library will translate it as _"in 2 minutes"_ (with the default locale).

- [`humanize()`](#humanize)
  - [`.translate()`](#humanizetranslate)
  - [`.asMinutes()`](#humanizeasminutes)
  - [`.asHours()`](#humanizeashours)
  - [`.asDays()`](#humanizeasdays)
  - [`.asWeeks()`](#humanizeasweeks)
  - [`.asMonths()`](#humanizeasmonths)
  - [`.asYears()`](#humanizeasyears)

### `humanize()`

```js
humanize(
    locale: Object
): Object
```

Instantiates the translator function and returns the translation functions. Accepts a `locale` object to be used in all translations. See the [locales section](#locales) for more details on how to customize translations to other languges.

### `humanize().translate()`

```js
humanize().translate(
    date: Date
): String
```

Translates the duration between `date` and `Date.now()` in a human friendly format. The long the duration the higher the unit of time is choosen for the translation. Available units of time are: minute, hours, days, weeks, months and years.

| Input                                            | Output        |
| ------------------------------------------------ | ------------- |
| `humanize().translate(twoMinuteInPastDate)`      | 2 minutes ago |
| `humanize().translate(oneMinuteInPastDate)`      | just now      |
| `humanize().translate(new Date())`               | now           |
| `humanize().translate(120MinutesInFutureDate)`   | in 2 hours    |
| `humanize().translate(twoDaysInFutureDate)`      | in 2 days     |
| `humanize().translate(tenWeeksInFutureDate)`     | in 10 weeks   |
| `humanize().translate(fiveWeeksInFutureDate)`    | in 1 month    |
| `humanize().translate(twelveMonthsInFutureDate)` | in 1 year     |

### `humanize().asMinutes()`

```js
humanize().asMinutes(
    date: Date
): String
```

Set **minutes** as the highest unit of time for the translation. eg:

| Input                                            | Output             |
| ------------------------------------------------ | ------------------ |
| `humanize().asMinutes(twoDaysInFutureDate)`      | in 2880 minutes    |
| `humanize().asMinutes(twelveMonthsInFutureDate)` | in 525600 minutes  |
| `humanize().asMinutes(twoDaysInPastDate)`        | 2880 minutes ago   |
| `humanize().asMinutes(twelveMonthsInPastDate)`   | 525600 minutes ago |

### `humanize().asHours()`

```js
humanize().asHours(
    date: Date
): String
```

Set **hours** as the highest unit of time for the translation. eg:

| Input                                     | Output      |
| ----------------------------------------- | ----------- |
| `humanize().asHours(twoDaysInFutureDate)` | in 24 hours |

### `humanize().asDays()`

```js
humanize().asDays(
    date: Date
): String
```

Set **days** as the highest unit of time for the translation. eg:

| Input                           | Output              |
| ------------------------------- | ------------------- |
| `humanize().asDays(new Date())` | less than 1 day ago |

### `humanize().asWeeks()`

```js
humanize().asWeeks(
    date: Date
): String
```

Set **weeks** as the highest unit of time for the translation. eg:

| Input                                 | Output     |
| ------------------------------------- | ---------- |
| `humanize().asWeeks(oneMontInFuture)` | in 4 weeks |

### `humanize().asMonths()`

```js
humanize().asMonths(
    date: Date
): String
```

Set **months** as the highest unit of time for the translation. eg:

| Input                             | Output        |
| --------------------------------- | ------------- |
| `humanize().asMonths(oneYearAgo)` | 12 months ago |

### `humanize().asYears()`

```js
humanize().asYears(
    date: Date
): String
```

Set **years** as the highest unit of time for the translation. eg:

| Input                                   | Output              |
| --------------------------------------- | ------------------- |
| `humanize().asYears(fiveWeeksInFuture)` | in less than 1 year |

## Locales

The library uses en-US as the default locale, but one can easily override it passing a locale object to the `humanize()` function.

```js

const ptBr = {
    NOW: 'agora',
    MINUTE: {
        NAME: 'minuto',
        PAST_SINGULAR: 'há 1 minuto',
        PAST_PLURAL: 'há {0} minutos',
        . . .
    },
    . . .
}

const { translate } humanize(ptBr);

console.log(translate(new Date()));
//"agora"
```

You can even change only specific translations without the need to fully replace the default locale:

```js
const myLocale = {
  MINUTE: {
    FUTURE_SINGULAR: 'in one minute (hurry up!)',
  },
};

const { translate } humanize(myLocale);
console.log(translate(new Date()));
//"now"
console.log(translate(oneMinuteInFutureDate));
//"in one minute (hurry up!)"
```

Please, check the [src/locales](/src/locales) folder for the required structure a locale file must have.
