import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';

createApp({
  data() {
    return {
      userData: {
        username: null,
        password: null
      },
      apiUrl: "https://vue3-course-api.hexschool.io",
      apiPath: "api_path",
      loginBtn: null,
    };
  },
  methods: {
    login() {
      const url = `${this.apiUrl}/admin/signin`;
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
