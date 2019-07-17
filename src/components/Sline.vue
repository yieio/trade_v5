<!--
分时图
-->
<template>
  <svg
    class="mod-sline"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    :style="{width:svgWidth+'px',height:svgHigh+'px'}"
    style="background:#111723;"
  >
    <defs>
      <linearGradient id="gradient-sline" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stop-color="#00afff" stop-opacity="0.2"></stop>
        <stop offset="100%" stop-color="#fff" stop-opacity="0"></stop>
      </linearGradient>
    </defs>

    <!--时间轴-->
    <g>
      <text
        v-for="time in timesCol"
        :x="time.x"
        :y="time.y"
        fill="#949499"
        style="text-anchor:start;"
        track-by="$index"
        :key="time.text"
      >
        <tspan>{{time.text}}</tspan>
      </text>
    </g>

    <!--价位线-->
    <g>
      <template v-for="priceL in s.priceLs">
        <line
          :x1="priceL.x1"
          :y1="priceL.y1"
          :x2="priceL.x2"
          :y2="priceL.y2"
          stroke="#262d3d"
          :key="priceL.y1"
        ></line>
        <text
          :x="priceL.x"
          :y="priceL.y"
          :fill="priceL.textColor"
          style="text-anchor:end;"
          :key="priceL.y"
        >
          <tspan>{{priceL.text}}</tspan>
        </text>
      </template>
    </g>

    <!--走势图-->
    <path stroke="none" fill="url(#gradient-sline)" :d="s.pricePathZ"></path>
    <path stroke="#3378d3" fill="none" stroke-opacity="0.8" :d="s.pricePath"></path>

    <!--成交量-->
    <g>
      <line
        v-for="mvol in s.mvols"
        :x1="mvol.x1"
        :y1="mvol.y1"
        :x2="mvol.x2"
        :y2="mvol.y2"
        :stroke="mvol.color"
        :key="mvol.x1"
      ></line>

      <text :x="s.maxVolT.x" :y="s.maxVolT.y" fill="#949499" style="text-anchor:end;">
        <tspan>{{s.maxVolT.text}}</tspan>
      </text>
    </g>

    <!--最后一点闪动,和价位指示-->
    <g class>
      <circle
        class="heartbeat"
        :cx="s.lastPoint.hb.x"
        :cy="s.lastPoint.hb.y"
        r="2"
        fill="#fff"
        fill-opacity="0.5"
        stroke="#c15467"
        stroke-width="0.8"
      ></circle>
      <circle
        class="heartbeat"
        :cx="s.lastPoint.hb.x"
        :cy="s.lastPoint.hb.y"
        r="1"
        fill="#c15467"
        stroke-width="0"
      ></circle>

      <path
        stroke="#454d62"
        fill="none"
        stroke-dasharray="2 2"
        stroke-opacity="1"
        :d="s.lastPoint.linePath"
      ></path>
      <rect
        :x="s.lastPoint.price.bgX"
        :y="s.lastPoint.price.bgY"
        rx="0"
        ry="0"
        :width="s.lastPoint.price.bgW"
        :height="s.lastPoint.price.bgH"
        fill="#1685d7"
        stroke="#1685d7"
        stroke-width="0"
      ></rect>
      <text :x="s.lastPoint.price.x" :y="s.lastPoint.price.y" fill="#fff" style="text-anchor:end;">
        <tspan>{{s.lastPoint.price.text}}</tspan>
      </text>
    </g>
  </svg>
</template>


