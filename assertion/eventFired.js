const deepEquals = (a, b) => {
	if (Object.keys(a).length < Object.keys(b).length) return false;

	for (let key in b) {
		if (
			a[key] instanceof Object &&
			b[key] instanceof Object &&
			!Array.isArray(a[key]) &&
			!Array.isArray(b[key])
		) {
			return deepEquals(a[key], b[key]);
		} else if (Array.isArray(a[key]) && Array.isArray(b[key])) {
			const arr1 = a[key];
			const arr2 = b[key];
			if (arr1.join("") === arr2.join("")) {
				continue;
			}
		}
		if (a[key] !== b[key]) {
			return false;
		}
		if (key !== key) {
			return false;
		}
	}
	return true;
};

exports.assertion = function (expectedObject, msg) {
	// If the custom commands operates with DOM elements, this options should be set
	this.options = {
		elementSelector: true,
	};

	/**
	 * Returns the message format which will be used to output the message in the console and also
	 *  the arguments which will be used for replace the place holders, used in the order of appearance
	 *
	 * The message format also takes into account whether the .not negate has been used
	 *
	 * @return {{args: [], message: string}}
	 */
	this.formatMessage = function () {
		// Use this.negate to determine if ".not" is in use
		// Example:
		const message = `Testing if the event ${
			this.negate ? "'%s' did not fire" : "'%s' did fire"
		}`;

		return {
			message,
			args: [JSON.stringify(expectedObject)],
		};
	};

	/**
	 * Returns the expected value of the assertion which is displayed in the case of a failure
	 *
	 * @return {string}
	 */
	this.expected = function () {
		return this.negate
			? `event not fired '${JSON.stringify(expectedObject)}'`
			: `event fired '${JSON.stringify(expectedObject)}'`;
	};

	/**
	 * Given the value, the condition used to evaluate if the assertion is passed
	 * @param {*} value
	 * @return {Boolean}
	 */
	this.evaluate = function (eventsArray) {
		if (typeof eventsArray !== "object" || !Array.isArray(eventsArray)) {
			return false;
		}

		return (
			eventsArray.findIndex((event) =>
				deepEquals(event, expectedObject)
			) !== -1
		);
	};

	/**
	 * Called with the result object of the command to retrieve the value which is to be evaluated
	 *
	 * @param {Object} result
	 * @return {*}
	 */
	this.value = function (result) {
		return result.value;
	};

	/**
	 * When defined, this method is called by the assertion runner with the command result, to determine if the
	 *  value can be retrieved successfully from the result object
	 *
	 * @param result
	 * @return {boolean|*}
	 */
	this.failure = function (result) {
		return result === false || (result && result.status === -1);
	};

	/**
	 * When defined, this method is called by the assertion runner with the command result to determine the actual
	 *  state of the assertion in the event of a failure
	 *
	 * @param {Boolean} passed
	 * @return {string}
	 */
	this.actual = function (passed) {
		return passed
			? `event fired '${JSON.stringify(expectedObject)}'`
			: `event not fired '${JSON.stringify(expectedObject)}'`;
	};

	/**
	 * The command which is to be executed by the assertion runner; Nightwatch api is available as this.api
	 * @param {function} callback
	 */
	this.command = function (callback) {
		this.api.execute("return (window.dataLayer)", (result) => {
			return callback.call(this, result);
		});
	};
};
