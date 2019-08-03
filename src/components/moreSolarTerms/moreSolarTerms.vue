<template>
	<div class="moreSolarTerms">
		<header class="header">
			<span class="mui-icon mui-icon-back back" @click="$router.back(-1)"></span>
			<span class="title">节气</span>
		</header>
		<div class="moreSolarTerms-con moreSolarTermsList">
			<div class="list">
				<ul class="mui-table-view">
					<li class="mui-table-view-cell mui-media"
						v-for="(item,index) in moreSolarTerms" :key="index" 
						@click="goSolarTermsDetail(item.id)"
					>
						<a class="mui-navigate-right">
							<div class="mui-media-body">
								<p>{{item.name}}</p>									
							</div>
						</a>
					</li>
				</ul>

			</div>
		</div>
	</div>
</template>

<script>
	import { Toast } from 'mand-mobile'
	import Bscroll from 'better-scroll'
	 export default {
	    data(){
	        return{
	            allLoaded:false,
				moreSolarTerms:null,
				options: {
				  mouseWheel: true,
				  click: true,
				  tap: true,
				},
	        }
	    },		
		methods: {
			//初始化
			initScroll () {				
				if(!this.myScroll){
					this.myScroll = new Bscroll('.moreSolarTermsList', this.options)
				}else{
					this.myScroll.refresh()
				}				
			},	
			loadBottom() {
				this.$refs.loadmore.onBottomLoaded();
				this.getList();
			},
			//进入节气页面
			goSolarTermsDetail(id){
				 this.$router.push({
					path: '/solarTermsDetail/solarTermsDetail/'+ id
				});
			},	
			//获取更多节气
			getMoreSolarTerms(){
				this.$post('solThrottleType/getthrnambyall', {	
					'thrId':this.$route.params.id
				}).then(res => {
					if(res.data.code == 200){
						this.moreSolarTerms = res.data.body;				
					}else{
						const msg = res.data.msg;
						Toast({
							content: msg,
							position: 'bottom',	
							duration: 1000							
						});
					}
				}).catch((err) => {
					
				})
			}		
		},
		mounted() {
			
		},
		//在vue对象存活的情况下，进入当前存在activated()函数的页面时，
		//一进入页面就触发；可用于初始化页面数据等
		activated() {
		  // isUseCache为false时才重新刷新获取数据
		  // 因为对list使用keep-alive来缓存组件，所以默认是会使用缓存数据的         
		  if(!this.$route.meta.isUseCache){            
			
			this.getMoreSolarTerms();
		  }else {
			this.$route.meta.isUseCache = false; 
		  }
		   this.$nextTick(() => {
		   	this.initScroll()
		   })
		},
	}
</script>

<style lang="less" scoped="scoped">
	.moreSolarTerms {
		width: 100%;
		.moreSolarTerms-con {
			position: absolute;
			top: 1rem; // 与bottom同理
			left: 0;
			right: 0;
			bottom: 0rem; // 底部有footer，没有的话设置为0
			overflow: hidden;
			height: calc(100% - 1rem);				
			
				
			.list {
				width: 100%;
				width: 100%;
				overflow-y: auto;
				overflow-x: hidden;
				ul {
					
					li {
						font-size: 0.28rem;
						position: relative;

						p {
							font-size: 0.28rem;
						}
					}
				}
			}
		}
	}
</style>
