<template>
	<div class="feedback-wrapper">
		<header class="header">
			<span class="mui-icon mui-icon-back back" @click="$router.back(-1)"></span>
			<span class="title">意见反馈</span>
		</header>
		<div class="feedback-wrapper-con">
			<textarea rows="4" v-model="advise" placeholder="请输入您的宝贵意见"></textarea>
			<div class="feed">欢迎您对"大经中医"提出宝贵的意见和建议,您留下的任何信息都将会改善我们的产品,谢谢</div>
			<div class="submit" @click="submit()">提交反馈</div>
		</div>
	</div>
</template>

<script>
	import { Toast } from 'mand-mobile';
	export default {
	    data(){
	        return{
				advise:"",//建议
	        }
	    },
		
	    methods:{
			//提交反馈建议
			submit(){
				if(this.advise == ""){
					Toast({
					  content: '大经中医：请输入反馈内容',
					  position: 'bottom',
					  duration: 1000
					});
				}else{
          let uId = this.$store.getters.uIdString
          this.$post('feedback/feedbackinst', {"userId": uId, "uId": uId, "content":this.advise}).then(res => {
			if(res.data.code == 200){
				let result = res.data;           
				Toast({
				  content: result.msg,
				  position: 'bottom',
				  duration: 1000
				});
				this.$router.go(-1);
			}else{
				Toast({
				  content: res.data.msg,
				  position: 'bottom',
				  duration: 1000
				});
			}
			
          }).catch((err) => {
            console.log(err)
          })
        }
			}
	        
	    },	   
	}
</script>

<style scoped="scoped" lang="less">
	.feedback-wrapper{
		width: 100%;
		.feedback-wrapper-con {
			position: absolute;
			left: 0;
			top: 0.8rem;
			right: 0;
			bottom: 0;
			height: auto;
			width: 100%;
			background: #fff;
			overflow-x: hidden;
			overflow-y: auto;
			textarea{
				border: none;
			}
			.feed{
				width: 94%;
				text-align: left;
				margin:0 auto;
				color: #999;
				font-size: 0.26rem;
			}
			.submit{
				background: #CB231F;
				width: 94%;
				text-align: center;
				margin:0 auto;
				color: #fff;
				font-size: 0.28rem;
				height: 0.8rem;
				line-height: 0.8rem;
				border-radius: 5px;
				margin-top: 0.3rem;
			}
		}
	}
</style>
