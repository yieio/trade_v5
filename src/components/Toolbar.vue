<!--
底部导航，首页，交易，资讯，我
-->

<template>
  <v-bottom-nav :value="true" :app="true" height="72" class="pb-3" :fixed="true" >
    <v-btn color="teal" flat value="home" to="home">
      <span>首页</span>
      <v-icon>home</v-icon>
    </v-btn>

    <v-btn color="teal" flat value="trade" to="trade">
      <span>交易</span>
      <v-icon>insert_chart_outlined</v-icon>
    </v-btn>

    <v-btn color="teal" flat value="news" to="news">
      <span>资讯</span>
      <v-icon>history</v-icon>
    </v-btn>
    <v-btn color="teal" flat value="me" to="me">
      <span>我</span>
      <v-icon>face</v-icon>
    </v-btn>
  </v-bottom-nav>
</template>

<script>
export default {
  props: {
    activeNav: Number
  }
};
</script>
