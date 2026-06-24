describe("GTM - Data Layer - BrowserStack - Nightwatchjs - Chrome", () => {
	test("goto bstack", (browser) => {
		browser
			.maximizeWindow()
			.url("https://browserstack.com")
			.assert.eventFired({
				// this object has to be a subset of the event object that gets added to the dataLayer array when the respective event happens
				event: "gtm.dom",
			})
			.assert.eventFired({
				event: "gtm.load",
			})
			.click("#accept-cookie-notification")
			.assert.eventFired({
				event: "gtm.click",
				"gtm.elementId": "accept-cookie-notification",
			})
			.click("h2.integration-section__title")
			.assert.eventFired({
				event: "gtm.click",
				"gtm.elementClasses": "integration-section__title",
			})
			.end();
	});
});
