
module Test {

	import Polynomial = Polynomials.Polynomial;
	import Term = Polynomials.Term;
	import Plex = Polynomials.Plex;
	import System = DiscreteSystem.System;
	import IntegerRing = Polynomials.IntegerRing;
	import PParser = Polynomials.PolynomialParser;
	import TParser = Polynomials.TermParser;
	import TPrinter = Polynomials.TermPrinter;
	import PPrinter = Polynomials.PolynomialPrinter;
	import IntegerRingModulo2 = Polynomials.IntegerRingModulo2;

	group('parser', () => {

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

		test('term parse', () => {

			var f1 = ['x_1', 'x_2'];

			matchTerm(TParser.parse('x_1', f1), new Term(1, [1, 0]));

			var f = ['x', 'y'];

			matchTerm(TParser.parse('1', f), new Term(1, [0, 0]));
			matchTerm(TParser.parse('x*y', f), new Term(1, [1, 1]));
			matchTerm(TParser.parse('x^2*y', f), new Term(1, [2, 1]));
			matchTerm(TParser.parse('3*x^2*y', f), new Term(3, [2, 1]));

			matchTerm(TParser.parse('-1', f), new Term(-1, [0, 0]));
			matchTerm(TParser.parse('-x*y', f), new Term(-1, [1, 1]));
			matchTerm(TParser.parse('-x^2*y', f), new Term(-1, [2, 1]));
			matchTerm(TParser.parse('-3*x^2*y', f), new Term(-3, [2, 1]));
		});

		test('term toStr', () => {

			var matchToStr = (a: string) => match(TPrinter.run(TParser.parse(a, field), field), a);
				
			matchToStr('1');
			matchToStr('x*y');
			matchToStr('x^2*y');
			matchToStr('3*x^2*y');

			matchToStr('-1');
			matchToStr('-x*y');
			matchToStr('-x^2*y');
			matchToStr('-3*x^2*y');
		});

		test('term divisible', () => {

			var f = ['x', 'y'];

			assertIsTrue(TParser.parse('x^2*y', f).divisibleBy(TParser.parse('x*y', f)));
			
			assertIsTrue(TParser.parse('x^2*y^2', f).divisibleBy(TParser.parse('x^2*y^2', f)));

			assertIsFalse(TParser.parse('x*y', f).divisibleBy(TParser.parse('x^2*y', f)));
		});
		
		test('term equals', () => {

			matchTerm(new Term(1, [2, 1]), new Term(1, [2, 1]));
			matchTerm(new Term(1, [1, 1]), new Term(1, [1, 1]));
			matchTerm(new Term(4, [2, 2]), new Term(4, [2, 2]));
		});

		test('term divide', () => {

			var f = ['x', 'y'];

			matchTerm(TParser.parse('x^2*y', f).divide(TParser.parse('x*y', f)), TParser.parse('x', f));
			matchTerm(TParser.parse('4*x^2*y^2', f).divide(TParser.parse('2*x^2*y^2', f)), TParser.parse('2', f));
		});
		
		test('polynomial parse', () => {

			var f = ['x', 'y'];

			matchPolynomial(PParser.parse('', f), new Polynomial());
			matchPolynomial(PParser.parse('x', f), new Polynomial([TParser.parse('x', f)]));
			matchPolynomial(PParser.parse('x*y', f), new Polynomial([TParser.parse('x*y', f)]));
			matchPolynomial(PParser.parse('2*x+3*y^3', f), new Polynomial([TParser.parse('2*x', f), TParser.parse('3*y^3', f)]));
			matchPolynomial(PParser.parse('4*x*y+y', f), new Polynomial([TParser.parse('4*x*y', f), TParser.parse('y', f)]));

			matchPolynomial(PParser.parse('-x', f), new Polynomial([TParser.parse('-x', f)]));
			matchPolynomial(PParser.parse('-x-y', f), new Polynomial([TParser.parse('-x', f), TParser.parse('-y', f)]));
			matchPolynomial(PParser.parse('-x*y', f), new Polynomial([TParser.parse('-x*y', f)]));
			matchPolynomial(PParser.parse('-2*x+3*y^3', f), new Polynomial([TParser.parse('-2*x', f), TParser.parse('3*y^3', f)]));
			matchPolynomial(PParser.parse('4*x*y-y', f), new Polynomial([TParser.parse('4*x*y', f), TParser.parse('-y', f)]));
		});

		test('polynomial toStr', () => {

			var matchToStr = (a: string) => match(PPrinter.run(PParser.parse(a, field), field), a);

			matchToStr('1');
			matchToStr('2');
			matchToStr('x');
			matchToStr('x+1');
			matchToStr('x*y+y');
			matchToStr('x^2*y-3*y^2');
			matchToStr('3*x^2*y-1');

			matchToStr('-1');
			matchToStr('-x');
			matchToStr('-x-1');
			matchToStr('-x*y+x');
			matchToStr('-x^2*y-y^2');
			matchToStr('-3*x^2*y');
		});

		test('term add', () => {

			var matchAdd = (a: string, b: string, c: string) => matchPolynomial(PParser.parse(a, field).add(PParser.parse(b, field)), PParser.parse(c, field));
				
			matchAdd('1', '1', '2');
			matchAdd('x', 'y', 'x+y');
			matchAdd('x+1', 'x+1', '2*x+2');
			matchAdd('x^2*y', '3*x+y', 'x^2*y+3*x+y');
			matchAdd('2*x^2*y+3*y', 'x^2*y+2*y', '3*x^2*y+5*y');
		});

		test('term subtract', () => {

			var f = ['x', 'y'];

			matchPolynomial(PParser.parse('1', f).subtract(PParser.parse('1', f)), PParser.parse('', f));
			matchPolynomial(PParser.parse('x', f).subtract(PParser.parse('x', f)), PParser.parse('', f));
			matchPolynomial(PParser.parse('x+1', f).subtract(PParser.parse('x+1', f)), PParser.parse('', f));
			matchPolynomial(PParser.parse('x^2*y', f).subtract(PParser.parse('x^2*y', f)), PParser.parse('', f));
			matchPolynomial(PParser.parse('2*x^2*y+3*y', f).subtract(PParser.parse('2*x^2*y+3*y', f)), PParser.parse('', f));
			
			matchPolynomial(PParser.parse('2', f).subtract(PParser.parse('1', f)), PParser.parse('1', f));
			matchPolynomial(PParser.parse('3*x^2', f).subtract(PParser.parse('x^2', f)), PParser.parse('2*x^2', f));
			matchPolynomial(PParser.parse('x+1', f).subtract(PParser.parse('x^2+1', f)), PParser.parse('-x^2+x', f));
		});

		test('term multiply', () => {

			var f = ['x', 'y'];

			matchPolynomial(PParser.parse('1', f).multiply(PParser.parse('5', f)), PParser.parse('5', f));
			matchPolynomial(PParser.parse('x', f).multiply(PParser.parse('y', f)), PParser.parse('x*y', f));
			matchPolynomial(PParser.parse('x+1', f).multiply(PParser.parse('x+1', f)), PParser.parse('x^2+2*x+1', f));
			matchPolynomial(PParser.parse('x^2*y', f).multiply(PParser.parse('3*x+y', f)), PParser.parse('3*x^3*y+x^2*y^2', f));

			matchPolynomial(PParser.parse('x-y', f).multiply(PParser.parse('x^2*y+2', f)), PParser.parse('x^3*y-x^2*y^2+2*x-2*y', f));
		});
		
		test('makeMonic', () => {

			var matchMakeMonic = (aStr: string, bStr: string) => {

				var a = PParser.parse(aStr, field);
				var b = PParser.parse(bStr, field);

				matchPolynomial(a.makeMonic(new Plex()), b);
			};

			matchMakeMonic('1', '1');
			matchMakeMonic('x', 'x');
			matchMakeMonic('x-y', 'x-y');

			matchMakeMonic('-1', '1');
			matchMakeMonic('-x', 'x');
			matchMakeMonic('-x-y', 'x+y');
			matchMakeMonic('-x^2*z+y', 'x^2*z-y');
		});

		// Z2-Ring
		System.ring = new IntegerRingModulo2();

		test('term toStr in Z2', () => {

			var matchToStr = (a: string, b: string) => match(TPrinter.run(TParser.parse(a, field), field), b);

			matchToStr('1', '1');
			matchToStr('x', 'x');
			matchToStr('x*y', 'x*y');
			matchToStr('x^2', 'x');
			matchToStr('x^3', 'x');
			matchToStr('x^4', 'x');
			matchToStr('x^2*y', 'x*y');

			matchToStr('3*x^2*y^3', 'x*y');

			matchToStr('-1', '1');
			matchToStr('-x*y', 'x*y');
			matchToStr('-x^2*y', 'x*y');
			matchToStr('-3*x^2*y', 'x*y');
		});

		test('polynomial multiply in Z2', () => {
			
			var matchMultiply = (a: string, b: string, c: string) => matchPolynomial(PParser.parse(a, field).multiply(PParser.parse(b, field)), PParser.parse(c, field));

			matchMultiply('x_6', '1', 'x_6');

			matchMultiply('x_6', 'x_6', 'x_6');

			matchMultiply('x_6', 'x_5+x_6*x_7', 'x_5*x_6+x_6*x_7');

			matchMultiply('x_6', 'x_5+x_6*x_7+x_6', 'x_5*x_6+x_6*x_7+x_6');

			matchMultiply('x_6', 'x_5+x_6*x_7+x_6+x_7', 'x_5*x_6+x_6*x_7+x_6+x_7*x_6');


			matchTerm(PParser.parse('x_6+x_6+x_6', field).terms[0], TParser.parse('x_6', field));

			matchPolynomial(PParser.parse('x_6+x_6', field), PParser.parse('', field));

			matchMultiply('x_6', 'x_5+x_6*x_7+x_6+x_7+1', 'x_5*x_6+x_6*x_7+x_6+x_7*x_6+x_6');
		});
	});
}