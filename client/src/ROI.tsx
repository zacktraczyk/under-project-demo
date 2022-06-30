//Annualized ROI
import { EmrModifyInstanceFleetByName } from 'aws-cdk-lib/aws-stepfunctions-tasks';
import React from 'react';
function roi(){
    //Get these from front end
    let initial = 5000;
    let timeyrs = 1;
    let rate = 6/100;
    let contribution = 100;
    let final = 0;
    let choice = 0; //monthly
    
    switch(true){
        case choice == 0:
            let totalMonths = timeyrs * 12;
            for(let i = 0; i < totalMonths; i++){
            final = monthlyCalc(rate, initial, contribution);
            initial = final + contribution;
            }
            break;

    }
    
    //rate = Math.pow(final/(initial+contribution),(1/(1/12)))-1;
}
//Monthly Contriubution and Monthly Return
function monthlyCalc(rate : number, initial : number, contribution : number){
    let mFinal = 0;
    mFinal = ((rate/100)+1)*initial;
    return mFinal;
}
export default roi;