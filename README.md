# Basic Cypress and MatrixALM Integration

This covers basic Cypress and MatrixALM integration for verification testing. For more info, please refer to [Cypress.io](https://www.cypress.io/) and [MatrixALM](https://matrixreq.com/products/alm)

# Setup

-   Get the source with git clone
-   Install the required package using npm install
-   Create a `local-settings.json` to overwrite defaults (you can make a copy of `local-settings.json.template`)
-   Open `local-settings.json`
    -   Specify the URL of the instance to test in `e2e/baseUrl`
    -   Specify token for matrixspecs in `env/mxSpecToken`
    -   Specify token for testing instance in `env/cypressInstanceToken`
    -   You can overwrite other settings as well

# Test Scripts

-   Generate your test scripts using the Test Case Code Generator located in `helpers/sdk-tools`
