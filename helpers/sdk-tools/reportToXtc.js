#!/usr/bin/env node
const sdk = require("matrix-requirements-sdk/server");
const fs = require("fs");
const axios = require("axios");

console.log(process.env);

const testProject = "VALID";
const xtc = "XTC-4236";

async function run() {
    // Get the server and project
    process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 1;
    const credentialsData = JSON.parse(fs.readFileSync("./credentials.json", "utf-8"));
    const server = await sdk.createConsoleAPI(credentialsData[Object.keys(credentialsData)[0]]);
    const project = await server.openProject(testProject);

    // Retrieve the test case
    let item = await project.getItem(xtc);

    // Handling a table field
    let tableHandler = item.getFieldByName("Test Case Steps")[0].getHandler();

    fs.writeFileSync(
        `./test.cy.ts`,
        String(JSON.stringify(process.env.mxSpecsURL)),
        function (err) {
            if (err) throw err;
        }
    );

    for (let i = 0; i < tableHandler.data.length; i++) {
        console.log(tableHandler.data[i]);
        let file = fs.createReadStream(`${process.env.folder}/${tableHandler.data[i].uid}.png`);
        let result = await project.uploadLocalFile(axios, file, (p) => {
            console.log("Uploading Screenshot...");
        });
        const testComment = "<p>test comment</p>";

        // Convert the result to a url
        const url = project.computeFileUrl(result);

        tableHandler.data[i].comment =
            "<p>test comment</p>\n" + `<img src="${url}" alt="screenshot">`;
        console.log(tableHandler.data[i]);
    }

    // Update the item
    server.setComment("Test automation");
    await project.updateItem(item);
}

run().then(() => process.exit(0));
