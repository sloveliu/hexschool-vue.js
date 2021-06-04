import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';
import * as common from './component/index.js';

createApp({
  data() {
    return {
      products: {},
      productsCount: 0,
      token: '',
      tempProduct: {
        id: '',
        title: '',
        category: '',
        origin_price: null,
        price: null,
        unit: '',
        description: '',
        content: '',
        is_enabled: 0,
        imagesUrl: []
      },
      isNew: true,
      pagination: {}
    };
  },
  components: {
    pagination: common.pagination,
    updateModal: common.updateModal,
    deleteModal: common.deleteModal
  },
  created() {
  },
  mounted() {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    if (!token) {
      window.location = './index.html';
      return;
    }
    axios.defaults.headers.common['Authorization'] = token;
    this.getProductList();
  },
  methods: {
    openModal(action, item) {
      switch (action) {
        case 'new':
          this.isNew = true;
          this.tempProduct = {
            imagesUrl: []
          };
          // 調用 updateModal 的 openModal 方法
          this.$refs.updateModal.openModal();
          break;
        case 'edit':
          this.isNew = false;
          this.tempProduct = { ...item };
          this.$refs.updateModal.openModal();
          break;
        case 'del':
          this.tempProduct = { ...item };
          // 調用子組件方法
          this.$refs.deleteModal.openModal();
          break;
        default:
          alert('錯誤');
      }
    },
    getProductList(page = 1) {
      const url = `${apiUrl}/api/${apiPath}/admin/products?page=${page}`;
      axios.get(url)
        .then(res => {
          if (res.data.success) {
            this.pagination = res.data.pagination;
            console.log(this.pagination)

            this.products = res.data.products;
            this.productsCount = Object.keys(this.products).length;
          } else alert(res.data.message);
        }).catch(err => console.log(err.toString()));
    },
    logout() {
      const url = `${apiUrl}/logout`;
      axios.post(url).then(res => {
        if (res.data.success) {
          document.cookie = `hexToken=; expires=`;
          window.location = './index.html';
        }
        alert(res.data.message);
      }).catch(err => console.log(err.toString())
      );
    }
  }
}).mount("#app");