
module Test {

	import Polynomial = Polynomials.Polynomial;
	import Term = Polynomials.Term;
	import Plex = Polynomials.Plex;
	import GroebnerAlgorithm = DiscreteSystem.GroebnerAlgorithm;
	import System = DiscreteSystem.System;
	import IntegerRing = Polynomials.IntegerRing;
	import IntegerModRing = Polynomials.IntegerModRing;
	import PParser = Polynomials.PolynomialParser;
	import TParser = Polynomials.TermParser;
	import TPrinter = Polynomials.TermPrinter;
	import PPrinter = Polynomials.PolynomialPrinter;

	group('groebner', () => {

		// Integer-Ring
		System.ring = new IntegerRing();
		
		var field = ['x', 'y', 'z', 'x_1', 'x_2', 'x_3', 'x_4', 'x_5', 'x_6', 'x_7', 'x_8', 'x_9'];
		
		function matchTerm(a: Term, b: Term) {
			match(a.equals(b), true);
		}

		function matchPolynomial(a: Polynomial, b: Polynomial) {
			a.order(new Plex());
			b.order(new Plex());
			var aStr = PPrinter.run(a, field);
			var bStr = PPrinter.run(b, field);
			match(a.equals(b), true);
		}
		
		test('leastCommonMultiple', () => {

			var matchLeastCommonMultiple = (aStr: string, bStr: string, lcmStr: string) => {

				var a = TParser.parse(aStr, field);
				var b = TParser.parse(bStr, field);
				var lcm = TParser.parse(lcmStr, field);

				var result = GroebnerAlgorithm.leastCommonMultiple(a, b);

				matchTerm(result, lcm);
			};

			matchLeastCommonMultiple('x', 'y', 'x*y');
			matchLeastCommonMultiple('y^2', 'x^2*y', 'x^2*y^2');
		});

		test('sPolynomial', () => {

			var matchSPolynomial = (aStr: string, bStr: string, sPolynomialStr: string) => {

				var a = PParser.parse(aStr, field);
				var b = PParser.parse(bStr, field);
				var sPolynomial = PParser.parse(sPolynomialStr, field);

				var result = GroebnerAlgorithm.sPolynomial(a, b, new Plex());

				matchPolynomial(result, sPolynomial);
			};

			matchSPolynomial('y^2+z^2', 'x^2*y+y*z', 'x^2*z^2-y^2*z');
		});
		
		test('groebner', () => {

			var matchGroebner = (FStr: string[], reducedGroebnerStr: string[]) => {

				var F = _.map(FStr, e => PParser.parse(e, field));

				var result = GroebnerAlgorithm.run(F, new Plex());

				for (var i = 0; i < reducedGroebnerStr.length; i++) {
					matchPolynomial(result[i], PParser.parse(reducedGroebnerStr[i], field));
				}
			};

			matchGroebner(['x^2-y', 'x^3-x'], ['x^2-y', 'x*y-x', 'y^2-y']);
			matchGroebner(['x^2-y^2', 'x^2+y'], ['x^2+y', 'y^2+y']);

			matchGroebner(['y^2+z^2', 'x^2*y+y'], ['x^2*y+y', 'x^2*z^2+z^2', 'y^2+z^2']);

			matchGroebner(['y^2+z^2', 'x^2*y+y*z'], ['x^2*y+y*z', 'x^2*z^2+z^3', 'y^2+z^2']);
		});

		// Z2-Ring
		System.ring = new IntegerModRing(2);
		
		test('groebner in Z2', () => {

			var matchGroebner = (FStr: string[], reducedGroebnerStr: string[]) => {

				var F = _.map(FStr, e => PParser.parse(e, field));

				var result = GroebnerAlgorithm.run(F, new Plex());

				for (var i = 0; i < reducedGroebnerStr.length; i++) {
					matchPolynomial(result[i], PParser.parse(reducedGroebnerStr[i], field));
				}
			};

			var input =
			[
				'-x_1 + x_4 * x_5 + x_4',
				'-x_2 + x_1',
				'-x_3 + x_1',
				'-x_4 + 1',
				'-x_5 + x_6 * x_7 + x_6 + x_7 + 1',
				'-x_6 + x_3 * x_8',
				'-x_7 + x_6 + x_8 + x_9 + x_8 * x_9 + x_6 * x_8 + x_6 * x_9 + x_6 * x_8 * x_9',
				'-x_8 + x_2',
				'-x_9 + 1'
			];

			matchGroebner(input, [
				'x_1+1',
				'x_2+1',
				'x_3+1',
				'x_4+1',
				'x_5',
				'x_6+1',
				'x_7+1',
				'x_8+1',
				'x_9+1'
			]);
		});
	});
}