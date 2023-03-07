export const BasketServises = {
  formatPrice(price) {
    const thousands = Math.floor(price / 1000)
    let units = String(price % 1000)
    while (units.length < 3) units = '0' + units
    return `${thousands} ${units} ₽`
  },
}
