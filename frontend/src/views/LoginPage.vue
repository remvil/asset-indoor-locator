<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-title>Asset Locator</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content class="ion-padding">
			<!-- <ion-grid class="full-height">
				<ion-row class="ion-justify-content-center ion-align-items-center full-height">
					<ion-col size-md="6" size-lg="4" size-xs="12" class="ion-text-center"> -->
			<img :src="logoPath" class="login-logo" alt="Logo">
			<form @submit.prevent="handleLogin">
				<ion-item>
					<ion-input label-placement="stacked" label="Username" placeholder="" v-model="credentials.username">
						<ion-icon slot="start" :icon="personCircle" aria-hidden="true"></ion-icon>
					</ion-input>
				</ion-item>
				<ion-item>
					<ion-input :type="passwordFieldType" label-placement="stacked" label="Password" placeholder=""
						v-model="credentials.password">
						<ion-icon slot="start" :icon="lockClosed" aria-hidden="true"></ion-icon>
						<ion-button fill="clear" slot="end" aria-label="Show/hide" @click="togglePasswordVisibility">
							<ion-icon slot="icon-only" :icon="passwordFieldType === 'password' ? eye : eyeOff"
								aria-hidden="true"></ion-icon>
						</ion-button>
					</ion-input>
				</ion-item>
				<br />
				<ion-button expand="block" type="submit">Login</ion-button>
				<p class="support-text">
					Problems with login? <a href="mailto:support@company.ltd">Write us</a>
				</p>
			</form>
			<!-- </ion-col>
				</ion-row>
			</ion-grid> -->
		</ion-content>
	</ion-page>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { useIonRouter, IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonInput, IonItem, IonButton } from '@ionic/vue';
import { eye, eyeOff, lockClosed, personCircle } from 'ionicons/icons';
import { TextFieldTypes } from '@ionic/core';
import type { ExtAPIResponse } from '../models/apiData';
import { login } from '@/services/apiService';
import { presentToast } from '@/services/ionicComponentsService';
import { getToken } from '@/services/storageService';

const credentials = ref({ username: '', password: '' });
const router = useIonRouter();
const logoPath = 'images/login-logo.png';
const passwordFieldType = ref<TextFieldTypes>('password');
const errorMessage = ref<string | null>(null); // Ref per il messaggio di errore


// Check for token on component mount
onBeforeMount(() => {
	const token = getToken();
	token.then((value) => {
		if (value !== "") {
			router.push('/tabs/home');
		}
	});
});

const handleLogin = async () => {
	errorMessage.value = null; // Reset del messaggio di errore

	if (!credentials.value.username) {
		errorMessage.value = 'Username field is required';
		presentToast('bottom', 'Username field is required', 'danger')
		return;
	}

	if (!credentials.value.password) {
		presentToast('bottom', 'Password field is required', 'danger')
		errorMessage.value = 'Password field is required';
		return;
	}

	try {
		const loginResp = await login(credentials.value);
		const { msg, code }: ExtAPIResponse = JSON.parse(loginResp);

		if (code === -1) {
			presentToast('bottom', msg, 'warning');
		}
		if (code === 200) {
			presentToast('bottom', `Welcome ${credentials.value.username}!`, 'success')
			router.push('/tabs/home');
		}
	} catch (error) {
		const msg = "Oops! It looks like there's a problem connecting to our servers. Please try again in a few moments.";
		presentToast('bottom', msg, 'warning');
		console.error(error);
	}
};

const togglePasswordVisibility = () => {
	passwordFieldType.value = passwordFieldType.value === 'password' ? 'text' : 'password';
};
</script>

<style>
.login-logo {
	display: block;
	margin: 0 auto;
	padding: 20px 0;
	max-width: 150px;
}

.full-height {
	height: 100%;
}

.support-text {
	font-size: 0.7rem;
}
</style>
