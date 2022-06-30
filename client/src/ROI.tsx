//Annualized ROI
import React from 'react';
function roi(){
    //Get these from user input
    let initial = 5000;
    let timeyrs = 1;
    const rate = 6;
    let contribution = 100;
    let final = 0;
    let choice = "month"; //monthly
    
    switch(true){
        case choice === "month":
            let totalMonths = timeyrs * 12;
            for(let i = 0; i < totalMonths; i++){
            final = monthlyCalc(rate, initial);
            initial = final + contribution;
            }
            break;

    }
    
    //rate = Math.pow(final/(initial+contribution),(1/(1/12)))-1;
}
//Monthly Contriubution and Monthly Return
function monthlyCalc(rate : number, initial : number){
    let mFinal = 0;
    mFinal = ((rate/100)+1)*initial;
    return mFinal;
}
export default roi;
