var Test;
(function (Test) {
    var IntegerModRing = Polynomials.IntegerModRing;
    Test.group('rings', function () {
        Test.test('IntegerModRing', function () {
            var ring = new IntegerModRing(24);
            Test.match(ring.add(12, 21), 9);
            ring = new IntegerModRing(2);
            Test.match(ring.val(0), 0);
            Test.match(ring.val(1), 1);
            Test.match(ring.val(2), 0);
            Test.match(ring.val(-0), 0);
            Test.match(ring.val(-1), 1);
            Test.match(ring.val(-2), 0);
            Test.match(ring.add(0, 0), 0);
            Test.match(ring.add(0, 1), 1);
            Test.match(ring.add(0, 2), 0);
            Test.match(ring.add(1, 0), 1);
            Test.match(ring.add(1, 1), 0);
            Test.match(ring.add(1, 2), 1);
            Test.match(ring.add(2, 0), 0);
            Test.match(ring.add(2, 1), 1);
            Test.match(ring.add(2, 2), 0);
        });
    });
})(Test || (Test = {}));
//# sourceMappingURL=rings.js.map