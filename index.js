function locator (value, fromIndex) {
	return value.indexOf('$', fromIndex);
}

const RE_MATH = /^\$((?:\\\$|[^$\n])+)\$/;

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

	const match = RE_MATH.exec(value);

	if (match !== null) {
		if (silent) {
			return true;
		}

		return eat(match[0])({
			type: 'inlineCode',
			value: match[1].trim(),
			data: {
				lang: 'math'
			}
		});
	}
}

tokenizer.locator = locator;

function plugin () {
	const Parser =  this.Parser;
	const tokenizers = Parser.prototype.inlineTokenizers;
	const methods = Parser.prototype.inlineMethods;

	tokenizers.math = tokenizer;
	methods.splice(methods.indexOf('text'), 0, 'math');
}

module.exports = plugin;
