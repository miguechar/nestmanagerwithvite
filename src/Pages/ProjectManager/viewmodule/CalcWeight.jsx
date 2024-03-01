export function CalcWeight(assemblies) {
  let sum = 0;
  for (let i = 0; i < assemblies.length; i++) {
    const partsList = assemblies[i].partsList;
    if (partsList) {
      for (let r = 0; r < partsList.length; r++) {
        sum += parseFloat(partsList[r].WEIGHT * partsList[r].QTY);
      }
    }
  }

  return sum;
}
