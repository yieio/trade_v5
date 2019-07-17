module.exports = {
    //代理终端相关信息
    //quoteapis - 表示行情接口前缀，会被代理转发
    //apis 表示业务接口前缀，会被代理转发
    tenant:{
        signKey : "SIGNKEY=qhb@20181118",
        agentCode : "AgentCode=qihuobao",
        agentKey : "qihuobao",
        sline : "/quoteapis/minute/jsonminute?",//分时行情
        quote : "/quoteapis/quote/last?", //行情
        news:'/apis/news?',
        apiUrl:"/apis/cpb/api/m/call?"

    }
}