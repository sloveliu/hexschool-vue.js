export default {
  template: `
  <div class="text-end">
  <button class="btn btn-outline-danger" type="button" @click="deleteAllCarts">清空購物車</button>
  </div>
  <table class="table align-middle">
  <thead>
    <tr>
      <th></th>
      <th>品名</th>
      <th style="width: 150px">數量/單位</th>
      <th>單價</th>
    </tr>
  </thead>
  <tbody>
    <template v-if="cart.carts">
      <tr v-for="item in cart.carts" :key="item.id">
        <td>
          <button type="button" class="btn btn-outline-danger btn-sm" @click="removeCartItem(item.id)"
            :disabled="loadingStatus.loadingItemID === item.id">
            <i class="fas fa-spinner fa-pulse" v-if="loadingStatus.loadingItemID === item.id"></i>
            刪除
          </button>
        </td>
        <td>
          {{ item.product.title }}
          <div class="text-success" v-if="item.coupon">
            已套用優惠券
          </div>
        </td>
        <td>
          <div class="input-group input-group-sm">
            <div class="input-group mb-3">
              <input v-model.number="item.qty" @blur="updateCart(item)"
                :disabled="loadingStatus.loadingItemID === item.id" min="1" type="number" class="form-control">
              <span class="input-group-text" id="basic-addon2">{{ item.product.unit }}</span>
            </div>
          </div>
        </td>
        <td class="text-end">
          <small v-if="cart.final_total !== cart.total" class="text-success">折扣價：</small>
          {{ item.final_total }}
        </td>
      </tr>
    </template>
  </tbody>
  <tfoot>
    <tr>
      <td colspan="3" class="text-end">總計</td>
      <td class="text-end">{{ cart.total }}</td>
    </tr>
    <tr v-if="cart.final_total !== cart.total">
      <td colspan="3" class="text-end text-success">折扣價</td>
      <td class="text-end text-success">{{ cart.final_total }}</td>
    </tr>
  </tfoot>
  </table>
  `,
  data() {
    return {
      cart: {},
      loadingStatus: {
        loadingItemID: '',
      }
    };
  },
  methods: {
    updateCart(item) {
      this.loadingStatus.loadingItemID = item.id;
      const url = `${apiUrl}/api/${apiPath}/cart/${item.id}`;
      const cart = {
        product_id: item.product_id,
        qty: item.qty,
      };
      axios.put(url, { data: cart }).then((res) => {
        if (res.data.success) this.getCart();
        alert(res.data.message);
        this.loadingStatus.loadingItemID = '';
      }).catch(err => console.log(err.toString()));
    },
    deleteAllCarts() {
      const url = `${apiUrl}/api/${apiPath}/carts`;
      axios.delete(url).then((res) => {
        if (res.data.success) this.getCart();
        alert(res.data.message);
      }).catch(err => console.log(err.toString()));
    },
    getCart() {
      const url = `${apiUrl}/api/${apiPath}/cart`;
      axios.get(url).then((res) => {
        if (res.data.success) this.cart = res.data.data;
        else alert(res.data.message);
      }).catch(err => console.log(err.toString()));
    },
    removeCartItem(id) {
      const url = `${apiUrl}/api/${apiPath}/cart/${id}`;
      this.loadingStatus.loadingItemID = id;
      axios.delete(url).then((res) => {
        if (res.data.success) this.getCart();
        this.loadingStatus.loadingItemID = '';
        alert(res.data.message);
      }).catch(err => console.log(err.toString()));
    },
  },
  created() {
    this.getCart();
    emitter.on('get-cart', this.getCart);
  },
};

