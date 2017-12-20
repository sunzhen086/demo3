<template>
	<span class="figure-format">
		<span class="integer">{{integerPart}}</span><span class="decimal">{{decimalPart}}</span>
	</span>
</template>

<script>
	export default {
		props:{
			format:{
				type:String, 
				default:"" //默认空,返回原数; small-decimal让小数变小70%; to-thousand转化为千分位
			}, 
			numValue: Number,
			strValue: String
		},
		data() {
			return {
				integerPart: this.value,
				decimalPart: ""
			}
		},
		watch:{
			value:function(){
				this.integerPart = this.formatNumber().integerPart;
				this.decimalPart = this.formatNumber().decimalPart
			}
		},
		computed:{
			value:function(){
				return this.numValue || this.strValue;
			}
		},
		mounted: function(){
			this.integerPart = this.formatNumber().integerPart;
			this.decimalPart = this.formatNumber().decimalPart
		},
		methods:{
			formatNumber: function() {
				var integerValue, decimalValue,value = this.value + "";
				if("small-decimal" == this.format) {
					if(value.indexOf(".") != -1) {
						integerValue = (value.split(".")[0] || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
						decimalValue = "." + value.split(".")[1];
					} else {
						integerValue = (value || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');;
						decimalValue = '';
					}
				} else if("to-thousand" == this.format) {
					integerValue = (value || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
					decimalValue = '';
				} else {
					integerValue = value;
					decimalValue = '';
				}
				
				return {
					integerPart: integerValue,
					decimalPart: decimalValue
				};
			}	
		}
	}
</script>

<style lang="scss" scoped>

.figure-format {
	font-weight: inherit;
	.decimal {
		font-size:70%;		
	}
	span{
		font-weight: inherit;
	}
}






</style>