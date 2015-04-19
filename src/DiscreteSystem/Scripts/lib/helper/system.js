var DiscreteSystem;
(function (DiscreteSystem) {
    var IntegerRing = Polynomials.IntegerRing;
    var System = (function () {
        function System() {
        }
        System.ring = new IntegerRing();
        return System;
    })();
    DiscreteSystem.System = System;
})(DiscreteSystem || (DiscreteSystem = {}));
//# sourceMappingURL=system.js.map