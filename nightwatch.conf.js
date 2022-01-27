if (
	process.env.BROWSERSTACK_USERNAME !== undefined &&
	process.env.BROWSERSTACK_USER === undefined
) {
	process.env.BROWSERSTACK_USER = process.env.BROWSERSTACK_USERNAME;
}
if (
	process.env.BROWSERSTACK_ACCESS_KEY !== undefined &&
	process.env.BROWSERSTACK_KEY === undefined
) {
	process.env.BROWSERSTACK_KEY = process.env.BROWSERSTACK_ACCESS_KEY;
}

module.exports = {
	src_folders: ["tests"],
	custom_assertions_path: ["assertion"],

	test_settings: {
		default: {
			selenium: {
				// setting the host name
				start_process: false,
				host: "hub-cloud.browserstack.com",
				port: 443,
			},
			// More info on configuring capabilities can be found on:
			// https://www.browserstack.com/automate/capabilities?tag=selenium-4
			desiredCapabilities: {
				browserName: "Chrome",
				browserVersion: "latest",
				project: "BrowserStack NightWatch GTM",
				build: "1.0",
			},
		},
	},
};
