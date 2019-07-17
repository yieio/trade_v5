<!--
资讯页
实时资讯-新闻-突发行情
-->

<template>
  <v-content>
    <v-container pa-0>
      <div class="tab-wrapper">
        <v-tabs v-model="tab" color grow @change="tabSwitch">
          <v-tabs-slider color="primary"></v-tabs-slider>
          <v-tab v-for="item in tabItems" :key="item.type" class="tab-border">{{ item.name }}</v-tab>
        </v-tabs>
      </div>
      <div class="tab-wrapper-shadow"></div>

      <v-tabs-items v-model="tab">
        <v-tab-item :key="tabItems[0].name">
          <NewsFlash :orgNewsData="orgNewsData"/>
        </v-tab-item>

        <v-tab-item :key="tabItems[1].name">
          <NewsListTemp :newsArr="newsListArr"/>
        </v-tab-item>

        <v-tab-item :key="tabItems[2].name">
          <NewsListTemp :newsArr="newsListArr1"/>
        </v-tab-item>
      </v-tabs-items>
    </v-container>

    <Toolbar/>
  </v-content>
</template>

<script>
import Toolbar from "../../components/Toolbar";
import NewsFlash from "../../components/NewsFlash";
import NewsListTemp from "../../components/NewsList";
//import { setTimeout, clearTimeout } from "timers";

export default {
  components: {
    Toolbar,
    NewsFlash,
    NewsListTemp
  },
  data: () => ({
    tab: 0,
    tabItems: [
      { type: 1, name: "资讯" ,firstShow:false},
      { type: 0, name: "新闻" ,firstShow:true},
      { type: 35, name: "大事件" ,firstShow:true}
    ],
    newsDate: { month: "05", day: "10" },
    orgNewsData: [],
    newsListArr: [],
    newsListArr1: [],
    tabLoadHandler: null //tab 切换时延迟加载数据
  }),

  methods: {
    tabSwitch: function() {
      var _t = this;
      if(_t.tabItems[_t.tab].firstShow){
        _t.getData();
      }
      _t.tabItems[_t.tab].firstShow = false; 
    },
    getData: function() {
      var _t = this;
      var type = _t.tabItems[_t.tab].type;
      _t.$store.commit("setIsLoadding", true);
      _t.$ajax
        .get(_t.$conf.tenant.news + "type=" + type+"&ctype="+type)
        .then(function(resp) {
          _t.$store.commit("setIsLoadding", false);
          var baseUrl = _t.$conf.tenant.news + "type=";
          if (resp.config.url == baseUrl + _t.tabItems[2].type+"&ctype="+_t.tabItems[2].type) {
            _t.newsListArr1 = resp.data.list;
          } else if (resp.config.url == baseUrl + _t.tabItems[1].type+"&ctype="+_t.tabItems[1].type) {
            _t.newsListArr = resp.data.list;
            console.log(resp);
          } else {
            _t.orgNewsData = resp.data;
          }
        })
        .catch(function(error) {
          _t.$store.commit("setIsLoadding", false);
          console.log(error);
        });
    }
  },

  mounted: function() {
    this.getData();
  }
};
</script>

<style scoped>
.tab-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 3;
  height: 48px;
  -webkit-box-shadow: 0 1px 3px 1px rgba(0, 0, 0, 0.05);
  box-shadow: 0 1px 3px 1px rgba(0, 0, 0, 0.05);
}
.tab-wrapper-shadow {
  height: 48px;
}
</style>