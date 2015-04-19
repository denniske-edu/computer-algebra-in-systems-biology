
module Bool {
    
    /**
     * Usually root node of parsed bool expression.
     */
    export class Expression extends Block {

		child: any;

		constructor(child: any) {
			super();
			this.child = child;
	    }
    }
}
