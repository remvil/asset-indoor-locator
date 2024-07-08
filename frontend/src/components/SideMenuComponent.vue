<template>
	<ion-menu side="start" menu-id="sidemenu" content-id="main-content">
		<ion-header>
			<ion-toolbar>
				<ion-title>Menu</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content>
			<div class="menu-header">
				<p>Hi User</p>
				<p>Version: {{version}}</p>
				<p>Description:
					Asset Locator&trade;, developed and managed by Company Ltd., represents a cutting-edge application designed
					to streamline and enhance the asset management process for businesses. Launched in 2024, this application
					leverages the latest in technology to provide users with an intuitive and efficient platform for tracking and
					managing assets across various locations.</p>
			</div>
			<ion-list class="logout-list">
				<ion-item button @click="logout">
					<ion-icon slot="start" :icon="logOutIcon"></ion-icon>
					<ion-label>Logout</ion-label>
				</ion-item>
			</ion-list>
		</ion-content>
	</ion-menu>
</template>

<script setup lang="ts">
import { useIonRouter, IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonIcon, IonLabel, menuController } from '@ionic/vue';
import { logOut as logOutIcon } from 'ionicons/icons';
import { logout as handleLogout } from '@/services/apiService';
import pkg from '../../package.json';

const version = pkg.version;
const router = useIonRouter();

const logout = () => {
	menuController.close('sidemenu');
	handleLogout();
	router.push('/login');
};
</script>

<style>
.menu-header {
	padding: 16px;
	background-color: #f4f4f4;
	border-bottom: 1px solid #ddd;
}

ion-list.logout-list {
	position: absolute;
	bottom: 0;
	width: 100%;
	border: none;
	background-color: #f4f4f4;

	ion-item {
		--ion-item-background: transparent;
		border: none;

		.item-innser {
			border: none;
		}
	}

}
</style>
