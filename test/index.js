const assert = require('assert');
const unified = require('unified');
const parse = require('remark-parse');
const markdown = require('remark-stringify');
const math = require('../');
const fs = require('fs');
const path = require('path');

const read = fs.readFileSync;
const join = path.join;

const ROOT = join(__dirname, 'fixtures');
const fixtures = fs.readdirSync(ROOT);

const options = {
	commonmark: true,
	pedantic: true
};

function process (input) {
	return unified()
		.use(parse)
		.use(math)
		.use(markdown)
		.processSync(input, options)
		.toString();
}

describe('remark-inline-math', () => {
	fixtures.forEach(fixture => {
		const filepath = join(ROOT, fixture);
		const input = read(join(filepath, 'input.md'), 'utf-8');
		const output = read(join(filepath, 'output.md'), 'utf-8');
		const result = process(input);

		it(fixture, () => {
			assert.equal(result, output);
		});
	});
});
