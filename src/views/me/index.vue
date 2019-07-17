<!--我，个人中心页面，分登录和未登录两种状态-->
<template>
  <v-content>
    <v-container>
      <v-layout wrap>
        <v-flex xs3 align-center justify-center layout text-xs-center>
          <v-avatar size="64" color="grey lighten-2">
            <img src="https://vuetifyjs.com/apple-touch-icon-180x180.png" alt="avatar">
          </v-avatar>
        </v-flex>
        <v-flex xs6 align-center class="pt-2">
          <p style="font-size:18px;">用户昵称</p>
          <p>132****1445</p>
        </v-flex>

        <v-flex xs3>
          <v-toolbar color="elevation-0" class="bg-transport" flat height="40">
            <v-btn icon to="/me/settings">
              <v-icon>settings</v-icon>
            </v-btn>

            <v-btn icon>
              <v-icon>message</v-icon>
            </v-btn>
          </v-toolbar>
        </v-flex>
      </v-layout>
    </v-container>

    <v-container>
      <v-card color="elevation-0">
        <v-card-title primary-title class="pb-2">
          <div>
            <h3 class="headline mb-0">12,509.00</h3>
            <div>资产总额(元)</div>
          </div>
        </v-card-title>

        <v-card-actions class="pb-4">
          <div class="sub-title">
            <h3 class="mb-0">9,912,509.00</h3>
            <div>可用余额(元)</div>
          </div>
          <v-spacer></v-spacer>

          <v-btn outline color="grey darken-3" class="border-radius-20">提现</v-btn>
          <v-btn color="elevation-0 primary" class="border-radius-20">充值</v-btn>
        </v-card-actions>
      </v-card>
    </v-container>

    <v-container>
      <v-card color="elevation-0">
        <v-list subheader>
          <!-- <v-subheader>Recent chat</v-subheader> -->
          <v-list-tile v-for="item in items" :key="item.title" avatar @click="touch(item)">
            <v-list-tile-action>
              <v-icon>{{item.icon}}</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title v-html="item.title"></v-list-tile-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-icon :color="item.active ? 'teal' : 'grey'">keyboard_arrow_right</v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-container>

    <Toolbar/>
  </v-content>
</template>


<script>
import Toolbar from "../../components/Toolbar";

export default {
  components: {
    Toolbar
  },
  data: () => ({
    items: [
      { icon: "local_atm", title: "资金明细", path: "/account/billlist" },
      { icon: "share", title: "推广赚钱", path: "/me/share" },
      { icon: "credit_card", title: "银行卡", path: "/me/bankcard" },
      { icon: "textsms", title: "信息中心", path: "/me/messages" },
      { icon: "settings", title: "个人设置", path: "/me/settings" }
    ]
  }),

  methods: {
    touch: function(item) {
      if (item.path !== "") {
        this.$router.push({ path: item.path });
      }
    }
  }
};
</script>

<style scoped>
p {
  padding: 0px;
  margin: 0px;
}
.sub-title {
  padding-left: 8px;
}
.sub-title h3 {
  font-size: 18px;
}
.border-radius-20 {
  border-radius: 20px;
}
.bg-transport {
  background: none;
}
</style>