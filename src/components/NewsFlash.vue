<!--
新闻资讯
-->
<template>
  <div class="news-flash-wrapper">
    <div class="timebanner" style="top: 50px;">
      <div id="timebox">
        <div id="clone_calender" class="calenderbox">
          <span>{{newsDate.day}}</span>
          <p>{{newsDate.month}}月</p>
        </div>
      </div>
    </div>
    <div class="timecon">
      <ul class="livecon" id="content">
        <template v-for="l in newsData">
          <template v-if="l.type==0">
            <li class="flash" :key="l.newsTimeSpan">
              <div class="timeline">
                <div class="dotbg">
                  <div class="dot"></div>
                </div>
                <div class="time">{{l.time}}</div>
              </div>

              <div class="live-c onlytxt">
                <div class="txt" v-html="l.content"></div>
              </div>
            </li>
          </template>
          <template v-else-if="l.type==1">
            <li class="flash" :id="l.newstimespan" :key="l.newsTimeSpan" :dateTime="l.dateTime">
              <div class="timeline">
                <div class="dotbg">
                  <div class="dot"></div>
                </div>
                <div class="time">{{l.time}}</div>
              </div>
              <div class="live-c">
                <div class="txt">
                  {{l.text}}
                  <div class="live-ele">
                    <img class="flag" :src="'//cdn.jin10.com/images/flag/'+l.country+'.png'">
                    <table class="pindex">
                      <tbody>
                        <tr>
                          <td>前值:{{l.prefix}}</td>
                          <td>预期：{{l.predicted}}</td>
                          <td>
                            实际：
                            <span
                              id="actual_{actual_id}"
                              class="fact"
                              :class="l.effectClass"
                            >{{l.actual}}</span>
                          </td>
                        </tr>
                        <tr>
                          <td colspan="2">
                            <div class="live-ele-l">
                              <img :src="'//cdn2.jin10.com/news/wx/img/'+l.star+'.png'">
                            </div>
                          </td>
                          <td>
                            <div class="live-ele-r" :class="l.effectClass">{{l.effect}}</div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </li>
          </template>
        </template>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    orgNewsData:Array
  },
  data: () => ({
    newsDate: {}
  }),
  methods: {
    getChangeClassText: function(text) {
      var classn = "";
      if (text == "利多") {
        classn = "liduo";
      } else if (text == "利空") {
        classn = "likong";
      } else if (text == "无影响") {
        text = "影响较小";
        classn = "wuyingxiang";
      } else if (text == "利多2") {
        text = "利多 金银";
        classn = "liduo2";
      } else if (text == "利空2") {
        text = "利空 金银";
        classn = "likong2";
      } else if (text == "无影响2") {
        text = "影响较小";
        classn = "wuyingxiang2";
      }

      var rege = new RegExp("影响");
      if (rege.test(text)) {
        text = "影响较小";
      }

      return [classn, text];
    }
  },
  computed: {
    newsData: function() {
      //转换处理 orgNewsData,返回格式化的数据
      var newsData = [];

      var _t = this;
      Date.prototype.format = function(format) {
        var o = {
          "M+": this.getMonth() + 1,
          "d+": this.getDate(),
          "h+": this.getHours(),
          "m+": this.getMinutes(),
          "s+": this.getSeconds(),
          "q+": Math.floor((this.getMonth() + 3) / 3),
          S: this.getMilliseconds()
        };
        if (/(y+)/.test(format)) {
          format = format.replace(
            RegExp.$1,
            (this.getFullYear() + "").substr(4 - RegExp.$1.length)
          );
        }
        for (var k in o) {
          if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(
              RegExp.$1,
              RegExp.$1.length == 1
                ? o[k]
                : ("00" + o[k]).substr(("" + o[k]).length)
            );
          }
        }
        return format;
      };
      Date.prototype.getTimeUTC = function() {
        return this.getTime() + this.getTimezoneOffset() * 60 * 1000;
      };

      //0#1#2019-05-10 11:16:39#【行情】离岸人民币回吐此前涨幅，现跌0.1%，报6.8436。#####0###20190510111639643100
      //1#07:50#日本至5月3日当周买进外国债券(亿日元)#11700#11700#-2570#2#利空#2019-05-10 07:50:47#日本##262822#20190510075047459100#0
      //格式化数据，填充到数组列表中

      let index = 0; 
      _t.orgNewsData.forEach(item => {
        if (item.indexOf("<img") > 0) {
          return true;
        }
        let itemInfo = {};
        let arr = item.split("#");
        if (arr[0] == 0) {
          //简单文字资讯
          var t = arr[2].replace(/-/g, "/");
          itemInfo = {
            type: arr[0],
            important: arr[1],
            dateTime: t,
            time: new Date(t).format("hh:mm:ss"), //MM-dd
            content: arr[3],
            url: arr[4],
            pic: arr[6],
            newsTimeSpan: arr[11]
          };

          newsData.push(itemInfo);
        } else if (arr[0] == 1) {
          //利多利空消息
          var t2 = arr[8].replace(/-/g, "/");
          itemInfo = {
            type: arr[0],
            time: new Date(t2).format("hh:mm:ss"),
            text: arr[2],
            prefix: arr[3],
            predicted: arr[4],
            actual: arr[5],
            star: arr[6],
            effect: arr[7],
            dateTime: t2,
            country: arr[9],
            nil: arr[10],
            newsid: arr[11],
            newstimespan: arr[12],
            url: "/index/" + arr[12]
          };
          //计算效果effectClass
          let text =
            itemInfo.star < 3 ? itemInfo.effect + "2" : itemInfo.effect;
          var effectResult = _t.getChangeClassText(text);
          itemInfo.effectClass = effectResult[0];
          itemInfo.effect = effectResult[1];
          newsData.push(itemInfo);
        }

        if (index == 0) {
          var date = new Date(itemInfo.dateTime);
          _t.newsDate = { month: date.format("MM"), day: date.format("dd") };
        }
      });

      return newsData;
    }
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  word-wrap: break-word;
}
html {
  width: 100%;
  height: 100%;
}
body {
  max-width: 100%;
  text-align: left;
  font-size: 15px;
  line-height: 24px;
  margin: 0 auto;
  position: relative;
  text-rendering: optimizelegibility;
  top: 0;
  font-family: "微软雅黑", "黑体", "arial", "calibri";
  width: 100%;
  background-color: #fafafa;
  color: #555555;
}
img {
  border: medium none;
  margin: 0 auto;
  padding: 0;
  height: auto;
}
ul,
ol,
li {
  list-style: none outside none;
  font-size: 100%;
  vertical-align: baseline;
}
a {
  text-decoration: none;
  color: #555555;
}
table {
  border: 0;
  width: 100%;
}
input[type="number"],
input[type="text"],
input[type="text"],
input[type="submit"],
select,
textarea {
  font-family: "微软雅黑", "arial", "calibri";
  font-size: 16px;
  border: none;
  background: transparent;
  width: 100%;
  -webkit-appearance: none;
}
.clear:after {
  content: ".";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}
