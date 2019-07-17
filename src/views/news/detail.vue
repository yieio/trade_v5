<!--
新闻详情页面
-->
<template>
  <v-content>
    <v-toolbar dark fixed app extended color="elevation-0 primary">
      <v-btn icon dark @click="back">
        <v-icon>keyboard_arrow_left</v-icon>
      </v-btn>
      <v-toolbar-title>新闻详情</v-toolbar-title>
      <template v-slot:extension>
       <span>{{title}}</span>
    </template>
    </v-toolbar>
 
    <iframe
          :src="url"
          id="dialogFrame"
          frameborder="0"
          style="background-color:transparent; position: absolute; width: 100%; height: 100%;"
        ></iframe>
  </v-content>
</template>

<script>
export default {
  props: {
    title: { type: String, default: "" },
    url: { type: String, default: "" }
  },
  methods:{
    back:function(){
      this.$router.back(-1);
    }
  }
};
</script>

