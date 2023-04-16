import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'
import { useBasketStore } from '../basket'
import { useProductsStore } from '../products'

describe('Basket store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('toggleShouldInstall', () => {
    const basket = useBasketStore()
    expect(basket.shouldInstall).toBe(false)

    basket.toggleShouldInstall()
    
    expect(basket.shouldInstall).toBe(true)
    expect(basket.loading).toBeFalsy()
  })

  it('adding basket product if there is no such one', () => {
    const basket = useBasketStore()
    const count = basket.count
    const price = basket.price

    basket.addBasketProduct()

    expect(basket.count).toBe(count + 1)
    expect(basket.products[0].count).toBe(1)
    expect(basket.products.length).toBe(1)
    expect(basket.price).toBeGreaterThan(price)
    expect(basket.loading).toBeFalsy()
  })

  it('adding basket product if it already exist', () => {
    const basket = useBasketStore()
    basket.products = useProductsStore().products.map(el => ({...el, count: 1}))
    basket.count = 4
    basket.price = basket.products.reduce((prev, next) => prev + next.count * next.price, 0)
    const price = basket.price
    const count = basket.count

    basket.addBasketProduct()

    expect(basket.count).toBe(count + 1)
    expect(basket.products.length).toBe(4)
    expect(basket.products.some(el => el.count === 2)).toBe(true)
    expect(basket.price).toBeGreaterThan(price)
    expect(basket.loading).toBeFalsy()
  })

  it('increase basket product count', () => {
    const basket = useBasketStore()
    basket.products = useProductsStore().products.map(el => ({...el, count: 1}))
    basket.count = 4
    basket.price = basket.products.reduce((prev, next) => prev + next.count * next.price, 0)
    const price = basket.price
    const count = basket.count

    basket.changeBasketProductCount({id: basket.products[0].id, count: 2})

    expect(basket.count).toBe(count + 1)
    expect(basket.products.length).toBe(4)
    expect(basket.products[0].count).toBe(2)
    expect(basket.price).toBeGreaterThan(price)
    expect(basket.loading).toBeFalsy()
  })

  it('decrease basket product count', () => {
    const basket = useBasketStore()
    basket.products = useProductsStore().products.map(el => ({...el, count: 2}))
    basket.count = 4
    basket.price = basket.products.reduce((prev, next) => prev + next.count * next.price, 0)
    const price = basket.price
    const count = basket.count

    basket.changeBasketProductCount({id: basket.products[0].id, count: 1})

    expect(basket.count).toBe(count - 1)
    expect(basket.products.length).toBe(4)
    expect(basket.products[0].count).toBe(1)
    expect(basket.price).toBeLessThan(price)
    expect(basket.loading).toBeFalsy()
  })

  it('decrease basket product count with deletion', () => {
    const basket = useBasketStore()
    basket.products = useProductsStore().products.map(el => ({...el, count: 1}))
    basket.count = 4
    basket.price = basket.products.reduce((prev, next) => prev + next.count * next.price, 0)
    const price = basket.price
    const count = basket.count

    basket.changeBasketProductCount({id: basket.products[0].id, count: 0})

    expect(basket.count).toBe(count - 1)
    expect(basket.products.length).toBe(3)
    expect(basket.price).toBeLessThan(price)
    expect(basket.loading).toBeFalsy()
  })

  it('decrease basket product count under zero', () => {
    const basket = useBasketStore()
    basket.products = useProductsStore().products.map(el => ({...el, count: 1}))
    basket.count = 4
    basket.price = basket.products.reduce((prev, next) => prev + next.count * next.price, 0)
    const price = basket.price
    const count = basket.count

    basket.changeBasketProductCount({id: basket.products[0].id, count: 0})
    basket.changeBasketProductCount({id: basket.products[0].id, count: -1})

    expect(basket.count).toBe(count - 1)
    expect(basket.products.length).toBe(3)
    expect(basket.price).toBeLessThan(price)
    expect(basket.loading).toBeFalsy()
  })

  it('deleting basket product', () => {
    const basket = useBasketStore()
    basket.products = useProductsStore().products.map(el => ({...el, count: 3}))
    basket.count = 4
    basket.price = basket.products.reduce((prev, next) => prev + next.count * next.price, 0)
    const price = basket.price
    const count = basket.count

    basket.deleteBasketProduct(basket.products[0].id)

    expect(basket.count).toBe(count - basket.products[0].count)
    expect(basket.products.length).toBe(3)
    expect(basket.price).toBe(price - basket.products[0].count * basket.products[0].price)
    expect(basket.loading).toBeFalsy()
  })

  it('delete all basket products', () => {
    const basket = useBasketStore()
    basket.products = useProductsStore().products.map(el => ({...el, count: 3}))
    basket.count = 4
    basket.price = basket.products.reduce((prev, next) => prev + next.count * next.price, 0)
    const price = basket.price
    const count = basket.count

    basket.deleteAllBasket()

    expect(basket.count).toBe(0)
    expect(basket.products.length).toBe(0)
    expect(basket.price).toBe(0)
    expect(basket.loading).toBeFalsy()
  })
})