const assert = require('assert');
const remark = require('remark');
const math = require('../');

const fs = require('fs');
const path = require('path');

const read = fs.readFileSync;
const join = path.join;

const ROOT = join(__dirname, 'fixtures');
const fixtures = fs.readdirSync(ROOT);

function parse (input) {
	return remark().use(math).parse(input);
}

function process (input) {
	return remark().use(math).process(input).toString();
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

describe('remark-inline-math', () => {
	it('adds a lang property', () => {
		const input = '$E = mc^2$';
		const tree = {
			type: 'root',
			children: [
				{
					type: 'paragraph',
					children: [
						{
							type: 'inlineCode',
							value: 'E = mc^2',
							data: {
								lang: 'math'
							},
							position: {
								start: {
									line: 1,
									column: 1,
									offset: 0
								},
								end: {
									line: 1,
									column: 11,
									offset: 10
								},
								indent: []
							}
						}
					],
					position: {
						start: {
							line: 1,
							column: 1,
							offset: 0
						},
						end: {
							line: 1,
							column: 11,
							offset: 10
						},
						indent: []
					}
				}
			],
			position: {
				start: {
					line: 1,
					column: 1,
					offset: 0
				},
				end: {
					line: 1,
					column: 11,
					offset: 10
				}
			}
		};
		const result = parse(input);

		return assert.equal(JSON.stringify(result), JSON.stringify(tree));
	});
});
