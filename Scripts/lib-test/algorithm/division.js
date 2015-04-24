var Test;
(function (Test) {
    var Plex = Polynomials.Plex;
    var DivisionAlgorithm = DiscreteSystem.DivisionAlgorithm;
    var System = DiscreteSystem.System;
    var IntegerRing = Polynomials.IntegerRing;
    var PParser = Polynomials.PolynomialParser;
    var PPrinter = Polynomials.PolynomialPrinter;
    Test.group('division', function () {
        // Integer-Ring
        System.ring = new IntegerRing();
        var field = ['x', 'y', 'z', 'x_1', 'x_2', 'x_3', 'x_4', 'x_5', 'x_6', 'x_7', 'x_8', 'x_9'];
        function matchPolynomial(a, b) {
            a.order(new Plex());
            b.order(new Plex());
            var aStr = PPrinter.run(a, field);
            var bStr = PPrinter.run(b, field);
            Test.match(a.equals(b), true);
        }
        Test.test('DivisionAlgorithm', function () {
            var matchDivision = function (fStr, fsStr, r) {
                if (r === void 0) { r = ''; }
                var f = PParser.parse(fStr, field);
                var fs = _.map(fsStr, function (e) { return PParser.parse(e, field); });
                var result = DivisionAlgorithm.run(f, fs, new Plex());
                matchPolynomial(result.r, PParser.parse(r, field));
            };
            matchDivision('', ['']);
            matchDivision('1', ['1']);
            matchDivision('x^2+2*x+1', ['x+1']);
            matchDivision('x*y^2-x', ['y^2-1', 'x*y+1']);
            matchDivision('x*y^2-x', ['x*y+1', 'y^2-1'], '-x-y');
            matchDivision('x^2*y-x*z', ['x*y-z', 'x+1']);
            matchDivision('x^2*y-x*z', ['x+1', 'x*y-z'], 'y+z');
            matchDivision('x^2*z^2-y^2*z', ['y^2+z^2', 'x^2*y+y*z'], 'x^2*z^2+z^3');
            var f = PParser.parse('x^2+2*x+1', field);
            var fs = [PParser.parse('x+1', field)];
            var result = DivisionAlgorithm.run(f, fs, new Plex());
            matchPolynomial(result.r, PParser.parse('', field));
            matchPolynomial(result.hs[0], PParser.parse('x+1', field));
        });
    });
})(Test || (Test = {}));
//# sourceMappingURL=division.js.map