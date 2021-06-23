<template>
  <div>
    <div class="d-flex justify-content-between p-3">
      <!-- data-bs-toggle 切換哪個類型的元件 modal data-bs-target 對應哪個 -->
      <button type="button" class="btn btn-primary" @click="openModal('new')">
        建立新產品
      </button>
      <button type="submit" class="btn btn-primary" @click.prevent="logout">
        登出
      </button>
    </div>
    <UpdateModal
      :temp-product="tempProduct"
      :is-new="isNew"
      ref="updateModal"
      @get-product-list="getProductList"
    >
    </UpdateModal>
    <DeleteModal
      :temp-product="tempProduct"
      ref="deleteModal"
      @get-product-list="getProductList"
    ></DeleteModal>
    <div v-if="products.length > 0">
      <table class="table mb-4">
        <thead>
          <tr>
            <th>產品名稱</th>
            <th class="text-center" width="120">原價</th>
            <th class="text-center" width="120">售價</th>
            <th class="text-center" width="150">是否啟用</th>
            <th class="text-center" width="120">選項</th>
          </tr>
        </thead>
        <tbody class="align-middle">
          <tr v-for="item in products" :key="item.id">
            <td>{{ item.title }}</td>
            <td class="text-center" width="120">
              {{ item.origin_price }}
            </td>
            <td class="text-center" width="120">
              {{ item.price }}
            </td>
            <td class="text-center" width="100">
              <span
                class="badge"
                :class="[item.is_enabled ? 'bg-primary' : 'bg-secondary']"
                >{{ item.is_enabled ? "啟用" : "停用" }}</span
              >
            </td>
            <td class="text-center" width="120">
              <button
                type="button"
                class="btn btn-sm btn-success move"
                @click="openModal('edit', item)"
              >
                編輯
              </button>
              <button
                type="button"
                class="btn btn-sm btn-danger move ms-2"
                @click="openModal('del', item)"
              >
                刪除
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="d-flex justify-content-center">
        <Pagination
          :pages="pagination"
          @get-product-list="getProductList"
        ></Pagination>
      </div>
    </div>
    <div v-else>
      <Loading></Loading>
    </div>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination';
import UpdateModal from '@/components/UpdateModal';
import DeleteModal from '@/components/DeleteModal';
import Loading from '@/components/Loading';

export default {
  data() {
    return {
      products: {},
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
    Pagination,
    UpdateModal,
    DeleteModal,
    Loading
  },
  created() {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, "$1");
    if (!token) {
      this.$router.push('/login');
      return;
    }
    this.$http.defaults.headers.common['Authorization'] = token;
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
          this.$refs.updateModal.openModal();
          break;
        case 'edit':
          this.isNew = false;
          this.tempProduct = { ...item };
          this.$refs.updateModal.openModal();
          break;
        case 'del':
          this.tempProduct = { ...item };
          this.$refs.deleteModal.openModal();
          break;
        default:
          alert('錯誤');
      }
    },
    getProductList(page = 1) {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/products?page=${page}`;
      this.$http.get(url)
        .then(res => {
          if (res.data.success) {
            this.pagination = res.data.pagination;
            this.products = res.data.products;
          } else alert(res.data.message);
        }).catch(err => console.log(err.toString()));
    },
    logout() {
      const url = `${process.env.VUE_APP_API}/logout`;
      this.$http.post(url).then(res => {
        if (res.data.success) {
          document.cookie = `hexToken=; expires=`;
          window.location = './index.html';
        }
        alert(res.data.message);
      }).catch(err => console.log(err.toString())
      );
    }
  }
}
</script>
