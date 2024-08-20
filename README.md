# Basic Cypress and MatrixALM Integration

This covers basic Cypress and MatrixALM integration for verification testing. For more info, please refer to [Cypress.io](https://www.cypress.io/) and [MatrixALM](https://matrixreq.com/products/alm)

# Setup

-   Get the source with git clone
-   Install the required package using npm install
-   Create a `local-settings.json` to overwrite defaults (you can make a copy of `local-settings.json.template`)
-   Open `local-settings.json`

    -   Specify your instance as parameter `mxSpecToken`
    -   You can overwrite other settings as well

-   Open `cypress.config.ts`
    -   Replace `mxSpecsURL` parameter value with the value of your instance
    -   Replace `mxSpecProject` parameter value with the value of your project
    -   Replace `baseUrl` parameter value with your tested application url

# Test Scripts

-   Generate your test scripts using the Test Case Code Generator located in `helpers/sdk-tools`
