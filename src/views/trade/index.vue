<!--
交易首页
持仓-国际期货-国内期货
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
            <CommdityList :commdityArr="commdityArr" />
        </v-tab-item>

        <!-- <v-tab-item :key="tabItems[1].name">
            {{tabItems[1].name}}
        </v-tab-item>

        <v-tab-item :key="tabItems[2].name">
            {{tabItems[2].name}}
        </v-tab-item> -->
      </v-tabs-items>
    </v-container>

    <Toolbar/>
  </v-content>
</template>

<script>
import Toolbar from "../../components/Toolbar";
import CommdityList from "../../components/CommdityList"

export default {
  components: {
    Toolbar,
    CommdityList
  },
  data: () => ({
    tab: 0,
    tabItems: [
    //   { type: 3, name: "持仓", firstShow: false },
    //   { type: 0, name: "国内期货", firstShow: true },
      { type: 1, name: "国际期货", firstShow: true }
    ], 
    tabLoadHandler: null, //tab 切换时延迟加载数据
    commdityArr:[{name:"美原油",code:"CL1906",price:61.50,percent:1.35},{name:"美黄金",code:"GC1906",price:1284.2,percent:-0.24}], //合约列表
  }),

  methods: {
    tabSwitch: function() {
      var _t = this;
      if (_t.tabItems[_t.tab].firstShow) {
        _t.getData();
      }
      _t.tabItems[_t.tab].firstShow = false;
    },
    getData: function() {
      console.log("getData");
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

