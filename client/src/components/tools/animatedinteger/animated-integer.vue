<template>
	<span>
		<figureFormat format="small-decimal" :strValue=tweeningValue></figureFormat>
	</span>
</template>

<script>
	import Vue from 'vue'
	import TWEEN from 'tween.js'
	import figureFormat from '../figureformat/figure-format.vue';

	export default {
		props: {
			value: {
				type: Number,
				required: true
			}
		},
		data: function() {
			return {
				tweeningValue: '0',
			}
		},
		components: {
			figureFormat
		},
		watch: {
			value: function(newValue, oldValue) {
				this.tween(oldValue, newValue)
			}
		},
		mounted: function() {
			let vm = this;
			vm.tween(0, this.value)
		},
		methods: {
			tween: function(startValue, endValue) {
				var vm = this

				function animate(time) {
					requestAnimationFrame(animate)
					TWEEN.update(time)
				}
				new TWEEN.Tween({
						tweeningValue: startValue
					})
					.to({
						tweeningValue: endValue
					}, 1000)
					.onUpdate(function() {
						vm.tweeningValue = this.tweeningValue.toFixed(2)
					}).onComplete(function(data){
						vm.$emit("end-value",data.tweeningValue);
					})
					.start()
				animate()
			}
		}
	}
</script>
