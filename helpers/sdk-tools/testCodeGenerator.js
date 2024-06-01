#!/usr/bin/env node
const sdk = require("matrix-requirements-sdk/server");
const fs = require("fs");
const { deconstructArguments } = require("./deconstruct.cjs");

function createFileContent(testTC, description, tableData, testCaseName) {
    let snakeCaseName = testTC.replace("-", "_");
    let fileContent = ``;

    //************* Adding file header *********************/

    fileContent += `/// <reference types="cypress" />
import 'cypress-iframe'\n\n`;

    //**************************************************** */

    //************* Adding Test Description ****************/

    fileContent += `/************************************ Test description ************************************
    ${description
        .replace(/(\r\n|\r|\n){2,}/g, "$1\n")
        .replace(
            "/*",
            "**"
        )}*******************************************************************************************/\n\n`;

    //**************************************************** */

    //************* Adding Test Description ****************/

    fileContent += `import { BaseTC } from "../../support/BaseTC";\n\n
const screenshotfolder = "automated/${testTC}.cy.ts";  /* This path has to be fixed. */
    
describe('${testTC} - ${testCaseName}', () => {
    
    before(() => {
            
        cy.task("deleteFolder", "screenshots/" + screenshotfolder); 
    
    })\n
    after(()=>{
        cy.log(JSON.stringify(tc.results));
        cy.reportToXtcStepsPassed(screenshotfolder,tc.results);
    })
    
    it("${snakeCaseName + " " + testCaseName}",()=>{
        /* Init */
        tc.init();
        /* Steps */\n
${tableData.map((step) => "        tc.step_" + step.uid.replace("-", "_") + "();").join("\n")}
    })
            
});\n`;

    //**************************************************** */

    //************* Adding Class and init() ****************/

    fileContent += `class ${snakeCaseName} extends BaseTC {

    init(){
        this.initResult([${tableData.map((step) => "'" + step.uid + "'").join(",")}]);
}\n`;

    //**************************************************** */

    //************* Adding Test Steps ****************/

    for (enumSteps in tableData) {
        step = tableData[enumSteps];
        fileContent += `\t
    /* --------------------------------------------------------------------------------------------------------------
        - UID : ${step.uid} 
        - Action : ${step.action} 
        - Expected: ${step.expected}
    -------------------------------------------------------------------------------------------------------------- */
    step_${step.uid.replace("-", "_")} () {
        const stepUID =  '${step.uid}'; 
        cy.log(" #########  Step" + stepUID + "#########");
        cy.log(\`Action : ${step.action}\`);
        /**** testing code ****/


        /**** Reporting  ****/
        cy.log(\`Expected : ${step.expected}\`);
        //--- To customise 
        cy.screenshot(stepUID);
        this.addComment (stepUID, " ${step.expected}", stepUID);
        //-----
    }`;
    }

    fileContent += `\n}\n\nconst tc = new ${snakeCaseName}();\n`;

    //**************************************************** */

    //************* Adding Footer ****************/

    fileContent += `\n/*******    DONE **********/`;

    //**************************************************** */

    return fileContent;
}

async function run() {
    // Get the arguments from the command line
    const inputArgs = deconstructArguments(process.argv);

    // Get the server and project
    const credentialsData = JSON.parse(fs.readFileSync("../../credentials.json", "utf-8"));
    console.log(credentialsData[Object.keys(credentialsData)[0]]);
    const server = await sdk.createConsoleAPI(credentialsData[Object.keys(credentialsData)[0]]);
    const project = await server.openProject(inputArgs["project"]);

    // Retrieve the test case
    let item = await project.getItem(inputArgs["testCase"]);

    // Get the test case name, table data, and rich text data
    let testCaseName = item.getTitle();
    let tableData = item.getFieldByName("Steps")[0].getHandler().data;
    let richTextData = item
        .getFieldByName("Description")[0]
        .getHandler()
        .data.replace(/(<[^>]+>)|(&nbsp;)/g, "");

    // Remove HTML tags from the action and expected table cells
    tableData.forEach((step) => {
        step.action = step.action.replace(/(<[^>]+>)|(&nbsp;)|(-&gt;)/g, "");
        step.expected = step.expected.replace(/(<[^>]+>)|(&nbsp;)|(-&gt;)/g, "");
    });

    // Create the file content
    let fileContent = createFileContent(
        inputArgs["testCase"],
        richTextData,
        tableData,
        testCaseName
    );

    // Write the file
    fs.writeFileSync(
        `../../cypress/e2e/notDoneYet/${inputArgs["testCase"]}.cy.ts`,
        fileContent,
        function (err) {
            if (err) throw err;
        }
    );
}

run().then(() => process.exit(0));
