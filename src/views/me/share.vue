<!--我，个人中心页面，分登录和未登录两种状态-->
<template>
  <v-content>
    <v-toolbar color="elevation-0">
      <v-btn icon to="/me" active-class>
        <v-icon>keyboard_arrow_left</v-icon>
      </v-btn>
      <v-toolbar-title>推广赚钱</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn icon @click.stop="helpDialog = true">
          <v-icon>help_outline</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-dialog
      v-model="helpDialog"
    >
      <v-card>
        <v-card-title class="headline">返佣说明</v-card-title>
        <v-card-text>
          邀请用户实盘操盘产生的手续费按佣金比例返佣。返佣有效期：每个邀请用户返佣期限为一年。
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            flat="flat"
            @click="helpDialog = false"
          >
            确定
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-container>
      <v-card color="elevation-0">
        <v-card-title primary-title class="pb-2">
          <div>
            <h3 class="headline mb-0">10%</h3>
            <div>返佣比例</div>
          </div>
        </v-card-title>

        <v-card-actions class="pb-4">
          <div class="sub-title">
            <h3 class="mb-0">15,378</h3>
            <div>可兑佣金(元)</div>
          </div>
          <v-spacer></v-spacer>
          <v-btn color="elevation-0 primary" class="border-radius-20">兑换</v-btn>
        </v-card-actions>
      </v-card>
    </v-container>

    <v-container>
      <v-card color="elevation-0">
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0 font-size-20">我的邀请码：18848</h3> 
            <div><span id="invite_url_span">http://www.example.com/i/18848</span></div>
          </div>
        </v-card-title>

        <v-divider></v-divider>

        <v-list>
          <v-list-tile  avatar @click="touch('/me/inviteusers')">
            <v-list-tile-action>
              <v-icon>list_alt</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>我的邀请人</v-list-tile-title>
            </v-list-tile-content> 
            <v-list-tile-action>
              <v-icon>keyboard_arrow_right</v-icon>
            </v-list-tile-action>
          </v-list-tile>

          <v-list-tile  avatar @click.stop="qrCodeDialog = true">
            <v-list-tile-action>
              <v-icon>crop_free</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>我的二维码</v-list-tile-title>
            </v-list-tile-content> 
            <v-list-tile-action>
              <v-icon>keyboard_arrow_right</v-icon>
            </v-list-tile-action>
          </v-list-tile>

          <v-list-tile avatar @click="copyInviteUrl()" ref="copy" data-clipboard-action="copy" id="copy_btn" data-clipboard-target="#invite_url_span" >
            <v-list-tile-action>
              <v-icon>link</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>我的邀请链接</v-list-tile-title>
              <v-list-tile-sub-title>点击复制</v-list-tile-sub-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-icon>keyboard_arrow_right</v-icon>
            </v-list-tile-action>
          </v-list-tile>

           
        </v-list>
      </v-card>
    </v-container>

    <v-container> 
        <v-list>
          <v-list-group
            v-for="qa in howInvites"
            :key="qa.title"
            v-model="qa.active"
            :prepend-icon="qa.icon"
          >
            <template v-slot:activator>
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>{{qa.title}}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>
            <v-list-tile v-for="(an,i) in qa.answers" :key="i">
              <v-list-tile-action>
              <v-icon>{{an.icon}}</v-icon>
            </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-sub-title>{{an.title}}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
        </v-list> 
    </v-container>
 
<!--我的二维码弹窗-->
<v-dialog
      v-model="qrCodeDialog"
      width = "280"
    >
      <v-card>
        <v-img
          :src="qrCodeImgUrl"
          aspect-ratio="2.75"
          height = "280"
        ></v-img>
        <v-card-title>
          <div>
            <canvas id="canvas" style="display:none;"></canvas>
            <h3 class="headline mb-0">我的邀请码：18848</h3>
            <div><span>http://www.example.com/i/18848</span></div>
          </div>
        </v-card-title>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            flat="flat"
            @click="qrCodeDialog = false"
          >
            确定
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!--snackbar 提示-->
    <v-snackbar
      v-model="snackbar.show" 
      :timeout="snackbar.timeout"
      :top="true"
    >
      {{ snackbar.msg }}
    </v-snackbar>

  </v-content>
</template>
 

<script>
import QRCode from "qrcode";
import Clipboard from "clipboard";

export default {
  components: {},
  data: () => ({
    snackbar: { show: false, msg: "", timeout: 3000 },
    qrCodeImgUrl: "",
    helpDialog: false,
    qrCodeDialog: false,
    copyBtn: null,

    howInvites: [
      {
        title: "如何赚钱",
        active: false,
        icon: "question_answer",
        answers: [
          { icon: "looks_one", title: "发送推广链接给朋友" },
          { icon: "looks_two", title: "他人点击链接注册成为您的邀请用户" },
          { icon: "looks_3", title: "您的邀请用户入金交易" },
          { icon: "looks_4", title: "您获得交易佣金" }
        ]
      }
    ]
  }),

  methods: {
    touch: function(item) {
      if (item.path !== "") {
        this.$router.push({ path: item.path });
      } else if (item.dialog) {
        item.openDialog();
      }
    },
    inviteQRCode: function(inviteUrl) {
      var canvas = document.getElementById("canvas");
      var _this = this; 
      QRCode.toCanvas(canvas, inviteUrl, function(error) {
        if (error) {
          console.error(error);
        } else {
          var type = "image/png";
          _this.qrCodeImgUrl = canvas
            .toDataURL(type)
            .replace("image/png", "image/octet-stream");
        }
      });
    },
    copyInviteUrl: function() {
      console.log("开始复制");
      let _this = this;
      let clipboard = _this.copyBtn;
      clipboard.on("success", function() {
        _this.snackbar.msg = "复制成功";
        _this.snackbar.show = true;
      });
      clipboard.on("error", function() {
        _this.snackbar.msg = "该浏览器不支持自动复制";
        _this.snackbar.show = true;
        // 不支持复制
        console.log("该浏览器不支持自动复制");
      });
    }
  },

  mounted: function() {
    this.$nextTick(function() {
      //注册拷贝
      var copyBtnDom = document.getElementById("copy_btn");
      this.copyBtn = new Clipboard(copyBtnDom);

      this.inviteQRCode("http://www.baidu.com");
    });
  }
};
</script>

<style scoped>
.min-width-auto {
  min-width: auto;
}
.font-size-14 {
  font-size: 18px;
}

.font-size-20 {
  font-size: 20px !important;
}

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