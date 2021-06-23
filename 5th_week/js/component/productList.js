export default {
  template: `
  <table class="table align-middle">
  <thead>
    <tr>
      <th>圖片</th>
      <th>商品名稱</th>
      <th>價格</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="item in products" :key="item.id">
      <td style="width: 200px">
        <div v-if="item.imageUrl" style="height: 100px; background-size: cover; background-position: center"
          :style="{ backgroundImage: 'url(' + item.imageUrl +')' }">
        </div>
      </td>
      <td>
        {{ item.title }}
      </td>
      <td>
        <div class="h5" v-if="!item.price">{{ item.origin_price }} 元</div>
        <del class="h6" v-if="item.price">原價 {{ item.origin_price }} 元</del>
        <div class="h5" v-if="item.price">現在只要 {{ item.price }} 元</div>
      </td>
      <td>
        <div class="btn-group btn-group-sm">
          <button type="button" class="btn btn-outline-secondary" @click="getProduct(item.id)"
            :disabled="loadingStatus.moreID === item.id || !item.is_enabled">
            <i class="fas fa-spinner fa-pulse" v-if="loadingStatus.moreID === item.id"></i>
            查看更多
          </button>
          <button type="button" class="btn btn-outline-danger" @click="addToCart(item.id)"
            :disabled="loadingStatus.addToCartID === item.id || !item.is_enabled">
            <i class="fas fa-spinner fa-pulse" v-if="loadingStatus.addToCartID === item.id"></i>
            加到購物車
          </button>
        </div>
      </td>
    </tr>
  </tbody>
</table>
  `,
  data() {
    return {
      products: [],
      product: {},
      loadingStatus: {
        moreID: '', // 用來判斷點選該產品時，反灰及加載 Loading 圖
        addToCartID: '', // 用來判斷點選該產品時，反灰及加載 Loading 圖
      },
    };
  },
  methods: {
    getProducts() {
      const url = `${apiUrl}/api/${apiPath}/products`;
      axios.get(url)
        .then((res) => {
          if (res.data.success) this.products = res.data.products;
          else alert(res.data.message);
        }).catch(err => console.log(err.toString()));
    },
    getProduct(id) {
      const url = `${apiUrl}/api/${apiPath}/product/${id}`;
      this.loadingStatus.moreID = id;
      axios.get(url)
        .then((res) => {
          if (res.data.success) {
            this.product = res.data.product;
            emitter.emit('get-product', this.product);
            this.$emit('openModal');
          } else alert(res.data.message);
          this.loadingStatus.moreID = '';
        }).catch(err => console.log(err.toString()));
    },
    addToCart(id, qty = 1) {
      const url = `${apiUrl}/api/${apiPath}/cart`;
      this.loadingStatus.addToCartID = id;
      axios.post(url, { data: { product_id: id, qty } })
        .then((res) => {
          if (res.data.success) {
            emitter.emit('get-cart');
          }
          this.$emit('closeModal');
          alert(res.data.message);
          emitter.emit('update-qty');
          this.loadingStatus.addToCartID = '';
        }).catch(err => console.log(err.toString()));
    }
  },
  created() {
    this.getProducts();
    emitter.on('add-to-cart', ({ id, qty }) => {
      this.addToCart(id, qty);
    });
  },
};
