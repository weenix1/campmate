const convertToSubcurrency = (amount: number, factor = 100) => {
  const amountInSubunits = Math.round(amount * factor)
  return amountInSubunits
}

export default convertToSubcurrency
