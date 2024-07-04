<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-title>Hospital Assets</ion-title>
			</ion-toolbar>
		</ion-header>

		<ion-content class="ion-padding">
			<ion-searchbar placeholder="Search an asset..." :debounce="500" v-model="searchTerm"></ion-searchbar>
			<ion-list lines="full">
				<ion-item v-for="asset in filteredAssets" :key="asset.id" @click="doAction(asset)">
					<ion-icon size="small" :icon="pricetag" slot="start"></ion-icon>
					<ion-icon v-if="asset.batteryLevel < 20" class="blinking" size="small" :icon="batteryHalf" color="danger"
						slot="end" />
					<ion-label>{{ asset.name }}</ion-label>
					<ion-button slot="end" color="none">
						<ion-icon :icon="chevronForward" color="medium" />
					</ion-button>
				</ion-item>
			</ion-list>
			<ion-modal :is-open="isModalOpen" @didDismiss="closeModal">
				<template #default>
					<ion-header>
						<ion-toolbar>
							<ion-title>{{ selectedAsset?.name }}</ion-title>
							<ion-buttons slot="end">
								<ion-button @click="closeModal">
									<ion-icon :icon="close" color="medium" />
								</ion-button>
							</ion-buttons>
						</ion-toolbar>
					</ion-header>
					<ion-content class="ion-padding">
						<p><strong>ID:</strong> {{ selectedAsset?.id }}</p>
						<p><strong>Tag ID:</strong> {{ selectedAsset?.tagId }}</p>
						<p><strong>Tag Battery Status:</strong> {{ selectedAsset?.batteryLevel }}%</p>
						<p><strong>Description:</strong> {{ selectedAsset?.description }}</p>
						<p><strong>Floor:</strong> {{ selectedAsset?.floor }}</p>
					</ion-content>
					<ion-footer>
						<ion-toolbar>
							<ion-button v-if="selectedAsset" expand="block"
								@click="navigateToPageMap(selectedAsset.lat || 0, selectedAsset.lon || 0)" color="warning">
								<ion-icon :icon="navigateCircle" size="large" color="dark" />
							</ion-button>
						</ion-toolbar>
					</ion-footer>
				</template>
			</ion-modal>
		</ion-content>
	</ion-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonIcon, IonLabel, IonButton, IonSearchbar, IonModal, IonButtons, IonFooter } from '@ionic/vue';
import { chevronForward, pricetag, close, navigateCircle, batteryHalf } from 'ionicons/icons';
import { fetchAPIObservable } from '@/services/apiService';
import { HospitalAsset } from '@/models/hospitalAssets';
import proj4 from "proj4";

const searchTerm = ref('');
const hospitalAssets = ref<HospitalAsset[]>([]);

const filteredAssets = computed(() => {
	return hospitalAssets.value.filter(asset =>
		asset.name.toLowerCase().includes(searchTerm.value.toLowerCase())
	);
});

const isModalOpen = ref(false);
const selectedAsset = ref<HospitalAsset | null>(null);

function doAction(asset: HospitalAsset) {
	selectedAsset.value = asset;
	isModalOpen.value = true;
}

function closeModal() {
	isModalOpen.value = false;
	selectedAsset.value = null;
}

async function navigateToPageMap(lat: number, lon: number) {
	closeModal();
	setTimeout(() => {
		const projectionEPSG3857 = proj4("EPSG:4326", "EPSG:3857", [lon, lat]);
		const lonEPSG3857 = projectionEPSG3857[0];
		const latEPSG3857 = projectionEPSG3857[1];
		const url = `/tabs/navigate?x=${lonEPSG3857}&y=${latEPSG3857}&z=23&r=0&l=1111`;
		// history.replaceState(history.state, '', url)
		window.location.href = url; // Force full page reload
	}, 200); // Adjust the timeout as needed
}

onMounted(async () => {
	try {
		// Requesting Assets to Observable API Service
		fetchAPIObservable('assets/list/battipaglia').subscribe({
			next: (data: HospitalAsset[]) => {
				hospitalAssets.value = data;
			},
			error: (error: any) => {
				console.error('Error API:', error);
			}
		});

		// Requesting Assets to Promise API Service
		// hospitalAssets.value = await fetchAPIPromise('assets/list')
	} catch (error) {
		console.error('Error API:', error);
	}
});

</script>

<style scoped>
.blinking {
	animation: blinker 1.5s linear infinite;
}

@keyframes blinker {
	50% {
		opacity: 30%;
	}
}
</style>
