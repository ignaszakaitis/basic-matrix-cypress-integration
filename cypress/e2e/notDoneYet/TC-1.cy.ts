/// <reference types="cypress" />
import 'cypress-iframe'

/************************************ Test description ************************************
    

automatic - add as first entries
per step - add at end

{
   "human": "VERY BAD",
   "code": "vbad",
   "render": "error",
   "rule": "all",
   "param": "b"
  },{
   "human": "BAD",
   "code": "bad",
   "render": "warning",
   "rule": "one",
   "param": "b"
  },

,
  {
   "human": "BAD",
   "command": "bad",
   "render": "failed",
   "code": "b",
   "key": "b",
   "image": ""
  }

 *******************************************************************************************/

import { BaseTC } from "../../support/BaseTC";


const screenshotfolder = "automated/TC-1.cy.ts";  /* This path has to be fixed. */
    
describe('TC-1 - TC with XTC (2014DEC03_1)', () => {
    
    before(() => {
            
        cy.task("deleteFolder", "screenshots/" + screenshotfolder); 
    
    })

    after(()=>{
        cy.log(JSON.stringify(tc.results));
        cy.reportToXtcStepsPassed(screenshotfolder,tc.results);
    })
    
    it("TC_1 TC with XTC (2014DEC03_1)",()=>{
        /* Init */
        tc.init();
        /* Steps */

        tc.step_0001_2();
        tc.step_0002_2();
        tc.step_0003_2();
        tc.step_0004_2();
        tc.step_0005_2();
        tc.step_0006_2();
    })
            
});
class TC_1 extends BaseTC {

    init(){
        this.initResult(['0001-2','0002-2','0003-2','0004-2','0005-2','0006-2']);
}
	
    /* --------------------------------------------------------------------------------------------------------------
        - UID : 0001-2 
        - Action : Somes 
        - Expected: Test Steps
    -------------------------------------------------------------------------------------------------------------- */
    step_0001_2 () {
        const stepUID =  '0001-2'; 
        cy.log(" #########  Step" + stepUID + "#########");
        cy.log(`Action : Somes`);
        /**** testing code ****/


        /**** Reporting  ****/
        cy.log(`Expected : Test Steps`);
        //--- To customise 
        cy.screenshot(stepUID);
        this.addComment (stepUID, " Test Steps", stepUID);
        //-----
    }	
    /* --------------------------------------------------------------------------------------------------------------
        - UID : 0002-2 
        - Action : Withrich textmultiple lines 
        - Expected: text
    -------------------------------------------------------------------------------------------------------------- */
    step_0002_2 () {
        const stepUID =  '0002-2'; 
        cy.log(" #########  Step" + stepUID + "#########");
        cy.log(`Action : Withrich textmultiple lines`);
        /**** testing code ****/


        /**** Reporting  ****/
        cy.log(`Expected : text`);
        //--- To customise 
        cy.screenshot(stepUID);
        this.addComment (stepUID, " text", stepUID);
        //-----
    }	
    /* --------------------------------------------------------------------------------------------------------------
        - UID : 0003-2 
        - Action : smart links to REQ-1 and REQ-5 
        - Expected: REQ-7 and REQ-8
    -------------------------------------------------------------------------------------------------------------- */
    step_0003_2 () {
        const stepUID =  '0003-2'; 
        cy.log(" #########  Step" + stepUID + "#########");
        cy.log(`Action : smart links to REQ-1 and REQ-5`);
        /**** testing code ****/


        /**** Reporting  ****/
        cy.log(`Expected : REQ-7 and REQ-8`);
        //--- To customise 
        cy.screenshot(stepUID);
        this.addComment (stepUID, " REQ-7 and REQ-8", stepUID);
        //-----
    }	
    /* --------------------------------------------------------------------------------------------------------------
        - UID : 0004-2 
        - Action : more 
        - Expected: lines
    -------------------------------------------------------------------------------------------------------------- */
    step_0004_2 () {
        const stepUID =  '0004-2'; 
        cy.log(" #########  Step" + stepUID + "#########");
        cy.log(`Action : more`);
        /**** testing code ****/


        /**** Reporting  ****/
        cy.log(`Expected : lines`);
        //--- To customise 
        cy.screenshot(stepUID);
        this.addComment (stepUID, " lines", stepUID);
        //-----
    }	
    /* --------------------------------------------------------------------------------------------------------------
        - UID : 0005-2 
        - Action : and more 
        - Expected: and more
    -------------------------------------------------------------------------------------------------------------- */
    step_0005_2 () {
        const stepUID =  '0005-2'; 
        cy.log(" #########  Step" + stepUID + "#########");
        cy.log(`Action : and more`);
        /**** testing code ****/


        /**** Reporting  ****/
        cy.log(`Expected : and more`);
        //--- To customise 
        cy.screenshot(stepUID);
        this.addComment (stepUID, " and more", stepUID);
        //-----
    }	
    /* --------------------------------------------------------------------------------------------------------------
        - UID : 0006-2 
        - Action : 20141203_1 
        - Expected: extra row for tests
    -------------------------------------------------------------------------------------------------------------- */
    step_0006_2 () {
        const stepUID =  '0006-2'; 
        cy.log(" #########  Step" + stepUID + "#########");
        cy.log(`Action : 20141203_1`);
        /**** testing code ****/


        /**** Reporting  ****/
        cy.log(`Expected : extra row for tests`);
        //--- To customise 
        cy.screenshot(stepUID);
        this.addComment (stepUID, " extra row for tests", stepUID);
        //-----
    }
}

const tc = new TC_1();

/*******    DONE **********/