<script>
export default {
  props: {
    svgWidth: Number,
    svgHigh: Number,
    timesCol: Array,
    totalMins: Number,
    minUnit: Number,
    priceDigit: Number,
    //最新行情：最新价，昨日结算价，最高价，最低价，昨日收盘价，买价，买量，卖价，卖量，时间
    lastQuote: Array,
    //分时行情：开盘价，收盘价，最高，最低，成交量，持仓量，分钟
    slineData: Array
  },
  data() {
    return {};
  },

  computed: {
    s: function() {
      var s = {
        high: { x: 0, y: 0, text: "", textColor: "#123456" }, // - 最高价涨跌幅
        low: { x: 0, y: 0, text: "", textColor: "#123456" }, // - 最低价涨跌幅
        priceLs: [
          {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 0,
            x: 0,
            y: 0,
            text: "",
            textColor: "#6c7b91"
          }
        ], // - 价位线
        pricePath: "M0,0L0,0", // - 分时路径
        pricePathZ: "M0,0L0,0Z", // - 分时路径背景
        lastPoint: {
          hb: { r1: 0, r2: 0, x: 0, y: 0 },
          price: {
            bgX: 0,
            bgY: 0,
            bgW: 0,
            bgH: 0,
            bgColor: "#FFFFFF",
            x: 0,
            y: 0,
            color: "#FFFFFF",
            text: ""
          },
          linePath: ""
        }, //-最新价闪动点
        mvols: [{ x1: 0, y1: 0, x2: 0, y2: 0, color: "#123456" }], // - 分时成交量
        maxVolT: { x: 0, y: 0, text: "123", textColor: "#123456" }
      };

      var _t = this;
      //1.根据分时数据计算出最大价格，最低价格
      //最高价，最低价，价位线条数，从上往下画
      var highPrice = 0,
        lowPrice = 0,
        priceCount = 6,
        priceDigit = _t.priceDigit;
      var maxVol = 0;

      //开盘价，收盘价，最高，最低，成交量，持仓量，分钟
      var slineData = _t.slineData;
      var pricePath = "",
        //pricePathZ = "",
        mis = [];

      var sLen = slineData.length;
      var startIndex = 0;

      if (sLen >= _t.totalMins - 25) {
        startIndex = sLen - _t.totalMins + 25;
      } else {
        startIndex = 0;
      }

      for (var i = startIndex; i < sLen; i++) {
        var mi = {},
          p = slineData[i];

        mi.open = parseFloat(p[0]).toFixed(priceDigit);
        mi.close = parseFloat(p[1]).toFixed(priceDigit);
        mi.high = parseFloat(p[2]).toFixed(priceDigit);
        mi.low = parseFloat(p[3]).toFixed(priceDigit);
        mi.vol = parseFloat(p[4]);
        mi.position = parseFloat(p[5]);
        mi.time = p[6];
        if (i == startIndex) {
          highPrice = mi.high;
          lowPrice = mi.low;
          maxVol = mi.vol;
        }

        highPrice = highPrice < mi.high ? mi.high : highPrice;
        lowPrice = lowPrice > mi.low ? mi.low : lowPrice;
        maxVol = maxVol < mi.vol ? mi.vol : maxVol;

        mis.push(mi);
      }

      if (mis.length <= 0) {
        return s;
      }

      var avgP = (highPrice - lowPrice) / (priceCount - 1);

      avgP = (Math.ceil(avgP / _t.minUnit) * _t.minUnit).toFixed(priceDigit);

      var marginBottom = _t.svgHigh * 0.18;
      var slineHigh = _t.svgHigh - marginBottom;
      var slineVolHigh = marginBottom - marginBottom * 0.08 - 12;
      var slineVolStartY = _t.svgHigh - 12;
      var avgPx = slineHigh / (priceCount - 1);

      //价格之间的y轴间距
      var avgH = avgPx / (avgP / _t.minUnit);
      var priceLs = [];
      //绘制价位线
      for (var j = 0; j < priceCount; j++) {
        var pItem = {};
        pItem.text = (highPrice - avgP * j).toFixed(priceDigit);
        pItem.textColor = "#E34C4C";

        var y = parseFloat(avgH * ((avgP * j) / _t.minUnit)).toFixed(4);
        pItem.x = _t.svgWidth;
        pItem.y = parseFloat(y) + (j == 0 ? 10 : 5);
        if (i == priceCount - 1) {
          pItem.y = avgPx * j;
        }

        pItem.x1 = 0;
        pItem.y1 = y;
        pItem.x2 = _t.svgWidth;
        pItem.y2 = y;

        priceLs.push(pItem);
      }
      //console.log(priceLs);
      //设置价位线
      s.priceLs = priceLs;

      //绘制分时走势
      var tPoints = _t.totalMins;
      //每点间距
      var avgW = _t.svgWidth / tPoints;
      var avgVolH = slineVolHigh / maxVol;
      var lastPoint = {};
      var mvols = [];

      for (var k = 0; k < mis.length; k++) {
        var x = (avgW * k).toFixed(4),
          ky = ((avgH * (highPrice - mis[k].close)) / _t.minUnit).toFixed(4);
        if (k == 0) {
          pricePath += "M" + x + "," + ky;
        } else {
          pricePath += "L" + x + "," + ky;
        }
        lastPoint.x = x;
        lastPoint.y = ky;
        lastPoint.text = mis[k].close;

        var mvol = {};
        mvol.x1 = x;
        mvol.y1 = slineVolStartY;
        mvol.x2 = x;
        mvol.y2 = slineVolStartY - mis[k].vol * avgVolH;
        mvol.color = mis[k].close > mis[k].open ? "#c15467" : "#4da990";
        mvols.push(mvol);
      }
      //mvols:[{x1:0,y1:0,x2:0,y2:0,color:'#123456'}] - 分时成交量
      s.mvols = mvols;

      //分时走势路径
      s.pricePath = pricePath;
      //分时背景走势图
      s.pricePathZ =
        pricePath +
        "L" +
        lastPoint.x +
        "," +
        slineHigh +
        "L0," +
        slineHigh +
        "Z";

      //lastPoint:{hb:{r1:0,r2:0,x:0,y:0},price:{bgX:0,bgY:0,bgW:0,bgH:0,bgColor:'#123456',x:0,y:0,color:'#123456',text:''}} -最新价闪动点
      s.lastPoint = {};
      s.lastPoint.hb = {};
      s.lastPoint.hb.x = lastPoint.x;
      s.lastPoint.hb.y = lastPoint.y;
      s.lastPoint.hb.r1 = 1;
      s.lastPoint.hb.r2 = 2;

      s.lastPoint.price = {};
      s.lastPoint.price.bgW = 50;
      s.lastPoint.price.bgH = 15;
      s.lastPoint.price.bgX = _t.svgWidth - s.lastPoint.price.bgW;
      s.lastPoint.price.bgY = lastPoint.y - s.lastPoint.price.bgH / 2;
      s.lastPoint.price.bgColor = "#4471BC";
      s.lastPoint.price.color = "#FFFFFF";
      s.lastPoint.price.x = _t.svgWidth;
      s.lastPoint.price.y = parseFloat(lastPoint.y) + 5;
      s.lastPoint.price.text = lastPoint.text;
      s.lastPoint.linePath =
        "M" +
        lastPoint.x +
        "," +
        lastPoint.y +
        "L" +
        s.lastPoint.price.bgX +
        "," +
        lastPoint.y;

      //maxVolT:{x:0,y:0,text:'123',textColor:'#123456'} - 分时成交量最大值
      s.maxVolT = {
        x: _t.svgWidth,
        y: slineVolStartY - slineVolHigh * 0.6,
        text: maxVol
      };

      return s;
    }
  }
};
</script>		
