
module Test {

	import Printer = Maths.Printer;
	import Converter = App.Converter;
	import Parser = Bool.Parser;

	group('converter', () => {

		function matchParse(input: string, output: string) {
			match(Printer.run(Converter.run(Parser.parse(input))), output);
		}

		test('converts bool expression to maths expression', () => {
			matchParse('a&b', 'a*b');

			matchParse('a|b', 'a+b+a*b');

			matchParse('!a', 'a+1');

			matchParse('!a&b', '(a+1)*b');

			matchParse('!a&!b', '(a+1)*(b+1)');

			matchParse('a|b|c', 'a+b+c+b*c+a*(b+c+b*c)');

			matchParse('!a&b&c', '(a+1)*b*c');

			matchParse('!a&(b|c)', '(a+1)*(b+c+b*c)');

		});

	});
}







