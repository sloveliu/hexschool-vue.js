Vue.createApp({
  data() {
    return {
      userData: {
        username: null,
        password: null
      },
      loginBtn: null,
    };
  },
  methods: {
    login() {
      const url = `${apiUrl}/admin/signin`;
      this.userData = {
        username: document.querySelector("#username").value,
        password: document.querySelector("#password").value
      };
      axios.post(url, this.userData).then(res => {
        if (res.data.success) {
          const { token, expired} = res.data;
          document.cookie = `hexToken=${token}; expires=${new Date(expired)}`;
          window.location = './product.html';
        } else {
          alert(res.data.message);
        }
      }).catch(err => console.log(err.toString())
      );
    }
  },
}).mount('#app');
