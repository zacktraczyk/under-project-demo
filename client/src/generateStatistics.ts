//Annualized ROI

export interface DisplayData {
  addContr: string;
  contrEach: string;
  initInvest: string;
  rateOfReturn: string;
  yearsToAccum: string;
}

function generateStatisitcs(displayData: DisplayData) {
  //Get data from user input
  const { addContr, contrEach, initInvest, rateOfReturn, yearsToAccum } =
    displayData;
  const initial = parseInt(initInvest);
  const timeyrs = parseInt(yearsToAccum);
  const rate = parseInt(rateOfReturn);
  const contribution = parseInt(addContr);
  const choice = contrEach; //month,quarter,yr

  // Calculate Year
  let interval = 1; // default year
  if (choice === "month") {
    interval = 12;
  } else if (choice === "quarter") {
    interval = 4;
  }

  let barStats = new Array<Object>();
  let totalCont = 0,
    tg = 0,
    tgTemp = 0,
    yrlyStart = 0;
  let temp = initial;
  const year = new Date();
  const yrlyCont = interval * contribution;
  for (let i = 0; i < timeyrs; i++) {
    yrlyStart = temp + yrlyCont;
    const yearTotal = (rate / 100 + 1) * yrlyStart;
    tg = yearTotal - temp - yrlyCont;
    tgTemp += tg;
    temp = yearTotal;
    totalCont += yrlyCont;

    barStats.push({
      year: "" + (year.getFullYear() + i),
      totalGrowth: tgTemp,
      contributions: totalCont,
      initial: initial,
    });
  }
  totalCont = yrlyCont * timeyrs;
  const yearTotal = Math.pow(rate / 100 + 1, timeyrs) * (initial + totalCont);

  let piStats = [
    { name: "Total Growth", value: tgTemp },
    { name: "Contributions", value: totalCont },
    { name: "Intial", value: initial },
  ];

  return { barStats, piStats, yearTotal };
}

export default generateStatisitcs;
