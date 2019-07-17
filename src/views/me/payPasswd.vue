<!--
提现密码
通过手机获取验证码进行修改
-->

<template>
  <v-content>
    <v-toolbar color="elevation-0">
      <v-btn icon>
        <v-icon>keyboard_arrow_left</v-icon>
      </v-btn>
      <v-toolbar-title>提现密码</v-toolbar-title> 
    </v-toolbar>
    <v-container>
      <v-card color="elevation-0">
        <v-card-title class="title font-weight-regular justify-space-between">
          <span>设置/修改提现密码</span>
        </v-card-title>

        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation class>
            <v-text-field
              clear-icon="cancel"
              @click:clear="clearMessage"
              label="手机号码"
              value = "132****1445"
              disabled
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
              label="提现密码"
              :append-icon="passwordShow?'visibility' : 'visibility_off'"
              @click:append="passwordShow =!passwordShow"
              clearable
              clear-icon="cancel"
              @click:clear="clearMessage"
              required
            ></v-text-field>

            <v-btn block :disabled="!valid" color="primary" @click="validate">提交</v-btn>
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
    vcode: "",
    vcodeRules: [v => !!v || "请填写短信验证码"],
    passwordShow: false,
    password: "",
    passwordRules: [
      v => !!v || "请填提现密码",
      v => (v && v.length >= 8) || "提现密码需要最少8位"
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