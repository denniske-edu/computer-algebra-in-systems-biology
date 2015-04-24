
module Polynomials {

	import Helper = DiscreteSystem.Helper;
	
	/**
     * Class representing a polynomial
     */
    export class Polynomial {

		public terms: Term[];

		constructor(terms: Term[] = []) {
			this.terms = terms;
		}
		
		getLeadingTerm(order: TermOrder) {
			this.order(order);
			return this.terms[0];
		}

		order(order: TermOrder) {
			this.terms.sort((a, b) => order.compare(a.monomial, b.monomial));
		}

	    addTerm(term: Term) {

			var matchingTerm = _.find(this.terms, t => Helper.arraysEqual(t.monomial, term.monomial));

			var newTerm: Term;

			if (matchingTerm != null) {
				this.terms = _.without(this.terms, matchingTerm);
			    newTerm = matchingTerm.add(term);
			} else {
			    newTerm = term.clone();
		    }

		    if (newTerm.coefficient !== 0) {
				this.terms.push(newTerm);
			}
		}

		private subtractTerm(term: Term) {

			this.addTerm(new Term(-term.coefficient, term.monomial.slice(0)));
		}

		add(other: Polynomial): Polynomial {
			
			var polynomial = new Polynomial();

			for (var i = 0; i < this.terms.length; i++) {
				polynomial.addTerm(this.terms[i]);
			}

			for (var j = 0; j < other.terms.length; j++) {
				polynomial.addTerm(other.terms[j]);
			}

			return polynomial;
		}

		subtract(other: Polynomial): Polynomial {

			var polynomial = new Polynomial();

			for (var i = 0; i < this.terms.length; i++) {
				polynomial.addTerm(this.terms[i]);
			}

			for (var j = 0; j < other.terms.length; j++) {
				polynomial.subtractTerm(other.terms[j]);
			}

			return polynomial;

		}

		multiply(other: Polynomial) : Polynomial {
		    
			var polynomial = new Polynomial();

		    for (var i = 0; i < this.terms.length; i++) {
				for (var j = 0; j < other.terms.length; j++) {
					polynomial.addTerm(this.terms[i].multiply(other.terms[j]));
				}
		    }
			
		    return polynomial;
		}

		equals(other: Polynomial): boolean {

			this.order(new Plex());
			other.order(new Plex());

			if (this.terms.length !== other.terms.length)
				return false;

			for (var i = 0; i < this.terms.length; i++) {
				if (!this.terms[i].equals(other.terms[i])) {
					return false;
				}
			}

			return true;
		}
		
		makeMonic(order: TermOrder): Polynomial {

			var polynomial = new Polynomial();

			var lt = this.getLeadingTerm(order);

			var monomial = new Array(lt.monomial.length);
			for (var j = 0; j < monomial.length; j++) {
				monomial[j] = 0;
			}

			for (var i = 0; i < this.terms.length; i++) {
				polynomial.addTerm(this.terms[i].divide(new Term(1 / lt.coefficient, monomial)));
			}

			return polynomial;
	    }

	    clone():Polynomial {
		    return this.add(new Polynomial());
	    }
    }
}
