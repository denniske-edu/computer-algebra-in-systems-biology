
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

	export class IntegerModRing extends Ring {
		private n;

		constructor(n: number) {
			super();
			this.n = n;
		}

		val(a: number): number {
			return Math.abs(a % this.n);
		}

		power(a: number): number {

			// Only implemented for n = 2
			// Otherwise need to check here: http://de.wikipedia.org/wiki/Eulersche_Phi-Funktion
			if (this.n !== 2)
				throw new Error('Not implemented for n != 2.');

			if (a === 0)
				return 0;

			return 1;
		}
	}
}
