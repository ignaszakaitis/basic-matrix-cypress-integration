#!/usr/bin/env node
const sdk = require("matrix-requirements-sdk/server");
const fs = require("fs");
const { execSync } = require("child_process");
const { forEach } = require("lodash");
const { deconstructArguments } = require("./deconstruct.cjs");

function constructXtcTcPairs(xtcs) {
    let xtcTcPairs = [];
    for (let xtc of xtcs) {
        let xtcTcPair = {
            xtcId: xtc.itemId,
            tcId: xtc.uplinks[0],
        };
        xtcTcPairs.push(xtcTcPair);
    }
    return xtcTcPairs;
}

async function run() {
    // Get the arguments from the command line
    const arguments = deconstructArguments(process.argv);

    // Get the server and project
    const credentialsData = JSON.parse(fs.readFileSync("../../credentials.json", "utf-8"));
    const server = await sdk.createConsoleAPI(credentialsData[Object.keys(credentialsData)[0]]);
    const project = await server.openProject(arguments["project"]);

    let mask = project.constructSearchFieldMask({ includeUplinks: true });

    // Get the test cases
    const xtcs = await project.searchRaw(`mrql:folderm=${arguments["folder"]}`, mask);

    // Construct array of XTC IDs of the folder
    let xtcTcPairs = constructXtcTcPairs(xtcs);
    forEach(xtcTcPairs, async (xtc) => {
        fs.readdirSync("../../cypress/e2e/automated").forEach((file) => {
            if (file.includes(xtc.tcId)) {
                console.log(`Running test case ${file} for XTC ${xtc.xtcId}`);
                execSync(
                    `cd ../.. && npx cypress run --browser chrome --headless --spec cypress/e2e/automated/${file}  --env xtc=${xtc.xtcId},table="Test Case Steps",xtcResultColumn="result",xtcCommentColumn="comment"`,
                    (err, stdout, stderr) => {
                        if (err) {
                            console.error(err);
                            return;
                        }
                        console.log(stdout);
                    }
                );
            }
        });
    });
}

run().then(() => process.exit(0));
