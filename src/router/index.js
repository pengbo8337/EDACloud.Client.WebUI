import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import Basic from '@/components/main/basic'

//首页
import Home from '@/components/main/home'
import Mirror from '@/components/main/mirror'
import Services from '@/components/main/services'

//服务器管理
import StaticIP from '@/components/machine/staticIP'

//公司管理
import Company from '@/components/company/company'

//混合云管理
import MixCloud from '@/components/cloud/cloud'

//用户管理
import User from '@/components/userManage/user'

//消费充值
import Consume from '@/components/consume/consume'

//生成主机
import GenerateHost from '@/components/newComputer/newMain'
// import machineConfig from '@/components/newComputer/machineConfig'
import machineConfig from '@/components/newComputer/createInstance'
import StorageConfig from '@/components/newComputer/storage'
import SoftWare from '@/components/newComputer/software'
import Others from '@/components/newComputer/others'
import setSetting from '@/components/newComputer/setSetting'

//机器管理
import Manage from '@/components/manage/manage'

//监控告警
import Warning from '@/components/warning/warning'

//文档管理
import Documents from '@/components/document/document'

import NotFound from '@/components/notFound/404'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path:"/cloud",
      component:Basic,
      children:[
        {path:'/',component:Mirror},
        {path:'/services',component:Services},
        {path:"/staticIP",component:StaticIP},
        {path:"/mixCloud",component:MixCloud},
        {path:"/user",component:User},
        {path:"/consume",component:Consume},
        {path:"/generatehost",component:GenerateHost},
        {path:"/machineConfig",component:machineConfig},
        {path:"/storage",component:StorageConfig},
        {path:"/software",component:SoftWare},
        {path:"/others",component:Others},
        {path:"/manage",component:Manage},
        {path:"/warning",component:Warning},
        {path:"/document",component:Documents},
        {path:"/setSetting",component:setSetting},
        {path:"/company",component:Company}
      ]
    },
    {path:'*',
    component:Basic,
    children:[
      {path:"",component:NotFound,}
    ]},
  ]
})
