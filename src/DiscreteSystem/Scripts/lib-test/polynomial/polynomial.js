var Test;
(function (Test) {
    var Polynomial = Polynomials.Polynomial;
    var Term = Polynomials.Term;
    var Plex = Polynomials.Plex;
    var System = DiscreteSystem.System;
    var IntegerRing = Polynomials.IntegerRing;
    var PParser = Polynomials.PolynomialParser;
    var TParser = Polynomials.TermParser;
    var TPrinter = Polynomials.TermPrinter;
    var PPrinter = Polynomials.PolynomialPrinter;
    var IntegerRingModulo2 = Polynomials.IntegerRingModulo2;
    Test.group('parser', function () {
        // Integer-Ring
        System.ring = new IntegerRing();
        var field = ['x', 'y', 'z', 'x_1', 'x_2', 'x_3', 'x_4', 'x_5', 'x_6', 'x_7', 'x_8', 'x_9'];
        function matchTerm(a, b) {
            Test.match(a.equals(b), true);
        }
        function matchPolynomial(a, b) {
            a.order(new Plex());
            b.order(new Plex());
            var aStr = PPrinter.run(a, field);
            var bStr = PPrinter.run(b, field);
            Test.match(a.equals(b), true);
        }
        Test.test('term parse', function () {
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
        Test.test('term toStr', function () {
            var matchToStr = function (a) { return Test.match(TPrinter.run(TParser.parse(a, field), field), a); };
            matchToStr('1');
            matchToStr('x*y');
            matchToStr('x^2*y');
            matchToStr('3*x^2*y');
            matchToStr('-1');
            matchToStr('-x*y');
            matchToStr('-x^2*y');
            matchToStr('-3*x^2*y');
        });
        Test.test('term divisible', function () {
            var f = ['x', 'y'];
            Test.assertIsTrue(TParser.parse('x^2*y', f).divisibleBy(TParser.parse('x*y', f)));
            Test.assertIsTrue(TParser.parse('x^2*y^2', f).divisibleBy(TParser.parse('x^2*y^2', f)));
            Test.assertIsFalse(TParser.parse('x*y', f).divisibleBy(TParser.parse('x^2*y', f)));
        });
        Test.test('term equals', function () {
            matchTerm(new Term(1, [2, 1]), new Term(1, [2, 1]));
            matchTerm(new Term(1, [1, 1]), new Term(1, [1, 1]));
            matchTerm(new Term(4, [2, 2]), new Term(4, [2, 2]));
        });
        Test.test('term divide', function () {
            var f = ['x', 'y'];
            matchTerm(TParser.parse('x^2*y', f).divide(TParser.parse('x*y', f)), TParser.parse('x', f));
            matchTerm(TParser.parse('4*x^2*y^2', f).divide(TParser.parse('2*x^2*y^2', f)), TParser.parse('2', f));
        });
        Test.test('polynomial parse', function () {
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
        Test.test('polynomial toStr', function () {
            var matchToStr = function (a) { return Test.match(PPrinter.run(PParser.parse(a, field), field), a); };
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
        Test.test('term add', function () {
            var matchAdd = function (a, b, c) { return matchPolynomial(PParser.parse(a, field).add(PParser.parse(b, field)), PParser.parse(c, field)); };
            matchAdd('1', '1', '2');
            matchAdd('x', 'y', 'x+y');
            matchAdd('x+1', 'x+1', '2*x+2');
            matchAdd('x^2*y', '3*x+y', 'x^2*y+3*x+y');
            matchAdd('2*x^2*y+3*y', 'x^2*y+2*y', '3*x^2*y+5*y');
        });
        Test.test('term subtract', function () {
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
        Test.test('term multiply', function () {
            var f = ['x', 'y'];
            matchPolynomial(PParser.parse('1', f).multiply(PParser.parse('5', f)), PParser.parse('5', f));
            matchPolynomial(PParser.parse('x', f).multiply(PParser.parse('y', f)), PParser.parse('x*y', f));
            matchPolynomial(PParser.parse('x+1', f).multiply(PParser.parse('x+1', f)), PParser.parse('x^2+2*x+1', f));
            matchPolynomial(PParser.parse('x^2*y', f).multiply(PParser.parse('3*x+y', f)), PParser.parse('3*x^3*y+x^2*y^2', f));
            matchPolynomial(PParser.parse('x-y', f).multiply(PParser.parse('x^2*y+2', f)), PParser.parse('x^3*y-x^2*y^2+2*x-2*y', f));
        });
        Test.test('makeMonic', function () {
            var matchMakeMonic = function (aStr, bStr) {
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
        Test.test('term toStr in Z2', function () {
            var matchToStr = function (a, b) { return Test.match(TPrinter.run(TParser.parse(a, field), field), b); };
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
        Test.test('polynomial multiply in Z2', function () {
            var matchMultiply = function (a, b, c) { return matchPolynomial(PParser.parse(a, field).multiply(PParser.parse(b, field)), PParser.parse(c, field)); };
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
})(Test || (Test = {}));
//# sourceMappingURL=polynomial.js.map