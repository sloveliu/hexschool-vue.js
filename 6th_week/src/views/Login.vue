<template>
  <div class="my-5 row justify-content-center" ref="login">
    <Form ref="orderForm" class="col-md-6" v-slot="{ errors }" @submit="login">
      <div class="mb-3">
        <label for="email" class="form-label">帳號信箱</label>
        <Field
          id="email"
          name="帳號"
          type="email"
          class="form-control"
          :class="{ 'is-invalid': errors['帳號'] }"
          placeholder="請輸入帳號"
          rules="email|required"
          v-model="userData.username"
        ></Field>
        <ErrorMessage name="email" class="invalid-feedback"></ErrorMessage>
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">密碼</label>
        <Field
          id="password"
          name="密碼"
          type="password"
          class="form-control"
          :class="{ 'is-invalid': errors['密碼'] }"
          placeholder="請輸入密碼"
          rules="required"
          v-model="userData.password"
        ></Field>
        <ErrorMessage name="密碼" class="invalid-feedback"></ErrorMessage>
      </div>
      <div class="text-center">
        <button
          type="submit"
          class="btn btn-danger"
          :disabled="!this.userData.username"
        >
          登入
        </button>
      </div>
    </Form>
  </div>
</template>
<script>

export default {
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
      const url = `${process.env.VUE_APP_API}/admin/signin`;
      this.$http.post(url, this.userData).then(res => {
        if (res.data.success) {
          const { token, expired } = res.data;
          document.cookie = `hexToken=${token}; expires=${new Date(expired)}`;
          this.$router.push('/admin');
        } else {
          alert(res.data.message);
        }
      }).catch(err => console.log(err.toString())
      );
    }
  },
}
</script>