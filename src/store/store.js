import { createStore } from 'vuex'
import { BasketSlice } from './basket/BasketSlice'
import { ProductsSlice } from './products/ProductsSlice'

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: { BasketSlice, ProductsSlice },
})
