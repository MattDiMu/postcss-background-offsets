# PostCSS Background Offsets [![Build Status][ci-img]][ci]

[PostCSS] plugin to increase brower support for css background position edge offset by using calc..

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/MattDiMu/postcss-background-offsets.svg
[ci]:      https://travis-ci.org/MattDiMu/postcss-background-offsets

```css
.foo {
    /* Input example */
    background-position: right 10px bottom 20px;
}
```

```css
.foo {
  /* Output example */
  background-position: calc(100% - 10px) calc(100% - 20px);
  background-position: right 10px bottom 20px;
}
```
By default the original background position value is preserved, as some browsers lack support for css calc(). You may change this behavior by passing the option `method: 'replace'`:

## Usage

```js
postcss([ require('postcss-background-offsets') ])
postcss([ require('postcss-background-offsets') ])({ method: 'replace' })
```

See [PostCSS] docs for examples for your environment.
