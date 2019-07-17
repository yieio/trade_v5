<template>
  <v-content>
    <v-toolbar color="elevation-0">
      <v-btn icon>
        <v-icon>keyboard_arrow_left</v-icon>
      </v-btn>
      <v-toolbar-title>注册</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat to="login">登录</v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-form ref="form" v-model="valid" lazy-validation class="pa-4">
      <v-text-field
        v-model="name"
        clear-icon="cancel"
        @click:clear="clearMessage"
        clearable
        :counter="11"
        :rules="nameRules"
        label="手机号码"
        required
      ></v-text-field>

      <v-layout wrap>
        <v-flex xs12 class="position-relative">
          <v-text-field v-model="vcode" :rules="vcodeRules" label="短信验证码" required></v-text-field>
          <v-btn outline flat small color="indigo" class="ma-0  position-absolute">获取验证码</v-btn>
        </v-flex>
      </v-layout>

      <v-text-field
        v-model="password"
        :type="passwordShow?'text':'password'"
        :rules="passwordRules"
        label="密码"
        :append-icon="passwordShow?'visibility' : 'visibility_off'"
        @click:append="passwordShow =!passwordShow"
        clearable
        clear-icon="cancel"
        @click:clear="clearMessage"
        required
      ></v-text-field>

      <v-btn block :disabled="!valid" color="primary" @click="validate">注册</v-btn>
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
    vcode: "",
    vcodeRules: [v => !!v || "请填写短信验证码"],
    passwordShow: false,
    password: "",
    passwordRules: [
      v => !!v || "请填写密码",
      v => (v && v.length >= 8) || "密码需要最少8位"
    ]
  }),

  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
      }
    },
    clearMessage() {
      this.message = "";
    }
  }
};
</script>

<style scoped>
.position-relative {
  position: relative;
}
.position-absolute {
  position: absolute;
  top: 16px;
  right: 0;
}
</style>