.clear {
  clear: both;
  overflow: visible;
  height: auto;
}

.fullbody {
  max-width: 100%;
  height: 100%;
}
h1,
h2,
h3,
h4,
h5,
p,
span {
  line-height: 1.4;
}

.timecon {
  margin: 20px 0 10px 16px;
  position: relative;
}
.calenderbox {
  position: absolute;
  left: -13px;
  top: -10px;
  width: 28px;
  height: 30px;
  border: 1px solid #1b7ecc;
  color: #1b7ecc;
  background-color: #ffffff;
  line-height: 20px;
  text-align: center;
  z-index: 10;
}
#content .calenderbox.repeat {
  visibility: hidden;
}
.calenderbox span {
  font-size: 14px;
  font-weight: bold;
  line-height: 1.3;
  display: block;
}
.calenderbox p {
  font-size: 11px;
  line-height: 0.8;
}

/*时间块开始*/
.timebanner {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
}
#timebox {
  max-width: 100%;
  position: relative;
  margin: 0 auto;
}
#timebox .calenderbox {
  left: 4px;
  top: 10px;
}
/*时间块结束*/

.livecon {
  border-left: 1px solid #d8e6f2;
}
.livecon li {
  position: relative;
  width: 100%;
  margin: 0 0 30px;
}

