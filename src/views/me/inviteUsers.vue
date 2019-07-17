<!--
我的邀请人
姓名，手机号码，注册时间
交易手数，贡献佣金
-->

<template>
    <v-content>
        <v-toolbar color="elevation-0">
      <v-btn icon to="/me/share" active-class>
        <v-icon>keyboard_arrow_left</v-icon>
      </v-btn>
      <v-toolbar-title>推广赚钱</v-toolbar-title>
      <v-spacer></v-spacer> 
    </v-toolbar>

    <v-container>
<v-data-table
    :headers="headers"
    :items="desserts"
    class="elevation-1"
  >
    <template v-slot:items="props">
      <td>{{ props.item.name }}</td>
      <td class="text-xs-right">{{ props.item.phonenum }}</td>
      <td class="text-xs-right">{{ props.item.refund }}</td>
      <td class="text-xs-right">{{ props.item.vols }}</td>
      <td class="text-xs-right">{{ props.item.createtime }}</td>
    </template>
  </v-data-table>
    </v-container>
    </v-content>
</template>


<script>
export default {
  data() {
    return {
      headers: [
        {
          text: "姓名",
          align: "left",
          sortable: false,
          value: "name"
        },
        { text: "手机号", value: "phonenum" },
        { text: "贡献佣金", value: "refund" },
        { text: "交易手数", value: "vols" },
        { text: "注册时间", value: "createtime" }
      ],
      desserts: [
        {
          name: "Frozen Yogurt",
          phonenum: "13268351445",
          refund: 100,
          vols: 24,
          createtime: "2019-05-01"
        },
        {
          name: "Frozen Yogurt",
          phonenum: "13268351445",
          refund: 100,
          vols: 24,
          createtime: "2019-05-01"
        },
        {
          name: "Frozen Yogurt",
          phonenum: "13268351445",
          refund: 100,
          vols: 24,
          createtime: "2019-05-01"
        },
        {
          name: "Frozen Yogurt",
          phonenum: "13268351445",
          refund: 100,
          vols: 24,
          createtime: "2019-05-01"
        },
        {
          name: "Frozen Yogurt",
          phonenum: "13268351445",
          refund: 100,
          vols: 24,
          createtime: "2019-05-01"
        },
        {
          name: "Frozen Yogurt",
          phonenum: "13268351445",
          refund: 100,
          vols: 24,
          createtime: "2019-05-01"
        },
        {
          name: "Frozen Yogurt",
          phonenum: "13268351445",
          refund: 100,
          vols: 24,
          createtime: "2019-05-01"
        },
        {
          name: "Frozen Yogurt",
          phonenum: "13268351445",
          refund: 100,
          vols: 24,
          createtime: "2019-05-01"
        },
        {
          name: "Frozen Yogurt",
          phonenum: "13268351445",
          refund: 100,
          vols: 24,
          createtime: "2019-05-01"
        },
        {
          name: "Frozen Yogurt",
          phonenum: "13268351445",
          refund: 100,
          vols: 24,
          createtime: "2019-05-01"
        }
      ]
    };
  }
};
</script>
