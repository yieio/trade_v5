<!--
首页，banner,公告栏,入口栏，热门交易品种
-->
<template>
  <v-content>
 <v-toolbar color="elevation-0" :fixed="true" :app="true"> 
      <v-toolbar-title>期货宝</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat to="signup">注册/登陆</v-btn>
      </v-toolbar-items>
    </v-toolbar>

<v-container pa-2> 
<v-carousel :height=128 hide-delimiters hide-controls>
    <v-carousel-item
      v-for="(item,i) in bannerItems"
      :key="i"
      :src="item.src"
    ></v-carousel-item>
  </v-carousel>

  <!--公告栏-->
  <v-container pa-0 style="background:#ffffff;">
    <v-layout pa-2>
      <v-flex xs1 sm1 md1><v-icon color="red">notifications</v-icon></v-flex>
      <v-flex xs11 sm11 md11>
        <v-window
         v-model="noticeIndex"
        class="elevation-0"
        vertical
        >
          <v-window-item v-for="(n,index) in noticeItems"
          :key="'notice_'+index">
          <span style="line-height:2.0;">{{n.title}}</span>
          </v-window-item>
        </v-window> 
      </v-flex>
    </v-layout>
  </v-container>
  <!--公告栏结束-->

<v-container fluid grid-list-md pa-0 pt-3>
  <v-layout row wrap>
      <v-flex d-flex xs7 sm7 md7>
        <v-card flat to="trade">
          <v-card-title>
            <div>
            <h3 class="title">实盘交易</h3>
            <div>小资金大盈利，方便快捷 </div>
            </div>
            </v-card-title> 
        </v-card>
      </v-flex>
      
      <v-flex d-flex xs5 sm5 md5> 
         <v-layout row wrap>
           <v-flex d-flex xs12>
             <v-card flat>
               <v-card-actions>
        <v-icon>trending_up</v-icon>&nbsp;&nbsp;模拟练习</v-card-actions> 
             </v-card>
             </v-flex>
               <v-flex d-flex xs12>
             <v-card flat>

              <v-card-actions>
        <v-icon>help_outline</v-icon>&nbsp;&nbsp;帮助中心
      </v-card-actions>
             </v-card>
             </v-flex>
         </v-layout> 
      </v-flex>

      </v-layout>
</v-container>

<v-container pa-0 pt-3>
 <div style="background:#ffffff;">
   <div class="pt-3 pb-3 pl-2"><h3 class="title"><v-icon color="red">stars</v-icon> 热门交易品种</h3></div>
    <div>
      <commdity-list :commdityArr="commdityArr" />
    </div>
 </div>
</v-container>
</v-container>
    <Toolbar/>
  </v-content>
</template>

<script>
import Toolbar from "../../components/Toolbar";
import CommdityList from "../../components/CommdityList";

export default {
  components: {
    Toolbar,
    CommdityList
  },
  data: () => ({
    bannerItems: [
      {
        src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg"
      },
      {
        src: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg"
      },
      {
        src: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg"
      },
      {
        src: "https://cdn.vuetifyjs.com/images/carousel/planet.jpg"
      }
    ],
    commdityArr: [
      { name: "美原油", code: "CL1906", price: 61.5, percent: 1.35 },
      { name: "美黄金", code: "GC1906", price: 1284.2, percent: -0.24 }
    ], //合约列表
    noticeItems: [
      { title: "合约变动通知" },
      { title: "支付通道变动通知" },
      { title: "端午休市通知" }
    ],
    noticeIndex: 1
  }),

  methods: {
    switchNotice: function() {
      var _t = this;
      _t.timer =window.setInterval(function() {
            _t.noticeIndex++;
            if (_t.noticeIndex > _t.noticeItems.length) {
              _t.noticeIndex = 0;
            }
            console.log(_t.noticeIndex);
          },
        5000
      );
    }
  },

  mounted: function() {
    //获取通知，同时设置通知滚动
    this.switchNotice();
  }
};
</script>

<style scoped>
</style>

