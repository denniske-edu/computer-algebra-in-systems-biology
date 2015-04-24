var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Polynomials;
(function (Polynomials) {
    /**
     * Abstract base class of all rings.
     *
     * @abstract
     */
    var Ring = (function () {
        function Ring() {
        }
        Ring.prototype.add = function (a, b) {
            return this.val(a + b);
        };
        Ring.prototype.subtract = function (a, b) {
            return this.val(a - b);
        };
        Ring.prototype.multiply = function (a, b) {
            return this.val(a * b);
        };
        Ring.prototype.divide = function (a, b) {
            return this.val(a / b);
        };
        Ring.prototype.val = function (a) {
            throw new Error(Polynomials.ABSTRACT);
        };
        Ring.prototype.power = function (a) {
            throw new Error(Polynomials.ABSTRACT);
        };
        return Ring;
    })();
    Polynomials.Ring = Ring;
    var IntegerRing = (function (_super) {
        __extends(IntegerRing, _super);
        function IntegerRing() {
            _super.apply(this, arguments);
        }
        IntegerRing.prototype.val = function (a) {
            return a;
        };
        IntegerRing.prototype.power = function (a) {
            return a;
        };
        return IntegerRing;
    })(Ring);
    Polynomials.IntegerRing = IntegerRing;
    var IntegerModRing = (function (_super) {
        __extends(IntegerModRing, _super);
        function IntegerModRing(n) {
            _super.call(this);
            this.n = n;
        }
        IntegerModRing.prototype.val = function (a) {
            return Math.abs(a % this.n);
        };
        IntegerModRing.prototype.power = function (a) {
            // Only implemented for n = 2
            // Otherwise need to check here: http://de.wikipedia.org/wiki/Eulersche_Phi-Funktion
            if (this.n !== 2)
                throw new Error('Not implemented for n != 2.');
            if (a === 0)
                return 0;
            return 1;
        };
        return IntegerModRing;
    })(Ring);
    Polynomials.IntegerModRing = IntegerModRing;
})(Polynomials || (Polynomials = {}));
//# sourceMappingURL=rings.js.map