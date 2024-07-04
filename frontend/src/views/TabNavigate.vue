<template>
	<ion-page>
		<ion-content :fullscreen="true">
			<!-- Loader -->
			<div v-if="loading" class="loader"></div>
			<ion-header>
				<ion-toolbar>
					<ion-title size="large"><ion-icon aria-hidden="true" :icon="map" />&nbsp;&nbsp;&nbsp; Floor 4
					</ion-title>
				</ion-toolbar>
			</ion-header>

			<ol-map class="map-container" style="height: 90vh" :loadTilesWhileAnimating="true"
				:loadTilesWhileInteracting="true">
				<ol-view ref="view" :center="absoluteCenter" :rotation="rotation" :zoom="zoom" :minZoom="18"
					:projection="projection" @change:center="centerChanged" @change:resolution="resolutionChanged"
					@change:rotation="rotationChanged" />
				<button class="btn-map btn-locate" type="button" @click="changeCenter()">
					<ion-icon aria-hidden="true" :icon="locate" />
				</button>
				<button class="btn-map btn-layers" id="open-action-sheet">
					<ion-icon aria-hidden="true" :icon="layers" />
				</button>
				<ol-layer-group :opacity="1">
					<ol-tile-layer>
						<!-- <ol-source-osm :url="osmUrl" crossOrigin="anonymous" /> -->
					</ol-tile-layer>

					<!-- BBox Layer -->
					<ol-webgl-vector-layer :styles="[webglBBStyle]">
						<ol-source-vector :format="geoJson" crossOrigin="anonymous" url="geojson/battipagliabbox.geojson" />
					</ol-webgl-vector-layer>

					<!-- Planimetry Layer -->
					<ol-vector-layer>
						<ol-source-vector :format="geoJson" crossOrigin="anonymous" :features="planimetriaFeatures" />
						<ol-style>
							<ol-style-stroke color="rgba(5, 6, 34, 0.5)" width="1" dash="true" />
						</ol-style>
					</ol-vector-layer>

					<!-- All Rooms path Layer-->
					<!-- <ol-vector-layer>
						<ol-source-vector :format="geoJson" crossOrigin="anonymous" :features="pathFeatures" />
						<ol-style>
							<ol-style-stroke color="rgba(255,6,34,0.9)" width="2" :lineDash="[2, 5]" />
						</ol-style>
					</ol-vector-layer> -->

					<!-- Feature asset description -->
					<ol-interaction-select @select="featureSelected" :condition="selectCondition"
						:filter="selectInteactionFilter">
						<ol-style>
							<ol-style-stroke color="blue" :width="6"></ol-style-stroke>
							<ol-style-fill color="rgba(255,255,255,0.2)"></ol-style-fill>
							<ol-style-circle :radius="14">
								<ol-style-fill color="#3333ffff"></ol-style-fill>
								<ol-style-stroke color="#3333ff55" width="8"></ol-style-stroke>
							</ol-style-circle>
						</ol-style>
					</ol-interaction-select>
					<!-- Features assets Layer -->
					<ol-vector-layer>
						<ol-source-vector :format="geoJson" crossOrigin="anonymous" :features="assetsFeatures"
							:projection="projection">
						</ol-source-vector>
						<ol-style>
							<ol-style-circle :radius="6">
								<ol-style-fill color="#3333ffff"></ol-style-fill>
								<ol-style-stroke color="#3333ff99" width="20"></ol-style-stroke>
							</ol-style-circle>
						</ol-style>
					</ol-vector-layer>
					<!-- OVERLAY POSITION -->
					<ol-overlay :position="selectedTagPos" v-if="selectedTagName != ''">
						<div class="overlay-content">
							{{ selectedTagName }}
						</div>
					</ol-overlay>

					<!-- Fake Best path -->
					<!-- <ol-vector-layer>
						<ol-source-vector>
							<ol-feature ref="animationPath">
								<ol-geom-line-string :coordinates="fakeBestPathFeature"></ol-geom-line-string>
								<ol-style-flowline color="#c1111100" color2="#c11111ff" :width="0" :width2="4" :arrow="1" />
							</ol-feature>
							<ol-animation-path v-if="animationPath" :path="animationPath?.feature" :duration="10000" :repeat="2">
								<ol-feature>
									<ol-geom-point :coordinates="fakeBestPathFeature[0]"></ol-geom-point>
									<ol-style>
										<ol-style-circle :radius="5">
											<ol-style-fill color="#F1aa11"></ol-style-fill>
											<ol-style-stroke color="#Eaa11199" width="8"></ol-style-stroke>
										</ol-style-circle>
									</ol-style>
								</ol-feature>
							</ol-animation-path>
						</ol-source-vector>
					</ol-vector-layer> -->

					<!-- <ol-rotate-control></ol-rotate-control> -->

					<ol-interaction-link />

					<!-- Geolocation -->
					<ol-geolocation :projection="projection" @change:fakePosition="geoLocChange">
						<template>
							<ol-vector-layer :zIndex="2">
								<ol-source-vector>
									<ol-feature ref="positionFeature">
										<ol-geom-point :coordinates="fakePosition"></ol-geom-point>
										<ol-style>
											<ol-style-circle :radius="6" color="none">
												<ol-style-fill color="#c11111"></ol-style-fill>
												<ol-style-stroke color="#c1111199" width="8"></ol-style-stroke>
											</ol-style-circle>
										</ol-style>
									</ol-feature>
								</ol-source-vector>
							</ol-vector-layer>
						</template>
					</ol-geolocation>
				</ol-layer-group>
			</ol-map>
			<ion-action-sheet trigger="open-action-sheet" header="Actions" :buttons="actionSheetButtons"></ion-action-sheet>
		</ion-content>
	</ion-page>
