<!--
新闻列表组件，在/news/index 中有引用
-->
<template>
  <div class="newslist">
    <ul>
      <li v-for="n in newsArr" :key="n.tid" class="news-li" :data-id="n.tid">
        <a href="javascript:;" :data-href="n.shareurl" @click="showNews(n)">
          <img class="lazy" :src="n.thumb" style="display: block;">
          <h4>{{n.post_title}}</h4>
          <span>{{n.post_date}}</span>
        </a>
      </li>
    </ul> 
  </div>
</template>
<script>
export default {
  props: {
    newsArr: Array
  },
  data: () => ({
    newsDialog: false,
    newsUrl: "https://news.jin10.com/details-app.html?id=24322",
    theShowNews:{},
    baseUrl: "https://m.jin10.com"
  }),
  computed: {
    newsList1: function() {
      let newsListArr = [];
      return newsListArr;
    }
  },
  methods: {
    showNews: function(news) {
      this.$router.push({ 
        path:'/news/detail',    
        query:{           
          id:news.id,
          title:news.post_title,
          url:news.shareurl
        }
      }) 
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

.newslist li {
  position: relative;
  border-bottom: 1px solid #ececec;
  padding: 10px 6px;
}
.newslist li:after,
.newslist .intro:after,
.newslist li a:after {
  clear: both;
  content: "";
  display: block;
  visibility: hidden;
  height: 0;
}
.newslist li a {
  display: block;
  color: #444;
}
.newslist img {
  float: left;
  width: 28%;
  margin: 0 2% 0 0;
}
.newslist h4 {
  float: right;
  width: 70%;
  line-height: 1.3;
  font-weight: 400;
  font-size: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.newslist span {
  position: absolute;
  right: 10px;
  bottom: 6px;
  display: block;
  text-align: right;
  color: #888888;
  font-size: 12px;
  line-height: 16px;
}
</style>
