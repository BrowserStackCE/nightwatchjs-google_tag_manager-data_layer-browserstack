# nightwatchjs-google_tag_manager-data_layer-browserstack

An example repository to highlight how NightWatchJS can be used to test Google Tag Manager's Data Layer on BrowserStack Infrastructure

## Setup

Please make sure you have the following:

1. NodeJS and yarn
2. An Account on BrowserStack to use Automate
3. Username and access key as environment variables:
    ```sh
    export BROWSERSTACK_USERNAME=<username> && export BROWSERSTACK_ACCESSK_KEY=<access-key>
    ```

## Testing Events captures by Google Tab Manager's Data Layer

Google Tag Manager (GTM) is a website site tag management tool used widely for analystics. One of the useful tools that GTM provides is data layer which captures user interactions and then pushes these updates to the cloud for analytics. A data layer is a JavaScript object that is used to pass information from your website to your Tag Manager container. You can then use that information to populate variables and activate triggers

So when a user interacts with your website, it captures those events inside the `dataLayer` array. Hence we tagrget this array to determine if a user has performed some actions or not.

This repository defines a customer assertion `eventFired.js` (inside the assertion folder) which is repobsible to fetch the dataLayer object injected in the browser. Once fetched we use that array to test if a particular event was fired or not.

## Test

To trigger a sample test, run the following command:

```sh
npx nightwatch tests/index.js
```
