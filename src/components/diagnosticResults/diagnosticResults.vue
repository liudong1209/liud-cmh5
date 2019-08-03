<template>
	<div class="diagnosticResults">
		<header class="header">
			<span class="title">诊断结果</span>
		</header>
		<div class="content">
			<div class="syndromeTypeList">
				<div class="d-title">
					<img src="static/images/zhengxing.png" />
					<span>诊断证型列表</span>
				</div>		
				<div class="list">
					<ul class="mui-table-view">
						<li class="mui-table-view-cell" 
							v-for="(item,pId) in patientDetail"
							:key="pId"
							@click="goHealthRegimen(item.content)"
							
						>
							<a class="mui-navigate-right">
								<span class="left">{{ item.name }}</span>
								<span class="right">
									<star :size="36" :score="Math.ceil(item.weight/20)"></star> 
								</span>
							</a>
						</li>				
					</ul>
				</div>
			</div>		
			<div class="diseaseList" v-if="chineseIllDiagnosisList.length!=0">
				<div class="d-title">
					<img src="static/images/book.png" />
					<span>中医病症列表</span>
				</div>		
				<div class="list">
					<ul class="mui-table-view">
						<li class="mui-table-view-cell" 
							v-for="(item,pId) in chineseIllDiagnosisList"
							:key="pId"
							@click="goIllDeail(item)"
						>
							<a class="mui-navigate-right">
								<span class="left">{{ item.name}}</span>
								<span class="right">
									<star :size="36" :score="Math.ceil(item.weight/20)"></star> 
								</span>
							</a>
						</li>				
					</ul>
				</div>
			</div>
			<div class="diseaseList" v-if="westernIllDiagnosisList.length!=0">
				<div class="d-title">
					<img src="static/images/book.png" />
					<span>西医疾病列表</span>
				</div>		
				<div class="list">
					<ul class="mui-table-view">
						<li class="mui-table-view-cell" 
							v-for="(item,pId) in westernIllDiagnosisList"
							:key="pId"
							@click="goIllDeail(item)"
						>
							<a class="mui-navigate-right">
								<span class="left">{{ item.name}}</span>
								<span class="right">
									<star :size="36" :score="Math.ceil(item.weight/20)"></star> 
								</span>
							</a>
						</li>				
					</ul>
				</div>
			</div>
		
		</div>
		<div class="footer">
			<router-link to="/home/home" style="color: red;font-size: 0.4rem;" >
				返回首页
			</router-link>
		</div>
	</div>
</template>

<script>
	import star from '@/components/star/star'
	import { Toast } from 'mand-mobile'
	export default {
		data() {
			return {
				psid:this.$route.params.psid,
				patientDetail:null,
				chineseIllDiagnosisList:[],
				westernIllDiagnosisList:[]
			}
		},
		methods: {
			//养生方案
			goHealthRegimen(patient){
				this.$store.commit("SelfDiagnosis/updateHealthRegimen",patient)
				this.$router.push({
					path: '/healthRegimen/diagHealthRegimen'
				});
			},
			//去疾病详情
			goIllDeail(illDetail) {
				this.$store.commit("SelfDiagnosis/updateIllDetail",illDetail)
				this.$router.push({
					path: '/illDetail/illDetail'
				});				
			},	
		},
		mounted() {
			
			this.$post('diagnosispatient/getDiagnosis', {
					"psId": this.psid,					
			}).then(res => {
				if(res.data.code == 200){
					this.patientDetail=res.data.data.symptomDiagnosis;					
					this.chineseIllDiagnosisList=res.data.data.chineseIllDiagnosisList;
					this.westernIllDiagnosisList=res.data.data.westernIllDiagnosisList;
					
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
		},
		components: {
			star
		 }	
	}
</script>

<style scoped="" lang="less">
	.diagnosticResults{
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0; 
		.content{
			width: 100%;
			height: calc(100% - 1.6rem);
			position: absolute;
			left: 0;
			top: 0.8rem;
			 overflow: auto;
		}
		.diseaseList{
			width: 100%;
			background: #fff;
		}
		.syndromeTypeList{
			width: 100%;
			background: #fff;
			.d-title{
				margin-top: 0rem;
			}
		}
		.d-title{
			width: 100%;
			height: 0.8rem;
			line-height: 0.8rem;
			margin-top: 0.8rem;
			img{
				width: 0.4rem;
				display: inline-block;
				margin: 0.2rem 0.05rem 0.2rem 0.2rem;
				float: left;
			}
			span{
				float: left;
				font-size: 0.3rem;
				color: red;
			}
		}
		.list{
			width: 100%;
			ul{
				li{
					font-size: 0.3rem;
					.left{
						width: 50%;
						float: left;
						white-space: nowrap;
						text-overflow: ellipsis;
						overflow: hidden;
					}
					.right{
						width: 50%;
						float: right;
						display: inline-block;
						text-align: right;
					}
				}
			}
		}
		.footer{
			position: absolute;
			left: 0;
			height: 0.8rem;
			line-height: 0.8rem;
			text-align: center;
			color: red;
			width: 100%;
			bottom: 0;
		}
	}
</style>
