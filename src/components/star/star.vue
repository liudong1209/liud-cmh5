<template>
    <div class="star" :class="starType">
        <span v-for="itemClass in itemClasses" :class="itemClass" class="star-item"></span>
    </div>
</template>

<script>
  const LENGTH = 5
  const CLS_ON = 'on'
  const CLS_HALF = 'half'
  const CLS_OFF = 'off'
  
  export default {
    props: {
      size: {
        type: Number
      },
      score: {
        type: Number
      }
    },
    computed: {
      starType () {
        return 'star-' + this.size
      },
      itemClasses () {
        let result = []
        let score = Math.floor(this.score * 2) / 2
        let hasDecimal = score % 1 !== 0
        let integer = Math.floor(this.score)
        for (let i = 0; i < integer; i++) {
          result.push(CLS_ON)
        }
        if (hasDecimal) {
          result.push(CLS_HALF)
        }
        while (result.length < LENGTH) {
          result.push(CLS_OFF)
          integer++
        }
        return result
      }
    }
  }
</script>

<style lang="less" scoped="">
  
  .star{
    width: 100%;
		height: auto;
  }
	.star-item{
	  width: 20px;
	  height: 20px;
	  margin-right: 12px;
	  background-size: 30px 30px;
		display: inline-block;
	}
  .on{
    background: url("../../../static/images/star36_on.png");
  } 
  .half{
    background: url("../../../static/images/star36_half.png");
  } 
	 .off{
		 background: url("../../../static/images/star36_off.png");
	 } 
      
  
    
</style>
