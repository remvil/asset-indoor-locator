<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-title>Welcome</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content class="ion-padding">
			<div class="presentation-container">
				<img :src="logoPath" class="presentation-logo" alt="Logo">
				<h2>Welcome to Asset Locator</h2>
				<p>With this application, you can navigate within the building and search for assets. The map view and search
					functionality will help you orient yourself as quickly as possible.</p>
				<ion-button expand="block" @click="navigateToMap">Get Started</ion-button>
				<ion-button expand="block" @click="navigateToAssetsList">Search Asset</ion-button>
			</div>
		</ion-content>
	</ion-page>
</template>

<script setup lang="ts">
import { useIonRouter, IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/vue';
import { ref } from 'vue';

const router = useIonRouter();
const logoPath = ref("images/presentation-logo.png"); // Replace with the path to your logo

const navigateToMap = () => {
	router.push('/tabs/navigate'); // Adjust the route as needed
};
const navigateToAssetsList = () => {
	router.push('/tabs/search'); // Adjust the route as needed
};
</script>

<style>
.presentation-container {
	text-align: center;
	padding: 20px;
}

.presentation-logo {
	display: block;
	margin: 0 auto;
	max-width: 150px;
	padding-bottom: 20px;
}

h2 {
	margin-bottom: 20px;
}

p {
	margin-bottom: 40px;
}
</style>
