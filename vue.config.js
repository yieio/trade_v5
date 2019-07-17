module.exports = {
    devServer: {
        open: true,
        port: 8080, 
        https: false, 
        hotOnly: false, 
        proxy: {
            '/apis': {
              // 业务接口，该代理配置只开发环境有用，正式环境需要服务端方向代理和url重写
              target: 'http://qhet-api.xxtd.net.cn/',  // 接口域名
              changeOrigin: true,  //是否跨域
              pathRewrite: {
                  '^/apis': ''   //需要rewrite重写的,
              }          
            },
            '/quoteapis':{
              // 行情接口
              target: 'http://tradequote.xxtd.net.cn/',  
              changeOrigin: true,  
              pathRewrite: {
                  '^/quoteapis': ''   
              }
            }
        }
      } 
}