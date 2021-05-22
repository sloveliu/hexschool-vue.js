const app = {
  data: [],
  token: '',
  apiUrl: "https://vue3-course-api.hexschool.io",
  apiPath: "api_path",
  product: {},
  init() {
    this.token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    if (!this.token) {
      window.location = './index.html';
      return
    }
    axios.defaults.headers.common['Authorization'] = this.token;
    this.product.list = document.querySelector(".js-productList");
    this.product.count = document.querySelector("#productCount");
    this.logoutBtn = document.querySelector("#logout");
    this.getProductList();
    this.handler();
  },
  handler() {
    this.logoutBtn.addEventListener('click', e => {
      e.preventDefault();
      this.logout();
    });
    this.product.list.addEventListener('click', e => {
      e.preventDefault();
      const action = e.target.dataset.action;
      let id = e.target.dataset.id;
      if (action === "remove") this.data = this.deleteProduct(id);
    });
  },
  buildList(item) {
    return `
      <tr>
      <td>${item.title}</td>
      <td width="120">
        ${item.origin_price}
      </td>
      <td width="120">
        ${item.price}
      </td>
      <td width="100">
        <span class="badge ${item.is_enabled ? 'bg-primary' : 'bg-secondary'}">${item.is_enabled ? '啟用' : '停用'}</span>
      </td>
      <td width="120">
        <button type="button" class="btn btn-sm btn-outline-danger move deleteBtn" data-action="remove"
          data-id="${item.id}"> 刪除 </button>
      </td>
    </tr>`;
  },
  render() {
    str = '';
    this.data.forEach(item => {
      str += this.buildList(item);
    });
    this.product.list.innerHTML = str;
    this.product.count.textContent = this.data.length;
  },
  getProductList() {
    const url = `${this.apiUrl}/api/${this.apiPath}/products/all`;
    axios.get(url)
      .then(res => {
        if (res.data.success) {
          this.data = res.data.products;
          this.render();
        } else alert(res.data.message);
      }).catch(err => console.log(err.toString())
      );
  },
  deleteProduct(id) {
    const url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${id}`;
    axios.delete(url)
      .then(res => {
        if (res.data.success) {
          this.data = res.data.products;
          this.getProductList();
        }
        alert(res.data.message);
      }).catch(err => console.log(err)
      );
  },
  logout() {
    const url = `${this.apiUrl}/logout`;
    axios.post(url).then(res => {
      if (res.data.success) {
        document.cookie = `hexToken=; expires=`;
        window.location = './index.html';
      }
      alert(res.data.message)
    }
    ).catch(err => console.log(err.toString())
    );
  }
};
app.init();