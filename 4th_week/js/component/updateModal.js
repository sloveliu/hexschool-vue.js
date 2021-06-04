export default {
  template: `
  <div id="updateModal" ref="updateModal" class="modal fade" tabindex="-1" aria-labelledby="updateModalLabel"
  aria-hidden="true">
  <div class="modal-dialog modal-xl">
    <div class="modal-content border-0">
      <div class="modal-header bg-dark text-white">
        <h5 id="updateModalLabel" class="modal-title">
          <span>{{ isNew ? '新增產品':'更新產品'}}</span>
        </h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col-sm-4">
            <div class="mb-1">
              <input type="file" name="file-to-upload" accept="image/*" @change="uploadImage">
              <img v-if="tempProduct.imagesUrl" class="img-fluid" :src="tempProduct.imagesUrl[0]" alt="">
              <div class="form-group" v-for="(item,index) in tempProduct.imagesUrl" :key="index">
                <label for="imageUrl">圖片網址 {{ index+1 }}</label>
                <input type="text" class="form-control d-inline w-auto me-2"  v-model="tempProduct.imagesUrl[index]" readonly>
                <button type="button" class="btn-danger btn-sm" @click="removeImage(index)">X</button>
              </div>
            </div>
          </div>
          <div class="col-sm-8">
            <div class="form-group">
              <label for="title">標題</label>
              <input id="title" type="text" class="form-control" placeholder="請輸入標題"
                v-model.trim="tempProduct.title">
            </div>
            <div class="row">
              <div class="form-group col-md-6">
                <label for="category">分類</label>
                <input id="category" type="text" class="form-control" placeholder="請輸入分類"
                  v-model.trim="tempProduct.category">
              </div>
              <div class="form-group col-md-6">
                <label for="price">單位</label>
                <input id="unit" type="text" class="form-control" placeholder="請輸入單位"
                  v-model.trim="tempProduct.unit">
              </div>
            </div>
            <div class="row">
              <div class="form-group col-md-6">
                <label for="origin_price">原價</label>
                <input id="origin_price" type="number" min="0" class="form-control" placeholder="請輸入原價"
                  v-model.number="tempProduct.origin_price">
              </div>
              <div class="form-group col-md-6">
                <label for="price">售價</label>
                <input id="price" type="number" min="0" class="form-control" placeholder="請輸入售價"
                  v-model.number="tempProduct.price">
              </div>
            </div>
            <hr>

            <div class="form-group">
              <label for="description">產品描述</label>
              <textarea id="description" type="text" class="form-control" placeholder="請輸入產品描述"
                v-model.trim="tempProduct.description">
          </textarea>
            </div>
            <div class="form-group">
              <label for="content">說明內容</label>
              <textarea id="description" type="text" class="form-control" placeholder="請輸入說明內容"
                v-model.trim="tempProduct.content">
          </textarea>
            </div>
            <div class="form-group">
              <div class="form-check">
                <label class="form-check-label" for="is_enabled">是否啟用</label>
                <input id="is_enabled" class="form-check-input" type="checkbox" :true-value="1" :false-value="0"
                  v-model="tempProduct.is_enabled">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
          取消
        </button>
        <button type="button" class="btn btn-primary" @click="updateProduct">
          確認
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
    isNew:{
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      updateModal: null
    };
  },
  mounted() {
    this.updateModal = new bootstrap.Modal(this.$refs.updateModal, {
      backdrop: 'static'
    });
  },
  methods: {
    openModal() {
      this.updateModal.show();
    },
    hideModal() {
      this.updateModal.hide();
    },
    updateProduct() {
      let url = `${apiUrl}/api/${apiPath}/admin/product/`;
      let method = 'post';
      if (!this.isNew) {
        url = `${apiUrl}/api/${apiPath}/admin/product/${this.tempProduct.id}`;
        method = 'put';
      }
      axios[method](url, { data: this.tempProduct })
        .then(res => {
          if (res.data.success) {
            this.updateModal.hide();
            this.$emit('get-product-list');
          } alert(res.data.message);
        }).catch(err => console.log(err.toString()));
    },
    uploadImage(e) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append('file-to-upload', file);
      const url = `${apiUrl}/api/${apiPath}/admin/upload`;
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
  }
};