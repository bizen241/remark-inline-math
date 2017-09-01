remark-inline-math
=================

[![Build Status](https://travis-ci.org/bizen241/remark-inline-math.svg?branch=master)](https://travis-ci.org/bizen241/remark-inline-math)

This is a [remark](https://github.com/wooorm/remark) plugin to support inline math surrounded by dollar signs.

> ### :warning: It's highly recommended to use [`remark-math`](https://github.com/Rokt33r/remark-math) instead of this package.

## Usage

```js
const unified = require('unified');
const parse = require('remark-parse');
const remarkInlineMath = require('@bizen241/remark-inline-math');

const doc = '$1\\$ = 1$';
const ast = unified()
    .use(parse)
    .use(remarkInlineMath)
    .parse(doc);
```

Yields:

```json
{
    "type": "root",
    "children": [
        {
            "type": "paragraph",
            "children": [
                {
                    "type": "inlineCode",
                    "value": "1\\$ = 1",
                    "data": {
                        "lang": "math"
                    }
                }
            ]
        }
    ]
}
```

or

```html
<p><code>1\$ = 1</code></p>
```

## API

### `origin.use(remarkInlineMath[, options])`

#### `options`

+ `builder` (`Function`)
    + `@param {string} value` - math expression (e.g. `1 + 1 = 2`)
    + `@returns {MdastNode}` - [MDAST node](https://github.com/syntax-tree/mdast)

Example:

```js
const options = {
    builder: (value) => ({
        type: 'inlineCode',
        value,
        data: {
            hName: 'math',
        },
    }),
};
```


## License

[MIT](LICENSE) © bizen241
