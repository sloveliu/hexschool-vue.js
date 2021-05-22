const app = {
  userData: {
    username: null,
    password: null
  },
  apiUrl: "https://vue3-course-api.hexschool.io",
  apiPath: "api_path",
  loginBtn: null,
  init() {
    this.loginBtn = document.querySelector("#login");
    this.handler();
  },
  handler() {
    this.loginBtn.addEventListener('click', e => {
      e.preventDefault();
      this.userData = {
        username: document.querySelector("#username").value,
        password: document.querySelector("#password").value
      };
      this.login();
    });
  },
  login() {
    const url = `${this.apiUrl}/admin/signin`;
    axios.post(url, this.userData).then(res => {
      if (res.data.success) {
        this.userData.token = res.data.token;
        this.userData.expired = res.data.expired;
        document.cookie = `hexToken=${this.userData.token}; expires=${new Date(this.userData.expired)}`;
        window.location = './product.html';
      } else {
        alert(res.data.message);
      }
    }).catch(err => console.log(err.toString())
    );
  }
};
app.init();