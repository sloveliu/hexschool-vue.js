<template>
  <div class="my-5 row justify-content-center">
    <Form
      ref="orderForm"
      class="col-md-6"
      v-slot="{ errors }"
      @submit="createOrder"
    >
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <Field
          id="email"
          name="email"
          type="email"
          class="form-control"
          :class="{ 'is-invalid': errors['email'] }"
          placeholder="請輸入 Email"
          rules="email|required"
          v-model="form.user.email"
        ></Field>
        <ErrorMessage name="email" class="invalid-feedback"></ErrorMessage>
      </div>

      <div class="mb-3">
        <label for="name" class="form-label">收件人姓名</label>
        <Field
          id="name"
          name="姓名"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': errors['姓名'] }"
          placeholder="請輸入姓名"
          rules="required"
          v-model="form.user.name"
        ></Field>
        <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
      </div>

      <div class="mb-3">
        <label for="tel" class="form-label">收件人電話</label>
        <Field
          id="tel"
          name="電話"
          type="tel"
          class="form-control"
          :class="{ 'is-invalid': errors['電話'] }"
          placeholder="請輸入電話"
          rules="required|min:8|max:10"
          v-model="form.user.tel"
        ></Field>
        <ErrorMessage name="電話" class="invalid-feedback"></ErrorMessage>
      </div>

      <div class="mb-3">
        <label for="address" class="form-label">收件人地址</label>
        <Field
          id="address"
          name="地址"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': errors['地址'] }"
          placeholder="請輸入地址"
          rules="required"
          v-model="form.user.address"
        ></Field>
        <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
      </div>

      <div class="mb-3">
        <label for="message" class="form-label">留言</label>
        <textarea
          name=""
          id="message"
          class="form-control"
          cols="30"
          rows="10"
          v-model="form.message"
        ></textarea>
      </div>
      <div class="text-end">
        <button
          type="submit"
          class="btn btn-danger"
          :disabled="this.carts == 0"
        >
          <i class="fas fa-spinner fa-pulse" v-if="submitStatus"></i>
          送出訂單
        </button>
      </div>
    </Form>
  </div>
</template>
<script>

export default {
  data() {
    return {
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
      carts: 0,
      submitStatus: false
    };
  },
  methods: {
    createOrder() {
      if (this.carts == 0) return alert("購物車是空的喔！");
      this.submitStatus = true;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order`;
      this.$http.post(url, { data: this.form })
        .then((res) => {
          if (res.data.success) {
            this.$refs.orderForm.resetForm();
            this.form.message = '';
            this.getCart();
          }
          this.submitStatus = false;
          alert(res.data.message);
        }).catch(err => console.log(err.toString()));
    },
    getCart() {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
      this.$http.get(url).then((res) => {
        if (res.data.success) {
          this.carts = res.data.data.carts.length || 0;
        }
        else alert(res.data.message);
      }).catch(err => console.log(err.toString()));
    },
  },
  mounted() {
    this.getCart();
  }
}
</script>