</template>

<script setup lang="ts">
import { ref, inject, onMounted } from "vue";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonActionSheet } from '@ionic/vue';
import { fetchAPIObservable } from '@/services/apiService';
import { Feature, View } from "ol";
import { Geometry } from "ol/geom";
import type { ObjectEvent } from "ol/Object";
import { locate, layers, map } from 'ionicons/icons';
import { catchError, forkJoin, map as rxmap } from "rxjs";
// import AnimationPath from "ol-ext/featureanimation/Path";
import proj4 from "proj4";
import { Coordinate } from "ol/coordinate";

// Map Init Settings
const projection = ref("EPSG:3857"); //  EPSG:4326 or EPSG:3857
const zoom = ref(22);
const rotation = ref(0);
// const osmUrl = ref('https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}');
// const fakePosition = ref([1652955.865991945, 4958950.611020285]); // Fake position Infotel Salerno
// const absoluteCenterPosition = ref([1652940.865991945, 4958940.611020285]); // Absolute position Infotel Salerno

const fakePosition = ref([1666762.63257, 4956026.94507]); // Fake position Infotel Battipaglia
const currentCenter = ref(fakePosition.value);
const absoluteCenterPosition = ref([1666763.27053, 4956024.30346]); // Absolute position Infotel Battipaglia
const absoluteCenter = ref(absoluteCenterPosition.value);
const currentZoom = ref(zoom.value);
const currentRotation = ref(rotation.value);
const currentResolution = ref(0);

// const animationPath = ref<{ feature: typeof AnimationPath } | null>(null)

// Location and geolocalitation settings
// const bleTags = ref("imgs/iot.png");
const view = ref<View>();
const geoLocChange = (event: ObjectEvent) => {
	console.log("geoLocChange: ", event);
};

const changeCenter = () => {
	view.value?.setCenter(absoluteCenter.value);
}

// Features refs for rendering
const planimetriaFeatures = ref<Feature<Geometry>[]>([]);
const assetsFeatures = ref<Feature<Geometry>[]>([]);
const pathFeatures = ref<Feature<Geometry>[]>([]);

// Setup properties geoJSON
const format = inject("ol-format");
const geoJson = new format.GeoJSON();

// Styles GeoJSON
const webglBBStyle = {
	"stroke-width": 2,
	"stroke-color": "rgba(100,100,100,0.4)",
	"fill-color": "#F3EFF5CC",
};

// Loader state
const loading = ref(true);

// Makes some API call when component is mounted
onMounted(async () => {
	try {
		forkJoin({
			planimetria: fetchAPIObservable('map/planimetry/battipaglia/4'),
			assets: fetchAPIObservable('map/assets/battipaglia'),
			path: fetchAPIObservable('path/battipaglia/4'),
			shortestPath: fetchAPIObservable('map/shortestpath/demo')
		}).pipe(
			rxmap(({ planimetria, assets, path, shortestPath }) => {
				const planimetriaGeoJSON = geoJson.readFeatures(planimetria, { featureProjection: 'EPSG:3857' });
				const assetsGeoJSON = geoJson.readFeatures(assets, { featureProjection: 'EPSG:3857' });
				const pathGeoJSON = geoJson.readFeatures(path, { featureProjection: 'EPSG:3857' });
				const shortestPathArray = shortestPath.features[0].geometry.coordinates;
				// const shortestPathCoords = geoJson.readFeature(shortestPath, { featureProjection: 'EPSG:3857' });

				return {
					planimetriaGeoJSON,
					assetsGeoJSON,
					pathGeoJSON,
					shortestPathArray
				};
			}),
			catchError(error => {
				console.error('Error in RxJS pipeline:', error);
				throw error;
			})
		).subscribe({
			next: ({ planimetriaGeoJSON, assetsGeoJSON, pathGeoJSON, shortestPathArray }) => {
				planimetriaFeatures.value = planimetriaGeoJSON;
				assetsFeatures.value = assetsGeoJSON;
				pathFeatures.value = pathGeoJSON;
				convertArrayEPSG4326toEPSG3857(shortestPathArray);
			},
			error: (err) => {
				console.error('Error while fetching API Service:', err);
			},

		});
	} catch (error) {
		console.error('Error while requesting API Service: ', error);
	}
});

