<template>
  <div id="product" ref="product">
    <div class="row">
      <div class="col-sm-6">
        <img class="img-fluid" :src="product.imagesUrl" alt="" />
      </div>
      <div class="col-sm-6">
        <span class="badge bg-primary rounded-pill">{{
          product.category
        }}</span>
        <p>商品描述：{{ product.description }}</p>
        <p>商品內容：{{ product.content }}</p>
        <div class="h5" v-if="!product.price">
          {{ product.origin_price }} 元
        </div>
        <del class="h6" v-if="product.price"
          >原價 {{ product.origin_price }} 元</del
        >
        <div class="h5" v-if="product.price">
          現在只要 {{ product.price }} 元
        </div>
        <div>
          <div class="input-group pe-5">
            <input
              type="number"
              class="form-control"
              v-model.number="qty"
              min="1"
            />
          </div>
        </div>
        <div class="py-3">
          <button
            type="button"
            class="btn btn-primary"
            @click="addToCart(product.id, qty)"
            :disabled="!qty"
          >
            加入購物車
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      product: {},
      qty: 1,
      loadingStatus: {
        moreID: '',
        addToCartID: '',
      },
    };
  },
  created() {
    const { id } = this.$route.params;
    this.getProduct(id);
  },
  methods: {
    getProduct(id) {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/product/${id}`;
      this.$http.get(url)
        .then((res) => {
          if (res.data.success) {
            this.product = res.data.product;
          } else alert(res.data.message);
          this.loadingStatus.moreID = '';
        }).catch(err => console.log(err.toString()));
    },
    addToCart(id, qty = 1) {
      if (!this.validNum(qty)) return;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
      this.loadingStatus.addToCartID = id;
      this.$http.post(url, { data: { product_id: id, qty } })
        .then((res) => {
          if (res.data.success) {
            this.$router.go(-1);
          }
          alert(res.data.message);
          this.loadingStatus.addToCartID = '';
        }).catch(err => console.log(err.toString()));
    },
    validNum(num) {
      if (!num || !/^[0-9]*[1-9][0-9]*$/.test(num)) {
        alert("數量為整數且不得小於 1");
        return false;
      }
      return true;
    },
  },
  watch: {
    qty(newValue, oldValue) {
      if (!newValue || this.validNum(newValue)) this.qty = newValue;
      else this.qty = oldValue;
    }
  },
}
</script>