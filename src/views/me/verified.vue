<!--
实名认证，
1.已经实名认证，直接显示实名认证信息
2.未实名认证，分实名和绑卡两个步骤，绑定的卡用于提现
-->
<template>
  <v-content>
    <v-toolbar color="elevation-0"> 
      <v-btn icon to="/me" active-class>
        <v-icon>keyboard_arrow_left</v-icon>
      </v-btn>
      <v-toolbar-title>实名认证</v-toolbar-title> 
    </v-toolbar>

    <v-container>
      <v-card color="elevation-0">
        <v-card-title class="title font-weight-regular justify-space-between">
          <span>{{ currentTitle }}</span>
          <v-avatar
            color="primary lighten-2"
            class="subheading white--text"
            size="24"
            v-text="step"
          ></v-avatar>
        </v-card-title>

        <v-window v-model="step">
          <v-window-item :value="1">
            <v-card-text>
              <v-text-field label="姓名" value></v-text-field>
              <v-text-field label="身份证号" value></v-text-field>
            </v-card-text>
          </v-window-item>

          <v-window-item :value="2">
            <v-card-text>
              <v-text-field label="开户名" value="张三" disabled></v-text-field>

              <v-select :items="bankNames" label="开户银行"></v-select>
              <v-layout wrap align-center>
                <v-flex xs6>
                  <v-select :items="provinces" label="开户省"></v-select>
                </v-flex>
                <v-flex xs6>
                  <v-select :items="citys" label="开户市"></v-select>
                </v-flex>
              </v-layout>
              <v-text-field label="开户支行" value></v-text-field>
              <v-text-field label="银行卡号" value></v-text-field>
            </v-card-text>
          </v-window-item>
        </v-window>

        <v-card-actions>
          <v-btn outline :disabled="step === 1" flat @click="step--">上一步</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" depressed @click="nextStep()">{{step==1?"下一步":"确认提交"}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </v-content>
</template>

<script>
export default {
  data: () => ({
    step: 1,
    bankNames: ["工商银行", "农业银行", "建设银行", "招商银行"],
    proviceCity: [],
    provinces: ["广东省", "北京市"],
    citys: ["广州市", "北京市"],
    vcode: "",
    vcodeRules: [v => !!v || "请填写短信验证码"],
    vcode2: "",
    vcodeRules2: [v => !!v || "请填写短信验证码"]
  }),

  computed: {
    currentTitle() {
      switch (this.step) {
        case 1:
          return "实名信息";
        case 2:
          return "绑定提现卡";
        default:
          return "绑定提现卡";
      }
    }
  },
  methods: {
    nextStep: function() {
      if (this.step == 1) {
        this.step = 2;
      }
    },
    proviceCityAppend: function() {
      console.log("the step 2");
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

