# Prerequisites

-   **Cypress** : Go to https://www.cypress.io/ and follow the instructions
-   **Node** Go to https://nodejs.org/en and follow the instructions
-   **Matrix Requirements SDK** To learn more about Matrix Requirements SDK, please refer to: https://matrixrequirements.github.io/matrix-sdk-docs/

# Prepare packages

## Install

-   Install Cypress and Node
-   Install all node packages located in `/basic-matrix-cypress-integration`
-   Install all node packages located in `/sdk-tools`

## Add Credentials

-   Edit `/basic-matrix-cypress-integration/credentials`:
    {
    "{instance url key}": {
    "token": "Token api_xxx",
    "url": "https://{instance-url}.matrixreq.com"
    }
    }
    -   It is not necessary, but highly recommended to use the same key as with your instance
    -   Generate authentication token for your instance, for more info, please refer to: https://docs24.matrixreq.com/usv24/tokens
    -   Fill url parameter with your instance key

## Test Configuration in Matrix Requirements

-   In Matrix Requirements admin make sure that projects test configuration contains the following:
    -   UID (uid:Row id (create a persistent id for each row))
    -   Action (action:Rich text)
    -   Expected Result (expected:Rich text)
    -   For more information about test configuration, refer to: https://docs24.matrixreq.com/usv24/test-configuration

## Run test case generator

-   To use Cypress and Matrix Requirements together, we need to generate usable test scripts. All of the supporting files are located in `/basic-matrix-cypress-integration/support/`. `commands.js` contains essential and other useful commands, but feel free to add more commands if necessary.
-   To run test script generator:

    -   Make sure to run it from ../sdk-tools folder
    -   Execute:

        -   `node testCodeGenerator.js testCase={test case id} project={test project}`

        -   for example `node testCodeGenerator.js testCase=TC-1 project=TEST_CYPRESS`

    -   This will generate a test file based on the test case in Matrix. It will be saved `basic-matrix-cypress-integration/cypress/e2e/notDoneYet`

## Cypress Config

-   Example Cypress config is provided in root folder of `basic-matrix-cypress-integration`
