export default {
  template: `
  <div id="deleteModal" ref="deleteModal" class="modal fade" tabindex="-1"
  aria-labelledby="deleteModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content border-0">
      <div class="modal-header bg-danger text-white">
        <h5 id="deleteModalLabel" class="modal-title">
          <span>刪除產品</span>
        </h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        是否刪除
        <strong class="text-danger"></strong> 商品(刪除後將無法恢復)。
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
          取消
        </button>
        <button type="button" class="btn btn-danger" @click="deleteProduct">
          確認刪除
        </button>
      </div>
    </div>
  </div>
  </div>
  `,
  props: {
    tempProduct: {
      type: Object,
      default: {}
    },
  },
  data() {
    return {
      deleteModal: null
    };
  },
  mounted() {
    // this.deleteModal = new bootstrap.Modal(document.querySelector("#deleteModal"),{
    //   backdrop: 'static', // 點背景不關閉
    // });
    // 改用 refs 來取
    this.deleteModal = new bootstrap.Modal(this.$refs.deleteModal, {
      backdrop: 'static', // 點背景不關閉
    });
  },
  methods: {
    openModal() {
      this.deleteModal.show();
    },
    hideModal() {
      this.deleteModal.hide();
    },
    deleteProduct() {
      const url = `${apiUrl}/api/${apiPath}/admin/product/${this.tempProduct.id}`;
      axios.delete(url)
        .then(res => {
          if (res.data.success) {
            this.$emit('get-product-list');
          }
          this.hideModal();
          alert(res.data.message);
        }).catch(err => console.log(err));
    },
  }
};