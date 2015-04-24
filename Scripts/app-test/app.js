var Test;
(function (Test) {
    var Printer = Maths.Printer;
    var Converter = App.Converter;
    var Parser = Bool.Parser;
    Test.group('converter', function () {
        function matchParse(input, output) {
            Test.match(Printer.run(Converter.run(Parser.parse(input))), output);
        }
        Test.test('converts bool expression to maths expression', function () {
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
})(Test || (Test = {}));
//# sourceMappingURL=app.js.map