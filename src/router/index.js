import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/pass/login'//登录
import SignUp from '@/views/pass/signup' //注册
import ResetPassword from "@/views/pass/resetPassword" //找回密码

//me相关页面
import Me from "@/views/me/index" //我
import Settings from "@/views/me/settings" //个人设置
import PhoneNum from "@/views/me/phoneNum" //手机号码
import Verified from "@/views/me/verified" //实名认证
import LoginPasswd from "@/views/me/loginPasswd" //实名认证
import PayPasswd from "@/views/me/payPasswd" //提现密码
import Avatar from "@/views/me/avatar" //用户头像
import Share from "@/views/me/share" //推广赚钱
import InviteUsers from "@/views/me/inviteUsers" //推广赚钱

//me>account相关页面
import BillList from "@/views/account/billList" //资金明细

//资讯页面
import News from "@/views/news/index" //资讯
import NewsDetail from "@/views/news/detail" //资讯

//交易页面
import Trade from "@/views/trade/index" //交易首页
import TradeDetail from "@/views/trade/detail" //交易详情

//app首页
import Home from "@/views/home/index" //app首页

Vue.use(Router)

export default new Router({
  mode:"history",
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    }
    ,{
        path: '/signup',
        name: 'signup',
        component: SignUp
      }
      ,{
        path: '/resetpwd',
        name: 'ResetPassword',
        component: ResetPassword
      }
      ,{
        path: '/me',
        name: 'Me',
        component: Me
      }
      ,{
        path: '/me/settings',
        name: 'Settings',
        component: Settings
      }
      ,{
        path: '/me/phonenum',
        name: 'PhoneNum',
        component: PhoneNum
      }
      ,{
        path: '/me/verified',
        name: 'Verified',
        component: Verified
      }
      ,{
        path: '/me/loginpasswd',
        name: 'LoginPasswd',
        component: LoginPasswd
      }
      ,{
        path: '/me/paypasswd',
        name: 'PayPasswd',
        component: PayPasswd
      }
      ,{
        path: '/me/avatar',
        name: 'Avatar',
        component: Avatar
      }
      ,{
        path: '/me/share',
        name: 'Share',
        component: Share
      }
      ,{
        path: '/me/inviteusers',
        name: 'InviteUsers',
        component: InviteUsers
      }


      ,{
        path: '/account/billlist',
        name: 'BillList',
        component: BillList
      }

      ,{
        path: '/news',
        name: 'News',
        component: News,
        meta:{keepAlive:true}
      }
      ,{
        path: '/news/detail',
        name: 'NewsDetail',
        component: NewsDetail,
        props: (route) => ({url: route.query.url,title: route.query.title })
      }

      ,{
        path: '/trade',
        name: 'Trade',
        component: Trade
      }
      ,{
        path: '/trade/detail',
        name: 'TradeDetail',
        component: TradeDetail
      }
      ,{
        path: '/home',
        name: 'Home',
        component: Home
      },
      
      

      { path: '*', redirect: '/home' } /*默认跳转路由*/
  ]
})