.timeline {
  width: 77px;
  height: 15px;
  position: relative;
  border-top: 1px solid #d8e6f2;
}
.timeline .dotbg {
  position: absolute;
  left: -5px;
  top: -5px;
  width: 10px;
  height: 10px;
  background-color: #e9eff4;
  border-radius: 50%;
}
.timeline .dot {
  width: 4px;
  height: 4px;
  margin: 3px;
  background-color: #1b7ecc;
  border-radius: 50%;
}
.timeline .time {
  position: absolute;
  right: -6px;
  top: -11px;
  font-size: 11px;
  width: 60px;
  height: 18px;
  line-height: 19px;
  border-radius: 11px;
  text-align: center;
  color: #1b7ecc;
  background-color: #e9f2fa;
}

.live-c {
  padding: 0 70px 0 26px;
  color: #555555;
}
.live-c.onlytxt {
  padding: 0 10px 0 26px;
}
.live-c .txt {
  line-height: 1.5;
  font-size: 15px;
}
.txt > a > img {
  width: 100%;
  height: auto;
}
.text-img img.thumb {
  width: auto;
  height: 40px;
  margin: 0;
}
.live-c .txt a {
  color: #555555;
}
.live-c.word {
  padding: 0 10px 0 30px;
}

.live-ele {
  position: relative;
}
.flag {
  position: absolute;
  right: -55px;
  top: 7px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.pindex {
  table-layout: fixed;
  line-height: 1.6;
  font-size: 14px;
  color: #888888;
}
.pindex td {
  font-size: 11px;
  padding: 0 0 5px 0;
}

.live-ele-l .star {
  margin: 0 2px;
  float: left;
  width: 15px;
  height: 15px;
  background-size: 90px auto;
  background-position: 0px -187px;
}
.live-ele-l .star.level {
  background-position: 0px -166px;
}
.reditem .live-ele-l .star.level {
  background-position: 0px -144px;
}
.reditem .live-ele-r {
  border: 1px solid #da313f;
  color: #da313f;
}
.reditem .timeline .time {
  color: #da313f;
}
.reditem .txt {
  color: #da313f;
}
.important .txt {
  color: #da313f;
}

.live-ele-r {
  display: inline-block;
  padding: 2px 4px;
  line-height: 16px;
  font-size: 12px;
  border: 1px solid #ffa200;
  color: #ffa200;
}
.liduo.live-ele-r {
  border: 1px solid #da313f;
  background-color: #da313f;
  color: #ffffff;
}
.liduo2.live-ele-r {
  border: 1px solid #da313f;
  color: #da313f;
}
.wuyingxiang.live-ele-r {
  border: 1px solid #ffa200;
  background-color: #ffa200;
  color: #ffffff;
}
.wuyingxiang2.live-ele-r {
  border: 1px solid #ffa200;
  color: #ffa200;
}
.likong.live-ele-r {
  border: 1px solid #5db333;
  background-color: #5db333;
  color: #ffffff;
}
.likong2.live-ele-r {
  border: 1px solid #5db333;
  color: #5db333;
}

.fact {
  color: #ffa200;
}
.liduo.fact,
.liduo2.fact {
  color: #da313f;
}
.likong.fact,
.likong2.fact {
  color: #5db333;
}
</style>

