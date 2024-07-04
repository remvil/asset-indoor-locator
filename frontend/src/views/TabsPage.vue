<template>
	<ion-page>
		<div class="ion-page" id="main-content">
			<ion-tabs>
				<ion-router-outlet></ion-router-outlet>
				<ion-tab-bar slot="bottom" color="dark">
					<ion-tab-button tab="homepage" href="/tabs/home">
						<ion-icon aria-hidden="true" :icon="home" />
						<ion-label>Home</ion-label>
					</ion-tab-button>

					<ion-tab-button tab="navigate" href="/tabs/navigate">
						<ion-icon aria-hidden="true" :icon="navigate" />
						<ion-label>Map</ion-label>
					</ion-tab-button>

					<ion-tab-button tab="search" href="/tabs/search">
						<ion-icon :icon="list" />
						<ion-label>Assets</ion-label>
					</ion-tab-button>

					<ion-tab-button tab="profile" href="#">
						<ion-menu-toggle>
							<ion-icon :icon="person" />
						</ion-menu-toggle>
						<ion-label>Profile</ion-label>
					</ion-tab-button>

				</ion-tab-bar>
			</ion-tabs>
		</div>
		<SideMenuComponent ref="childCompRef" />
	</ion-page>

</template>

<script setup lang="ts">
import { IonMenuToggle, IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { home, navigate, list, person } from 'ionicons/icons';
import SideMenuComponent from '@/components/SideMenuComponent.vue';
</script>
<style>
ion-menu-toggle ion-icon {
	font-size: 24px !important;
}
</style>