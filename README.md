remark-inline-math
=================

[![Build Status](https://travis-ci.org/bizen241/remark-inline-math.svg?branch=master)](https://travis-ci.org/bizen241/remark-inline-math)

This is a [remark](https://github.com/wooorm/remark) plugin to support inline math surrounded by dollar signs.

## Usage

```js
const remark = require('remark');
const math = require('@bizen241/remark-inline-math');

const doc = '$1\\$ = 1$';
const ast = remark().use(math).parse(doc);
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

## License

[MIT](LICENSE) © bizen241
