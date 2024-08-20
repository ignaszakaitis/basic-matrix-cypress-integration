import { defineConfig } from "cypress";

export default defineConfig({
    chromeWebSecurity: false,
    trashAssetsBeforeRuns: true,
    experimentalStudio: true,
    env: {
        // mxSpecsURL: "https://instance.matrixreq.com//rest/1",
        // mxSpecProject: "DEMO_CALCULATOR",
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
        // baseUrl: "https://ignas-calc-app.cloud/",
        supportFile: "cypress/support/index.d.ts",
    },
});
