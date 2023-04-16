import { defineStore } from 'pinia';
import G2H from './assets/g2h.png'
import BXC from './assets/bxc.png'
import GHN from './assets/ghn.png'
import TDA from './assets/tda.png'

export const useProductsStore = defineStore('products', {
  state: () => ({
    products: [
      {
        id: '1',
        name: 'Вытяжное устройство G2H',
        shortName: 'G2H',
        techDescription: '12-72/168 м³/ч / гидрорегулируемый расход / от датчика присутствия',
        description: 'Вытяжное устройство с датчиком присутствия',
        articul: 'G2H1065',
        price: 12644,
        image: G2H,
      },
      {
        id: '2',
        name: 'Вытяжное устройство BXC',
        shortName: 'BXC',
        techDescription: '12-72/168 м³/ч / гидрорегулируемый расход / от датчика присутствия',
        description: 'Вытяжное устройство для механической системы вентиляции',
        articul: 'G2H1065',
        price: 12644,
        image: BXC,
      },
      {
        id: '3',
        name: 'Вытяжное устройство GHN',
        shortName: 'GHN',
        techDescription: '12-72/168 м³/ч / гидрорегулируемый расход / от датчика присутствия',
        description: 'Вытяжное устройство с датчиком присутствия',
        articul: 'G2H1065',
        price: 12644,
        image: GHN,
      },
      {
        id: '4',
        name: 'Вытяжное устройство TDA',
        shortName: 'TDA',
        techDescription: '12-72/168 м³/ч / гидрорегулируемый расход / от датчика присутствия',
        description: 'Вытяжное устройство с датчиком присутствия',
        articul: 'G2H1065',
        price: 12644,
        image: TDA,
      },
    ],
  }),
  getters: {
    getAllProducts(state) {
      return state.products
    },
  },
  actions: {}
})