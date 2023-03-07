export const BasketSlice = {
  state: {
    price: 0,
    count: 0,
    shouldInstall: false,
    products: [],
    loading: false,
  },
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
  mutations: {
    setPrice(state, payload) {
      state.price = payload
    },
    setCount(state, payload) {
      state.count = payload
    },
    setShouldInstall(state, payload) {
      state.shouldInstall = payload
    },
    setBasketProducts(state, payload) {
      state.products = payload
    },
    changeBasketProduct(state, payload) {
      const found = state.products.find((el) => el.id === payload.id)
      if (found !== undefined) {
        found.count = payload.count
      }
    },
    setLoading(state, payload) {
      state.loading = payload
    },
  },
  actions: {
    async buyProducts({ commit, state }) {
      commit('setLoading', true)
      const data = {
        totalPrice: state.price,
        totalCount: state.count,
        shouldInstall: state.shouldInstall,
        products: [...state.products],
      }
      console.table(data)
      commit('setLoading', false)
    },
    async toggleShouldInstall({ commit, state }) {
      commit('setLoading', true)
      commit('setShouldInstall', !state.shouldInstall)
      commit('setLoading', false)
    },
    async addBasketProduct({ commit, rootState, state }) {
      commit('setLoading', true)
      const allProducts = rootState.ProductsSlice.products
      const allProductsLength = allProducts.length
      const randomIndex = Math.floor(Math.random() * allProductsLength)
      const product = allProducts[randomIndex]
      const found = state.products.find((el) => el.id === product.id)
      if (found === undefined) {
        commit('setBasketProducts', [...state.products, { ...product, count: 1 }])
      } else {
        commit('changeBasketProduct', { ...found, count: found.count + 1 })
      }
      commit('setCount', state.count + 1)
      commit('setPrice', state.price + product.price)
      commit('setLoading', false)
    },
    async changeBasketProductCount({ commit, state, dispatch }, payload) {
      commit('setLoading', true)
      const found = state.products.find((el) => el.id === payload.id)
      if (found !== undefined && payload.count === 0) {
        dispatch('deleteBasketProduct', found.id)
      }
      if (found !== undefined && payload.count > 0) {
        if (found.count < payload.count) {
          commit('setCount', state.count + 1)
          commit('setPrice', state.price + found.price)
          commit('changeBasketProduct', { ...found, count: found.count + 1 })
        } else {
          commit('setCount', state.count - 1)
          commit('setPrice', state.price - found.price)
          commit('changeBasketProduct', { ...found, count: found.count - 1 })
        }
      }
      commit('setLoading', false)
    },
    async deleteBasketProduct({ commit, state }, payload) {
      commit('setLoading', true)
      const product = state.products.find((el) => el.id === payload)
      if (product !== undefined) {
        commit('setCount', state.count - product.count)
        commit('setPrice', state.price - product.price * product.count)
        commit(
          'setBasketProducts',
          state.products.filter((el) => el.id !== payload),
        )
      }
      commit('setLoading', false)
    },
    async deleteAllBasket({ commit }) {
      commit('setLoading', true)
      commit('setBasketProducts', [])
      commit('setCount', 0)
      commit('setPrice', 0)
      commit('setLoading', false)
    },
  },
  modules: {},
}
