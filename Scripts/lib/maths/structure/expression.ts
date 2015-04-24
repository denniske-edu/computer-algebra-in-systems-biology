
module Maths {
    
    /**
     * Usually root node of parsed maths expression.
     */
    export class Expression extends Block {

		child: any;

		constructor(child: any) {
			super();
			this.child = child;
	    }
    }
}
