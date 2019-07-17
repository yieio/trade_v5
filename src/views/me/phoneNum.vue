<!--
修改手机号码
1.原手机号码获取验证码
2.新手机号码，获取验证码
3.提交修改
-->

<template>
  <v-content>
    <v-toolbar color="elevation-0">
      <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->
      <v-btn icon to="/me" active-class>
        <v-icon>keyboard_arrow_left</v-icon>
      </v-btn>
      <v-toolbar-title>修改手机号</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items></v-toolbar-items>
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
              <v-text-field label="原手机号" value="132****1445" disabled></v-text-field>

              <v-layout wrap>
                <v-flex xs12 class="position-relative">
                  <v-text-field v-model="vcode" :rules="vcodeRules" label="短信验证码" required></v-text-field>
                  <v-btn outline flat small color="indigo" class="ma-0  position-absolute">获取验证码</v-btn>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-window-item>

          <v-window-item :value="2">
            <v-card-text>
              <v-text-field label="新手机号码" type="text"></v-text-field>
              <v-layout wrap>
                <v-flex xs12 class="position-relative">
                  <v-text-field v-model="vcode2" :rules="vcodeRules2" label="短信验证码" required></v-text-field>
                  <v-btn outline flat small color="indigo" class="ma-0  position-absolute">获取验证码</v-btn>
                </v-flex>
              </v-layout> 
            </v-card-text>
          </v-window-item>
        </v-window>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn :disabled="step === 3" color="primary" depressed @click="modifyPhoneNum()">{{step==1?"下一步":"确认修改"}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </v-content>
</template>

<script>
export default {
  data: () => ({
    step: 1,
    vcode: "",
    vcodeRules: [v => !!v || "请填写短信验证码"],
    vcode2: "",
    vcodeRules2: [v => !!v || "请填写短信验证码"]
  }),

  computed: {
    currentTitle() {
      switch (this.step) {
        case 1:
          return "验证原手机";
        case 2:
          return "设置新号码";
        default:
          return "验证原手机";
      }
    }
  },
  methods:{
      modifyPhoneNum:function(){
          if(this.step==1){
              this.step = 2;
          }else{
              console.log("the step 2");
          }
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
