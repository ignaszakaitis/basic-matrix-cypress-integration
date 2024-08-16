const axios = require("axios");
const sdk = require("matrix-requirements-sdk/server");

// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
let screenshotMap = {};

function mapScreenshotsToSteps(xtc, results) {
    for (let ids of Object.keys(results)) {
        for (let screenshotID of Object.keys(screenshotMap)) {
            if (screenshotID.includes(ids)) {
                results[ids][0].path = screenshotMap[screenshotID].path;
            }
        }
        for (let step of xtc) {
            if (step.uid.includes(ids)) {
                results[ids][0].matchingUID = xtc[xtc.indexOf(step)].uid;
            }
        }
    }
    return results;
}

function reportToXtcStepsPassed(arg) {
    return new Promise((resolve, reject) => {
        let fs = require("fs");
        async function run() {
            const credentialsData = JSON.parse(fs.readFileSync("./credentials.json", "utf-8"));
            const server = await sdk.createConsoleAPI(
                credentialsData[Object.keys(credentialsData)[0]]
            );

            const project = await server.openProject(arg.env.mxSpecProject);

            // Retrieve the test case
            let item = await project.getItem(arg.env.xtc);

            // Check if the spec matches the test case
            if (arg.folder.includes(item.getUplinks()[0].to)) {
                console.log("Spec matches the test case");
            } else {
                console.log(
                    `Spec does not match the test case: ${arg.env.xtc}. Nothing will be reported. Please check the input parameters.`
                );
                return;
            }

            // Handling a table field
            let tableHandler = item.getFieldByName(arg.env.table)[0].getHandler();

            // Compute results object for reporting
            const preparedResults = mapScreenshotsToSteps(tableHandler.data, arg.results);

            // Upload screenshots and update the comment of each step
            for (let i = 0; i < tableHandler.data.length; i++) {
                for (let key of Object.keys(preparedResults)) {
                    if (tableHandler.data[i].uid.includes(preparedResults[key][0].matchingUID)) {
                        let file = fs.createReadStream(preparedResults[key][0].path);
                        let fileUpl = await project.uploadLocalFile(axios, file, (p) => {
                            console.log("Uploading Screenshot...");
                        });
                        const stepComment = `<p>${preparedResults[key][0].comment}</p>`;
                        const url = project.computeFileUrl(fileUpl);
                        tableHandler.data[i].comment =
                            stepComment +
                            `<img src="${url}" alt="${tableHandler.data[i].uid} screenshot">`;
                    }
                }
            }

            // Update the item
            server.setComment("Test automation");
            await project.updateItem(item);
        }

        run().then(() => {
            let updated = arg.env.mxSpecsURL + "/" + arg.env.mxSpecProject + "/" + arg.env.xtc;
            resolve(updated.replace("/rest/1", "").replace("/item", ""));
        });
    });
}

module.exports = (on, config) => {
    on("before:run", (details) => {
        screenshotMap = {};
    });

    on("after:screenshot", (details) => {
        console.log("Starting after:screenshot");
        if (screenshotMap[details.name] != undefined) {
            console.log("failing after:screenshot");
            throw new Error("failing");
        }
        screenshotMap[details.name] = details;
        console.log("ending after:screenshot");
        return details;
    });

    on("task", {
        deleteFolder: (dir) => {
            screenshotMap = {};
            let fs = require("fs");
            console.log("Deleting...." + __dirname + "/../" + dir);
            if (!fs.existsSync(__dirname + "/../" + dir)) {
                console.log("Folder doesn't exits");
                return null;
            }
            let fileList = fs.readdirSync(__dirname + "/../" + dir);
            for (let f of fileList) {
                console.log("Deleting " + f);
                fs.unlinkSync(__dirname + "/../" + dir + "/" + f);
            }
            return null;
        },
        reportToXtcStepsPassed: reportToXtcStepsPassed,
    });
};
