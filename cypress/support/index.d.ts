/// <reference types="cypress" />

import { IResult } from "./BaseTC";
import "./commands.js";

export {};
// eslint-disable-next-line
declare global {
    namespace Cypress {
        interface VisitOptionsExended extends VisitOptions {
            waitForTreeLoaded: boolean;
        }
        interface Chainable {
            reportToXtcStepsPassed(folder: string, result: IResult): Chainable<Element>;
            /** This method will fetch the TC from matrixSpecs/VALID and verify if the steps UID are found in the automated tc.
             * If so, it will clone the 'Base Project' specified in the TC.
             * @param tcID   the Test case ID
             * @param tcObj  the cypress TC object
             *  @param newProjectID  the name for the project clone */

            getIframeBody(id: string): Chainable<Element>;

            /** Perform manual step. It show
             * @param message : Message that will be displayed using window.alert
             * @param fn  Function that will be called after the message has been displayed
             * @example  cy.manualStep("Now, save the time", ()=> cy.wait("@save",{timeOut:30000}); )
             */
            manualStep(message: string, fn: () => void): Chainable<Element>;
            /** Break execution until confirmation (using window.confirm)
             * @param message  message to display
             * @param expectedResult  Will fail it confirlm result != expectedResult
             */
            confirm(message: string, expectedResult: boolean): Chainable<Element>;

            visit(url: string, option: Partial<VisitOptionsExended>): Chainable<Element>;

            waitForElement(cssSelector: string): Chainable<Element>;
        }
    }
}
