function locator (value, fromIndex) {
	return value.indexOf('$', fromIndex);
}

const RE_MATH = /^\$((?:\\\$|[^$])+)\$/;

function tokenizer (eat, value, silent) {
	const match = RE_MATH.exec(value);

	if (match) {
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
tokenizer.notInLink = true;

function plugin (processor) {
	const Parser =  processor.Parser;
	const tokenizers = Parser.prototype.inlineTokenizers;
	const methods = Parser.prototype.inlineMethods;

	tokenizers.math = tokenizer;
	methods.splice(methods.indexOf('text'), 0, 'math');
}

module.exports = plugin;
