<template>
  <div>
    <div class="text-end pe-3">
      <button
        class="btn btn-outline-danger"
        type="button"
        @click="deleteAllCarts"
        :disabled="loadingStatus.deleteAllItem || cart.carts == 0"
      >
        <i
          class="fas fa-spinner fa-pulse"
          v-if="loadingStatus.deleteAllItem"
        ></i
        >清空購物車
      </button>
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
        <template v-if="cart.carts !== undefined && cart.carts.length > 0">
          <tr v-for="item in cart.carts" :key="item.id">
            <td>
              <button
                type="button"
                class="btn btn-outline-danger btn-sm"
                @click="removeCartItem(item.id)"
                :disabled="loadingStatus.deleteItemID === item.id"
              >
                <i
                  class="fas fa-spinner fa-pulse"
                  v-if="loadingStatus.deleteItemID === item.id"
                ></i>
                刪除
              </button>
            </td>
            <td>
              {{ item.product.title }}
              <div class="text-success" v-if="item.coupon">已套用優惠券</div>
            </td>
            <td>
              <div class="input-group input-group-sm">
                <div class="input-group mb-3">
                  <input
                    v-model.number="item.qty"
                    @change="updateCart(item)"
                    :disabled="loadingStatus.deleteItemID === item.id"
                    min="1"
                    type="number"
                    class="form-control"
                  />
                  <span class="input-group-text" id="basic-addon2">{{
                    item.product.unit
                  }}</span>
                </div>
              </div>
            </td>
            <td class="text-end">
              <small v-if="cart.final_total !== cart.total" class="text-success"
                >折扣價：</small
              >
              {{ item.final_total }}
            </td>
          </tr>
        </template>
        <template v-else>
          <tr>
            <td colspan="6" class="text-center">趕快加入購物行列</td>
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
    <div class="text-end pe-3">
      <button
        class="btn btn-outline-danger"
        type="button"
        @click="checkout"
        :disabled="cart.carts == 0"
      >
        結帳
      </button>
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      cart: {},
      loadingStatus: {
        deleteItemID: '',
        deleteAllItem: false,
      }
    };
  },
  methods: {
    updateCart(item) {
      if (!this.validNum(item.qty)) return;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${item.id}`;
      const cart = {
        product_id: item.product_id,
        qty: item.qty,
      };
      this.$http.put(url, { data: cart }).then((res) => {
        if (res.data.success) this.getCart();
        alert(res.data.message);
      }).catch(err => console.log(err.toString()));
    },
    deleteAllCarts() {
      this.loadingStatus.deleteAllItem = true;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/carts`;
      this.$http.delete(url).then((res) => {
        if (res.data.success) this.getCart();
        alert(res.data.message);
        this.loadingStatus.deleteAllItem = false;
      }).catch(err => console.log(err.toString()));
    },
    getCart() {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
      this.$http.get(url).then((res) => {
        if (res.data.success) {
          this.cart = res.data.data;
        }
        else alert(res.data.message);
      }).catch(err => console.log(err.toString()));
    },
    removeCartItem(id) {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${id}`;
      this.loadingStatus.deleteItemID = id;
      this.$http.delete(url).then((res) => {
        if (res.data.success) this.getCart();
        alert(res.data.message);
        this.loadingStatus.deleteItemID = '';
      }).catch(err => console.log(err.toString()));
    },
    validNum(num) {
      if (!num || !/^[1-9]*[1-9][0-9]*$/.test(num)) {
        alert("數量為整數且不得小於 1");
        return false;
      }
      return true;
    },
    checkout() {
      this.$router.push('/checkout')
    },
  },
  created() {
    this.getCart();
  },
}
</script>