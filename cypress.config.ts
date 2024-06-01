import { defineConfig } from "cypress";
import * as overwrite from "./local-settings.json";

export default defineConfig({
    chromeWebSecurity: false,
    trashAssetsBeforeRuns: true,
    experimentalStudio: true,
    env: {
        dbConnectionString: "postgres://matrixpguser@localhost:5432/matrixdb",
        mxSpecsURL: "https://ignas-cypress.matrixreq.com//rest/1",
        mxSpecProject: "DEMO_CALCULATOR",
        ...overwrite.env,
    },
    e2e: {
        specPattern: "**/*.{cy.ts,feature}",
        async setupNodeEvents(
            on: Cypress.PluginEvents,
            config: Cypress.PluginConfigOptions
        ): Promise<Cypress.PluginConfigOptions> {

            require("./cypress/plugins/index.js")(on, config);

            return config;
        },
        baseUrl: "https://ignas-calc-app.cloud/",
        supportFile: "cypress/support/index.d.ts",
        ...overwrite.e2e,
    },
});
