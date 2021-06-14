import * as common from './component/index.js';

Vue.createApp({
  components: {
    productModal: common.productModal,
    productList: common.productList,
    cartList: common.cartList,
    orderForm: common.orderForm,
  },
  methods: {
    openModal(){
      this.$refs.productModal.openModal()
    },
    closeModal(){
      this.$refs.productModal.closeModal()
    }
  },
}).mount('#app');