function locator (value, fromIndex) {
	return value.indexOf('$', fromIndex);
}

const INLINE_MATH = /^\$((?:\\\$|[^$\n])+)\$/;

function plugin (options) {
	options = options || {};

	const builder = options.builder;

	function tokenizer (eat, value, silent) {
		const opening = value.slice(0, 2);

		if (opening === '\\\$') {
			if (silent) {
				return true;
			}

			return eat(opening)({
				type: 'text',
				value: '$',
			});
		}

		const match = INLINE_MATH.exec(value);

		if (match !== null) {
			if (silent) {
				return true;
			}

			const substring = match[0];
			const value = match[1].trim();

			const custom = (builder !== undefined) ? builder(value) : undefined;

			const node = custom || {
				type: 'inlineCode',
				value,
				data: {
					lang: 'math',
				},
			};

			return eat(substring)(node);
		}
	}
	tokenizer.locator = locator;

	const Parser =  this.Parser;
	const tokenizers = Parser.prototype.inlineTokenizers;
	const methods = Parser.prototype.inlineMethods;

	tokenizers.math = tokenizer;
	methods.splice(methods.indexOf('text'), 0, 'math');
}

module.exports = plugin;
