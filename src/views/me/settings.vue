<!--
个人设置页面，
头像，昵称，手机号，实名认证（只能认证一次），登录密码，提现密码
-->
<template>
  <v-content>
    <v-toolbar color="elevation-0">
      <v-btn icon to="/me" active-class>
        <v-icon>keyboard_arrow_left</v-icon>
      </v-btn>
      <v-toolbar-title>个人设置</v-toolbar-title>
    </v-toolbar>

    <v-container>
      <v-card color="elevation-0">
        <v-list class="pa-0">
          <template v-for="(item, index) in items">
            <v-divider v-if="item.divider" :key="index" :inset="item.inset"></v-divider>

            <v-list-tile
              v-else
              :key="item.index"
              @click="touch(item)"
              @click.stop="{IsModifyNickName=item.IsModifyNickName}"
            >
              <v-list-tile-content>
                <v-list-tile-title v-html="item.title"></v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-avatar v-if="item.avatar" color="grey lighten-2">
                <img src="https://vuetifyjs.com/apple-touch-icon-180x180.png">
              </v-list-tile-avatar>

              <v-list-tile-action-text v-else class="font-size-14">{{item.value}}</v-list-tile-action-text>

              <v-list-tile-action class="min-width-auto">
                <v-icon :color="item.active ? 'teal' : 'grey'">keyboard_arrow_right</v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </template>
        </v-list>
      </v-card>
    </v-container>
    <!--
    昵称的修改很简单，所以直接弹窗
    -->
    <v-bottom-sheet v-model="IsModifyNickName" :persistent="true">
      <v-card :min-height="ModifyDialogHeight">
        <v-card-title>
          <span class="headline">修改昵称</span>
        </v-card-title>
        <v-card-text>
          <v-text-field label="昵称" required value="yieio" autofocus></v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="elevation-0 primary">保存</v-btn>
          <v-btn flat color @click="IsModifyNickName = false">取消</v-btn>
        </v-card-actions>
      </v-card>
    </v-bottom-sheet>

    <v-container>
      <v-card color="elevation-0">
        <v-list class="pa-0">
          <template v-for="(item, index) in items2">
            <v-divider v-if="item.divider" :key="index" :inset="item.inset"></v-divider>

            <v-list-tile v-else :key="item.index" @click="touch(item)">
              <v-list-tile-content>
                <v-list-tile-title v-html="item.title"></v-list-tile-title>
              </v-list-tile-content>

              <v-list-tile-action-text class="font-size-14">{{item.value}}</v-list-tile-action-text>

              <v-list-tile-action class="min-width-auto">
                <v-icon :color="item.active ? 'teal' : 'grey'">keyboard_arrow_right</v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </template>
        </v-list>
      </v-card>
    </v-container>

    <v-container>
      <v-btn block color="elevation-0 white" @click="logout()">退出登录</v-btn>
    </v-container>
  </v-content>
</template>

<script>
export default {
  components: {},
  data: () => ({
    IsModifyNickName: false,
    ModifyDialogHeight: 800,
    items: [
      { avatar: true, title: "头像", path: "/me/avatar" },
      { divider: true, inset: false },
      { title: "昵称", value: "yieio", IsModifyNickName: true },
      { divider: true, inset: false },
      { title: "手机号码", value: "132****1445", path: "/me/phonenum" },
      { divider: true, inset: false },
      { title: "实名认证", value: "**平", path: "/me/verified" }
    ],
    items2: [
      { title: "登录密码", value: "已设置", path: "/me/loginpasswd" },
      { divider: true, inset: false },
      { title: "提现密码", value: "已设置", path: "/me/paypasswd" }
    ]
  }),
  mounted: function() {
    this.ModifyDialogHeight = window.screen.height * 0.9;
  },

  methods: {
    touch: function(item) {
      if (item.path !== "") {
        this.$router.push({ path: item.path });
      }
    },
    logout: function() {
      console.log("user logout");
    }
  }
};
</script>

<style scoped>
.min-width-auto {
  min-width: auto;
}
.font-size-14 {
  font-size: 16px;
}
.pa-0 {
  padding: 0;
}

.top-sheet {
  -ms-flex-item-align: start;
  align-self: flex-start;
}

.v-bottom-sheet.v-dialog {
  -ms-flex-item-align: start;
  align-self: flex-start;
}
</style>