function convertArrayEPSG4326toEPSG3857(array: Coordinate[]) {
	const convertedArray: Coordinate[] = [];
	array.forEach((element) => {
		convertedArray.push(proj4("EPSG:4326", "EPSG:3857", element));
	});
	return convertedArray;
}
// Simulate the shortest path found to a specific room
// const fakeBestPathFeature = ref([
// 	proj4("EPSG:4326", "EPSG:3857", [14.972792162, 40.61709270]),
// 	proj4("EPSG:4326", "EPSG:3857", [14.972774462, 40.61710186]),
// 	proj4("EPSG:4326", "EPSG:3857", [14.972738059, 40.61713377]),
// 	proj4("EPSG:4326", "EPSG:3857", [14.972779822, 40.617160060]),
// 	proj4("EPSG:4326", "EPSG:3857", [14.972800441, 40.61716578]),
// 	proj4("EPSG:4326", "EPSG:3857", [14.972820921, 40.61714121])
// ]);

const extent = inject("ol-extent");
const selectedTagPos = ref([] as Coordinate);
const selectedTagName = ref("");
const selectConditions = inject("ol-selectconditions");
const selectCondition = selectConditions.pointerMove;

const featureSelected = (event: any) => {
	if (event.selected.length == 1) {
		const selectedFeature = event.selected[0];
		selectedTagPos.value = extent.getCenter(
			event.selected[0].getGeometry().extent_,
		);
		selectedTagName.value = selectedFeature.get('name')
	} else {
		selectedTagName.value = "";
	}
};

const selectInteactionFilter = (feature: { values_: { name: undefined; }; }) => {
	return feature.values_.name != undefined;
};

function resolutionChanged(event: any) {
	currentResolution.value = event.target.getResolution();
	currentZoom.value = event.target.getZoom();
}

function centerChanged(event: any) {
	currentCenter.value = event.target.getCenter();
	// Limit movement over 50 meters from absolute Center
	const maxDistance = 50; // meters
	const newCenter = event.target.getCenter();
	const distance = Math.sqrt(
		Math.pow(newCenter[0] - fakePosition.value[0], 2) +
		Math.pow(newCenter[1] - fakePosition.value[1], 2)
	);

	if (distance > maxDistance) {
		event.target.setCenter(currentCenter.value);
	} else {
		currentCenter.value = absoluteCenter.value;
	}
}
function rotationChanged(event: any) {
	currentRotation.value = event.target.getRotation();
}

const actionSheetButtons = [
	{
		text: 'Floor 1',
		data: {
			action: 'cancel',
		},
	},
	{
		text: 'Floor 2',
		role: 'destructive',
		data: {
			act: 'cancel',
		},
	},
	{
		text: 'Floor 3',
		data: {
			action: 'cancel',
		},
	},
	{
		text: 'Floor 4',
		data: {
			action: 'cancel',
		},
	},
	{
		text: 'Cancel',
		role: 'cancel',
		data: {
			action: 'cancel',
		},
	},
];
</script>

<style scoped>
ion-content {
	ion-title {
		font-size: medium;
		padding: 8px;
	}

	ion-toolbar {
		--background: #A22222;
		--color: #FEFAE0;

		--toolbar-content {
			--background: grey;
			align-items: center;
		}
	}

	ul {
		font-weight: 600;
		font-size: 12px;
		padding-left: 1rem;

		li {
			list-style-type: none;
		}
	}

	.ol-map {
		position: relative;
		background: repeating-linear-gradient(45deg,
				#fafffa,
				#fffafa 6px,
				#ffffff 6px,
				#ffffff 12px);
	}

	.btn-map {
		position: absolute;
		z-index: 9;
		background: var(--ol-background-color);
		border-radius: 3px;
		border: 1px solid lightgray;
		width: 35px;
		height: 35px;
		font-size: 1.5rem;
		padding: 0.24rem;

		ion-icon {
			color: var(--ol-subtle-foreground-color)
		}
	}

	.btn-locate {
		left: 8px;
		bottom: 70px;
	}

	.btn-layers {
		right: 8px;
		top: 6px;
	}

	.ol-map-loading:after {
		content: "";
		box-sizing: border-box;
		position: absolute;
		top: 50%;
		left: 50%;
		width: 80px;
		height: 80px;
		margin-top: -40px;
		margin-left: -40px;
		border-radius: 50%;
		border: 5px solid rgba(180, 180, 180, 0.6);
		border-top-color: var(--vp-c-brand-1);
		animation: spinner 0.6s linear infinite;
	}

	.overlay-content {
		background: white;
		background-color: white;
		border: 1px solid #00000044;
		border-radius: 3px;
		box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
		padding: 10px;
		color: grey;
	}
}

@keyframes spinner {
	to {
		transform: rotate(360deg);
	}
}
</style>