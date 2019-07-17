<!--
期货合约列表
合约名-最新价-涨跌幅
-->
<template>
  <v-container pa-0>
    <v-layout row class="commdity-list-head">
      <v-flex xs4 class="text-align-left">
        <h2>合约名</h2>
      </v-flex>
      <v-flex xs4>
        <h2>最新价</h2>
      </v-flex>
      <v-flex xs4>
        <h2>涨跌幅</h2>
      </v-flex>
    </v-layout>
    <template v-for="c in commdityArr">
        <v-layout row class="commdity-list-item" :key="c.code" @click="showCommdityDetail(c)">
      <v-flex xs4 class="text-align-left">
        <div class="commdity-name">{{c.name}}</div>
        <div class="commdity-code">{{c.code}}</div>
      </v-flex>
      <v-flex xs4>
        <p class="commdity-price" :class="{'txt-color-red':c.percent>0,'txt-color-green':c.percent<0}">{{c.price}}</p>
      </v-flex>
      <v-flex xs4>
          <p class="commdity-percent"><strong :class="{'bg-color-red':c.percent>0,'bg-color-green':c.percent<0}">{{c.percent}}%</strong></p> 
      </v-flex>
    </v-layout>

    </template>
  </v-container>
</template>

<script>
export default {
  props: {
    commdityArr: Array
  },
  methods:{
      showCommdityDetail:function(c){
          console.log(c); 
      }
  }
};
</script> 

<style scoped>
.commdity-list-head {
  background: #efefef;
  padding:0 4%;
  text-align: right;
}

.commdity-list-head h2 {
  font-size: 14px;
  color: #999999;
  line-height: 24px;
  font-weight: normal;
}

.commdity-list-item {
  background: #ffffff;
  border-bottom: 1px solid #eeeeee;
  padding:5px 4%;
  text-align: right;
}

.text-align-right{
    text-align: right;
}

.text-align-left{
    text-align: left;
}

.commdity-list-item p{
    margin: 0; 
    line-height: 42px;
}

.commdity-list-item .commdity-name{
    color:#000000;
    font-weight: 400;
    font-size: 14px;
    font-weight: 500;
}

.commdity-list-item .commdity-code{
    color:#999999;
    font-size: 12px;
}

.commdity-list-item .commdity-percent{
    text-align: right;
    display: inline-block; 
}

.commdity-list-item .commdity-price{
    font-weight:500;
}

.commdity-list-item .commdity-percent strong{
    color:#ffffff;
    width:72px;
    font-weight:500;
    border-radius: 3px;
    text-align: center;
    display: inline-block; 
    line-height:32px;
}

.bg-color-red{
background:#d14b66;
}

.bg-color-green{
    background:#06ac8f;
}

.txt-color-green{
    color:#06ac8f;
}

.txt-color-red{
    color:#d14b66;
}


</style>

