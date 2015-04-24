
module Test {

	import IntegerModRing = Polynomials.IntegerModRing;

	group('rings', () => {

		test('IntegerModRing', () => {

			var ring = new IntegerModRing(24);

			match(ring.add(12, 21), 9);
			
			ring = new IntegerModRing(2);

			match(ring.val(0), 0);
			match(ring.val(1), 1);
			match(ring.val(2), 0);

			match(ring.val(-0), 0);
			match(ring.val(-1), 1);
			match(ring.val(-2), 0);

			match(ring.add(0, 0), 0);
			match(ring.add(0, 1), 1);
			match(ring.add(0, 2), 0);
			match(ring.add(1, 0), 1);
			match(ring.add(1, 1), 0);
			match(ring.add(1, 2), 1);
			match(ring.add(2, 0), 0);
			match(ring.add(2, 1), 1);
			match(ring.add(2, 2), 0);
		});
	});
}