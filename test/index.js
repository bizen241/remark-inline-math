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

const compare = (fixturesDirpath, fixtureNames, inputExt, outputExt, processor) => {
	fixtureNames.forEach(fixtureName => {
		const filepath = join(fixturesDirpath, fixtureName);
		const input = read(join(filepath, `input.${inputExt}`), 'utf-8');
		const output = read(join(filepath, `output.${outputExt}`), 'utf-8');
		const result = processor(input);

		it(fixtureName, () => {
			assert.equal(result, output);
		});
	});
};

const options = {
	commonmark: true,
	pedantic: true
};

const rootDirpath = join(__dirname, 'fixtures');

describe('remark-inline-math', () => {
	describe('markdown', () => {
		const markdownDirpath = join(rootDirpath, 'markdown');

		describe('to markdown', () => {
			const processor = unified()
				.use(parse, options)
				.use(remarkInlineMath)
				.use(markdown);

			const fixturesDirpath = join(markdownDirpath, 'to-markdown');
			const fixtureNames = fs.readdirSync(fixturesDirpath);

			compare(fixturesDirpath, fixtureNames, 'md', 'md', (input) => (
				processor.processSync(input).toString()
			));
		});
	});

	describe('option', () => {
		const optionsDirpath = join(rootDirpath, 'options');

		describe('builder', () => {
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

			const fixturesDirpath = join(optionsDirpath, 'builder');
			const fixtureNames = fs.readdirSync(fixturesDirpath);

			compare(fixturesDirpath, fixtureNames, 'md', 'html', (input) => (
				processor.processSync(input).toString()
			));
		});
	});
});
