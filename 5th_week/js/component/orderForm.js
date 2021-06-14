const { defineRule, Form, Field, ErrorMessage, configure } = VeeValidate;
const { required, email, min, max } = VeeValidateRules;
const { localize, loadLocaleFromURL } = VeeValidateI18n;
// 定義規則
defineRule('required', required);
defineRule('email', email);
defineRule('min', min);
defineRule('max', max);
// 載入 TW 語系
loadLocaleFromURL('https://unpkg.com/@vee-validate/i18n@4.1.0/dist/locale/zh_TW.json');

configure({
  generateMessage: localize('zh_TW'), // 設定使用 TW 語系
  validateOnInput: true // 輸入字元立即驗證
});

export default {
  template: `
  <div class="my-5 row justify-content-center">
  <v-form ref="orderForm" class="col-md-6" v-slot="{ errors }" @submit="createOrder">
    <div class="mb-3">
      <label for="email" class="form-label">Email</label>
      <v-field id="email" name="email" type="email" class="form-control"
        :class="{ 'is-invalid': errors['email'] }" placeholder="請輸入 Email" rules="email|required"
        v-model="form.user.email"></v-field>
      <error-message name="email" class="invalid-feedback"></error-message>
    </div>

    <div class="mb-3">
      <label for="name" class="form-label">收件人姓名</label>
      <v-field id="name" name="姓名" type="text" class="form-control" :class="{ 'is-invalid': errors['姓名'] }"
        placeholder="請輸入姓名" rules="required" v-model="form.user.name"></v-field>
      <error-message name="姓名" class="invalid-feedback"></error-message>
    </div>

    <div class="mb-3">
      <label for="tel" class="form-label">收件人電話</label>
      <v-field id="tel" name="電話" type="tel" class="form-control" :class="{ 'is-invalid': errors['電話'] }"
        placeholder="請輸入電話" rules="required|min:8|max:10" v-model="form.user.tel"></v-field>
      <error-message name="電話" class="invalid-feedback"></error-message>
    </div>

    <div class="mb-3">
      <label for="address" class="form-label">收件人地址</label>
      <v-field id="address" name="地址" type="text" class="form-control" :class="{ 'is-invalid': errors['地址'] }"
        placeholder="請輸入地址" rules="required" v-model="form.user.address"></v-field>
      <error-message name="地址" class="invalid-feedback"></error-message>
    </div>

    <div class="mb-3">
      <label for="message" class="form-label">留言</label>
      <textarea name="" id="message" class="form-control" cols="30" rows="10" v-model="form.message"></textarea>
    </div>
    <div class="text-end">
      <button type="submit" class="btn btn-danger">送出訂單</button>
    </div>
  </v-form>
  </div>
  `,
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
    };
  },
  components: {
    VForm: Form,
    VField: Field,
    ErrorMessage: ErrorMessage,
  },
  methods: {
    createOrder() {
      const url = `${apiUrl}/api/${apiPath}/order`;
      axios.post(url, { data: this.form })
        .then((res) => {
          if (res.data.success) {
            this.$refs.orderForm.resetForm();
            this.form.message = '';
            emitter.emit('get-cart');
          }
          alert(res.data.message);
        }).catch(err => console.log(err.toString()));
    },
  },
};
