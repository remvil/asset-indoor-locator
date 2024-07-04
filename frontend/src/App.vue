<template>
	<ion-app>
		<ion-router-outlet />
	</ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { onMounted } from "vue";
onMounted(() => {
	document.body.classList.toggle('light', true);
});

</script>
