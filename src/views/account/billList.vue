<!--
资金明细
tab:全部-充值提款-交易明细-推广佣金
-->

<template>
  <v-content>
    <v-toolbar color="elevation-0">
      <v-btn icon to="/me" active-class>
        <v-icon>keyboard_arrow_left</v-icon>
      </v-btn>
      <v-toolbar-title>资金明细</v-toolbar-title>
    </v-toolbar>
    <v-container pa-0>
      <v-tabs v-model="tab" color grow>
        <v-tabs-slider color="primary"></v-tabs-slider>

        <v-tab v-for="item in tabItems" :key="item" class="tab-border">{{ item }}</v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item v-for="item in tabItems" :key="item">
          <v-list two-line>
            <template v-for="(d,i) in billList">
              <v-list-tile :key="i">
                <v-list-tile-content>
                  <v-list-tile-title>{{ d.billTitle }}</v-list-tile-title>
                  <v-list-tile-sub-title>{{ d.billTime }}</v-list-tile-sub-title>
                </v-list-tile-content>

                <v-list-tile-action>
                  <span
                    class="list-amount color-green"
                    :class="{'color-red':d.amount>0}"
                  >{{d.amount>0?"+":""}}{{d.amount}}</span>
                </v-list-tile-action>
              </v-list-tile>
              <v-divider :key="'divider-'+i"></v-divider>
            </template>
          </v-list>
        </v-tab-item>
      </v-tabs-items>
    </v-container>
  </v-content>
</template>
        
<script>
export default {
  data() {
    return {
      tab: null,
      tabItems: ["全部", "充值提款", "交易明细", "推广佣金"],
      billList: [
        { billTitle: "提现取出", billTime: "2019-4-19 10:55", amount: -3800 },
        { billTitle: "提现取出", billTime: "2019-4-19 10:55", amount: -3800 },
        { billTitle: "提现取出", billTime: "2019-4-19 10:55", amount: -3800 },
        { billTitle: "提现取出", billTime: "2019-4-19 10:55", amount: -3800 },
        {
          billTitle: "获得投资收益",
          billTime: "2019-4-18 10:55",
          amount: 9800
        },
        {
          billTitle: "获得投资收益",
          billTime: "2019-4-18 10:55",
          amount: 9800
        },
        {
          billTitle: "支付交易综合费",
          billTime: "2019-4-18 10:55",
          amount: -800
        }
      ]
    };
  }
};
</script>

<style scoped>
.v-content {
  background: #ffffff;
}
.tab-border {
  border-bottom: solid 1px #e1e1e1;
}

.list-amount {
  font-size: 22px;
}

.color-green {
  color: green;
}

.color-red {
  color: red;
}
</style>
