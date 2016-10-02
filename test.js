const assert = require('assert');
const remark = require('remark');
const math = require('.');

const compiler = remark().use(math);

describe('remark-inline-math', () => {
	it('can handle text surrounded by dollar signs', () => {
		const input = '$1\\$ = 1$';
		const tree = {
			type: 'root',
			children: [
				{
					type: 'paragraph',
					children: [
						{
							type: 'inlineCode',
							value: '1\\$ = 1',
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
									column: 10,
									offset: 9
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
							column: 10,
							offset: 9
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
					column: 10,
					offset: 9
				}
			}
		};
		const result = compiler.parse(input);

		return assert.equal(JSON.stringify(result), JSON.stringify(tree));
	});
});
