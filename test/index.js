const assert = require('assert');
const unified = require('unified');
const parse = require('remark-parse');
const markdown = require('remark-stringify');
const html = require('remark-html');
const remarkInlineMath = require('../');
const fs = require('fs');
const path = require('path');

const read = fs.readFileSync;
const join = path.join;

const options = {
	commonmark: true,
	pedantic: true
};

describe('remark-inline-math', () => {
	describe('with no option', () => {
		const processor = unified()
			.use(parse, options)
			.use(remarkInlineMath)
			.use(markdown);

		const dirpath = join(__dirname, 'fixtures', 'default');
		const fixtures = fs.readdirSync(dirpath);

		fixtures.forEach(fixture => {
			const filepath = join(dirpath, fixture);
			const input = read(join(filepath, 'input.md'), 'utf-8');
			const output = read(join(filepath, 'output.md'), 'utf-8');
			const result = processor.processSync(input).toString();

			it(fixture, () => {
				assert.equal(result, output);
			});
		});
	});

	describe('with builder option', () => {
		const builder = (value) => ({
			type: 'inlineCode',
			value: value,
			data: {
				hName: 'math',
			},
		});
		const processor = unified()
			.use(parse, options)
			.use(remarkInlineMath, { builder })
			.use(html);

		const dirpath = join(__dirname, 'fixtures', 'custom');
		const fixtures = fs.readdirSync(dirpath);

		fixtures.forEach(fixture => {
			const filepath = join(dirpath, fixture);
			const input = read(join(filepath, 'input.md'), 'utf-8');
			const output = read(join(filepath, 'output.html'), 'utf-8');
			const result = processor.processSync(input).toString();

			it (fixture, () => {
				assert.equal(result, output);
			});
		});
	});
});
