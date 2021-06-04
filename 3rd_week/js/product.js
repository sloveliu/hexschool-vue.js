import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';
createApp({
  data() {
    return {
      products: {},
      productNum: null,
      token: '',
      apiUrl: "https://vue3-course-api.hexschool.io",
      apiPath: "api_path",
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
      productModal: null,
      deleteModal: null,
      isNew: true
    };
  },
  mounted() {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    if (!token) {
      window.location = './index.html';
      return;
    }
    axios.defaults.headers.common['Authorization'] = token;
    this.getProductList();

    const productModal = document.querySelector("#productModal");
    const deleteModal = document.querySelector("#deleteModal");
    this.productModal = new bootstrap.Modal(productModal);
    this.deleteModal = new bootstrap.Modal(deleteModal);
  },
  methods: {
    // 共用 openModal 用 action 動作來判斷是否取產品資料
    openModal(action, item) {
      switch (action) {
        case 'new':
          this.isNew = true;
          this.tempProduct = {
            imagesUrl: []
          };
          this.productModal.show();
          break;
        case 'edit':
          this.isNew = false;
          this.tempProduct = { ...item };
          this.productModal.show();
          break;
        case 'del':
          this.tempProduct = { ...item };
          this.deleteModal.show();
          break;
        default:
          alert('錯誤');
      }
    },
    getProductList() {
      const url = `${this.apiUrl}/api/${this.apiPath}/admin/products/all`;
      axios.get(url)
        .then(res => {
          if (res.data.success) {
            this.products = res.data.products;
            this.productNum = Object.keys(this.products).length;
          } else alert(res.data.message);
        }).catch(err => console.log(err.toString()));
    },
    updateProduct() {
      let url = `${this.apiUrl}/api/${this.apiPath}/admin/product/`;
      let method = 'post';
      if (!this.isNew) {
        url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`;
        method = 'put';
      }
      // 這招很厲害
      axios[method](url, { data: this.tempProduct })
        .then(res => {
          if (res.data.success) {
            this.productModal.hide();
            this.getProductList();
          } alert(res.data.message);
        }).catch(err => console.log(err.toString()));
    },
    uploadImage(e) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append('file-to-upload', file);
      const url = `${this.apiUrl}/api/${this.apiPath}/admin/upload`;
      axios.post(url, formData)
        .then(res => {
          if (res.data.success) {
            this.tempProduct.imagesUrl = this.tempProduct.imagesUrl || [];
            this.tempProduct.imagesUrl.push(res.data.imageUrl);
            e.target.value = '';
          } else alert(res.data.message);
        }).catch(err => console.log(err.toString()));;
    },
    removeImage(index) {
      this.tempProduct.imagesUrl.splice(index, 1);
    },
    deleteProduct() {
      const url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`;
      axios.delete(url)
        .then(res => {
          if (res.data.success) {
            this.deleteModal.hide();
            this.getProductList();
          }
          alert(res.data.message);
        }).catch(err => console.log(err));
    },
    logout() {
      const url = `${this.apiUrl}/logout`;
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