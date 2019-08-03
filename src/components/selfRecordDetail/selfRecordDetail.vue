<template>
	<div class="selfRecordDetail">
		<header class="header">
			<span class="mui-icon mui-icon-back back" @click="$router.back(-1)"></span>
			<span class="title">自诊详情</span>
		</header>
		<div class="selfRecordDetail-con" v-if="patientDetail">
			<div class="detail">
				<div class="item">
					<span class="bt">自诊时间:</span>
					<span class="bt-right">{{patientDetail.diagnosisTime.length>19?patientDetail.diagnosisTime.substring(0,19):patientDetail.diagnosisTime }}</span>
				</div>
				<div class="item">
					<span class="bt">患者姓名:</span>
					<span class="bt-right">{{ patientDetail.pname }}</span>
				</div>
				<div class="item">
					<span class="bt">患者年龄:</span>
					<span class="bt-right">{{ age }}</span>
				</div>
				<div class="item">
					<span class="bt">症状概述:</span>
					<span class="bt-right">{{ patientDetail.popnames }}</span>
				</div>
				
				<div class="item">
					<span class="bt">诊断证型:</span>
					<span class="bt-right" v-for="(item,index) in patientDetail.symptomDiagnosis" :key="'symptomDiagnosis'+index">{{ item.name }}</span>
				</div>
				<div class="item" v-if="patientDetail.chineseIllDiagnosisList.length!=0">
					<span class="bt">中医病症:</span>
					<span class="bt-right">
						<span v-for="(item,index) in patientDetail.chineseIllDiagnosisList" :key="'chineseIllDiagnosisList'+index">{{ item.name.split('_')[0] }}</span>
					</span>
				</div>
				<div class="item" v-if="patientDetail.westernIllDiagnosisList.length!=0">
					<span class="bt">西医疾病:</span>
					<span class="bt-right">
						<span class="bt-right" v-for="(item,index) in patientDetail.westernIllDiagnosisList" :key="'westernIllDiagnosisList'+index">{{ item.name.split('_')[0] }}</span>
					</span>
				</div>
				<div class="item">
					<span class="bt">建议治法:</span>
					<span class="bt-right">{{ patientDetail.teaname }}</span>
				</div>
			</div>
			<div class="list">
				<ul class="mui-table-view" v-for="(item,index) in patientDetail.symptomDiagnosis">
					<div class="healthRegimen-con"  >
						<li class="mui-table-view-cell" >
							<a class="mui-navigate-right">
								<span class="left">
									{{ item.name }}
									 <md-tip 
										:content="item.exp" 
										placement="top"
										:offset="{left: 90,top:-50}"
									>
									  <div class="tip" >
									  	<img src="static/images/tip.png" />
									  </div>	
									</md-tip>														
								</span>
								<span class="right">
									<star :size="36" :score="Math.ceil(item.weight/20)"></star>
								</span>
							</a>
											
						</li>
						
						<healthRegimen :treatment="item"></healthRegimen>
					</div>	
				</ul>				
			</div>			
		</div>
	</div>
</template>

<script>
	import star from '@/components/star/star'
	import healthRegimen from '@/components/healthRegimen/healthRegimen'
	import { Tip } from 'mand-mobile'
	import { Toast } from 'mand-mobile'
	export default {
		data() {
			return {
				psid:this.$route.params.psid,
				patientDetail:null,
				
			}
		},
		computed:{
			age(){
				let date = new Date;
				let currentYear = date.getFullYear();
				let birthYear = this.patientDetail.pbirth.substring(0, 4);
				let age = currentYear - birthYear;
				return age;	 			
			}
		},
		methods: {
			//获取详情信息
			getSelfDiagnosisInfo(){
				//patientbyone
				this.$post('patient/selfDiagnosisInfo', {
						"psId": this.psid,					
				}).then(res => {
					
					if(res.data.code == 200){
						this.patientDetail=res.data.data;
					}else{
						const msg = res.data.msg;
						Toast({
							content: msg,
							position: 'bottom',
							duration: 1000								
						});
					}
				}).catch((err) => {
					 console.log(err)
				})
			}
		},
		// 详情页面的beforeRouteLeave钩子函数
		beforeRouteLeave (to, from, next) { 
			if (to.name == 'selfRecord') {
				to.meta.isUseCache = true;    
			}        
		  next();
		},
		mounted() {
			this.getSelfDiagnosisInfo();
		},
		components: {
			star,
			healthRegimen
		}

	}
</script>

<style lang="less" scoped="scoped">
	.selfRecordDetail {
		.selfRecordDetail-con {
			position: absolute;
			left: 0;
			top: 0.8rem;
			right: 0;
			bottom: 0;
			width: 100%;
			background: #fff;
			overflow: auto;
			.detail {
				width: 100%;
				background: #fff;
				padding: 0.1rem 0;
				.item {
					margin: 0.15rem;
					font-size: 0.28rem;
					display: flex;
					span {
						display: inline-block;					
					}
					.bt {
						display: flex;
						flex: 0 0 1.6rem;
					}
					.bt-right{
						flex: 1;
						span{
							margin-right: 0.15rem;
						}
					}
				}
			}
			.list {
				position: relative;
				height: calc(100% - 1rem);
				margin-top: 0.3rem;				
				ul {
					width: 100%;
					height: 85%;
					margin-bottom: 0.2rem;
					border-top: 0.2rem solid #f5f5f5;
					&:after{
						height: 0;
					}
					li {
						font-size: 0.3rem;
						.left {
							float: left;
							padding-top: 0.1rem;
							position: relative;
							.tip {
								display: inline-block;

								img {
									display: inline-block;
									width: 0.36rem;
								}
							}
						}
						.right {
							float: right;
							margin-top: 0.05rem;
							padding-bottom: 0.05rem;
							display: inline-block;
							text-align: right;
						}
					}
				}
			}
			.healthRegimen-con {
				position: relative;
				background: #fff;
				height: 100%;
				li{
					overflow: inherit;	
					a{
						&:after{
							content:'';
						}
					}
				}
			}
		}
		
		
		
            
	}
</style>
