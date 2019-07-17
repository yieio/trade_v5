<!--
用户头像设置
采用编辑插件 vue-cropper
-->
<template>
  <v-content>
    <v-toolbar color="elevation-0">
      <v-btn icon to="/me" active-class>
        <v-icon>keyboard_arrow_left</v-icon>
      </v-btn>
      <v-toolbar-title>头像</v-toolbar-title>
    </v-toolbar>

    <v-container>
      <v-card color="elevation-0">
        <v-card-title class="title font-weight-regular justify-space-between">
          <span>设置/更换头像</span>
          <div
            class = "grey lighten-2"
            :style="preViewStyle"
          >
            <div :style="previews.div" class="avatar-img-wrap">
              <img :src="previews.url" :style="previews.img">
            </div>
          </div>
        </v-card-title>

        <v-card-text class="cropper-wrap">
          <vueCropper
            ref="cropper"
            :img="option.img"
            :outputSize="option.size"
            :outputType="option.outputType"
            :info="true"
            :full="option.full"
            :canMove="option.canMove"
            :canMoveBox="option.canMoveBox"
            :original="option.original"
            :autoCrop="option.autoCrop"
            :autoCropWidth="option.autoCropWidth"
            :autoCropHeight="option.autoCropHeight"
            :fixedBox="option.fixedBox"
            @realTime="realTime"
            @imgLoad="imgLoad"
          ></vueCropper>
        </v-card-text>

        <v-card-actions>
          <!-- <v-btn outline depressed @click="changeImage()" :type="file">更换图片</v-btn> -->
          <label
            class="v-btn v-btn--outline elevation-0"
            for="uploads" 
          >选择图片</label>
          <input
            type="file"
            id="uploads"
            :value="imgFile"
            style="position:absolute; clip:rect(0 0 0 0);"
            accept="image/png, image/jpeg, image/gif, image/jpg"
            @change="changeImage($event, 1)"
          >
          <v-spacer></v-spacer>
          <v-btn color="primary" depressed @click="uploadAvatar()">保存</v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </v-content>
</template>

<script>
import { VueCropper } from "vue-cropper";

export default {
  data: () => ({
    headImg: "",
    crap: false,
    previews: {},
    preViewStyle: {},
    option: {
      img: require("../../assets/logo.png"),
      size: 1,
      full: false, //输出原图比例截图 props名full
      outputType: "png",
      canMove: true,
      original: false,
      canMoveBox: true,
      autoCrop: true,
      autoCropWidth: 200,
      autoCropHeight: 200,
      fixedBox: true
    },
    fileName: "", //本机文件地址
    downImg: "#",
    imgFile: "",
    uploadImgRelaPath: "" //上传后的图片的地址（不带服务器域名）
  }),
  components: {
    VueCropper
  },
  computed: {},
  methods: {
    //上传图片（点击上传按钮）
    uploadAvatar(type) {
      console.log("finish");
      //let _this = this;
      let formData = new FormData();
      // 输出
      if (type === "blob") {
        this.$refs.cropper.getCropBlob(data => {
          let img = window.URL.createObjectURL(data);
          this.model = true;
          this.modelSrc = img;
          formData.append("file", data, this.fileName);

          //   this.$http
          //     .post(Api.uploadSysHeadImg.url, formData, {
          //       contentType: false,
          //       processData: false,
          //       headers: { "Content-Type": "application/x-www-form-urlencoded" }
          //     })
          //     .then(response => {
          //       var res = response.data;
          //       if (res.success == 1) {
          //         //$("#btn1").val("");
          //         _this.imgFile = "";
          //         _this.headImg = res.realPathList[0]; //完整路径
          //         _this.uploadImgRelaPath = res.relaPathList[0]; //非完整路径
          //         _this.$message({
          //           //element-ui的消息Message消息提示组件
          //           type: "success",
          //           message: "上传成功"
          //         });
          //       }
          //     });
        });
      } else {
        this.$refs.cropper.getCropData(data => {
          this.model = true;
          this.modelSrc = data;
        });
      }
    },
    // 实时预览函数
    realTime(data) {
      console.log("realTime");
      this.previews = data;
      var _pre = this.previews;
      this.preViewStyle = {
        width: _pre.w + "px",
        height: _pre.h + "px",
        overflow: "hidden",
        margin: "0",
        zoom: 100 / _pre.h
      };
      this.previews = data;
    },
    //选择本地图片
    changeImage(e, num) {
      console.log("changeImage");
      var _this = this;
      //上传图片
      var file = e.target.files[0];
      _this.fileName = file.name;
      if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
        alert("图片类型必须是.gif,jpeg,jpg,png,bmp中的一种");
        return false;
      }
      var reader = new FileReader();
      reader.onload = e => {
        let data;
        if (typeof e.target.result === "object") {
          // 把Array Buffer转化为blob 如果是base64不需要
          data = window.URL.createObjectURL(new Blob([e.target.result]));
        } else {
          data = e.target.result;
        }
        if (num === 1) {
          _this.option.img = data;
        } else if (num === 2) {
          _this.example2.img = data;
        }
      };
      // 转化为base64
      // reader.readAsDataURL(file)
      // 转化为blob
      reader.readAsArrayBuffer(file);
    },
    imgLoad(msg) {
      console.log("imgLoad");
      console.log(msg);
    }
  }
};
</script>

 <style scoped>
.cropper-wrap {
  height: 360px;
}
.vue-cropper {
  background-repeat: repeat;
}
.avatar-img-wrap {
  border-radius: 50%;
}
</style>
 
