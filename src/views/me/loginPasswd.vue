<!--
登录状态，修改登录密码
原密码
新密码
-->

<template>
  <v-content>
    <v-toolbar color="elevation-0">
      <v-btn icon>
        <v-icon>keyboard_arrow_left</v-icon>
      </v-btn>
      <v-toolbar-title>登录密码</v-toolbar-title>
    </v-toolbar>

    <v-container>
      <v-card color="elevation-0">
        <v-card-title class="title font-weight-regular justify-space-between">
          <span>修改登录密码</span>
        </v-card-title>

        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="oldPassword"
              :type="oldPasswordShow?'text':'password'"
              :rules="oldPasswordRules"
              label="原密码"
              :append-icon="oldPasswordShow?'visibility' : 'visibility_off'"
              @click:append="oldPasswordShow =!oldPasswordShow"
              clearable
              clear-icon="cancel"
              @click:clear="clearMessage"
              required
            ></v-text-field>
 
            <v-text-field
              v-model="password"
              :type="passwordShow?'text':'password'"
              :rules="passwordRules"
              label="新密码"
              :append-icon="passwordShow?'visibility' : 'visibility_off'"
              @click:append="passwordShow =!passwordShow"
              clearable
              clear-icon="cancel"
              @click:clear="clearMessage"
              required
            ></v-text-field>

            <v-btn block :disabled="!valid" color="primary" @click="validate">确认修改</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>
  </v-content>
</template>


<script>
export default {
  data: () => ({
    valid: true, 
    passwordShow: false,
    password: "",
    passwordRules: [
      v => !!v || "请填写新密码",
      v => (v && v.length >= 8) || "密码需要最少8位"
    ],
    oldPasswordShow: false,
    oldPassword: "",
    oldPasswordRules: [
      v => !!v || "请填写原密码"
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