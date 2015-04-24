
module Bool {
	
	var parser = (function() {
		/*
	 * Generated by PEG.js 0.8.0.
	 *
	 * http://pegjs.majda.cz/
	 */

		function peg$subclass(child, parent) {
			function ctor() { this.constructor = child; }
			ctor.prototype = parent.prototype;
			child.prototype = new ctor();
		}

		function SyntaxError(message, expected, found, offset, line, column) {
			this.message = message;
			this.expected = expected;
			this.found = found;
			this.offset = offset;
			this.line = line;
			this.column = column;

			this.name = "SyntaxError";
		}

		peg$subclass(SyntaxError, Error);

		function parse(input) {
			var options = arguments.length > 1 ? arguments[1] : {},

				peg$FAILED = {},

				peg$startRuleFunctions = { start: peg$parsestart },
				peg$startRuleFunction = peg$parsestart,

				peg$c0 = peg$FAILED,
				peg$c1 = "|",
				peg$c2 = { type: "literal", value: "|", description: "\"|\"" },
				peg$c3 = function (left, right) { return new Or(left, right); },
				peg$c4 = "&",
				peg$c5 = { type: "literal", value: "&", description: "\"&\"" },
				peg$c6 = function (left, right) { return new And(left, right); },
				peg$c7 = "!",
				peg$c8 = { type: "literal", value: "!", description: "\"!\"" },
				peg$c9 = function (child) { return new Not(child); },
				peg$c10 = "(",
				peg$c11 = { type: "literal", value: "(", description: "\"(\"" },
				peg$c12 = ")",
				peg$c13 = { type: "literal", value: ")", description: "\")\"" },
				peg$c14 = function (some) { return some; },
				peg$c15 = /^[01]/,
				peg$c16 = { type: "class", value: "[01]", description: "[01]" },
				peg$c17 = function (val) { return val == "1"; },
				peg$c18 = [],
				peg$c19 = /^[a-zA-Z_]/,
				peg$c20 = { type: "class", value: "[a-zA-Z_]", description: "[a-zA-Z_]" },
				peg$c21 = function (letters) { return letters.join(''); },

				peg$currPos = 0,
				peg$reportedPos = 0,
				peg$cachedPos = 0,
				peg$cachedPosDetails = { line: 1, column: 1, seenCR: false },
				peg$maxFailPos = 0,
				peg$maxFailExpected = [],
				peg$silentFails = 0,

				peg$result;

			if ("startRule" in options) {
				if (!(options.startRule in peg$startRuleFunctions)) {
					throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
				}

				peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
			}

			function text() {
				return input.substring(peg$reportedPos, peg$currPos);
			}

			function offset() {
				return peg$reportedPos;
			}

			function line() {
				return peg$computePosDetails(peg$reportedPos).line;
			}

			function column() {
				return peg$computePosDetails(peg$reportedPos).column;
			}

			function expected(description) {
				throw peg$buildException(
					null,
					[{ type: "other", description: description }],
					peg$reportedPos
					);
			}

			function error(message) {
				throw peg$buildException(message, null, peg$reportedPos);
			}

			function peg$computePosDetails(pos) {
				function advance(details, startPos, endPos) {
					var p, ch;

					for (p = startPos; p < endPos; p++) {
						ch = input.charAt(p);
						if (ch === "\n") {
							if (!details.seenCR) { details.line++; }
							details.column = 1;
							details.seenCR = false;
						} else if (ch === "\r" || ch === "\u2028" || ch === "\u2029") {
							details.line++;
							details.column = 1;
							details.seenCR = true;
						} else {
							details.column++;
							details.seenCR = false;
						}
					}
				}

				if (peg$cachedPos !== pos) {
					if (peg$cachedPos > pos) {
						peg$cachedPos = 0;
						peg$cachedPosDetails = { line: 1, column: 1, seenCR: false };
					}
					advance(peg$cachedPosDetails, peg$cachedPos, pos);
					peg$cachedPos = pos;
				}

				return peg$cachedPosDetails;
			}

			function peg$fail(expected) {
				if (peg$currPos < peg$maxFailPos) { return; }

				if (peg$currPos > peg$maxFailPos) {
					peg$maxFailPos = peg$currPos;
					peg$maxFailExpected = [];
				}

				peg$maxFailExpected.push(expected);
			}

			function peg$buildException(message, expected, pos) {
				function cleanupExpected(expected) {
					var i = 1;

					expected.sort(function (a, b) {
						if (a.description < b.description) {
							return -1;
						} else if (a.description > b.description) {
							return 1;
						} else {
							return 0;
						}
					});

					while (i < expected.length) {
						if (expected[i - 1] === expected[i]) {
							expected.splice(i, 1);
						} else {
							i++;
						}
					}
				}

				function buildMessage(expected, found) {
					function stringEscape(s) {
						function hex(ch) { return ch.charCodeAt(0).toString(16).toUpperCase(); }

						return s
							.replace(/\\/g, '\\\\')
							.replace(/"/g, '\\"')
							.replace(/\x08/g, '\\b')
							.replace(/\t/g, '\\t')
							.replace(/\n/g, '\\n')
							.replace(/\f/g, '\\f')
							.replace(/\r/g, '\\r')
							.replace(/[\x00-\x07\x0B\x0E\x0F]/g, function (ch) { return '\\x0' + hex(ch); })
							.replace(/[\x10-\x1F\x80-\xFF]/g, function (ch) { return '\\x' + hex(ch); })
							.replace(/[\u0180-\u0FFF]/g, function (ch) { return '\\u0' + hex(ch); })
							.replace(/[\u1080-\uFFFF]/g, function (ch) { return '\\u' + hex(ch); });
					}

					var expectedDescs = new Array(expected.length),
						expectedDesc, foundDesc, i;

					for (i = 0; i < expected.length; i++) {
						expectedDescs[i] = expected[i].description;
					}

					expectedDesc = expected.length > 1
					? expectedDescs.slice(0, -1).join(", ")
					+ " or "
					+ expectedDescs[expected.length - 1]
					: expectedDescs[0];

					if (found)
						foundDesc = "\"" + stringEscape(found) + "\"";
					else
						foundDesc = "end of input";

					return "Expected " + expectedDesc + " but " + foundDesc + " found.";
				}

				var posDetails = peg$computePosDetails(pos),
					found = pos < input.length ? input.charAt(pos) : null;

				if (expected !== null) {
					cleanupExpected(expected);
				}

				return new SyntaxError(
					message !== null ? message : buildMessage(expected, found),
					expected,
					found,
					pos,
					posDetails.line,
					posDetails.column
					);
			}

			function peg$parsestart() {
				var s0;

				s0 = peg$parseand();

				return s0;
			}

			function peg$parseand() {
				var s0, s1, s2, s3;

				s0 = peg$currPos;
				s1 = peg$parseor();
				if (s1 !== peg$FAILED) {
					if (input.charCodeAt(peg$currPos) === 124) {
						s2 = peg$c1;
						peg$currPos++;
					} else {
						s2 = peg$FAILED;
						if (peg$silentFails === 0) { peg$fail(peg$c2); }
					}
					if (s2 !== peg$FAILED) {
						s3 = peg$parseand();
						if (s3 !== peg$FAILED) {
							peg$reportedPos = s0;
							s1 = peg$c3(s1, s3);
							s0 = s1;
						} else {
							peg$currPos = s0;
							s0 = peg$c0;
						}
					} else {
						peg$currPos = s0;
						s0 = peg$c0;
					}
				} else {
					peg$currPos = s0;
					s0 = peg$c0;
				}
				if (s0 === peg$FAILED) {
					s0 = peg$parseor();
				}

				return s0;
			}

			function peg$parseor() {
				var s0, s1, s2, s3;

				s0 = peg$currPos;
				s1 = peg$parsenot();
				if (s1 !== peg$FAILED) {
					if (input.charCodeAt(peg$currPos) === 38) {
						s2 = peg$c4;
						peg$currPos++;
					} else {
						s2 = peg$FAILED;
						if (peg$silentFails === 0) { peg$fail(peg$c5); }
					}
					if (s2 !== peg$FAILED) {
						s3 = peg$parseor();
						if (s3 !== peg$FAILED) {
							peg$reportedPos = s0;
							s1 = peg$c6(s1, s3);
							s0 = s1;
						} else {
							peg$currPos = s0;
							s0 = peg$c0;
						}
					} else {
						peg$currPos = s0;
						s0 = peg$c0;
					}
				} else {
					peg$currPos = s0;
					s0 = peg$c0;
				}
				if (s0 === peg$FAILED) {
					s0 = peg$parsenot();
				}

				return s0;
			}

			function peg$parsenot() {
				var s0, s1, s2;

				s0 = peg$currPos;
				if (input.charCodeAt(peg$currPos) === 33) {
					s1 = peg$c7;
					peg$currPos++;
				} else {
					s1 = peg$FAILED;
					if (peg$silentFails === 0) { peg$fail(peg$c8); }
				}
				if (s1 !== peg$FAILED) {
					s2 = peg$parseprimary();
					if (s2 !== peg$FAILED) {
						peg$reportedPos = s0;
						s1 = peg$c9(s2);
						s0 = s1;
					} else {
						peg$currPos = s0;
						s0 = peg$c0;
					}
				} else {
					peg$currPos = s0;
					s0 = peg$c0;
				}
				if (s0 === peg$FAILED) {
					s0 = peg$parseprimary();
				}

				return s0;
			}

			function peg$parseprimary() {
				var s0, s1, s2, s3;

				s0 = peg$parseval();
				if (s0 === peg$FAILED) {
					s0 = peg$currPos;
					if (input.charCodeAt(peg$currPos) === 40) {
						s1 = peg$c10;
						peg$currPos++;
					} else {
						s1 = peg$FAILED;
						if (peg$silentFails === 0) { peg$fail(peg$c11); }
					}
					if (s1 !== peg$FAILED) {
						s2 = peg$parseand();
						if (s2 !== peg$FAILED) {
							if (input.charCodeAt(peg$currPos) === 41) {
								s3 = peg$c12;
								peg$currPos++;
							} else {
								s3 = peg$FAILED;
								if (peg$silentFails === 0) { peg$fail(peg$c13); }
							}
							if (s3 !== peg$FAILED) {
								peg$reportedPos = s0;
								s1 = peg$c14(s2);
								s0 = s1;
							} else {
								peg$currPos = s0;
								s0 = peg$c0;
							}
						} else {
							peg$currPos = s0;
							s0 = peg$c0;
						}
					} else {
						peg$currPos = s0;
						s0 = peg$c0;
					}
				}

				return s0;
			}

			function peg$parseval() {
				var s0, s1, s2;

				s0 = peg$currPos;
				if (peg$c15.test(input.charAt(peg$currPos))) {
					s1 = input.charAt(peg$currPos);
					peg$currPos++;
				} else {
					s1 = peg$FAILED;
					if (peg$silentFails === 0) { peg$fail(peg$c16); }
				}
				if (s1 !== peg$FAILED) {
					peg$reportedPos = s0;
					s1 = peg$c17(s1);
				}
				s0 = s1;
				if (s0 === peg$FAILED) {
					s0 = peg$currPos;
					s1 = [];
					if (peg$c19.test(input.charAt(peg$currPos))) {
						s2 = input.charAt(peg$currPos);
						peg$currPos++;
					} else {
						s2 = peg$FAILED;
						if (peg$silentFails === 0) { peg$fail(peg$c20); }
					}
					if (s2 !== peg$FAILED) {
						while (s2 !== peg$FAILED) {
							s1.push(s2);
							if (peg$c19.test(input.charAt(peg$currPos))) {
								s2 = input.charAt(peg$currPos);
								peg$currPos++;
							} else {
								s2 = peg$FAILED;
								if (peg$silentFails === 0) { peg$fail(peg$c20); }
							}
						}
					} else {
						s1 = peg$c0;
					}
					if (s1 !== peg$FAILED) {
						peg$reportedPos = s0;
						s1 = peg$c21(s1);
					}
					s0 = s1;
				}

				return s0;
			}

			//var Bool = {};

			//var And = (function () {
			//  function And(left, right) { this._ = "And"; this.left = left; this.right = right; }
			//  return And;
			//})();


			//var Or = (function () {
			//  function Or(left, right) { this._ = "Or"; this.left = left; this.right = right; }
			//  return Or;
			//})();

			//var Not = (function () {
			//  function Not(child) { this._ = "Not"; this.child = child; }
			//  return Not;
			//})();

			//var Expression = (function () {
			//  function Expression(child) { this._ = "Expression"; this.child = child; }
			//  return Expression;
			//})();

			//Bool.And = And;
			//Bool.Or = Or;
			//Bool.Not = Not;
			//Bool.Expression = Expression;


			peg$result = peg$startRuleFunction();

			if (peg$result !== peg$FAILED && peg$currPos === input.length) {
				return peg$result;
			} else {
				if (peg$result !== peg$FAILED && peg$currPos < input.length) {
					peg$fail({ type: "end", description: "end of input" });
				}

				throw peg$buildException(null, peg$maxFailExpected, peg$maxFailPos);
			}
		}

		return {
			SyntaxError: SyntaxError,
			parse: parse
		};
	})();
	
    /**
     * Parses a bool expression from string into structure
     */
	export class Parser {

		static parse(input) {
			return parser.parse(input.replace(/\s/g, ''));
		}
	}
}