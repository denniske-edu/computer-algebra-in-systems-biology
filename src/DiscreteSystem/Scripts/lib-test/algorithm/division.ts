
module Test {

	import Polynomial = Polynomials.Polynomial;
	import Plex = Polynomials.Plex;
	import DivisionAlgorithm = DiscreteSystem.DivisionAlgorithm;
	import System = DiscreteSystem.System;
	import IntegerRing = Polynomials.IntegerRing;
	import PParser = Polynomials.PolynomialParser;
	import PPrinter = Polynomials.PolynomialPrinter;

	group('division', () => {

		// Integer-Ring
		System.ring = new IntegerRing();
		
		var field = ['x', 'y', 'z', 'x_1', 'x_2', 'x_3', 'x_4', 'x_5', 'x_6', 'x_7', 'x_8', 'x_9'];
		
		function matchPolynomial(a: Polynomial, b: Polynomial) {
			a.order(new Plex());
			b.order(new Plex());
			var aStr = PPrinter.run(a, field);
			var bStr = PPrinter.run(b, field);
			match(a.equals(b), true);
		}
		
		test('DivisionAlgorithm', () => {

			var matchDivision = (fStr: string, fsStr: string[], r: string = '') => {

				var f = PParser.parse(fStr, field);
				var fs = _.map(fsStr, e => PParser.parse(e, field));

				var result = DivisionAlgorithm.run(f, fs, new Plex());

				matchPolynomial(result.r, PParser.parse(r, field));
			};

			matchDivision('', ['']);
			matchDivision('1', ['1']);
			matchDivision('x^2+2*x+1', ['x+1']);

			matchDivision('x*y^2-x', ['y^2-1', 'x*y+1']);
			matchDivision('x*y^2-x', ['x*y+1', 'y^2-1'], '-x-y');


			matchDivision('x^2*z^2-y^2*z', ['y^2+z^2', 'x^2*y+y*z'], 'x^2*z^2+z^3');

			var f = PParser.parse('x^2+2*x+1', field);
			var fs = [PParser.parse('x+1', field)];

			var result = DivisionAlgorithm.run(f, fs, new Plex());

			matchPolynomial(result.r, PParser.parse('', field));
			matchPolynomial(result.hs[0], PParser.parse('x+1', field));
		});
	});
}