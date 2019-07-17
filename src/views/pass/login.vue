<template>
  <v-content>
    <v-toolbar color="elevation-0">
      <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->
      <v-btn icon>
        <v-icon>keyboard_arrow_left</v-icon>
      </v-btn>
      <v-toolbar-title>登录</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat to="signup">注册</v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-form ref="form" v-model="valid" lazy-validation class="pa-4">
      <v-text-field v-model="name" :counter="11" :rules="nameRules" label="手机号码" required></v-text-field>

      <v-text-field v-model="password" type="password" :rules="passwordRules" label="密码" required></v-text-field>

      <v-btn block  :disabled="!valid" color="primary" @click="validate">登录</v-btn>

      <v-btn block flat small class="mt-3" to="resetpwd" color="indigo">忘记密码</v-btn>
    </v-form>
  </v-content>
</template>


<script>
export default {
  data: () => ({
    valid: true,
    name: "",
    nameRules: [
      v => !!v || "请填写手机号码",
      v => (v && v.length == 11) || "请填写11位手机号码"
    ],
    password: "",
    passwordRules: [
      v => !!v || "请填写密码",
      v => (v && v.length <= 8) || "密码需要最少8位"
    ]
  }),

  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
      }
    }
  }
};
</script>