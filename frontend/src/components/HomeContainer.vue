<template>
	<div id="container">
		<h1>Welcome to indoor navigation!</h1>
		<p class="ion-text-center ion-padding">
			This app helps you navigate inside buildings and find rooms and objects.
		</p>
	</div>
</template>

<script setup lang="ts">

defineProps({
	name: String,
});
</script>

<style scoped>
#container {
	text-align: center;
	position: absolute;
	left: 0;
	right: 0;
	top: 50%;
	transform: translateY(-50%);
}

#container strong {
	font-size: 20px;
	line-height: 26px;
}

#container p {
	font-size: 16px;
	line-height: 22px;
	color: #8c8c8c;
	margin: 0;
}

#container a {
	text-decoration: none;
}
</style>
