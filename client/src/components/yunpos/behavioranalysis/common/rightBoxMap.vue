<template>
	<div class="mapChart" ref="mapChart"></div>
</template>

<script>
import echarts from 'echarts';
import dalianJson from '@/assets/map/dalian.json';
import custGeoData from '@/assets/map/custGeoData.json';

export default {
	data() {
		return {
			
		}
	},
	methods: {
		initMap:function(){
			let self = this;
			echarts.registerMap('dalian', dalianJson);
		    var chart = this.chart = echarts.getInstanceByDom(self.$refs.mapChart) || echarts.init(self.$refs.mapChart);
		    var option = this.option = {
		    	geo: {
		            map: 'dalian',
		            label: {
		                emphasis: {
		                    show: false
		                }
		            },
		            itemStyle: {
		                normal: {
		                    areaColor: 'rgba(25,68,100,0.8)',
		                    borderWidth:'0',
		                },
		                emphasis: {
		                    areaColor: 'rgba(178,221,251,0.8)',
		                }
		            },
		            aspectScale:'0.9',
		            zoom:'1.1',
		            center:[122.3, 39.45],
		            silent:true,
		        },
		        series: [{
		            type: 'scatter',
		            coordinateSystem: 'geo',
		            symbolSize: 3,
		            itemStyle: {
		                normal: {
		                    shadowBlur: 20,
		                    shadowOffsetX:0,
		                    shadowOffsetY:0,
		                    shadowColor: 'rgba(66, 237, 248, 0.6)',
		                    borderColor: 'rgba(66, 237, 248, 0.6)',
		                    borderWidth:1,
                    		color: 'rgba(255, 255, 255, 0.6)'
		                }
		            },
		            data: custGeoData
		        }]
		    }
		    chart.setOption(option);
		}
	},
	created(){
		
	},
	mounted() {
		this.initMap();
	},
	beforeDestroy(){
		if(this.chart){
			this.chart.dispose();
		}
	},
}
</script>

<style lang="scss" scoped>
	.mapChart{
		width:10rem;
		height:6.92rem;
		margin: auto;
	}
	
</style>