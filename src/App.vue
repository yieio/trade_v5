<template>
  <v-app>
    <keep-alive>
    <router-view v-if="$route.meta.keepAlive"/>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"/>
    <!--page loadding 全局页面加载-->
    <v-dialog v-model="loaddingDialog" persistent color="elevation-0" content-class="loadding-box">
      <v-card>
        <v-card-text>
          <v-progress-circular indeterminate color="grey lighten-1"></v-progress-circular>
          <p>加载中...</p>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-app>
</template>
<script> 

export default {
  name: "App",
  components: {},
  data() {
    return { 
    };
  },
  computed: {
    loaddingDialog() {
      
      return this.$store.state.isLoadding;
    }
  }
};
</script>

<style>
.theme--light.application {
  background: #f5f5f5;
  color: rgba(0, 0, 0, 0.87);
}

.loadding-box {
  width: 100px;
  box-shadow: none;
  -webkit-box-shadow: none;
  text-align: center;
}
.loadding-box p{
  padding:0;
  margin:0;
}
</style>
