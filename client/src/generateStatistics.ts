//Annualized ROI

export interface DisplayData {
  addContr: string;
  contrEach: string;
  initInvest: string;
  rateOfReturn: string;
  yearsToAccum: string;
}

function generateStatisitcs(displayData: DisplayData) {
  const { addContr, contrEach, initInvest, rateOfReturn, yearsToAccum } =
    displayData;
  //Get these from user input

  let initial = parseInt(initInvest);
  let timeyrs = parseInt(yearsToAccum);
  const rate = parseInt(rateOfReturn);
  let contribution = parseInt(addContr);
  let totalCont = 0;
  let final = 0;
  let choice = contrEach; //monthly
  let totalCalcs = 0;

  switch (true) {
    case choice === "month":
      totalCalcs = timeyrs * 12;
      for (let i = 0; i < totalCalcs; i++) {
        final = monthlyCalc(rate, initial);
        initial = final + contribution;
        totalCont = totalCont + contribution;
      }
      break;
    case choice === "quarter":
      totalCalcs = timeyrs * 4;
      for (let i = 0; i < totalCalcs; i++) {
        final = quarterlyCalc(rate, initial);
        initial = final + contribution;
        totalCont = totalCont + contribution;
      }
      break;
    case choice === "year":
      totalCalcs = timeyrs * 1;
      for (let i = 0; i < totalCalcs; i++) {
        final = yearlyCalc(rate, initial);
        initial = final + contribution;
        totalCont = totalCont + contribution;
      }
      break;
  }

  //return {graphStatistics, piStats}
}
//Monthly Contriubution and Monthly Return
function monthlyCalc(rate: number, initial: number) {
  let mFinal = 0;
  mFinal = Math.pow(rate / 100 + 1, 1 / 12) * initial;
  return mFinal;
}
function quarterlyCalc(rate: number, initial: number) {
  let mFinal = 0;
  mFinal = Math.pow(rate / 100 + 1, 1 / 4) * initial;
  return mFinal;
}
function yearlyCalc(rate: number, initial: number) {
  let mFinal = 0;
  mFinal = (rate / 100 + 1) * initial;
  return mFinal;
}
export default generateStatisitcs;
