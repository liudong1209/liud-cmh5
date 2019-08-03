import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home/home'
import news from '@/components/news/news'
import word from '@/components/word/word'
import patientSelection from '@/components/patientSelection/patientSelection'
import symptomSelect from '@/components/symptomSelect/symptomSelect'
import diagnosticResults from '@/components/diagnosticResults/diagnosticResults'
import healthRegimen from '@/components/healthRegimen/healthRegimen'
import diagHealthRegimen from '@/components/healthRegimen/diagHealthRegimen'
import selfRecord from '@/components/selfRecord/selfRecord'
import faceConsultation from '@/components/faceConsultation/faceConsultation'
import tongueConsultation from '@/components/tongueConsultation/tongueConsultation'

import selfRecordDetail from '@/components/selfRecordDetail/selfRecordDetail'
import myCollection from '@/components/myCollection/myCollection'
import chineseMedicine from '@/components/chineseMedicine/chineseMedicine'
import chineseMedicineDetail from '@/components/chineseMedicineDetail/chineseMedicineDetail'
import acupuncturePoints from '@/components/acupuncturePoints/acupuncturePoints'
import acupuncturePointsDetail from '@/components/acupuncturePointsDetail/acupuncturePointsDetail'
import tea from '@/components/tea/tea'
import teaDetail from '@/components/teaDetail/teaDetail'
import medicinalFood from '@/components/medicinalFood/medicinalFood'
import medicinalFoodDetail from '@/components/medicinalFoodDetail/medicinalFoodDetail'
import solarTerms from '@/components/solarTerms/solarTerms'
import solarTermsType from '@/components/solarTermsType/solarTermsType'
import moreSolarTerms from '@/components/moreSolarTerms/moreSolarTerms'
import solarTermsDetail from '@/components/solarTermsDetail/solarTermsDetail'
import feedback from '@/components/word/feedback'
import patientManagement from '@/components/word/patientManagement'
import patientInfo from '@/components/word/patientInfo'
import lookBigPic from '@/components/word/lookBigPic'
import set from '@/components/word/set'
import aboutDj from '@/components/word/aboutDj'
import personalCenter from '@/components/word/personalCenter'
import helpCenter from '@/components/word/helpCenter'
import star from '@/components/star/star'
import illDetail from '@/components/illDetail/illDetail'
import hospitalList from '@/components/hospitalList/hospitalList'
import docList from '@/components/docList/docList'
Vue.use(Router)



