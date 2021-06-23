export default {
  template: `
  <div class="modal fade" id="productModal" tabindex="-1" role="dialog"
  aria-labelledby="exampleModalLabel" aria-hidden="true" ref="productModal">
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <span>{{ product.title }}</span>
          </h5>
          <button type="button" class="btn-close"
                  data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-6">
              <img class="img-fluid" :src="product.imagesUrl" alt="">
            </div>
            <div class="col-sm-6">
              <span class="badge bg-primary rounded-pill">{{ product.category }}</span>
              <p>商品描述：{{ product.description }}</p>
              <p>商品內容：{{ product.content }}</p>
              <div class="h5" v-if="!product.price">{{ product.origin_price }} 元</div>
              <del class="h6" v-if="product.price">原價 {{ product.origin_price }} 元</del>
              <div class="h5" v-if="product.price">現在只要 {{ product.price }} 元</div>
              <div>
                <div class="input-group">
                  <input type="number" class="form-control"
                        v-model.number="qty" min="1">
                  <button type="button" class="btn btn-primary"
                          @click="addToCart(product.id, qty)" :disabled="!qty">加入購物車</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `,
  data() {
    return {
      product: {},
      productModal: null,
      qty: 1,
    };
  },
  created() {
    emitter.on('get-product', product => this.product = product);
    emitter.on('update-qty', () => this.qty = 1);
  },
  mounted() {
    this.productModal = new bootstrap.Modal(this.$refs.productModal, {
      keyboard: false,
      backdrop: 'static'
    });
  },
  methods: {
    addToCart(id, qty = 1) {
      if (!this.validNum(qty)) return;
      emitter.emit('add-to-cart', { id, qty });
    },
    validNum(num) {
      if (!num || !/^[0-9]*[1-9][0-9]*$/.test(num)) {
        alert("數量為整數且不得小於 1");
        return false;
      }
      return true;
    },
    openModal() {
      this.productModal.show();
      this.qty = 1;
    },
    closeModal() {
      this.productModal.hide();
    },
  },
  watch: {
    qty(newValue, oldValue) {
      if (!newValue || this.validNum(newValue)) this.qty = newValue;
      else this.qty = oldValue;
    }
  },
};