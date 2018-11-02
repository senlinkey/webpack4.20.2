<template>
	<div class="home-container">
		<h1>我是home页面</h1>
	</div>
</template>

<script>
export default {
	created () {
		let a = {a:1,b:2};
		let b = {...a}
		console.log(b);
	}
}
</script>

<style lang="less" scoped>
.home-container{
	width: 100%;
	height: 100%;
	background-color: orangered;
}
</style>