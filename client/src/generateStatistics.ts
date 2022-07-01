//Annualized ROI

export interface DisplayData {
  addContr: string;
  contrEach: string;
  initInvest: string;
  rateOfReturn: string;
  yearsToAccum: string;
}

function generateStatisitcs(displayData: DisplayData) {
  //Get these from user input
  const { addContr, contrEach, initInvest, rateOfReturn, yearsToAccum } =
    displayData;
  const initial = parseInt(initInvest);
  const timeyrs = parseInt(yearsToAccum);
  const rate = parseInt(rateOfReturn);
  const contribution = parseInt(addContr);
  const choice = contrEach; //monthly

  let totalCont = 0;

  // Return Variables
  let barStats = new Array();
  let piStats = {};

  // Calculate Year
  let interval = 1; // default year

  if (choice === "month") {
    interval = 12;
  } else if (choice === "quarter") {
    interval = 4;
  }

  // Generate GraphData
  let total = initial;
  for (let i = 0; i < timeyrs; i++) {
    const yearTotal = Math.pow(rate / 100 + 1, 1 / interval) * initial;
    totalCont += contribution;

    barStats.push({
      name: "Year",
      totalGrowth: yearTotal - initial + totalCont,
      contributions: totalCont,
      initial: initial,
    });

    total += yearTotal;
  }

  return { barStats, piStats };
}

export default generateStatisitcs;
