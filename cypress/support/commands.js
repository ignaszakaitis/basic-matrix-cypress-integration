import "cypress-wait-until";

Cypress.Commands.add("reportToXtcStepsPassed", (folder, result) => {
    let arg = {
        folder: folder,
        results: result,
        env: Cypress.env(),
    };
    if (
        arg.env.xtc != undefined &&
        arg.env.table != undefined &&
        arg.env.xtcResultColumn != undefined &&
        arg.env.xtcCommentColumn != undefined
    )
        cy.task("reportToXtcStepsPassed", arg).then((t) => {
            window.open(t);
        });
    else cy.log("Nothing to report, as xtc is not defined");
});

Cypress.Commands.add("getIframeBody", (id) => {
    return cy.get(`#${id}`).its("0.contentDocument.body").should("not.be.empty").then(cy.wrap);
});

Cypress.Commands.add("manualStep", (message, fn) => {
    cy.wait(100);
    if (message) {
        alert(message);
    }
    if (fn && fn instanceof Function) fn();
});

Cypress.Commands.add("confirm", (message, expectedResult) => {
    cy.wait(400);
    if (message != undefined) {
        let result = confirm(message);
        cy.wrap(result).should("eq", expectedResult);
    }
});
/**
 * Wait for a thing by polling for it
 *
 * @param  {(string|function)} item                  - A jQuery selector string or a function that returns a boolean
 * @param  {object}            [options]             - An options object
 * @param  {number}            [options.timeout=200] - The time between tries in milliseconds
 * @param  {number}            [options.tries=300]   - The amount of times to try before failing
 *
 * @return {Promise}                                 - A Cypress promise, more at https://docs.cypress.io/api/utilities/promise.html
 */
const waitForElement = (item, options = {}) => {
    if (typeof item !== "string" && !(item instanceof Function)) {
        throw new Error(
            "Cypress plugin waitFor: The first parameter should be a string or a function"
        );
    }
    const defaultSettings = {
        timeout: 200,
        tries: 300,
    };
    const SETTINGS = { ...defaultSettings, ...options };

    const check = (item) => {
        if (typeof item === "string") {
            return Cypress.$(item).length > 0;
        } else {
            return item();
        }
    };

    return new Cypress.Promise((resolve, reject) => {
        let index = 0;
        const interval = setInterval(() => {
            if (check(item)) {
                clearInterval(interval);
                resolve();
            }
            if (index > SETTINGS.tries) {
                reject();
            }
            index++;
        }, SETTINGS.timeout);
    });
};

Cypress.Commands.add("waitForElement", waitForElement);

Cypress.Commands.add("embedShouldBeVisible", (timeout) => {
    if (!timeout) {
        timeout = 2000;
    }
    cy.get("embed", { timeout: 8000 }).should("be.visible");
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(timeout); // embed rendering some time
});
