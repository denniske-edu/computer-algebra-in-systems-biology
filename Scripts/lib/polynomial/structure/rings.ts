
module Polynomials {
    
    /**
     * Abstract base class of all rings.
     *
     * @abstract
     */
    export class Ring {

		add(a: number, b: number): number {
			return this.val(a + b);
		}

		subtract(a: number, b: number): number {
			return this.val(a - b);
		}

		multiply(a: number, b: number): number {
			return this.val(a * b);
		}

		divide(a: number, b: number): number {
			return this.val(a / b);
		}

		val(a: number): number { throw new Error(ABSTRACT) }

		power(a: number): number { throw new Error(ABSTRACT) }
    }

	export class IntegerRing extends Ring {
		
		val(a: number): number {
			return a;
		}

		power(a: number): number {
			return a;
		}
	}

	export class IntegerRingModulo2 extends Ring {

		constructor() {
			super();
		}

		val(a: number): number {
			return Math.abs(a % 2);
		}

		power(a: number): number {

			return a === 0 ? 0 : 1;
		}
	}
}
