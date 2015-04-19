
module Polynomials {
    
    /**
     * Parses a polynomial expression from string into structure
     */
	export class PolynomialParser {

		static parse(str: string, field: string[]): Polynomial {

			str = str.replace(/\s/g, '');

			var terms = str.replace(/-/g, '+-').split('+');

			var polynomial = new Polynomial();

			for (var i = 0; i < terms.length; i++) {
				if (terms[i].length > 0) {
					polynomial.addTerm(TermParser.parse(terms[i], field));
				}
			}

			return polynomial;
		}
    }
}
