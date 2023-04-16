import { defineStore } from 'pinia';
import { useProductsStore } from './products';

export const useBasketStore = defineStore('basket', {
  state: () => ({
    price: 0,
    count: 0,
    shouldInstall: false,
    products: [],
    loading: false,
  }),
  getters: {
    getPrice(store) {
      return store.price
    },
    getCount(store) {
      return store.count
    },
    getShouldInstall(store) {
      return store.shouldInstall
    },
    getBasketProducts(store) {
      return store.products
    },
    getLoading(store) {
      return store.loading
    },
  },
  actions: {
    async buyProducts() {
      this.loading = true
      const data = {
        totalPrice: this.price,
        totalCount: this.count,
        shouldInstall: this.shouldInstall,
        products: [...this.products],
      }
      console.table(data)
      this.loading = false
    },
    async toggleShouldInstall() {
      this.loading = true
      this.shouldInstall = !this.shouldInstall
      this.loading = false
    },
    async addBasketProduct() {
      this.loading = true
      const productsStore = useProductsStore()
      const allProducts = productsStore.products
      const allProductsLength = allProducts.length
      const randomIndex = Math.floor(Math.random() * allProductsLength)
      const product = allProducts[randomIndex]
      const found = this.products.find((el) => el.id === product.id)
      if (found === undefined) {
        this.products = [...this.products, { ...product, count: 1 }]
      } else {
        found.count += 1
      }
      this.count += 1
      this.price += product.price
      this.loading = false
    },
    async changeBasketProductCount(payload) {
      this.loading = true
      const found = this.products.find((el) => el.id === payload.id)
      if (found !== undefined && payload.count === 0) {
        this.deleteBasketProduct(found.id)
      }
      if (found !== undefined && payload.count > 0) {
        if (found.count < payload.count) {
          this.count += 1
          this.price += found.price
          found.count += 1
        } else {
          this.count -= 1
          this.price -= found.price
          found.count -= 1
        }
      }
      this.loading = false
    },
    async deleteBasketProduct(payload) {
      this.loading = true
      const product = this.products.find((el) => el.id === payload)
      if (product !== undefined) {
        this.count -= product.count
        this.price -= product.price * product.count
        this.products = this.products.filter((el) => el.id !== payload)
      }
      this.loading = false
    },
    async deleteAllBasket() {
      this.loading = true
      this.products = []
      this.count = 0
      this.price = 0
      this.loading = false
    },
  }
})