export default new Router({
  routes: [
		//首页
    {
      path: '/home/home',
      name: 'home',
      component: home,
      meta:
        {
          navShow: true, //是否显示底部导航
          requireAuth: true,//是否要登录
        },
    },
		//新闻
    {
      path: '/news/news',
      name: 'news',
      component: news,
      meta:
        {
          navShow: true, //是否显示底部导航
          requireAuth: true,//是否要登录
        },
    },
		//我的
		 {
		  path: '/word/word',
		  name: 'word',
		  component: word,
      meta:
         {
           navShow: true, //是否显示底部导航
           requireAuth: true,//是否要登录
         },
     },
		//患者选取
		{
		  path: '/patientSelection/patientSelection',
		  name: 'patientSelection',
		  component: patientSelection,
      meta:
        {
          navShow: false, //是否显示底部导航
          requireAuth: true,//是否要登录
        },
		},
		//症状选取
		{
		  path: '/symptomSelect/symptomSelect',
		  name: 'symptomSelect',
		  component: symptomSelect,
      meta:
        {
          navShow: false, //是否显示底部导航
          requireAuth: true,//是否要登录
        },
		},
		//诊断结果
		{
		  path: '/diagnosticResults/diagnosticResults/:psid',
		  name: 'diagnosticResults',
		  component: diagnosticResults,
      meta:
        {
          navShow: false, //是否显示底部导航
          requireAuth: true,//是否要登录
        },
		},
		//自诊记录selfRecord
		{
		  path: '/selfRecord/selfRecord',
		  name: 'selfRecord',
		  component: selfRecord,
      meta:
        {
          navShow: false, //是否显示底部导航
          requireAuth: true,//是否要登录
					isUseCache: false,  // 这个字段判断是否加载缓存数据
					keepAlive: true  // 通过此字段判断是否需要缓存当前组件 
        },
		},
		//面诊
		{
		  path: '/faceConsultation/faceConsultation',
		  name: 'faceConsultation',
		  component: faceConsultation,
		  meta:
		    {
		      navShow: false, //是否显示底部导航
		      requireAuth: true,//是否要登录
		    },
		},
		//舌诊
		{
		  path: '/tongueConsultation/tongueConsultation',
		  name: 'tongueConsultation',
		  component: tongueConsultation,
		  meta:
		    {
		      navShow: false, //是否显示底部导航
		      requireAuth: true,//是否要登录
		    },
		},
		//我的收藏myCollection
		{
		  path: '/myCollection/myCollection',
		  name: 'myCollection',
		  component: myCollection,
      meta:
        {
          navShow: false, //是否显示底部导航
          requireAuth: true,//是否要登录
				
        },
		},
		//自诊详情selfRecordDetail
		{
		  path: '/selfRecordDetail/selfRecordDetail/:psid',
		  name: 'selfRecordDetail',
		  component: selfRecordDetail,
      meta:
        {
          navShow: false, //是否显示底部导航
          requireAuth: true,//是否要登录
        },
		},
		//养生方案
		{
		  path: '/healthRegimen/healthRegimen',
		  name: 'healthRegimen',
		  component: healthRegimen,
      meta:
        {
          navShow: false, //是否显示底部导航
          requireAuth: true,//是否要登录
        },
		},
		//养生方案
		{
		  path: '/healthRegimen/diagHealthRegimen',
		  name: 'diagHealthRegimen',
		  component: diagHealthRegimen,
		  meta:
		    {
		      navShow: false, //是否显示底部导航
		      requireAuth: true,//是否要登录
		    },
		},
		//中药
		{
		  path: '/chineseMedicine/chineseMedicine',
		  name: 'chineseMedicine',
		  component: chineseMedicine,
      meta:
        {
          navShow: false, //是否显示底部导航
          requireAuth: true,//是否要登录
					isUseCache: false,  // 这个字段判断是否加载缓存数据
					keepAlive: true  // 通过此字段判断是否需要缓存当前组件 
        },
		},
		//中药详情
		{
		  path: '/chineseMedicineDetail/chineseMedicineDetail/:id/:name',
		  name: 'chineseMedicineDetail',
		  component: chineseMedicineDetail,
			meta: { navShow: false},
		},
		//穴位
		{
		  path: '/acupuncturePoints/acupuncturePoints',
		  name: 'acupuncturePoints',
		  component: acupuncturePoints,
      meta:
        {
          navShow: false, //是否显示底部导航
          requireAuth: true,//是否要登录
					isUseCache: false,  // 这个字段判断是否加载缓存数据
					keepAlive: true  // 通过此字段判断是否需要缓存当前组件  
        },
		},
		//穴位详情
		{
		  path: '/acupuncturePointsDetail/acupuncturePointsDetail/:id/:name',
		  name: 'acupuncturePointsDetail',
		  component: acupuncturePointsDetail,
			meta: { navShow: false},
		},
		//茶饮
		{
		  path: '/tea/tea',
		  name: 'tea',
		  component: tea,
      meta:
        {
          navShow: false, //是否显示底部导航
          requireAuth: true,//是否要登录
					isUseCache: false,  // 这个字段判断是否加载缓存数据
					keepAlive: true  // 通过此字段判断是否需要缓存当前组件 
        },
		},
		//茶饮详情
		{
		  path: '/teaDetail/teaDetail/:name',
		  name: 'teaDetail',
		  component: teaDetail,
			meta: { navShow: false},
		},
		//药膳
		{
		  path: '/medicinalFood/medicinalFood',
		  name: 'medicinalFood',
		  component: medicinalFood,
      meta:
        {
          navShow: false, //是否显示底部导航
          requireAuth: true,//是否要登录
					isUseCache: false,  // 这个字段判断是否加载缓存数据
					keepAlive: true  // 通过此字段判断是否需要缓存当前组件 
        },
		},
		//药膳详情
		{
		  path: '/medicinalFoodDetail/medicinalFoodDetail/:name',
		  name: 'medicinalFoodDetail',
		  component: medicinalFoodDetail,
			meta: { navShow: false},
		},
		//节气
		{
		  path: '/solarTerms/solarTerms',
		  name: 'solarTerms',
		  component: solarTerms,
      meta:
        {
          navShow: false, //是否显示底部导航
          requireAuth: true,//是否要登录
        },
		},
		//节气类型
		{
		  path: '/solarTermsType/solarTermsType/:id',
		  name: 'solarTermsType',
		  component: solarTermsType,
      meta:
        {
          navShow: false, //是否显示底部导航
          requireAuth: true,//是否要登录
        },
		},
		//更多节气
		{
		  path: '/moreSolarTerms/moreSolarTerms',
		  name: 'moreSolarTerms',
		  component: moreSolarTerms,
			meta: { 
				navShow: false,
				isUseCache: false,  // 这个字段判断是否加载缓存数据
				keepAlive: true  // 通过此字段判断是否需要缓存当前组件 
			},
		},
		//节气详情
		{
		  path: '/solarTermsDetail/solarTermsDetail/:id',
		  name: 'solarTermsDetail',
		  component: solarTermsDetail,
			meta: { navShow: false},
		},
		//意见反馈
		 {
		  path: '/word/feedback',
		  name: 'feedback',
		  component: feedback,
			meta: { navShow: false },
		},
		//患者管理
		 {
		  path: '/word/patientManagement',
		  name: 'patientManagement',
		  component: patientManagement,
			meta: { navShow: false },
		},
		//患者信息
		 {
		  path: '/word/patientInfo/:pId',
		  name: 'patientInfo',
		  component: patientInfo,
			meta: { navShow: false },
		},
		//查看大图
		 {
		  path: '/word/lookBigPic/:pId',
		  name: 'lookBigPic',
		  component: lookBigPic,
			meta: { navShow: false },
		},
		//设置
		 {
		  path: '/word/set',
		  name: 'set',
		  component: set,
			meta: { navShow: false },
		},
		//关于大经
		 {
		  path: '/word/aboutDj',
		  name: 'aboutDj',
		  component: aboutDj,
			meta: { navShow: false },
		},
		//个人中心
		 {
		  path: '/word/personalCenter',
		  name: 'personalCenter',
		  component: personalCenter,
			meta: { navShow: false },
		},
		//帮助中心
		 {
		  path: '/word/helpCenter',
		  name: 'helpCenter',
		  component: helpCenter,
			meta: { navShow: false },
		},
		//星星
		{
		  path: '/star/star',
		  name: 'star',
		  component: star,
      meta:
        {
          navShow: false, //是否显示底部导航
          requireAuth: true,//是否要登录
        },
		},
		//疾病详情
		{
		  path: '/illDetail/illDetail',
		  name: 'illDetail',
		  component: illDetail,
		  meta:
		    {
		      navShow: false, //是否显示底部导航
		      requireAuth: true,//是否要登录
				
		    },
		},
		//医院列表
		{
		  path: '/hospitalList/hospitalList',
		  name: 'hospitalList',
		  component: hospitalList,
		  meta:
		    {
		      navShow: false, //是否显示底部导航
		      requireAuth: true,//是否要登录
				
		    },
		},
		//医生列表
		{
		  path: '/docList/docList/:hospitalCode/:hospitalName',
		  name: 'docList',
		  component: docList,
		  meta:
		    {
		      navShow: false, //是否显示底部导航
		      requireAuth: true,//是否要登录
					
		    },
		},
		//路由重定向
		{
			path:'/',   
			redirect: { path: '/home/home'}
		},
		
  ],
	/* scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {        
        return savedPosition    
    } else { 			
        if (from.meta.keepAlive) {   
             from.meta.savedPosition = document.body.scrollTop;      
        }
        return { x: 0, y: to.meta.savedPosition || 0 }    
    }  
  } */
})
